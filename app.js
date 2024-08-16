var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
const multer= require('multer')
const md5 = require('md5')
const session = require('express-session');
const compression = require('compression');
const helmet = require('helmet');




const {Admin} = require('./models/Kyc')
const clinicRoutes = require('./routes/clinicalRoute')
var adminInventory = require('./routes/adminInventory');

var usersRouter = require('./routes/users');
const { radioRouter } = require('./routes/Radiology');
var patientconfigRouter = require('./routes/patientconfig')
const palashInv = require('./routes/palshInv');
var billing = require('./routes/billing');
var indexRouter = require('./routes/Admin');
var patRegRoute = require('./routes/PatientRegistration');
var packageConfigRouter = require('./routes/packageConfig')

const { kycCtrl ,dashboardCtrl,modifyApt,modifyVisit,apt1,apt2,apt3,apt4,login,register,logout} = require('./controllers/controller');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/myuploads')
  },
 filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'clinical-' + file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

var app = express();

app.use(cookieParser())

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
  threshold: 100*1000,
  filter: (req, res)=>{
  if(req.header['x-no-compression']){
   return false
  }
 return compression.filter(req,res)
 }
 }));
 
//  app.use(helmet());


app.get('/home', async(req, res) => {
  const admins = await Admin.findAll();
  console.log(req.session)
if(req.session.user){
  res.render('form-new', { loginName: req.session.user.userName, admins});
}else{
  res.render('login')
}
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup


// Middleware function to get today's date and store it in req.todayDate
const todayDateMiddleware = (req, res, next) => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  req.todayDate = formattedDate;
  next();
};
app.use(todayDateMiddleware);



app.use('/adminInv', adminInventory);
app.use('/clinic', clinicRoutes);
app.use('/users', usersRouter);
app.use('/radiology',radioRouter);
app.use('/patient',patientconfigRouter);
app.use('/palashinv',palashInv);
app.use('/billing', billing);

app.use('/Admin', indexRouter);
app.use('/findPatient', patRegRoute);
app.use('/package',packageConfigRouter);



const loginName=''
app.get('/home', (req, res) => {

  res.render('form-new', { loginName: req.session.user.userName});
});

app.get('/', (req, res) => { 
  res.redirect('/1'); 
}); 

app.get('/1', (req, res) => {
  console.log(req.session.user)
  if(req.session.user){
    res.redirect('/home')
  }
  res.render('login');
});


app.get('/2',(req,res)=>{
  res.redirect(301,'/1')
})

app.get('/dashboard',dashboardCtrl); 



app.post('/register', register);

  // Track active sessions by user ID

// POST request handler for user login
app.post('/login', login)


app.post('/logout', logout);


app.post('/kycreg', upload.any(),kycCtrl);

app.post('/modify-apt',modifyApt );
app.post('/modify-vis', modifyVisit);
app.post('/appointment_1',apt1);
app.post('/appointment_2', apt2);
app.post('/appointment_3', apt3);
app.post('/appointment_4', apt4);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
const {con} =require('./sequelize');
const { SuperAdmin } = require('./models/Admin');

const PORT = 5000;
app.listen(PORT, async() => {
  console.log(`Server started at PORT ${PORT}`);
  await con();
});

module.exports = app;
