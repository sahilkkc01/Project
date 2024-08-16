const express = require('express');
const router = express.Router();
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const { patientRagistration, AppointmentData, newAppointment, newVisit, newCouple, billPatientSubmit, SaveStatusData, getpatientBills } = require('../controllers/patientReg');
const upload = require('../middleware/uplaod');
const {sequelize} = require('../sequelize');
const { Sequelize } = require('sequelize');
const { PR_ReferralDoc, PR_patientReg, PR_Appointment, PR_PatientVisit, PR_BillFindPatient } = require('../models/PatientReg');
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
router.use(session({
  secret: 'kb',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));


const CryptoJS = require('crypto-js');


//decryption and encryption fxn
function decryptData(encryptedData, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
function encryptDataForUrl(data) {
  console.log(data)
  const secretKey = 'll'; // Replace with your actual secret key
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  const encodedEncrypted = encodeURIComponent(encrypted);
  return encodedEncrypted;
}
    
router.get('/1', function (req, res) {
  // Check if the rowId is stored in the session
  if (req.session.rowId) {
    // Fetch the patient registration details using Sequelize
    PR_patientReg.findByPk(req.session.rowId)
      .then(patient => {
        if (patient) {
          // Render the page with the patient data
          res.render('PatientRegistration/1-appointment-new-patient', { patient: patient });
        } else {
          // Handle case where no patient is found for the given id
          res.redirect('/findpatient/6');  // Redirect or handle this as needed
        }
      })
      .catch(error => {
        console.error('Error fetching patient:', error);
        res.status(500).send('Internal Server Error'); // Handle errors more gracefully in production
      });
  } else {
    // Redirect if no rowId is in the session
    res.redirect('/findpatient/6');
  }
});


router.get('/1a', function (req, res) {
  res.render('PatientRegistration/1a-appointment-new-patient-search');
});

router.get('/2', function (req, res) {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];  // YYYY-MM-DD
  const currentTime = now.toTimeString().split(' ')[0];  // HH:MM:SS
  res.render('PatientRegistration/2-patient-registration-patient-information', {
    patient: "",
    a: {
      state: 'MP',
      city: 'Chhatarpur'
    },
    currentDate: currentDate,
    currentTime:currentTime
  });
});


    router.get('/23', function (req, res) {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];  // YYYY-MM-DD
      const currentTime = now.toTimeString().split(' ')[0];  // HH:MM:SS
      if (req.session.rowId) {
          // Fetch the patient registration details using Sequelize
          PR_patientReg.findByPk(req.session.rowId)
              .then(patient => {
                  if (patient) {
                      // Render the page with the patient data and current date
                      res.render('PatientRegistration/2-patient-registration-patient-information', {
                          patient: patient,
                          currentDate: currentDate,
                          currentTime:currentTime,
                          a: {
                              state: 'MP',
                              city: 'Chhatarpur'
                          }
                      });
                  } else {
                      // Handle case where no patient is found for the given id
                      res.redirect('/findpatient/6');  // Redirect or handle this as needed
                  }
              })
              .catch(error => {
                  console.error('Error fetching patient:', error);
                  res.status(500).send('Internal Server Error'); // Handle errors more gracefully in production
              });
      } else {
          // Redirect if no rowId is in the session
      res.redirect('/findpatient/6');
      }
          
  });

    
// router.get('/3', function (req, res) {
//   res.render('PatientRegistration/3-patient-registration-spouse-information');
// });
// router.get('/4', function (req, res) {
//   res.render('PatientRegistration/4-patient-registration-sponsor-information');
// });
// router.get('/5', function (req, res) {
//   res.render('PatientRegistration/5-patient-information-referral-doctor');
// });
router.get('/6', function (req, res) {
  res.render('PatientRegistration/6-FP-find-patient');
});
router.get('/7', function (req, res) {
  res.render('PatientRegistration/7-FP-find-patient-donor-link-search');
});
// router.get('/8', function (req, res) {
//   res.render('PatientRegistration/8-FP-find-patient-attach-document');
// });
// router.get('/9', function (req, res) {
//   res.render('PatientRegistration/9-FP-find-patient-print-barcode');
// });
router.get('/10', function (req, res) {
  res.render('PatientRegistration/10-FP-patient-visit-&-appointments-past-visits');
});
router.get('/11', function (req, res) {
  res.render('PatientRegistration/11-FP-patient-visit-&-appointments-past-appointments');
});
router.get('/12', function (req, res) {
  res.render('PatientRegistration/12-FP-patient-visit-&-appointments-future-appointments');
});
router.get('/13', function (req, res) {
  // Get current date and time
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];  // YYYY-MM-DD
  const currentTime = now.toTimeString().split(' ')[0];  // HH:MM:SS

  if (req.session.rowId) {
      // Fetch the patient registration details using Sequelize
      PR_patientReg.findByPk(req.session.rowId)
          .then(patient => {
              if (patient) {
                  // Render the page with the patient data and current date and time
                  res.render('PatientRegistration/13-FB-patient-detail', {
                      patient: patient,
                      currentDate: currentDate,
                      currentTime: currentTime  // Pass current time to the view
                  });
              } else {
                  // Handle case where no patient is found for the given id
                  res.redirect('/findpatient/6');  // Redirect or handle this as needed
              }
          })
          .catch(error => {
              console.error('Error fetching patient:', error);
              res.status(500).send('Internal Server Error'); // Handle errors more gracefully in production
          });
  } else {
      // Redirect if no rowId is in the session
      res.redirect('/findpatient/6');
  }
});

