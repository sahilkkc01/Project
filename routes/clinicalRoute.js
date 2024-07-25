var express = require('express');
var router = express.Router();
const fs = require('fs')
var path = require('path');
const flash = require('connect-flash')
const multer= require('multer')
const CryptoJS = require('crypto-js');

function encryptDataForUrl(data) {
  const secretKey = 'll'; // Replace with your actual secret key
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  const encodedEncrypted = encodeURIComponent(encrypted);
  return encodedEncrypted;
}


function decryptData(encryptedData, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
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

 
router.get('/1',async(req,res)=>{
  const { id } = req.query;
  const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      // console.log("clusId",clusId.clus_id)
      try {
        const bbmData = await BankBranchMaster.findByPk(decryptedId);
        const bbmValues = bbmData.get({ plain: true });
        console.log('1v',bbmValues)
        res.render('clinical/bank-branch-master',{a:bbmValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/bank-branch-master',{a:''})
    }
   
  })
  
  router.get('/2',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
    
      try {
        const cashData = await CashCounterMaster.findByPk(decryptedId);
        const cashValues = cashData.get({ plain: true });
        console.log('ssd',cashValues)
        res.render('clinical/cash-counter-master',{a:cashValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/cash-counter-master',{a:''})
    }
   

  })
  
  router.get('/3',(req,res)=>{
    const schema = 'CityMaster';
    const Encschema = encryptDataForUrl(schema.toString());
    
    // console.log(schem
    res.render('clinical/city-master-list',{a:Encschema})
  })
  
  router.get('/4',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
     
      try {
        const clasData = await Classification.findByPk(decryptedId);
        const clasValues = clasData.get({ plain: true });
        console.log('ssd',clasValues)
        res.render('clinical/classification', { a:clasValues });
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/classification',{ a:'' });
    }
   
  })
  router.get('/5',(req,res)=>{
    const schema = 'Classification';
    const Encschema = encryptDataForUrl(schema.toString());
    
    res.render('clinical/classification-list',{a:Encschema})
  })
  
  router.get('/6',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      
      try {
        const clinicData = await ClinicConfiguration.findByPk(decryptedId);
        const clinicValues = clinicData.get({ plain: true });
        console.log('ssd',clinicValues)
        res.render('clinical/clinic',{a:clinicValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/clinic',{a:''})
    }
   
  })
  
 

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
        const Model = require('../models/clinicConfig')[schema]; 
        const data = await Model.findByPk(id);

        if (data) {
            // Update status and save
            data.status = status;
           
            await data.save();
            console.log(data)
            res.sendStatus(200);
        } else {
            res.status(404).send('Data not found');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).send('Internal Server Error');
    }
});

 
  router.get('/24',async(req,res)=>{
    
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      // console.log("clusId",clusId.clus_id)
      try {
        const clusData = await Cluster.findByPk(decryptedId);
        const clusValues = clusData.get({ plain: true });
        console.log('ssd',clusValues)
        res.render('clinical/cluster',{b:clusValues})
      } catch (error) {
        console.error('Error fetching Clustur data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/cluster',{b:''})
    }
   
    // res.render('clinical/cluster')
  })

  
  router.get('/7',(req,res)=>{
    const schema = 'Department';
    const Encschema = encryptDataForUrl(schema.toString());
    
    // console.log(schema)
    res.render('clinical/department-list',{a:Encschema})
  })
  
  const { Department, Cluster, Designation, Specialization, SubSpecialization, PrimarySymptoms, Classification, Doctor, BankMaster, BankBranchMaster, CountryMaster, StateMaster, RegionMaster, EmrFieldvalue, CashCounterMaster, EmrCC, DocCatMaster, UploadedFile, CityMaster, ClinicConfiguration, Employee } = require('../models/clinicConfig');
  
  router.get('/8', async (req, res) => {
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await Department.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404).render('clinical/error', { message: 'Department not found' });
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('clinical/department', { a: deptValues });
      } else {
        return res.render('clinical/department', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching  data:', error);
      return res.status(500).render('clinical/error', { message: 'Internal Server Error' });
    }
  });
  
   
  router.get('/13',(req,res)=>{
    const schema = 'Designation';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/designation-list',{a:Encschema})
  })

  router.get('/26',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const desgData = await Designation.findByPk(decryptedId);
        const desgValues = desgData.get({ plain: true });
        console.log('desg',desgValues)
        res.render('clinical/designation', { c:desgValues });
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/designation',{ c:'' });
    }
   
  })
  
  router.get('/9',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const doccatData = await DocCatMaster.findByPk(decryptedId);
        const doccatValues = doccatData.get({ plain: true });
        console.log('values',doccatValues)
        res.render('clinical/doctor-category-master', { a:doccatValues });
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/doctor-category-master',{ a:'' });
    }
   
  
  })
  
  router.get('/10',(req,res)=>{
    const schema = 'DocCatMaster';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/doctor-category-master-list',{a:Encschema})
  })
  
  router.get('/11',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const docData = await Doctor.findByPk(decryptedId);
        const docValues = docData.get({ plain: true });
        console.log('ssd',docValues)
        res.render('clinical/doctor',{a:docValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/doctor',{a:''})
    }
   
  })
  
  router.get('/12',(req,res)=>{
    const schema = 'Doctor';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/doctor-list',{a:Encschema})
  })
 
 
  
  router.get('/14',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const emrccData = await EmrCC.findByPk(decryptedId);
        const emrccValues = emrccData.get({ plain: true });
        console.log('ssd',emrccValues)
        res.render('clinical/emr-cheif-complaints',{a:emrccValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/emr-cheif-complaints',{a:''})
    }
   
    
  })
  
  router.get('/15',(req,res)=>{
    const schema = 'EmrCC';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/emr-cheif-complaints-list',{a:Encschema})
  })
  
  router.get('/16',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const emrData = await EmrFieldvalue.findByPk(decryptedId);
        const emrValues = emrData.get({ plain: true });
        console.log('ssd',emrValues)
        res.render('clinical/emr-field-value',{a:emrValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/emr-field-value',{a:''})
    }

  })
  
  router.get('/17',(req,res)=>{
    const schema = 'EmrFieldvalue';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/emr-field-value-list',{a:Encschema})
  })
  
  router.get('/18',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const psData = await PrimarySymptoms.findByPk(decryptedId);
        const psValues = psData.get({ plain: true });
        console.log('desg',psValues)
        res.render('clinical/primary-symptoms', { a:psValues });
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/primary-symptoms',{ a:'' });
    }
  })
  
  router.get('/19',(req,res)=>{
    const schema = 'PrimarySymptoms';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/primary-symptoms-list',{a:Encschema})
  })
  
  router.get('/20',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const rmData = await RegionMaster.findByPk(decryptedId);
        const rmValues = rmData.get({ plain: true });
        console.log('ssd',rmValues)
        res.render('clinical/region-master',{a:rmValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/region-master',{a:''})
    }
   
  })
  
  
  router.get('/21',(req,res)=>{
    const schema = 'RegionMaster';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/region-master-list',{a:Encschema})
  })
  
  router.get('/22',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const subspecData = await SubSpecialization.findByPk(decryptedId);
        const subspecValues = subspecData.get({ plain: true });
        console.log('ssd',subspecValues)
        res.render('clinical/sub-specilization',{e:subspecValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/sub-specilization',{e:''})
    }
   
  
  })

  router.get('/23',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const specData = await Specialization.findByPk(decryptedId);
        const specValues = specData.get({ plain: true });
        console.log('ssd',specValues)
        res.render('clinical/specilization',{d:specValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/specilization',{d:''})
    }
   
  })
  router.get('/28',(req,res)=>{
    const schema = 'Specialization';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/specilization-list',{a:Encschema})
  })

 

  router.get('/25',(req,res)=>{
    const schema = 'Cluster';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/cluster-list',{a:Encschema})
  })

  router.get('/27',async(req,res)=>{

    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const empData = await Employee.findByPk(decryptedId);
        const empValues = empData.get({ plain: true });
        console.log('ssd',empValues)
        res.render('clinical/employee',{a:empValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/employee',{a:''})
    }
   
  })

  router.get('/29',(req,res)=>{
    const schema = 'SubSpecialization';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/sub-specilization-list',{a:Encschema})
  })
 
  router.get('/30',(req,res)=>{
    const schema = 'BankMaster';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/bank-master-list',{a:Encschema})
  })
  router.get('/31',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const bmData = await BankMaster.findByPk(decryptedId);
        const bmValues = bmData.get({ plain: true });
        console.log('ssd',bmValues)
        res.render('clinical/bank-master',{a:bmValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/bank-master',{a:''})
    }
   

   
  })
 
  router.get('/32',(req,res)=>{
    const schema = 'BankBranchMaster';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/bank-branch-master-list',{a:Encschema})
  })
  router.get('/33',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const cmData = await CountryMaster.findByPk(decryptedId);
        const cmValues = cmData.get({ plain: true });
        console.log('ssd',cmValues)
        res.render('clinical/country-master',{a:cmValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/country-master',{a:''})
    }
   


  })
  
  router.get('/34',(req,res)=>{
    const schema = 'CountryMaster';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/country-master-list',{a:Encschema})
  })
  
  router.get('/35',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const smData = await StateMaster.findByPk(decryptedId);
        const smValues = smData.get({ plain: true });
        console.log('ssd',smValues)
        res.render('clinical/state-master',{a:smValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/state-master',{a:''})
    }
   
  })
  
  router.get('/36',(req,res)=>{
    const schema = 'StateMaster';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/state-master-list',{a:Encschema})
  })

  router.get('/37',(req,res)=>{
    const schema = 'CashCounterMaster';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/cash-counter-master-list',{a:Encschema})
  })

  router.get('/38',(req,res)=>{
    
    res.render('clinical/try')
  })

  router.get('/39',async(req,res)=>{
    const { id } = req.query;
    const decryptedId =decryptData(decodeURIComponent(id), 'll');
    if (id) {
      try {
        const cityData = await CityMaster.findByPk(decryptedId);
        const cityValues = cityData.get({ plain: true });
        console.log('city master',cityValues)
        res.render('clinical/city-master',{a:cityValues})
      } catch (error) {
        console.error('Error fetching  data:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.render('clinical/city-master',{a:''})
    }

  
  })

  router.get('/40',(req,res)=>{
    const schema = 'ClinicConfiguration';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/clinic-list',{a:Encschema})
  })

  router.get('/41',(req,res)=>{
    const schema = 'Employee';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('clinical/employee-list',{a:Encschema})
  })

router.post('/upload', upload.single('image'), async (req, res) => {
  console.log(req.body);
  
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Extract the name from the request body
    const name = req.body.name;

    // Save the filename and name to the database
    const uploadedFile = await UploadedFile.create({ filename: file.filename, name: name });
    res.json({ message: 'File uploaded successfully', file: uploadedFile });
  } catch (error) {
    console.error('Failed to save file information to the database:', error);
    res.status(500).json({ error: 'Failed to save file information to the database' });
  }
});


// // Test upload route
// router.get('/testupload', (req, res) => {
//   res.send('img-upload');
// });

  
 



  const { bankBranchMasterCtrl,
    cashCounterMasterCtrl,
    classificationCtrl,
    clinicConfigCtrl,
    getCountry,
    getState,
    getCity,
    departmentCtrl,
    docCatCtrl,
    getClassification,
    getDocCat,
    docInfoCtrl,
    getDocinfo,
    getDesginfo,
    emrCCCtrl,
    emrfieldCtrl,
    getEmrInfo,
    getEmrFieldInfo,
    primSympCtrl,
    getPrimSymp,
    regMasterCtrl,
    getRegion,
    subSpecCtrl,
    getClinicName,
    getDeptInfo,
    clusturCtrl,
    getClustur,
    desgCtrl,
    empCtrl,
    
    SpecCtrl,
    bankMasterCtrl,
    getBankMas,
    getBankBMas,
    countMasterCtrl,
    getCountMas,
    stateMasterCtrl,
    getStateMas,
    getCashInfo,
    getSourceInfo,
    CityMCtrl,
    getCityinfo,
    getClinic,
    getEmptinfo,
    getSpec,
    getSubSpec} = require('../controllers/clinicControllers')
  
  
  //bankBranch_mcc
  
  router.post('/bank-branch-master',bankBranchMasterCtrl)

  router.post('/cash-counter-master',cashCounterMasterCtrl);

  router.post('/clustur',clusturCtrl);
  router.post('/desg',desgCtrl);

  router.post('/emp',upload.single('emp_image'),empCtrl);
  
  
  //fetch data 
  router.get('/get-countries',getCountry);
  
  // Endpoint to get states based on country
  
  router.get('/get-states',getState );
  
  
  // Endpoint to get cities based on state
  router.get('/get-cities', getCity);
  
  // router.get('/get-city-details',async(req,res)=>{
  //   try {
  //     const { countryId,stateId,cityId } = req.query;
  //     const data = {code:0,countryId,stateId,cityId}
  //     console.log(data)
  //     res.status(200).json(data);
  // } catch (error) {
  //     res.status(500).json({ error: 'An error occurred while fetching cities.' });
  // }
  // })
  
  router.post('/classification',classificationCtrl)
  
  router.get('/get-classification-details', getClassification);
  router.get('/get-clustur-details', getClustur);
  router.get('/get-clinic-details', getClinic);
  
  
  router.get('/reloadState', (req, res) => {
    console.log('1')
    fs.readFile(path.join(__dirname, '../myjson', 'State.json'), 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading the file');
        return;
      }
      res.send(data);
      
    });
  });
  
  router.get('/cities', (req, res) => {
    fs.readFile(path.join(__dirname, '../myjson', 'City.json'), 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading the file');
        return;
      }
      res.json(JSON.parse(data));
    });
  });
  
  router.get('/loadDocCat', (req, res) => {
    fs.readFile(path.join(__dirname, '../', 'DocCat.json'), 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading the file');
        return;
      }
      console.log(data)
      res.json(JSON.parse(data));
    });
  }); 
  
  router.get('/loadSpec', getSpec); 
  
  router.get('/loadSubSpec',getSubSpec); 
  
  router.get('/loadDept', (req, res) => {
    console.log('111')
    fs.readFile(path.join(__dirname,'../', 'Dept.json'), 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading the file');
        return;
      }
      // console.log(data)
      
      res.json(JSON.parse(data));
    });
  }); 
  


  
  router.post('/department-list',departmentCtrl)
  router.post('/cityMaster',CityMCtrl)

  router.post('/bank-master',bankMasterCtrl)
  router.post('/count-master',countMasterCtrl);
  router.post('/state-master',stateMasterCtrl);
  
  
  router.post('/doctor-category-master',docCatCtrl)
  
  
  router.get('/doc-cat-master',getDocCat );
  router.get('/getBankMaster',getBankMas );
  router.get('/getCountMaster',getCountMas );
  router.get('/getStateMaster',getStateMas );
  router.get('/getBankBranchMaster',getBankBMas );

 
  
  router.post('/doctor-info', upload.fields([
    { name: 'doc_photo', maxCount: 1 },
    { name: 'doc_sign', maxCount: 1 }
  ]),docInfoCtrl);
  
  
  router.get('/get-doctor-details',getDocinfo);
  
  router.get('/get-desg-details',getDesginfo);
  router.get('/get-empt-details',getEmptinfo);
  router.get('/get-city-details',getCityinfo);
  router.get('/get-dept-details',getDeptInfo);
  router.get('/get-cash-details',getCashInfo);
  router.get('/get-Source-details',getSourceInfo);
  
  
  router.post('/emr-cc',emrCCCtrl);
  
  
  router.post('/emr_field_value',emrfieldCtrl);
  
  router.get('/get-emr',getEmrInfo);
  
  router.get('/get-emr-field',getEmrFieldInfo);
  
  router.post('/primary-symptoms',primSympCtrl);
  
  router.get('/get-prim-symp',getPrimSymp);
  
  router.post('/region-master-f',regMasterCtrl);
  
  router.get('/get-region-m',getRegion);
  
  router.post('/sub-spec-detail',subSpecCtrl);

  router.post('/spec-detail',SpecCtrl);
  
  
  router.get('/get-clinic-name',getClinicName);
  router.post('/clinic-configs',clinicConfigCtrl);
  
  

module.exports = router;

