var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const session = require('express-session');  // Use session for authentication
const { signUp ,login, createEvent, getEditEvent, postEditEvent, deleteEvent, getEvents, registerForEvent, updateRegistration, cancelRegistration, viewEventFeedback, submitFeedback} = require('./controllers/EventControllers');
 // Correct the import here

var app = express();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/myuploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'clinical-' + file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

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
    next();
  } else {
    return res.redirect('/login');
  }
};

// Routes
app.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/login');
  }
  res.render('login');
});

app.post('/login', login);  // Define login logic in EventControllers

app.get('/signup', (req, res) => {
  if (req.session.user) {
    return res.redirect('/patientlist');
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

    // Fetch all events created by the organizer, including registrations and users
    const events = await Event.findAll({
      where: { organizerId: req.session.user.id },
      include: [
        {
          model: Registration,
          include: [User],  // Include registered users with their details
        },
      ],
    });

    // Prepare the event data for rendering
    const eventsWithAttendees = events.map(event => ({
      ...event.get(), // Convert Sequelize instance to plain object
      Registrations: event.Registrations.map(registration => ({
        ...registration.get(),
        User: registration.User.get(), // Include user details
      })),
    }));

    // Render the dashboard with user info and events
    res.render('organizer-dashboard', { user: req.session.user, events: eventsWithAttendees });

    // Optional: Send reminder emails (FR13) - This should be handled by a background task
    // Reminder logic goes here, e.g., using node-cron for sending reminders a week and a day before the event

  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

// Attendee Page Route
app.get('/attendee-page', checkAuth, async (req, res) => {
  if (req.session.user.role !== 'attendee') {
    return res.status(403).send('Access denied');
  }

  try {
    // Fetch all available events
    const events = await Event.findAll();

    // Fetch the registrations for the current user
    const registrations = await Registration.findAll({ where: { userId: req.session.user.id } });

    // Add `isRegistered` and other registration details to the event data
    const eventsWithRegistration = events.map(event => {
      const registration = registrations.find(r => r.eventId === event.id);

      return {
        ...event.get(), // Convert Sequelize model to plain object
        isRegistered: !!registration, // If there's a registration, mark it as true
        dietaryPreferences: registration ? registration.dietaryPreferences : '',
        numberOfAttendees: registration ? registration.numberOfAttendees : 1,
        registrationId: registration ? registration.id : null, // Include registrationId for form updates
      };
    });

    // Render the attendee page with the updated event data
    res.render('attendee-page', { user: req.session.user, events: eventsWithRegistration });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});


// Route to submit feedback
app.post('/events/:eventId/feedback', checkAuth, submitFeedback);

// Route to view feedback for a specific event (organizer only)
app.get('/events/:eventId/feedback', checkAuth, viewEventFeedback);



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
const { Event, Registration, User } = require('./models/EventModels');
const PORT = 5001;
app.listen(PORT, async () => {
  console.log(`Server started at PORT ${PORT}`);
  await con();
});

module.exports = app;