router.get('/14', function (req, res) {
  res.render('PatientRegistration/14-FB-patient-detail-search');
});
router.get('/15', function (req, res) {
  res.render('PatientRegistration/15-FB-counter-sale');
});
router.get('/16', function (req, res) {
  res.render('PatientRegistration/16-FP-counter-sale-search');
});
router.get('/17', function (req, res) {
  res.render('PatientRegistration/17-FP-counter-sale-patient-search');
});
router.get('/18', function (req, res) {
  res.render('PatientRegistration/18-FB-counter-sales-previous-pharmacy-bills');
});
router.get('/19', function (req, res) {
  res.render('PatientRegistration/19-FB-item-sales-return');
});
router.get('/20', function (req, res) {
  res.render('PatientRegistration/20-FB-item-sales-return-new');
});
router.get('/21', function (req, res) {
  res.render('PatientRegistration/21-FB-item-sales-return-new-sales-item-search');
});
router.get('/22', function (req, res) {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];  // YYYY-MM-DD
  const currentTime = now.toTimeString().split(' ')[0];  // HH:MM:SS

  if (req.session.rowId) {
      // Fetch the patient registration details using Sequelize
      PR_patientReg.findByPk(req.session.rowId)
          .then(patient => {
              if (patient) {
                  // Render the page with the patient data and current date and time
                  res.render('PatientRegistration/22-FB-form-new-couple', {
                      patient: patient,
                      currentDate: currentDate,
                      currentTime: currentTime  // Pass current time to the view
                  });
              } else {
                  // Handle case where no patient is found for the given id
                  res.redirect('/findpatient/6');  // Redirect or handle this as needed
              }
          })
          .catch(error => {
              console.error('Error fetching patient:', error);
              res.status(500).send('Internal Server Error'); // Handle errors more gracefully in production
          });
  } else {
      // Redirect if no rowId is in the session
      res.redirect('/findpatient/6');
  }
});
router.get('/24', function (req, res) {
  if (req.session.rowId) {
    PR_patientReg.findByPk(req.session.rowId)
      .then(patient => {
        if (patient) {
          // Patient and session.rowId exist
          const schema = 'PR_BillFindPatient';
          const status = 'status';
          const a = encryptDataForUrl(schema.toString());
          const b = encryptDataForUrl(status.toString());
          res.render('PatientRegistration/bill-details', { a, b });
        } else {
          // Handle case where patient does not exist for the given rowId
          res.redirect('/findpatient/6');  // Redirect or handle this as needed
        }
      })
      .catch(error => {
        console.error('Error fetching patient:', error);
        res.status(500).send('Internal Server Error');
      });
  } else {
    // Redirect if no rowId is in the session
    res.redirect('/findpatient/6');
  }
});








router.get('/25', async function (req, res) {
  const id = req.query.id;
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];  // YYYY-MM-DD
  const currentTime = now.toTimeString().split(' ')[0];  // HH:MM:SS

  if (req.session.rowId) {
    try {
      const patient = await PR_patientReg.findByPk(req.session.rowId);
      
      if (patient) {
        if (patient.mr_no === req.session.mrNo) {
          const patient2 = id ? await PR_BillFindPatient.findByPk(decryptData(decodeURIComponent(id), "ll")) : null;

          if (id && !patient2) {
            req.session.alert = "No patient found for the provided ID.";
            return res.redirect('/findpatient/6');
          }

          // Render the page with the patient data and current date and time
          return res.render('PatientRegistration/PBM-bill-details', {
            patient: patient,
            patient2: patient2 || "",
            currentDate: currentDate,
            currentTime: currentTime
          });
        } else {
          req.session.alert = "Mismatch in patient MR number.";
          return res.redirect('/findpatient/6');
        }
      } else {
        // Handle case where no patient is found for the given id
        return res.redirect('/findpatient/6');
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
      return res.status(500).send('Internal Server Error');
    }
  } else {
    // Redirect if no rowId is in the session and no ID is provided
    return res.redirect('/findpatient/6');
  }
});



