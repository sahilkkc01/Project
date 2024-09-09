var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
const multer = require('multer');
const md5 = require('md5');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const compression = require('compression');
const helmet = require('helmet');
const concentRouter = require('./routes/concent');

const { Admin } = require('./models/Kyc');
const clinicRoutes = require('./routes/clinicalRoute');
var adminInventory = require('./routes/adminInventory');
var usersRouter = require('./routes/users');
const { radioRouter } = require('./routes/Radiology');
var patientconfigRouter = require('./routes/patientconfig');
const palashInv = require('./routes/palshInv');
var billing = require('./routes/billing');
var indexRouter = require('./routes/Admin');
var patRegRoute = require('./routes/PatientRegistration');
var packageConfigRouter = require('./routes/packageConfig');
var pathologyRouter = require('./routes/pathology');
var dashboard = require('./routes/360');
const plshBilling = require("./routes/palashBilling");
const findpatient = require("./routes/PatientRegistration");

const { kycCtrl, dashboardCtrl, modifyApt, modifyVisit, apt1, apt2, apt3, apt4, login, register, logout } = require('./controllers/controller');

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

var app = express();

app.use(cookieParser());

app.use(session({
  secret: 'abc', // change 'your_secret_key' to a real secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto', maxAge: 3600000 } // Adjust settings as necessary
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression({
  level: 6,
  threshold: 100 * 1000,
  filter: (req, res) => {
    if (req.header['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

//  app.use(helmet());

// Middleware to ensure authentication
// const ensureAuthenticated = (req, res, next) => {
//   // Routes that do not require authentication
//   const openRoutes = ['/1', '/login'];

//   // Skip authentication check for open routes
//   if (openRoutes.includes(req.path)) {
//     return next();
//   }

//   console.log(req.session)
//   // Redirect unauthenticated users to login
//   if (!req.session.user) {
    
//     return res.redirect('/1');
//   }

//   // Proceed if authenticated
//   next();
// };

// // // Apply ensureAuthenticated globally
// app.use(ensureAuthenticated);

const JWT_SECRET='ll'
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Read token from HttpOnly cookie
  console.log(req.cookies);

  if (!token) {
    return res.redirect('/1');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user details to req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};



// Middleware to get today's date
const todayDateMiddleware = (req, res, next) => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  req.todayDate = formattedDate;
  next();
};
app.use(todayDateMiddleware);

// Set views and engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes setup
app.use('/adminInv',verifyToken, adminInventory);
app.use('/clinic', verifyToken,clinicRoutes);
app.use('/users',verifyToken, usersRouter);
app.use('/radiology',verifyToken, radioRouter);
app.use('/patient',verifyToken, patientconfigRouter);
app.use('/palashinv',verifyToken, palashInv);
app.use('/billing',verifyToken, billing);
app.use('/Admin',verifyToken, indexRouter);
app.use('/findPatient',verifyToken, patRegRoute);
app.use('/package',verifyToken, packageConfigRouter);
app.use('/concent', concentRouter);
app.use('/pathology',verifyToken, pathologyRouter);
app.use('/main',verifyToken, dashboard);
app.use("/findpatient",verifyToken, findpatient);
app.use("/plshBill",verifyToken, plshBilling);


// Routes
app.get('/home', verifyToken, async (req, res) => {
  const admins = await Admin.findAll();
  console.log(req.user); // Now using JWT to fetch user info
  res.render('form-new', { loginName: req.user.username, admins });
});

app.get('/', (req, res) => {
  res.redirect('/1');
});


app.get('/1', (req, res) => {
  const token = req.cookies.token; // Retrieve the JWT token from cookies
  
  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);

      // If the token is valid, redirect to home
      return res.redirect('/home');
    } catch (err) {
      console.error('Invalid token', err);
      // If token verification fails, continue to render login
    }
  }

  // If no valid token is found, render the login page
  res.render('login');
});


app.get('/2', (req, res) => {
  res.redirect(301, '/1');
});

app.get('/dashboard', dashboardCtrl);

app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);
app.post('/kycreg', upload.any(), kycCtrl); 
app.post('/modify-apt', modifyApt);
app.post('/modify-vis', modifyVisit);
app.post('/appointment_1', apt1);
app.post('/appointment_2', apt2);
app.post('/appointment_3', apt3);
app.post('/appointment_4', apt4);

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





const PORT = 5000;
app.listen(PORT, async () => {
  console.log(`Server started at PORT ${PORT}`);
  await con();
});

module.exports = app;
