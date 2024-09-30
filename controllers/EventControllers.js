    const { User, Event, Registration, Feedback } = require('../models/EventModels'); // Assuming User model is defined
    const bcrypt = require('bcrypt');
    const { validationResult } = require('express-validator');
    const Op = require('sequelize')
    
    const cron = require('node-cron');
    const nodemailer = require('nodemailer');

    // Sign-up Controller
    const signUp = async (req, res) => {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userName, userEmail, userPassword, userRole } = req.body;

        try {
            // Check if the email is already registered
            const existingUser = await User.findOne({ where: { email: userEmail } });
            if (existingUser) {
                return res.status(409).json({ msg: 'Email is already registered' });
            }

            // Hash the password before saving to the database
            const hashedPassword = await bcrypt.hash(userPassword, 10);

            // Create a new user
            const newUser = await User.create({
                name: userName,
                email: userEmail,
                password: hashedPassword,
                role: userRole // 'organizer' or 'attendee'
            });

            // Respond with success message
            res.status(201).json({
                msg: 'User registered successfully!',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        } catch (error) {
            console.error('Error in sign-up:', error);
            res.status(500).json({ msg: 'Internal server error' });
        }
    };

    const login = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        // Compare the hashed password
        const validPassword = await bcrypt.compare(userPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        // Save user info in session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // Respond with the user information, including the role
        res.status(200).json({ msg: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
    };

    const createEvent = async (req, res) => {
    const { title, date, time, location, description, category } = req.body;

    // Combine date and time to create a full datetime
    const fullDateTime = new Date(`${date} ${time}`);

    try {
        // Create a new event and associate it with the organizer
        await Event.create({
            title,
            date: fullDateTime,
            location,
            description,
            category,
            organizerId: req.session.user.id, // Assuming you have the organizer's ID in session
        });

        // Redirect back to the organizer dashboard
        res.redirect('/organizer-dashboard');
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
    };
    const getEditEvent = async (req, res) => {
    console.log('11')
    const eventId = req.params.id;

    try {
        // Fetch the event from the database
        const event = await Event.findOne({ where: { id: eventId, organizerId: req.session.user.id } });

        if (!event) {
            return res.status(404).send('Event not found or you are not authorized to edit this event.');
        }

        // Render edit form with event data
        res.render('edit-event', { user: req.session.user, event });
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('Error fetching event');
    }
    };

    const postEditEvent = async (req, res) => {
    const eventId = req.params.id;
    const { title, date, time, location, description, category } = req.body;

    // Combine date and time
    const fullDateTime = new Date(`${date} ${time}`);

    try {
        const event = await Event.findOne({ where: { id: eventId, organizerId: req.session.user.id } });

        if (!event) {
            return res.status(404).send('Event not found or you are not authorized to edit this event.');
        }

        // Update event details
        event.title = title;
        event.date = fullDateTime;
        event.location = location;
        event.description = description;
        event.category = category;

        await event.save(); // Save changes

        res.redirect('/organizer-dashboard'); // Redirect back to the dashboard
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).send('Error updating event');
    }
    };

    const deleteEvent = async (req, res) => {
    const eventId = req.params.id;

    try {
        // Find the event and make sure it belongs to the logged-in organizer
        const event = await Event.findOne({ where: { id: eventId, organizerId: req.session.user.id } });

        if (!event) {
            return res.status(404).send('Event not found or you are not authorized to delete this event.');
        }

        // Delete the event
        await event.destroy();

        res.redirect('/organizer-dashboard'); // Redirect back to the dashboard
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Error deleting event');
    }
    };


    const getEvents = async (req, res) => {
        try {
            // Fetch all upcoming events (events whose date is greater than or equal to today's date)
            const events = await Event.findAll({
                where: { date: { [Op.gte]: new Date() } }, // Fetch only upcoming events
            });
    
            // Check if the user has registered for each event
            const userId = req.session.user.id;
    
            const eventsWithRegistration = await Promise.all(
                events.map(async (event) => {
                    const registration = await Registration.findOne({
                        where: { userId, eventId: event.id }, // Check if user is registered for this event
                    });
    
                    return {
                        ...event.get(),
                        isRegistered: !!registration, // Boolean to check if the user is registered
                        dietaryPreferences: registration ? registration.dietaryPreferences : '',
                        numberOfAttendees: registration ? registration.numberOfAttendees : 1,
                        registrationId: registration ? registration.id : null,
                    };
                })
            );
    
            // Render the attendee-page with the events and registration data
            res.render('attendee-page', { events: eventsWithRegistration, user: req.session.user });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events');
        }
    };
    
  
    const registerForEvent = async (req, res) => {
        const { eventId, dietaryPreferences, numberOfAttendees } = req.body;
        const userId = req.session.user.id;
    
        try {
            // Create a new registration
            const registration = await Registration.create({
                userId,
                eventId,
                dietaryPreferences,
                numberOfAttendees
            });
    
            // Fetch event details
            const event = await Event.findByPk(eventId);
    
            // Send confirmation email
            sendConfirmationEmail(req.session.user.email, event);
    
            res.redirect('/attendee-page');
        } catch (error) {
            console.error('Error registering for event:', error);
            res.status(500).send('Error registering for event');
        }
    };
    



    const updateRegistration = async (req, res) => {
        const { registrationId, dietaryPreferences, numberOfAttendees } = req.body;
    
        try {
            // Update the registration details based on the registration ID
            await Registration.update(
                { dietaryPreferences, numberOfAttendees },
                { where: { id: registrationId } }
            );
    
            // Redirect the user back to the attendee page after successful update
            res.redirect('/attendee-page');
        } catch (error) {
            console.error('Error updating registration:', error);
            res.status(500).send('Error updating registration');
        }
    };
    
    const cancelRegistration = async (req, res) => {
        const { registrationId } = req.body;
    
        try {
            // Delete the registration record based on the registration ID
            await Registration.destroy({ where: { id: registrationId } });
    
            // Redirect the user back to the attendee page after canceling the registration
            res.redirect('/attendee-page');
        } catch (error) {
            console.error('Error canceling registration:', error);
            res.status(500).send('Error canceling registration');
        }
    };
    
    const getOrganizerDashboard = async (req, res) => {
        try {
            // Fetch all events created by the logged-in organizer
            const events = await Event.findAll({ 
                where: { organizerId: req.session.user.id },
                include: [{ model: Registration, include: [{ model: User }] }] // Include registrations with user details
            });
    
            // Render the dashboard with user info and events including attendees
            res.render('organizer-dashboard', { user: req.session.user, events });
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).send('Error fetching events');
        }
    };


    const sendReminderEmail = (userEmail, event, timeBeforeEvent) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hackathonsas01@gmail.com',
                pass: 'hackathon01'
            }
        });
    
        const mailOptions = {
            from: 'hackathonsas01@gmail.com',
            to: userEmail,
            subject: `Reminder: ${event.title} is happening ${timeBeforeEvent}`,
            text: `Reminder: ${event.title} is happening on ${event.date} at ${event.location}.`
        };
    
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error('Error sending reminder email:', error);
            } else {
                console.log(`Reminder email sent: ${info.response}`);
            }
        });
    };
    const sendConfirmationEmail = (userEmail, event) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email provider's service
            auth: {
                user: 'hackathonsas01@gmail.com', // Your email
                pass: 'hackathon01' // Your email password
            }
        });
    
        const mailOptions = {
            from: 'hackathonsas01@gmail.com',
            to: userEmail,
            subject: `Confirmation for event: ${event.title}`,
            text: `You have successfully registered for ${event.title} happening on ${event.date} at ${event.location}.`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending confirmation email:', error);
            } else {
                console.log(`Confirmation email sent: ${info.response}`);
            }
        });
    };
    
    
    // Schedule a task to run every day at midnight
    cron.schedule('0 0 * * *', async () => {
        try {
            const today = new Date();
            const oneWeekLater = new Date(today);
            oneWeekLater.setDate(today.getDate() + 7);
    
            const oneDayLater = new Date(today);
            oneDayLater.setDate(today.getDate() + 1);
    
            // Fetch events happening in 1 week
            const eventsNextWeek = await Event.findAll({
                where: {
                    date: {
                        [Op.between]: [oneWeekLater, oneWeekLater.setHours(23, 59, 59)]
                    }
                },
                include: [{ model: Registration, include: [{ model: User }] }]
            });
    
            // Fetch events happening in 1 day
            const eventsNextDay = await Event.findAll({
                where: {
                    date: {
                        [Op.between]: [oneDayLater, oneDayLater.setHours(23, 59, 59)]
                    }
                },
                include: [{ model: Registration, include: [{ model: User }] }]
            });
    
            // Send reminders for next week events
            eventsNextWeek.forEach(event => {
                event.Registrations.forEach(registration => {
                    sendReminderEmail(registration.User.email, event, 'in one week');
                });
            });
    
            // Send reminders for next day events
            eventsNextDay.forEach(event => {
                event.Registrations.forEach(registration => {
                    sendReminderEmail(registration.User.email, event, 'tomorrow');
                });
            });
        } catch (error) {
            console.error('Error sending reminders:', error);
        }
    });

    const submitFeedback = async (req, res) => {
        const { eventId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.session.user.id;
    
        try {
            // Check if the user attended the event
            const registration = await Registration.findOne({ where: { userId, eventId } });
    
            if (!registration) {
                return res.status(403).json({ msg: 'You cannot provide feedback for an event you did not attend.' });
            }
    
            // Create feedback
            await Feedback.create({
                userId,
                eventId,
                rating,
                comment
            });
    
            // Fetch updated events with feedback after submission
            const events = await Event.findAll({
                where: { date: { [Op.gte]: new Date() } }, // Fetch only upcoming events
                include: [{ model: Feedback, include: [User] }]  // Include feedback with user details
            });
    
            // Add registration info and feedback to the event data
            const registrations = await Registration.findAll({ where: { userId } });
            const eventsWithRegistration = events.map(event => {
                const registration = registrations.find(r => r.eventId === event.id);
                const userFeedback = event.Feedbacks.find(fb => fb.userId === userId);
    
                return {
                    ...event.get(),
                    isRegistered: !!registration,  // Check if user is registered
                    dietaryPreferences: registration ? registration.dietaryPreferences : '',
                    numberOfAttendees: registration ? registration.numberOfAttendees : 1,
                    feedback: userFeedback ? { rating: userFeedback.rating, comment: userFeedback.comment } : null,  // Include feedback if exists
                    registrationId: registration ? registration.id : null
                };
            });
    
            // Redirect to attendee page with updated data
            res.render('attendee-page', { user: req.session.user, events: eventsWithRegistration });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            res.status(500).json({ msg: 'Error submitting feedback' });
        }
    };
    
    
    // Controller to view feedback for an event (FR15) (organizer only)
    const viewEventFeedback = async (req, res) => {
        const { eventId } = req.params;
        const userId = req.session.user.id;
    
        try {
            // Check if the current user is the organizer of the event
            const event = await Event.findOne({ where: { id: eventId, organizerId: userId } });
    
            if (!event) {
                return res.status(403).json({ msg: 'You are not authorized to view feedback for this event.' });
            }
    
            // Fetch feedback for the event
            const feedbacks = await Feedback.findAll({
                where: { eventId },
                include: [{ model: User, attributes: ['name', 'email'] }]  // Include user details
            });
    
            res.render('view-feedback', { event, feedbacks });
        } catch (error) {
            console.error('Error fetching feedback:', error);
            res.status(500).json({ msg: 'Error fetching feedback' });
        }
    };

    




    module.exports={submitFeedback,viewEventFeedback,signUp,login,createEvent,getEditEvent,postEditEvent,deleteEvent,getEvents,registerForEvent,updateRegistration,cancelRegistration,getOrganizerDashboard}