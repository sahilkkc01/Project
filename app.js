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
const appRouter = require('./routes/AppConfig');

const { Admin, KYC } = require('./models/Kyc');
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
var embRouter = require('./routes/embrology');

const { kycCtrl, dashboardCtrl, modifyApt, modifyVisit, apt1, apt2, apt3, apt4, login, register, logout, getAllKYCDetails, fetchFU, fetchApt, fetchVisits, fetchConv } = require('./controllers/controller');

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

const JWT_SECRET = 'll';
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Read token from HttpOnly cookie
  console.log(req.cookies);

  if (!token) {
    return res.redirect('/1');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user details to req.user
    res.locals.user = req.user; // Make user available in templates
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
function checkRights(requiredRight) {
  return function (req, res, next) {
    // console.log(req.user)
    if (req.user && req.user.rights && req.user.rights[requiredRight]) {
      // User has the required right
      next();
    } else {
     
      return res.redirect('/1');}
  };
}


app.use((req, res, next) => {
  const token = req.cookies.token;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      res.locals.user = req.user;
    } catch (err) {
      
      console.error('Invalid token', err);
    }
  }
  next();
});




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
app.use('/adminInv',verifyToken, checkRights('InventoryRightsAdmin'), adminInventory);
app.use('/clinic', verifyToken, checkRights('ClinicalRights'), clinicRoutes);
app.use('/users',verifyToken, usersRouter);
app.use('/radiology',verifyToken, checkRights('radiology'),radioRouter);
app.use('/patient',verifyToken,checkRights('ClinicalRightsAdmin'), patientconfigRouter);
app.use('/palashinv',verifyToken,checkRights('InventoryRights'), palashInv);
app.use('/billing',verifyToken,checkRights('BillingRightsAdmin'),  billing);
app.use('/Admin',verifyToken, indexRouter);
app.use('/findPatient',verifyToken,checkRights('ClinicalRights'), patRegRoute);
app.use('/package',verifyToken,checkRights('ClinicalRights'), packageConfigRouter);
app.use('/concent',checkRights('ClinicalRights'), concentRouter);
app.use('/pathology',verifyToken,checkRights('pathology'), pathologyRouter);
app.use('/main',verifyToken, dashboard);
app.use("/findpatient",verifyToken,checkRights('ClinicalRights'), findpatient);
app.use("/plshBill",verifyToken,checkRights('BillingRights'), plshBilling);
app.use('/embrology',verifyToken,checkRights('embrology'), embRouter);
app.use('/appConfig',verifyToken, appRouter);


// Routes
app.get('/home', verifyToken, async (req, res) => {

 
  console.log(req.query)
  const { kyc_id } = req.query;
console.log(kyc_id)
const admins = await Admin.findAll();
  try {
    if (kyc_id) {
      const kycData = await KYC.findByPk(kyc_id);

      if (!kycData) {
        console.error('record not found:', kyc_id);
        return res.status(404).render('error', { message: 'record not found' });
      }

      const kycValues = kycData.get({ plain: true });
      console.log(' values:', kycValues);
      return res.render('form-new', { a: kycValues,loginName: req.user.username, admins });
    } else {
      
      console.log(req.user); // Now using JWT to fetch user info
      res.render('form-new', { a:'',loginName: req.user.username, admins });
    }
  } catch (error) {
    console.error('Error fetching  data:', error);
    return res.status(500).render('error', { message: 'Internal Server Error' });
  }



});

app.get('/patientlist', verifyToken, async (req, res) => {
  console.log('23')
  console.log(req.user)

  res.render('form-new-list',{user:req.user});
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
      return res.redirect('/patientlist');
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

app.get('/auditDash', (req, res) => {
  res.render('1-audit-trial-dashboard')
});
app.get('/corfin', (req, res) => {
  res.render('2-corporate-financial-dashboard')
});
app.get('/dailykpidash', (req, res) => {
  res.render('3-daily-kpi-dashboard')
});
app.get('/hosfindash', (req, res) => {
  res.render('4-hospital-financial-dashboard')
});

app.get('/dashboard', dashboardCtrl);
app.get('/get-pat-dtl', getAllKYCDetails);

app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);
app.post('/kycreg', upload.any(), kycCtrl); 
app.post('/modify-apt', modifyApt);
app.post('/modify-vis', modifyVisit);
app.post('/appointment_1', apt1);
app.get('/followUp-data/:kyc_id', fetchFU);
app.get('/appointment-data/:kyc_id', fetchApt);
app.get('/visited-appointment-data/:kyc_id', fetchVisits);
app.get('/converted-appointment-data/:kyc_id', fetchConv);
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
