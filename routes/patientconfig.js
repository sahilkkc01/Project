var express = require('express');
var router = express.Router();
var CryptoJS = require('crypto-js')
var path = require('path');
const session = require('express-session');
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.json());
const PDFDocument = require('pdfkit');
// const puppeteer = require('puppeteer');
const fs = require('fs');
router.use(express.urlencoded({ extended: true }));
var flash = require('express-flash');
const { SourcceL1Submit, getSourceL1, SourcceL2Submit, getSourceL2, PatientChargesSubmit, getPatientCharges, fetchDataFromTable, fetchNameFromTable, PatientRelationSubmit, getPatientRelation, getReferalName, ReferalNameSubmit, getSpecialReg, SpecialRegSubmit, getPrefix, PrefixSubmit, NationalityMasterSubmit, getNationalityMaster, LanguageMasterSubmit, getLanguageMaster, getTreatmentReq, TreatmentReqSubmit, getEducationDetails, EducationDetailsSubmit, getCampMaster, CampMasterSubmit, VisitMasterSubmit, getVisitMaster, PatientConcentSubmit, getPatientConcent, AgentMasterSubmit, getAgentMaster } = require('../controllers/patientConfig');
const Excel = require('exceljs');
const { SourceL1, SourceL2, PatientSourceCharges, PatientRelation, ReferalName, SpecialRegistration, PrefixMaster, NationalityMaster, LanguageMaster, TreatmentReq, EducationDetails, CampMaster, VisitMaster, PatientConcent, AgentInfo } = require('../models/patientConfig');
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60
    },
}));
router.use(flash());
function decryptData(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
router.get('/1',async(req,res)=>{
    res.render('patientConfig/1-PC-patient-source-l1[00-16]')
})
router.get('/2',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await SourceL1.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('patientConfig/2-PC-patient-source-l1-veiw[00-17]-', { a: deptValues });
      } else {
        return res.render('patientConfig/2-PC-patient-source-l1-veiw[00-17]-', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/3',async(req,res)=>{
    res.render('patientConfig/3-PC-patient-source-category l2[00-26]')
})
router.get('/4',async(req,res)=>{
    console.log(req.query)
    const { dept_id } = req.query;
    const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)
    try {
      if (dept_id) {
        const deptData = await SourceL2.findByPk(decryptedDeptId);
  
        if (!deptData) {
          console.error('Department not found:', dept_id);
          return res.status(404);
        }
  
        const deptValues = deptData.get({ plain: true });
        console.log('Department values:', deptValues);
        return res.render('patientConfig/4-PC-patient-source-category-view[00-29]', { a: deptValues });
      } else {
        return res.render('patientConfig/4-PC-patient-source-category-view[00-29]', { a: '' });
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      return res.status(500);
    }
})
router.get('/5',async(req,res)=>{
    res.render('patientConfig/5-PC-patient-registration-charges[00-53]')
})
router.get('/6',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await PatientSourceCharges.findByPk(decryptedDeptId);
      const serviceName = await fetchNameFromTable('serviceName', 'services', deptData.services);
      const s =serviceName[0].serviceName;
      console.log(s)
      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/6-PC-patient-registration-charges-l1[00-54]', { a: deptValues,s });
    } else {
      return res.render('patientConfig/6-PC-patient-registration-charges-l1[00-54]', { a: '',s :'' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/7',async(req,res)=>{
    res.render('patientConfig/7-PC-visit-type[02-09]')
})
router.get('/8',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await VisitMaster.findByPk(decryptedDeptId);
      const serviceName = await fetchNameFromTable('serviceName', 'services', deptData.services);
      const s =serviceName[0].serviceName;
      console.log(s)
      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/8-PC-Add-visit-type-master copy[02-12]', { a: deptValues,s });
    } else {
      return res.render('patientConfig/8-PC-Add-visit-type-master copy[02-12]', { a: '',s :'' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/9',async(req,res)=>{
    res.render('patientConfig/9-PC-patient-relation[04-20]')
})
router.get('/10',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await PatientRelation.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/10-PC-patient-relation-view[04-22]', { a: deptValues });
    } else {
      return res.render('patientConfig/10-PC-patient-relation-view[04-22]', { a: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/11',async(req,res)=>{
  res.render('patientConfig/11-PC-patient-consent[04-36]')
})
router.get('/12', async (req, res) => {
  console.log(req.query);
  const { dept_id } = req.query;
  const decryptedDeptId = decryptData(decodeURIComponent(dept_id), 'll');

  try {
    if (dept_id) {
      const deptData = await PatientConcent.findByPk(decryptedDeptId);
      const dept_desc = await fetchNameFromTable('dept_desc', 'departments', decryptedDeptId);
      const s = dept_desc[0].dept_desc;

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/12-PC-patient-consent-details[04-42]', { a: deptValues, s });
    } else {
      return res.render('patientConfig/12-PC-patient-consent-details[04-42]', { a: '', s: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
  }
});
router.get('/13',async(req,res)=>{
  res.render('patientConfig/13-PC-referral-name[05-02]')
})
router.get('/14',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await ReferalName.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/14-PC-referral-name-view[05-04]', { a: deptValues });
    } else {
      return res.render('patientConfig/14-PC-referral-name-view[05-04]', { a: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/15',async(req,res)=>{
  res.render('patientConfig/15-PC-special-registration[05-13]')
})
router.get('/16',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await SpecialRegistration.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/16-PC-special-registration-view[05-15]', { a: deptValues });
    } else {
      return res.render('patientConfig/16-PC-special-registration-view[05-15]', { a: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/17',async(req,res)=>{
  res.render('patientConfig/17-PC-preffix-master-[05-29]')
})
router.get('/18',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await PrefixMaster.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/18-PC-preffix-master-view-[05-31]', { a: deptValues });
    } else {
      return res.render('patientConfig/18-PC-preffix-master-view-[05-31]', { a: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/19',async(req,res)=>{
  res.render('patientConfig/19-PC-nationality-master-[05-38]')
})
router.get('/20',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await NationalityMaster.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/20-PC-nationality-master-view-[05-40]', { a: deptValues });
    } else {
      return res.render('patientConfig/20-PC-nationality-master-view-[05-40]', { a: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/21',async(req,res)=>{
  res.render('patientConfig/21-PC-Preferred-language-master-[05-47]')
})
router.get('/22',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await LanguageMaster.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/22-PC-preferred-language-master-view-[05-49]', { a: deptValues });
    } else {
      return res.render('patientConfig/22-PC-preferred-language-master-view-[05-49]', { a: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/23',async(req,res)=>{
  res.render('patientConfig/23-PC-treatment-required-master-[06-04]')
})
router.get('/24',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await TreatmentReq.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/24-PC-treatment-required-master-view-[06-06]', { a: deptValues });
    } else {
      return res.render('patientConfig/24-PC-treatment-required-master-view-[06-06]', { a: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/25',async(req,res)=>{
  res.render('patientConfig/25-PC-education-details-master-[06-25]')
})
router.get('/26',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await EducationDetails.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/26-PC-education-details-master-view-[06-27]', { a: deptValues });
    } else {
      return res.render('patientConfig/26-PC-education-details-master-view-[06-27]', { a: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/27',async(req,res)=>{
  res.render('patientConfig/27-PC-camp-master-[06-40]')
})
router.get('/28',async(req,res)=>{
  console.log(req.query)
  const { dept_id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(dept_id), 'll'); // Extract dept_id from query parameters
  console.log('aa',decryptedDeptId)
  try {
    if (dept_id) {
      const deptData = await CampMaster.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404);
      }

      const deptValues = deptData.get({ plain: true });
      console.log('Department values:', deptValues);
      return res.render('patientConfig/28-PC-camp-master-view-[06-42]', { a: deptValues });
    } else {
      return res.render('patientConfig/28-PC-camp-master-view-[06-42]', { a: '' });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500);
    }
})
router.get('/29',async(req,res)=>{
  res.render('patientConfig/29-PC-agent-master-[06-51]')
})
router.get('/30', async (req, res) => {
  console.log(req.query);
  const { dept_id } = req.query;
  const decryptedDeptId = decryptData(decodeURIComponent(dept_id), 'll'); // Assume decryptData function is defined elsewhere
  console.log('Decrypted Department ID:', decryptedDeptId);
  const currentDate = new Date().toISOString().split('T')[0];

  try {
    if (dept_id) {
      const deptData = await AgentInfo.findByPk(decryptedDeptId);

      if (!deptData) {
        console.error('Department not found:', dept_id);
        return res.status(404).send('Department not found');
      }

      const deptValues = deptData.get({ plain: true });

      // Modify mobile numbers
      if (deptValues.mobileNo) {
        deptValues.mobileNo = deptValues.mobileNo.substring(2);
      }
      if (deptValues.altMobileNo) {
        deptValues.altMobileNo = deptValues.altMobileNo.substring(2);
      }

      // Modify landline number
      if (deptValues.landlineNo) {
        deptValues.landlineNo = deptValues.landlineNo.substring(3);
      }

      // Function to format dates to dd-mm-yyyy
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months start at 0
        const year = date.getFullYear();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return `${year}-${month}-${day}`;
      };

      // Format dates
      if (deptValues.regDate) {
        deptValues.regDate = formatDate(deptValues.regDate);
      }
      if (deptValues.agentDob) {
        deptValues.agentDob = formatDate(deptValues.agentDob);
      }
      if (deptValues.spouseDob) {
        deptValues.spouseDob = formatDate(deptValues.spouseDob);
      }

      console.log('Modified Department values:', deptValues);
      return res.render('patientConfig/30-PC-agent-master-agent information[06-40]', { 
        a: deptValues, 
        currentDate: formatDate(currentDate) 
      });
    } else {
      return res.render('patientConfig/30-PC-agent-master-agent information[06-40]', { 
        a: '', 
        currentDate: formatDate(currentDate) 
      });
    }
  } catch (error) {
    console.error('Error fetching department data:', error);
    return res.status(500).send('Internal Server Error');
  }
});



router.get('/getSourceL1',getSourceL1)
router.get('/getSourceL2',getSourceL2)
router.get('/getPatientCharges',getPatientCharges)
router.get('/getPatientRelation',getPatientRelation)
router.get('/getReferalName',getReferalName)
router.get('/getSpecialReg',getSpecialReg)
router.get('/getPrefix',getPrefix)
router.get('/getNationalityMaster',getNationalityMaster)
router.get('/getLanguageMaster',getLanguageMaster)
router.get('/getTreatmentReq',getTreatmentReq)
router.get('/getEducationDetails',getEducationDetails)
router.get('/getCampMaster',getCampMaster)
router.get('/getVisitMaster',getVisitMaster)
router.get('/getPatientConcent',getPatientConcent)
router.get('/getAgentMaster',getAgentMaster)
router.get('/getServices', async (req, res) => {
  try {
      const services = await fetchDataFromTable('services','serviceName');
      res.json(services);
  } catch (error) {
      res.status(500).send('Failed to fetch services');
  }
});
router.get('/getDepartments', async (req, res) => {
  try {
      const services = await fetchDataFromTable('departments','dept_desc');
      res.json(services);
  } catch (error) {
      res.status(500).send('Failed to fetch services');
  }
});
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
router.get('/reloadCity', (req, res) => {
  console.log('1')
  fs.readFile(path.join(__dirname, '../myjson', 'City.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the file');
      return;
    }
    res.send(data);
    
    });
  });





router.post('/SourceL1Submit',SourcceL1Submit);
router.post('/SourceL2Submit',SourcceL2Submit);
router.post('/PatientChargesSubmit',PatientChargesSubmit)
router.post('/PatientRelationSubmit',PatientRelationSubmit)
router.post('/ReferalNameSubmit',ReferalNameSubmit)
router.post('/SpecialRegSubmit',SpecialRegSubmit)
router.post('/PrefixSubmit',PrefixSubmit)
router.post('/NationalityMasterSubmit',NationalityMasterSubmit)
router.post('/LanguageMasterSubmit',LanguageMasterSubmit)
router.post('/TreatmentReqSubmit',TreatmentReqSubmit)
router.post('/EducationDetailsSubmit',EducationDetailsSubmit)
router.post('/CampMasterSubmit',CampMasterSubmit)
router.post('/VisitMasterSubmit',VisitMasterSubmit)
router.post('/PatientConcentSubmit',PatientConcentSubmit)
router.post('/AgentMasterSubmit',AgentMasterSubmit)
router.post('/save-status-data', async (req, res) => {
    try {
        console.log(req.body);
        const { id: encryptedId, status, schema: encryptedSchema } = req.body;
        const secretKey = 'll'; // Replace with your actual secret key

        // Decrypt id and schema
        // const id = decryptData(decodeURIComponent(encryptedId), secretKey); // URL decode
        // const schema = decryptData(decodeURIComponent(encryptedSchema), secretKey); // URL decode

        // console.log('Decrypted id:', id);
        // console.log('Decrypted schema:', schema);

        // Use decrypted id and schema to fetch data from the model
        const Model = require('../models/patientConfig')[encryptedSchema]; 
        const data = await Model.findByPk(encryptedId);

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
router.get('/gen', async (req, res) => {
  try {
      const campData = await CampMaster.findAll();

      // Create a new workbook and add a sheet
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Camp Master');

      // Define column headers and their properties
      worksheet.columns = [
          { header: 'Id', key: 'id', width: 10 },
          { header: 'Code', key: 'code', width: 20 },
          { header: 'Description', key: 'description', width: 30 },
          { header: 'Status', key: 'status', width: 10, style: { numFmt: '"Active";"Inactive"' } }, // Optional style
          { header: 'Created At', key: 'createdAt', width: 20 },
          { header: 'Updated At', key: 'updatedAt', width: 20 }
      ];

      // Populate the worksheet with data from the database
      campData.forEach(camp => {
          worksheet.addRow({
              id: camp.id,
              code: camp.code,
              description: camp.description,
              status: camp.status ? 'Active' : 'Inactive', // Convert boolean to string for clarity
              createdAt: camp.createdAt.toLocaleString(),  // Ensure dates are readable
              updatedAt: camp.updatedAt.toLocaleString()
          });
      });

      // Setup response headers for file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="CampMasterReport.xlsx"');

      // Write the workbook to the HTTP response
      await workbook.xlsx.write(res);

      // End the response
      res.end();
  } catch (error) {
      console.error('Error generating Excel file:', error);
      res.status(500).send('Failed to generate Excel file');
  }
});
router.get('/gene', async (req, res) => {
  try {
      const campData = await CampMaster.findAll();
      const doc = new PDFDocument();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="CampMasterReport.pdf"');
      
      doc.pipe(res);

      doc.fontSize(16).text('Camp Master Report', { align: 'center' });
      doc.moveDown();

      campData.forEach((camp, index) => {
          doc.fontSize(30).text(`${index + 1}. Code: ${camp.code} - Description: ${camp.description}`);
          doc.text(`Status: ${camp.status ? 'Active' : 'Inactive'}`);
          doc.text(`Created At: ${camp.createdAt.toLocaleString()}`);
          doc.text(`Updated At: ${camp.updatedAt.toLocaleString()}`);
          doc.moveDown(0.5);
      });

      doc.end();
  } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Failed to generate PDF');
  }
});

function drawTable(doc, data, options) {
  let startX = options.startX || doc.x;
  let startY = options.startY || doc.y;
  let columnSpacing = options.columnSpacing || 15;
  let rowSpacing = options.rowSpacing || 5;
  let tableWidth = options.tableWidth || 465; // Default width for A4

  const columnWidth = tableWidth / Object.keys(data[0]).length;

  doc.fontSize(10);

  // Draw header
  Object.keys(data[0]).forEach((key, i) => {
      doc
          .fillColor("#000000") // Header color
          .text(key, startX + i * columnWidth, startY, { width: columnWidth, align: 'center' });
  });

  doc.strokeColor("#aaaaaa");
  doc.lineWidth(0.5);
  doc.lineJoin('miter').rect(startX, startY, tableWidth, 20).stroke();
  startY += 20;

  // Draw rows
  data.forEach((item, index) => {
      let offsetY = startY + (index * rowSpacing) + (index * 20);
      Object.values(item).forEach((value, i) => {
          doc
              .fillColor("#444444")
              .text(value, startX + i * columnWidth, offsetY, { width: columnWidth, align: 'center' });
      });
      doc.lineJoin('miter').rect(startX, offsetY, tableWidth, 20).stroke();
  });
}
router.get('/genera', async (req, res) => {
  try {
      const campData = await CampMaster.findAll({
          raw: true,
          attributes: ['id', 'code', 'description', 'status', 'createdAt', 'updatedAt']
      });

      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="CampMasterReport.pdf"');

      doc.pipe(res);

      doc.fontSize(16).text('Camp Master Report', {
          align: 'center',
          underline: true
      });

      doc.moveDown(2);

      const formattedData = campData.map(camp => ({
          ID: camp.id,
          Code: camp.code,
          Description: camp.description,
          Status: camp.status ? 'Active' : 'Inactive',
          Created: camp.createdAt.toISOString().slice(0, 10),
          Updated: camp.updatedAt.toISOString().slice(0, 10)
      }));

      drawTable(doc, formattedData, { startY: doc.y + 20 });

      doc.end();
  } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Failed to generate PDF');
  }
});



module.exports = router; // Don't forget to export your router



