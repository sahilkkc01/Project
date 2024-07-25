var express = require('express');
var router = express.Router();
var path = require('path');
const session = require('express-session');
const auth = require('../middleware/auth');
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
const multer = require('multer');

const {
    bcHFCtrl,
    bcExpMCtrl,
    getExpM,
    bcCompMasMCtrl,
    bcSerNew,
    bcComTypeNew,
    // bcserviceMaster,
    jsonStoraInDB,
    bcSerMasAssignConc,
    bcSerMastApplyLevl,
    updateAndCreatJson,
    createCitytoJson,
    createStatetoJson,
    bcTariffMasNew,
    bcAdvAgntNew,
    // bcTrfSer,
    // bcDocShare,
    bcAssCompNew,
    insertUser,
    verifyLogin,
    BcblRateChange,
    allTariff,
    BCExpMasterNew,
    changeExpStatus,
    getAdvAgent,
    changeStatusAdvagnt,
    bcAdvAgent,
    BcAssCompNew,
    getTariffList,
    getAccComData,
    changeTrfStatus,
    changeAssCom,
    getAllDoctor,
    updateExpMaster,
    showExpMaster,
    insertServiseRate,
    getAllServiesMst,
    serMstStatusChange,
    updateSerMst,
    updatePageSer,
    getAllTrfList,
    updateTrfMaster,
    loadTrfPage,
    Selectedservice,
    serviceMstStatusChange,
    getServices,
    selServices,
    getServ,
    changeSerStatus,
    updateSelSer,
    companyType,
    companyTypeSubmit,
    getCompanyType,
    changeCompTypeStatus,
    updateCompType,
    getTariffM,
    changeTariffMasterStatus,
    updateTariff,
    doctorSelected,
    getTariffs,
    getDoc,
    changeDocStatus,
    showDoc
} = require('../controllers/BillingControllers')


function generateTwoDigitNumber() {
    return Math.floor(Math.random() * 90) + 10;
}

const uploadDirectory = path.join(__dirname, 'myuploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.files);
        console.log("Satya");
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        let number = generateTwoDigitNumber();
        const name = "BC" + '-' + number + '-' + Date.now();
        cb(null, name)
    }
});

const upload = multer({ storage: storage })
// const upload = multer({ storage: storage })
const uploadFields = upload.fields([
    { name: 'comp_footer_image', maxCount: 1 },
    { name: 'head_image', maxCount: 1 },
    { name: 'comp_logo', maxCount: 1 }
]);




router.get('/1', (req, res) => {
    console.log("hello Satya");
    res.render('billing/bc-company-new-company-other-details')
})
router.get('/2',loadTrfPage);
router.get('/3', showExpMaster)

