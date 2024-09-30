var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const session = require('express-session');  // Use session for authentication
const { signUp ,login, createEvent, getEditEvent, postEditEvent, deleteEvent, getEvents, registerForEvent, updateRegistration, cancelRegistration, viewEventFeedback, submitFeedback} = require('./controllers/EventControllers');
 // Correct the import here

var app = express();



// Session setup
app.use(cookieParser());
app.use(session({
  secret: 'abc', // Use a strong secret key in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Set views and engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication middleware using session
const checkAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');  // Only redirect to login if the user is not authenticated
};


// Routes
app.get('/login', (req, res) => {
  if (req.session.user) {
    // Check the role of the logged-in user and redirect accordingly
    if (req.session.user.role === 'organizer') {
      return res.redirect('/organizer-dashboard'); // Redirect to organizer dashboard
    } else if (req.session.user.role === 'attendee') {
      return res.redirect('/attendee-page'); // Redirect to attendee page
    }
  }

  // If no user is logged in, render the login page
  res.render('login');
});

app.get('/',(req,res)=>{
  res.redirect('/login')
})

app.post('/login', login);  // Define login logic in EventControllers

app.get('/signup', (req, res) => {
  if (req.session.user) {
    return res.redirect('/login');
  }
  res.render('signup');
});

// Add sign-up route using controller
app.post('/signup', signUp);  // This will now call the signUp function from EventControllers


app.get('/organizer-dashboard', checkAuth, async (req, res) => {
  try {
    // Check if user is an organizer
    if (req.session.user.role !== 'organizer') {
      return res.status(403).send('Access denied');
    }

    // Fetch all events created by the organizer, including registrations, users, and feedbacks
    const events = await Event.findAll({
      where: { organizerId: req.session.user.id },
      include: [
        {
          model: Registration,
          include: [User],  // Include registered users with their details
        },
        {
          model: Feedback,  // Include feedbacks for each event
          include: [User],  // Include user details for feedbacks
        },
      ],
    });

    // Prepare the event data for rendering
    const eventsWithAttendeesAndFeedback = events.map(event => ({
      ...event.get(), // Convert Sequelize instance to plain object
      Registrations: event.Registrations.map(registration => ({
        ...registration.get(),
        User: registration.User.get(), // Include user details for registration
      })),
      Feedbacks: event.Feedbacks.map(feedback => ({
        ...feedback.get(),
        User: feedback.User.get(), // Include user details for feedback
      })),
    }));

    // Render the dashboard with user info, events, registrations, and feedbacks
    res.render('organizer-dashboard', { user: req.session.user, events: eventsWithAttendeesAndFeedback });

  } catch (error) {
    console.error('Error fetching events and feedbacks:', error);
    res.status(500).send('Error fetching events and feedbacks');
  }
});

// Attendee Page Route
app.get('/attendee-page', checkAuth, async (req, res) => {
  if (req.session.user.role !== 'attendee') {
    return res.status(403).send('Access denied');
  }

  try {
    // Fetch all available events, including feedback
    const events = await Event.findAll({
      include: [
        {
          model: Feedback, // Include feedbacks associated with each event
          include: [User]  // Optionally include user details in feedback
        }
      ]
    });

    // Fetch the registrations for the current user
    const registrations = await Registration.findAll({ where: { userId: req.session.user.id } });

    // Add `isRegistered`, feedback, and other registration details to the event data
    const eventsWithRegistration = events.map(event => {
      const registration = registrations.find(r => r.eventId === event.id);

      // Find feedback by the current user (if any)
      const userFeedback = event.Feedbacks ? event.Feedbacks.find(fb => fb.userId === req.session.user.id) : null;

      return {
        ...event.get(), // Convert Sequelize model to plain object
        isRegistered: !!registration, // If there's a registration, mark it as true
        dietaryPreferences: registration ? registration.dietaryPreferences : '',
        numberOfAttendees: registration ? registration.numberOfAttendees : 1,
        registrationId: registration ? registration.id : null, // Include registrationId for form updates
        feedback: userFeedback ? { rating: userFeedback.rating, comment: userFeedback.comment } : null, // Include feedback if it exists
      };
    });

    // Render the attendee page with the updated event data and feedbacks
    res.render('attendee-page', { user: req.session.user, events: eventsWithRegistration });
  } catch (error) {
    console.error('Error fetching events and feedbacks:', error);
    res.status(500).send('Error fetching events and feedbacks');
  }
});



// Route to submit feedback
app.post('/events/feedback/:eventId', checkAuth, submitFeedback);

// Route to view feedback for a specific event (organizer only)
app.get('/events/feedback/:eventId', checkAuth, viewEventFeedback);



// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Failed to log out.');
      }
      res.redirect('/login');
  });
});

app.post('/events/new', checkAuth, createEvent);
// Route to display the edit event form (GET)
app.get('/events/edit/:id', checkAuth, getEditEvent);

// Route to handle form submission for updating event (POST)
app.post('/events/edit/:id', checkAuth, postEditEvent);

app.get('/events/delete/:id', checkAuth, deleteEvent);

app.get('/events', getEvents);

// Register for an event (RSVP) (FR8)
app.post('/events/register', registerForEvent);

// Update registration (FR9)
app.post('/events/update-registration', updateRegistration);

// Cancel registration (FR10)
app.post('/events/cancel-registration', cancelRegistration);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
const { con } = require('./sequelize');
const { Event, Registration, User, Feedback } = require('./models/EventModels');
const PORT = 5001;
app.listen(PORT, async () => {
  console.log(`Server started at PORT ${PORT}`);
  await con();
});

module.exports = app;