router.get('/getpatientBills', getpatientBills)

router.get('/reloadState', (req, res) => {
  console.log('1');
  fs.readFile(path.join(__dirname, '../myjson', 'State.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the file');
      return;
    }
    res.send(data);
  });
});
router.get('/reloadSpec', (req, res) => {
  console.log('1');
  fs.readFile(path.join(__dirname, '../myjson', 'Spec.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the file');
      return;
    }
    res.send(data);
  });
});
router.get('/reloadCity', (req, res) => {
  console.log('1');
  fs.readFile(path.join(__dirname, '../myjson', 'City.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the file');
      return;
    }
    res.send(data);
  });
});

// Get Routes
router.get('/getAppointmentData/', AppointmentData);
router.get('/getFieldValues', async (req, res) => {
  const { tableName, fieldName } = req.query;

  if (!tableName || !fieldName) {
    return res.status(400).json({ msg: 'Invalid parameters' });
  }

  try {
    const query = `SELECT DISTINCT ${fieldName} as value FROM ${tableName}`;
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching field values:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

router.get('/filter-data', async (req, res) => {
  console.log('1');
  try {
    const { table, limit, offset, sortby, ...filters } = req.query;
    console.log(table);
    // Dynamically select the model based on the 'table' parameter
    const Model = require('../models/PatientReg')[table];
    console.log(Model);
    if (!Model) {
      return res.status(400).json({ message: 'Invalid table name' });
    }
    console.log('bharat Singnpx');
    console.log(sortby);
    // Construct Sequelize filters
    let sequelizeFilters = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        sequelizeFilters[key] = { [Op.like]: `%${value}%` };
      }
    }

    const options = {
      where: sequelizeFilters,
      limit: limit ? parseInt(limit) : 10,
      offset: offset ? parseInt(offset) : 0,
      order: sortby ? [[sortby, 'ASC']] : [], // Default ordering
    };

    // Fetch data from the specified table
    const data = await Model.findAndCountAll(options);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data' });
  }
});

// Add this route to your existing router code
router.get('/getRowId', (req, res) => {
  if (req.session.rowId) {
    res.status(200).json({ rowId: req.session.rowId });
  } else {
    res.status(404).json({ message: 'No row ID found in session' });
  }
});

router.get('/getAppointments', async (req, res) => {
  try {
      const mrNo = req.query.mrNo;
      const currentDate = new Date();

      if (!mrNo) {
          return res.status(400).json({ message: "MR No is required" });
      }

      // Fetch all appointments related to the MR No
      const appointments = await PR_Appointment.findAll({
          where: { 
              mrNo: mrNo 
          }
      });

      // Separate the appointments into past and future
      const pastAppointments = appointments.filter(app => new Date(app.appointment_date) < currentDate);
      const futureAppointments = appointments.filter(app => new Date(app.appointment_date) > currentDate);

      res.json({ pastAppointments, futureAppointments });

  } catch (error) {
      console.error('Failed to fetch appointments:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.get('/clinics', async (req, res) => {
  try {
      const [clinics, metadata] = await sequelize.query(
          "SELECT clinic_id, clinic_desc FROM clinicconfigurations",
          { type: sequelize.QueryTypes.SELECT }
      );
      console.log(clinics+"jkl");  // Check what is actually being returned here
      res.json(clinics);
  } catch (error) {
      console.error('Failed to fetch clinics:', error);
      res.status(500).send('Internal Server Error');
  }
});


router.get('/departments', async (req, res) => {
  const { clinicId } = req.query;
  console.log(clinicId)
  try {
      const departments = await sequelize.query(
          "SELECT dept_code, dept_desc,dept_sub_spec FROM departments WHERE clinic_id = :clinicId",
          { 
              replacements: { clinicId: clinicId },
              type: sequelize.QueryTypes.SELECT ,
          }
      );
      console.log(departments)
      res.json(departments);
  } catch (error) {
      console.error('Failed to fetch departments:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/doctors', async (req, res) => {
  const { clinicId, departmentSubSpec } = req.query;
  try {
      // Split the departmentSubSpec into an array of specs
      const specs = departmentSubSpec.split(',').map(spec => spec.trim());

      // Query to select all doctors that match the clinicId
      const doctors = await sequelize.query(
          `SELECT id, doc_name, doc_spec FROM doctor WHERE clinic_id = :clinicId`,
          { replacements: { clinicId: clinicId }, type: sequelize.QueryTypes.SELECT }
      );

      // Filter doctors whose spec matches any of the specs in departmentSubSpec
      const matchedDoctors = doctors.filter(doctor => 
          specs.some(spec => doctor.doc_spec.includes(spec))
      );

      res.json(matchedDoctors);
  } catch (error) {
      console.error('Failed to fetch doctors:', error);
      res.status(500).send('Internal Server Error');
  }
});


router.get('/patientVisits', async (req, res) => {
  const { mr_no } = req.query;

  try {
      // Step 1: Fetch all visits for the given mr_no
      const visits = await sequelize.query(
          "SELECT * FROM `pr_patientvisits` WHERE mrNo = :mr_no",
          {
              replacements: { mr_no },
              type: sequelize.QueryTypes.SELECT
          }
      );

      // Step 2: Iterate over each visit to replace doctor and department codes with names
      for (let visit of visits) {
          // Step 2.1: Get the doctor name using doctor id
          if (visit.doctor) {
              const doctorResult = await sequelize.query(
                  "SELECT doc_name FROM doctor WHERE id = :doctor",
                  {
                      replacements: { doctor: visit.doctor },
                      type: sequelize.QueryTypes.SELECT
                  }
              );
              if (doctorResult.length > 0) {
                  visit.doctor = doctorResult[0].doc_name; // Replace doctor code with doctor name
              }
          }

          // Step 2.2: Get the department description using department code
          if (visit.department) {
              const departmentResult = await sequelize.query(
                  "SELECT dept_desc FROM departments WHERE dept_code = :department",
                  {
                      replacements: { department: visit.department },
                      type: sequelize.QueryTypes.SELECT
                  }
              );
              if (departmentResult.length > 0) {
                  visit.department = departmentResult[0].dept_desc; // Replace department code with department description
              }
          }
      }

      // Step 3: Send the modified visits data as JSON
      res.json(visits);
  } catch (error) {
      console.error('Failed to fetch patient visits:', error);
      res.status(500).send('Internal Server Error');
  }
});


router.get('/patientData', async (req, res) => {
  try {
      // Fetch the patient data (adjust the query as needed)
      const patients = await sequelize.query(
          "SELECT firstName, dob,lastName,mr_no FROM `pr_patientreg`",
          {
              type: sequelize.QueryTypes.SELECT
          }
      );

      res.json(patients);
  } catch (error) {
      console.error('Failed to fetch patient data:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/get-service', async (req, res) => {
  try {
      const services = await sequelize.query('SELECT * FROM services', {
          type: sequelize.QueryTypes.SELECT
      });
      res.json(services);
  } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});




// Post Routes
router.post(
  '/patientRegistra',
  upload.fields([{ name: 'patientImg' },{name:'spouseImg'}]), // Ensure multer can handle this
  patientRagistration
);
router.post('/newAppointment', newAppointment);
router.post('/newvisit',newVisit)

router.post('/addReferralDoc', async (req, res) => {
  try {
    const {
      RD_firstName,
      RD_middleName,
      RD_lastName,
      RD_specialization,
      RD_doctorType,
      RD_gender,
      RD_contactNumber,
      RD_emailId,
      RD_address,
      RD_PanCard,
      RD_id_proof_type,
      RD_id_proof_number,
      RD_bank_name,
      RD_branch,
      RD_ifsc_code,
      RD_account_no,
      RD_account_holder,
    } = req.body;

    // Check for duplicate email
    const existingDoc = await PR_ReferralDoc.findOne({
      where: { emailId: RD_emailId },
    });

    if (existingDoc) {
      return res.status(400).json({ message: 'Email ID already exists' });
    }

    // Create new referral doc
    const newDoc = await PR_ReferralDoc.create({
      firstName: RD_firstName,
      middleName: RD_middleName,
      lastName: RD_lastName,
      specialization: RD_specialization,
      doctorType: RD_doctorType,
      gender: RD_gender,
      contactNumber: RD_contactNumber,
      emailId: RD_emailId,
      address: RD_address,
      PanCard: RD_PanCard,
      id_proof_type: RD_id_proof_type,
      id_proof_number: RD_id_proof_number,
      bank_name: RD_bank_name,
      branch: RD_branch,
      ifsc_code: RD_ifsc_code,
      account_no: RD_account_no,
      account_holder: RD_account_holder,
    });

    res
      .status(201)
      .json({ message: 'Referral doctor added successfully', data: newDoc });
  } catch (error) {
    console.error('Error adding referral doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/storeRowId', (req, res) => {
  const { rowId } = req.body;
  req.session.rowId = rowId;
  res.send({ message: 'Row ID stored in session', rowId: req.session.rowId });
});

router.post('/submitCoupleData', newCouple);
router.post('/billPatientSubmit',billPatientSubmit)




router.post('/save-status-data',SaveStatusData);
module.exports = router;
