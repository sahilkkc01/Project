var express = require('express');
var router = express.Router();
var CryptoJS = require('crypto-js')
var path = require('path');
const session = require('express-session');

//Encryption function
function encryptDataForUrl(data) {
    console.log(data)
    const secretKey = 'll'; // Replace with your actual secret key
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    const encodedEncrypted = encodeURIComponent(encrypted);
    return encodedEncrypted;
}

router.use(express.static(path.join(__dirname, 'public')));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
var flash = require('express-flash');
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60
    },
}));
router.use(flash());
const { newPackageSubmit, getNewPackage, itemMasterData, SaveStatusData, newPharmacyItem, getServices, newServicesItem, getAllServices, newDefineRule,getAllTariff, getAllConcents, saveConcets, drugsData, addpackage } = require('../controllers/packageConfig');


router.get('/1', (req, res) => {
    const schema = 'NewPackage'
    const a = encryptDataForUrl(schema.toString());
    res.render('PackageConfig/1-PC-package-membership-deatils[00-10]', { a });
})

router.get('/2', function (req, res, next) {
    const currentDate = new Date().toISOString().split('T')[0];
    res.render('PackageConfig/2-PC-package-membership-details-view[00-20]', { currentDate ,result:''})
  })

// router.get('/2', (req, res) => {

//     res.render('PackageConfig/2-PC-package-membership-details-view[00-20]', { result: '' })
// })
router.get('/3', (req, res) => {
    res.render('PackageConfig/6-PC-package-membership-assign-teriff')
})
router.get('/4', (req, res) => {
    res.render('PackageConfig/8-PC-package-membership-deatils-assign-teriff-change-rate-of-existing-teriff')
})
router.get('/5', (req, res) => {
    res.render('PackageConfig/9-PC-package-membership-deatils-package-defination-define-rule')
})
router.get('/6', (req, res) => {
    res.render('PackageConfig/10-PC-package-membership-deatils-service-details')
})
router.get('/7', (req, res) => {
    res.render('PackageConfig/11-PC-package-membership-deatils-item-list-with-category')
})
router.get('/8', (req, res) => {
    res.render('PackageConfig/7-PC-package-membership-deatils-assign-teriff-link-with-teriff-package')
})
router.get('/9', (req, res) => {
    res.render('PackageConfig/hello')
})
router.get("/drugs", drugsData);
router.post("/addpackageitems", addpackage);
router.get('/getNewPackage', getNewPackage);
router.post('/newPackage', newPackageSubmit);
router.get('/itemMasterData', itemMasterData);
router.post('/save-status-data', SaveStatusData);
router.post('/new-pharmacy-item', newPharmacyItem);
router.get('/get-service', getServices);
router.post('/new-services-item', newServicesItem);
router.post('/getallservices', getAllServices);
router.post('/new-rule-define', newDefineRule)
router.get('/get-tariff',getAllTariff)
router.get('/getConcents/:packageCode',getAllConcents)

router.post('/saveConcent',saveConcets)


module.exports = router