router.get('/4', (req, res) => {
    res.render('billing/BCEM12-expense-master')
})
router.get('/5',updatePageSer);
router.get('/6', (req, res) => {
    res.render('billing/BCAA9-advance-against')
})
router.get('/7', (req, res) => {
    res.render('billing/BCCTN10-company-type-new')
});
router.get('/8', (req, res) => {
    res.render('billing/BCSMAC3-service-master-assign-concent')
});
router.get('/9', (req, res) => {
    res.render('billing/BCCN14-company-new')
})
// router.get('/10', (req, res) => {
//   res.render('billing/BCEMN2-expense%20master-new')
// })
router.get('/11', (req, res) => {
    res.render('billing/BCSM6-service-master')
})
router.get('/12', (req, res) => {
    res.render('billing/BCSMAL15-service-master-apply-level')
});
router.get('/13', (req, res) => {
    res.render('billing/BCSRDCW25-service-rate-doctor-category-wise')
})
router.get('/14',loadTrfPage);
router.get('/15', (req, res) => {
    res.render('billing/BCAC22-associated-company')
});
router.get('/16', async (req, res) => {
    const Id = req.flash('id')[0];
    console.log('1231')
    console.log(Id);
    let result = ''
    if (Id) {
        try {
            const result = await bcAdvAgent.findByPk(Id);
            console.log(result);
            res.render('billing/BCAAN21-advance-against-new', { result: result })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    else {
        res.render('billing/BCAAN21-advance-against-new', { result: result });
    }
    res.render('billing/BCAAN21-advance-against-new')
});
router.get('/17', (req, res) => {
    res.render('billing/BCTS20- Tariff-service')
})
router.get('/18', (req, res) => {
    res.render('billing/BCDS24-doctor-share')
})
// router.get('/19', (req, res) => {
//   res.render('billing/BCACN27-associate-company-new')
// })
router.get('/19', async (req, res) => {
    const Id = req.flash('id')[0];
    console.log(Id);
    let result = ''
    if (Id) {
        try {
            const result = await BcAssCompNew.findByPk(Id);
            console.log(result);
            res.render('billing/BCACN27-associate-company-new', { result: result })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    else {
        res.render('billing/BCACN27-associate-company-new', { result: result });
    }
})
router.get('/20', (req, res) => {
    res.render('billing/BCCT23-company-type')
})

router.get('/21', (req, res) => {
    res.render('billing/BCBRC29-bulk-rate-change')
})
// router.get('/22', (req, res) => {
//   res.render('billing/BCBRCLOT28-bulk-rate-change-list-of-tariff')
// })
router.get('/22', allTariff)
router.get('/23',showDoc)

router.get('/24',selServices)
router.get('/25',(req, res) => {
    res.render('billing/service-rate-dr-cat')
})
router.get('/26',companyType);
router.get('/27',(req, res) => {
    res.render('billing/Tariff-master-listing')
})


/* GET Billing listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/bc_c_n_o_d', uploadFields, bcHFCtrl)

router.post('/bc_e_m', bcExpMCtrl)
router.post('/bc-exp-master-new', BCExpMasterNew)
router.post('/bccn_Comp_Mas', bcCompMasMCtrl)
router.get('/get-exp-m', getExpM)
router.get('/get-doc',getDoc)
router.get('/get_tariff_master',getTariffM)
router.get('/get_services',getServ)
router.post('/change-exp-status', changeExpStatus);
router.post('/change-doc-status',changeDocStatus)
router.post('/change-tariff-master-status',changeTariffMasterStatus)
router.post('/change_ser_status', changeSerStatus)
router.get('/bc-s-m-n', bcSerNew)
router.post('/bc-com-type-new', bcComTypeNew);
// router.post('/bc-ser-master', bcserviceMaster);
router.post('/bc-ser-mas-ass-cont', bcSerMasAssignConc);
router.post('/bc-ser-mast-apply-levl', bcSerMastApplyLevl);
router.post('/bc-tariff-master-new', bcTariffMasNew);
router.get('/get-Tariff-list', getTariffList)
router.get('/get_comp_type',getCompanyType)
router.post('/bc-adv-agnt-new', bcAdvAgntNew);
router.get('/get-Adv-agent', getAdvAgent);
router.post('/change-adv-agent-status', changeStatusAdvagnt)
// router.post('/bc-trf-ser', bcTrfSer);
// router.post('/bc-doc-share', bcDocShare);
router.post('/bc-ass-comp-new', bcAssCompNew);
router.get('/loadAssComData', getAccComData);
router.get("/get-Ass-Com-list", getAccComData);
router.post('/change-Comp-status', changeAssCom);
router.post('/bc-bl-rate-change', BcblRateChange)
// router.get('/loadUpdatePage', loadUpdatePage);
router.post('/update-acc-master', async (req, res) => {
    const { id } = req.body;
    console.log(id);
    req.flash('id', id);
    res.sendStatus(200);
});

router.post('/update-adv-master', (req, res) => {
    console.log('ajdhakj')
    console.log("Satya", req.body);
    const { id } = req.body;
    console.log(id);
    req.flash('id', id);
    res.sendStatus(200);
})

router.post('/update-exp-master', updateExpMaster);
router.post('/update-ser-master',updateSelSer)
router.post('/update-tarr-mst',updateTariff)
router.post('/change-trf-status', changeTrfStatus)
router.post('/update-trf-master', updateTrfMaster);
router.post('/change_Comptype_status', changeCompTypeStatus)
router.post('/update_Comptyper', updateCompType);


router.post('/get-ser-Mst-list', getAllServiesMst)
router.post('/change-ser-mst-status', serMstStatusChange);
router.post('/update-ser-master', updateSerMst)

router.get('/get-trf-list',getAllTrfList);
router.post('/bc-Servise-mst', insertServiseRate);


router.get('/get-Doctor', getAllDoctor)
router.get('/get-service',getServices)
router.post('/update_services',serviceMstStatusChange)
router.post('/store-jsonInDb', jsonStoraInDB),
router.post('/updateAndCreatJson', updateAndCreatJson)
router.get('/get', createCitytoJson);
router.get('/post', createStatetoJson);
router.post('/admin/registration', auth.isLogout, insertUser);
router.post('/admin/login', verifyLogin);
router.post('/selectedService',Selectedservice);
router.post('/companyTypeSubmit',companyTypeSubmit);
router.post('/doctorSelected',doctorSelected)
router.get('/get-Tariffs', getTariffs);

module.exports = router;