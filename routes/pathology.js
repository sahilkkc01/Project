var express = require('express');
var router = express.Router();
var CryptoJS = require('crypto-js')
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
const { TestcategSubmit, getTestCateg, ParameterCategSubmit, getParameterCateg, getTubeMaster, TubeMasterSubmit, TemplateMasterSubmit, getTemplateMaster, getSampleMaster, SampleMasterSubmit, getMachineMaster, MachineMasterSubmit, MachineParameterMasterSubmit, getMachineParameterMaster, getMachineParameterLinking, MachineParameterLinkingSubmit, getAllTests, createTest } = require('../controllers/pathology');

const { Testcateg, ParameterMastercateg, TubeMaster, TemplateMaster, SampleMaster, MachineMaster, MachineParameterMaster, MachineParameterLinking, Test } = require('../models/pathology');


function decryptData(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
router.get('/1',async(req,res)=>{
    res.render('pathology/1-PC-test-category-master')
})
router.get('/2', async(req, res) => {
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await Testcateg.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('pathology/2-PC-test-category-master-view', { a: deptValues });
      } else {
        return res.render('pathology/2-PC-test-category-master-view', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }

});

router.get('/3',async(req,res)=>{
    res.render('pathology/3-PC-parameter-unit-master')  
})
router.get('/4',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await ParameterMastercateg.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('pathology/4-PC-parameter-unit-master-view', { a: deptValues });
      } else {
        return res.render('pathology/4-PC-parameter-unit-master-view', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/5',async(req,res)=>{
    res.render('pathology/5-PC-tube-master')
})
router.get('/6',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await TubeMaster.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('pathology/6-PC-tube-master-view', { a: deptValues });
      } else {
        return res.render('pathology/6-PC-tube-master-view', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/7',async(req,res)=>{
    res.render('pathology/7-PC-template-master')
})
router.get('/8',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await TemplateMaster.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('pathology/8-PC-template-master-view', { a: deptValues });
      } else {
        return res.render('pathology/8-PC-template-master-view', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/9',async(req,res)=>{
    res.render('pathology/9-PC-template-master-define-pathologist')
})
router.get('/10',async(req,res)=>{
    res.render('pathology/10-PC-sample-master')
})
router.get('/11',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await SampleMaster.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('pathology/11-PC-sample-master-view', { a: deptValues });
      } else {
        return res.render('pathology/11-PC-sample-master-view', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/12',async(req,res)=>{
    res.render('pathology/12-PC-machine-master')
})
router.get('/13',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await MachineMaster.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('pathology/13-PC-machine-master-view', { a: deptValues });
      } else {
        return res.render('pathology/13-PC-machine-master-view', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/14',async(req,res)=>{
    res.render('pathology/14-PC-machine-parameter-master')
})
router.get('/15',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await MachineParameterMaster.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('pathology/15-PC-machine-parameter-master-view', { a: deptValues });
      } else {
        return res.render('pathology/15-PC-machine-parameter-master-view', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/16',async(req,res)=>{
    res.render('pathology/16-PC-parameter-master')
})
router.get('/17',async(req,res)=>{
    res.render('pathology/17-PC-parameter-master-view-default')
})
router.get('/19',async(req,res)=>{
    res.render('pathology/19-PC-machine-parameter-linking')
})
router.get('/20',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await MachineParameterLinking.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('pathology/20-PC-machine-parameter-linking-view', { a: deptValues });
      } else {
        return res.render('pathology/20-PC-machine-parameter-linking-view', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/21',async(req,res)=>{
    res.render('pathology/21-PC-test-master')
})
router.get('/22',async(req,res)=>{
    res.render('pathology/22-PC-test-master-view-details[02-45]')
})
router.get('/25',async(req,res)=>{
    res.render('pathology/25-PC-pathology-profile-master[03-20]')
})
router.get('/26',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await Test.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('pathology/26-PC-pathology-profile-master-view[03-22]', { a: deptValues });
      } else {
        return res.render('pathology/26-PC-pathology-profile-master-view[03-22]', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/27',async(req,res)=>{
    res.render('pathology/tabs[1]')
})


router.get('/getTestCateg',getTestCateg)
router.get('/getParameterCateg',getParameterCateg)
router.get('/getTubeMaster',getTubeMaster)
router.get('/getTemplateMaster',getTemplateMaster)
router.get('/getSampleMaster',getSampleMaster)
router.get('/getMachineMaster',getMachineMaster)
router.get('/getMachineParameterMaster',getMachineParameterMaster)
router.get('/getMachineParameterLinking',getMachineParameterLinking)
router.get('/getTests', getAllTests);



router.post('/TestCategSubmit',TestcategSubmit);
router.post('/ParameterCategSubmit',ParameterCategSubmit);
router.post('/TubeMasterSubmit',TubeMasterSubmit);
router.post('/TemplateMasterSubmit',TemplateMasterSubmit);
router.post('/SampleMasterSubmit',SampleMasterSubmit);
router.post('/MachineMasterSubmit',MachineMasterSubmit);
router.post('/MachineParameterMasterSubmit',MachineParameterMasterSubmit);
router.post('/MachineParameterLinkingSubmit',MachineParameterLinkingSubmit);
router.post('/pathologyProfileSubmit', createTest);
router.post('/save-status-data', async (req, res) => {
    try {
        console.log(req.body);
        const { id: encryptedId, status, schema: encryptedSchema } = req.body;
        const secretKey = 'll'; // Replace with your actual secret key

        // Decrypt id and schema
        const id = decryptData(decodeURIComponent(encryptedId), secretKey); // URL decode
        const schema = decryptData(decodeURIComponent(encryptedSchema), secretKey); // URL decode

        console.log('Decrypted id:', id);
        console.log('Decrypted schema:', schema);

        // Use decrypted id and schema to fetch data from the model
        const Model = require('../models/pathology')[schema]; 
        const data = await Model.findByPk(id);

        if (data) {
            // Update status and save
            data.status = status;
            await data.save();
            res.sendStatus(200);
        } else {
            res.status(404).send('Data not found');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).send('Internal Server Error');
    }
});
// router.post('/genericHandler', (req, res) => {
//     console.log(req.body)
//     const { id, nextPage } = req.body;
//     console.log(id+nextPage)
//     // You can add validation or processing logic here if needed
//     res.render(nextPage, { id: id });
// });




module.exports = router;