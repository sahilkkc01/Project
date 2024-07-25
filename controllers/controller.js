const { KYC, kycReports,CrmFu_record, CrmApt_record, CrmVis_record, CrmConv_record,Admin } = require('../models/Kyc');
const { bankBranchMaster, Designation, EmrCC, EmrFieldvalue, RegionMaster, SubSpecialization } = require('../models/clinicConfig');
const { CashCounterMaster } = require('../models/clinicConfig');
const { Classification } = require('../models/clinicConfig');
const { ClinicConfiguration } = require('../models/clinicConfig');
const { Country, State, City } = require('../models/clinicConfig');
const { Department } = require('../models/clinicConfig');
const { DocCatMaster } = require('../models/clinicConfig');
const { Doctor } = require('../models/clinicConfig');
const {PrimarySymptoms} = require('../models/clinicConfig');
var path = require('path');
const md5 = require('md5')




const kycCtrl = async (req, res) => {
  try {
    // Check if it's a modification query
    if (req.body.modQuery === '1') {
      const { lead_no, contact_no_husband, email_id, whatsapp_no, lead_owner, address } = req.body;

      // Update existing KYC entry
      const result = await KYC.update({
        contact_no_husband,
        whatsapp_no,
        email_id,
        address,
        lead_owner
      }, {
        where: {
          lead_no: lead_no
        }
      });

      // Check if any rows were updated
      if (result[0] === 0) {
        return res.json({ success: false, msg: 'No data found to update.' });
      } else {
        return res.json({ success: true,msg:'Updated Succesfully' });
      }
    }

    // New KYC entry creation
    const { lead_no, ...rest } = req.body;

    // Check if lead_no is provided
    if (!lead_no) {
      return res.status(400).json({ msg: "Lead number is required" });
    }

    // Check if lead_no already exists
    const existingKYC = await KYC.findOne({ where: { lead_no } });
    if (existingKYC) {
      return res.status(400).json({ msg: "Lead number already exists" });
    }

    // Create new KYC entry
    const newKYC = await KYC.create({ lead_no, ...rest });

    // Handle uploaded reports

    const reports = req.files.map(file => ({
      report: path.basename(file.path),
      remark: req.body[`remark${file.fieldname.slice(6)}`] || ''
    }));

    // Save reports to database
    for (const { report, remark } of reports) {
      await kycReports.create({
        kyc_id: newKYC.id,  
        lead_no,
        report,
        remark
      });
    }

    // Log and respond
    console.log('KYC entry created:', newKYC);
    return res.status(200).json({ msg: "Form saved successfully" });

  } catch (error) {
    console.error('Error in /kycreg:', error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
// Bank Branch Master Controller
const bankBranchMasterCtrl = async (req, res) => {
  try {
    const existing = await bankBranchMaster.findOne({ bank_branch_m_code: req.body.bank_branch_m_code });
    if (existing) {
        return res.status(400).send({ msg: 'Clinic code already exists.' });
    }

    const bankBranch = new bankBranchMaster(req.body);
    await bankBranch.save();
    res.status(200).json({ message: 'Bank branch details saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving bank branch details.' });
  }
};

const modifyApt= async (req, res) => {
  try {
    console.log('99',req.body)
    // Extract data from request body
    const { apt_id,apt_status} = req.body;

    // Update the data in the database
    const result = await CrmApt_record.update({
     
     apt_status
    }, {
      where: {
        id: apt_id
      }
    });

    if (result[0] === 0) {
      // No rows updated, maybe the ID was not found
      res.json({ success: false, msg: 'No data found to update.' });
    } else {
      // Successfully updated
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}

// Cash Counter Master Controller
const cashCounterMasterCtrl = async (req, res) => {
  try {
    
    const existing = await CashCounterMaster.findOne({ cash_counter_master_code: req.body.cash_counter_master_code});
    if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
    }

    const cashCounter = new CashCounterMaster(req.body);
    await cashCounter.save();
    res.status(200).json({ message: 'Cash Counter details saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving cash counter details.' });
  }
};

// Classification Controller
const classificationCtrl = async (req, res) => {
  try {

    const existing = await Classification.findOne({ classification_code: req.body.classification_code});
    if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
    }


    const classification = new Classification(req.body);
    await classification.save();
    res.status(200).json({ message: 'Classification details saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving classification details.' });
  }
};


//getClassification
const getClassification=  async (req, res) => {
    try {
      const details = await Classification.find(); // Assuming Classification is your Mongoose model
      res.status(200).json(details);

    } catch (error) {
      console.error('Error fetching classification details:', error);
      res.status(500).json({ error: 'An error occurred while fetching classification details.' });
    }
  } 


// Clinic Configuration Controller
    const clinicConfigCtrl = async (req, res) => {
        try {
            // Check if clinic_code already exists
            const existingConfig = await ClinicConfiguration.findOne({ clinic_code: req.body.clinic_code });
            if (existingConfig) {
                return res.status(400).send({ msg: 'Clinic code already exists.' });
            }
    
            // If not, proceed to save the new clinic configuration
            const clinicConfig = new ClinicConfiguration(req.body);
            await clinicConfig.save();
            res.status(200).json({ message: 'Clinic Configuration details saved successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while saving clinic configuration details.' });
        }
    };

// Country Controller
const getCountry = async (req, res) => {
  try {
    const countries = await Country.find({}, 'country_id');
    const countryIds = countries.map(country => country.country_id);
    res.status(200).json(countryIds);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching countries.' });
  }
};

// State Controller
const getState = async (req, res) => {
  try {
    const { countryId } = req.query;
    const states = await State.find({ countryId: countryId }).select({ _id: 0 });
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching states.' });
  }
};

// City Controller
const getCity = async (req, res) => {
  try {
    const { stateId } = req.query;
    const cityDoc = await City.findOne({ [stateId]: { $exists: true } });
    const cities = cityDoc[stateId];
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching cities.' });
  }
};

// Department Controller
const departmentCtrl = async (req, res) => {
  try {
    const dept = new Department(req.body);
    await dept.save();
    res.status(200).json({ message: 'Department Details saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving department details.' });
  }
};

// Doc Cat Master Controller
const docCatCtrl = async (req, res) => {
  try {
    const docCat = new DocCatMaster(req.body);
    await docCat.save();
    res.status(200).json({ message: 'Doc Cat details saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving doc cat details.' });
  }
};

const getDocCat = async (req, res) => {
    try {
        const details = await DocCatMaster.find({}); 
        console.log(details)
        res.status(200).json(details);
  
      } catch (error) {
        console.error('Error fetching classification details:', error);
        res.status(500).json({ error: 'An error occurred while fetching classification details.' });
      }
  };

  const docInfoCtrl = async (req, res) => {
    try {
      const doc = new Doctor(req.body);
      
      await doc.save();
      console.log(doc);
      res.status(200).json({ message: 'Doctor  details saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving doc cat details.' });
    }
  };

  const getDocinfo = async (req, res) => {
    try {
        const details = await Doctor.find({}); 
        console.log(details)
        res.status(200).json(details);
  
      } catch (error) {
        console.error('Error fetching classification details:', error);
        res.status(500).json({ error: 'An error occurred while fetching classification details.' });
      }
  };

  const getDesginfo = async (req, res) => {
    try {
        const details = await Designation.find({}); 
        console.log(details)
        res.status(200).json(details);
  
      } catch (error) {
        console.error('Error fetching classification details:', error);
        res.status(500).json({ error: 'An error occurred while fetching classification details.' });
      }
  };

  const emrCCCtrl = async (req, res) => {
    try {
      const existing = await EmrCC.findOne({ emrCC_code: req.body.emrCC_code });
      if (existing) {
          return res.status(400).send({ msg: 'Code already exists.' });
      }
  
      const emr = new EmrCC(req.body);
      await emr.save();
      res.status(200).json({ message: 'EMR details saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving bank branch details.' });
    }
  };

  const emrfieldCtrl = async (req, res) => {
    try {
      const existing = await EmrFieldvalue.findOne({ emr_fv_code: req.body.emr_fv_code });
      if (existing) {
          return res.status(400).send({ msg: 'Code already exists.' });
      }
  
      const emr = new EmrFieldvalue(req.body);
      await emr.save();
      res.status(200).json({ message: 'EMR Field details saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving bank branch details.' });
    }
  };

  
  const getEmrInfo = async (req, res) => {
    try {
        const details = await EmrCC.find({}); 
        res.status(200).json(details);
  
      } catch (error) {
        console.error('Error fetching classification details:', error);
        res.status(500).json({ error: 'An error occurred while fetching classification details.' });
      }
  };
  
  const getEmrFieldInfo = async (req, res) => {
    try {
        const details = await EmrFieldvalue.find({}); 
        res.status(200).json(details);
  
      } catch (error) {
        console.error('Error fetching classification details:', error);
        res.status(500).json({ error: 'An error occurred while fetching classification details.' });
      }
  };

  const primSympCtrl = async (req, res) => {
  
    try {
      const existing = await PrimarySymptoms.findOne({ prim_symp_code: req.body.prim_symp_code });
      if (existing) {
          return res.status(400).send({ msg: 'Code already exists.' });
      }
  
      const symp = new PrimarySymptoms(req.body);
      await symp.save();
      res.status(200).json({ message: 'Primary Symptoms saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving bank branch details.' });
    }
  };

  const getPrimSymp = async (req, res) => {
    try {
        const details = await PrimarySymptoms.find({}); 
        res.status(200).json(details);
  
      } catch (error) {
        console.error('Error fetching classification details:', error);
        res.status(500).json({ error: 'An error occurred while fetching classification details.' });
      }
  };

  const regMasterCtrl = async (req, res) => {
    try {
      const existing = await RegionMaster.findOne({ region_m_code: req.body.region_m_code });
      if (existing) {
          return res.status(400).send({ msg: 'Code already exists.' });
      }
  
      const regMas = new RegionMaster(req.body);
      await regMas.save();
      res.status(200).json({ message: 'Primary Symptoms saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving bank branch details.' });
    }
  };

  const getRegion= async (req, res) => {
    try {
        const details = await RegionMaster.find({}); 
        console.log(details)
        res.status(200).json(details);
  
      } catch (error) {
        console.error('Error fetching classification details:', error);
        res.status(500).json({ error: 'An error occurred while fetching classification details.' });
      }
  };

   const subSpecCtrl = async (req, res) => {
    try {
      const existing = await SubSpecialization.findOne({ sub_spec_code: req.body.sub_spec_code});
      if (existing) {
          return res.status(400).send({ msg: 'Code already exists.' });
      }
  
      const subSpec = new SubSpecialization(req.body);
      await subSpec.save();
      res.status(200).json({ message: 'Sub Specialixation saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving bank branch details.' });
    }
  };
  const Sequelize = require('sequelize');


 // Adjust the path as needed
  
 const dashboardCtrl = async (req, res) => {
  try {
    const kycCount = await KYC.count();
    const apt = await CrmApt_record.count();
    const visits = await CrmVis_record.count();
    const conv = await CrmConv_record.count();

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Fetch clinic areas
    const areas = await ClinicConfiguration.findAll({
      attributes: ['clinic_area']
    });

    // Fetch count of appointments grouped by clinic and month of creation for the current year
    const aptCounts = await CrmApt_record.findAll({
      attributes: [
        'clinic',
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m'), 'monthYear'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'areasaptcount']
      ],
      where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), currentYear),
      group: ['clinic', 'monthYear']
    });

    // Debugging: Log fetched counts
    console.log('Appointment Counts:', aptCounts.map(record => record.toJSON()));

    // Convert aptCounts to a map for easy lookup
    const aptCountMap = aptCounts.reduce((acc, record) => {
      const clinic = record.dataValues.clinic;
      const monthYear = record.dataValues.monthYear;
      const count = parseInt(record.dataValues.areasaptcount, 10);

      if (!acc[clinic]) {
        acc[clinic] = {};
      }
      acc[clinic][monthYear] = isNaN(count) ? 0 : count; // Default to 0 if NaN
      return acc;
    }, {});

    // Debugging: Log map of appointment counts
    console.log('Appointment Count Map:', aptCountMap);

    // Debugging: Log clinic areas
    console.log('Clinic Areas:', areas.map(area => area.toJSON()));

    // Prepare data for each area
    const areasWithCount = areas.map(area => {
      const areaData = {
        clinic_area: area.dataValues.clinic_area,
        appointmentCounts: []
      };

      // Fill in counts for each month of the current year
      for (let month = 1; month <= 12; month++) {
        const monthYear = `${currentYear}-${month.toString().padStart(2, '0')}`;
        const count = (aptCountMap[area.dataValues.clinic_area] && aptCountMap[area.dataValues.clinic_area][monthYear]) || 0;
        areaData.appointmentCounts.push({ monthYear, count });
      }

      return areaData;
    });

    // Debugging: Log areas with counts
    console.log('Areas with Counts:', areasWithCount);

    res.render('dashboard', { leads: kycCount, apt, visits, conv, areas: areasWithCount });
  } catch (error) {
    console.error('Error counting records:', error);
    res.status(500).send('Internal Server Error');
  }
};





const modifyVisit=async (req, res) => {
  try {
    console.log('99', req.body);
    // Extract data from request body
    const { vis_id, visited_status, remark, next_call } = req.body;

    // Fetch the existing row based on vis_id
    const existingRecord = await CrmVis_record.findOne({
      where: {
        id: vis_id
      }
    });

    if (!existingRecord) {
      // No row found for the given ID
      return res.json({ success: false, msg: 'No data found to update.' });
    }

    // Update the existing row with the new data
    const result = await CrmVis_record.update({
      visited_status,
      remark,
      next_call,
    }, {
      where: {
        id: vis_id
      }
    });

    if (result[0] === 0) {
      // No rows updated, maybe the ID was not found
      return res.json({ success: false, msg: 'No data found to update.' });
    }

    // If remark is not empty, create a new entry
    if (remark && remark.trim() !== '') {
      const newEntryData = {
        kyc_id:existingRecord.kyc_id,
        uhid_no: existingRecord.uhid_no,
        apt_date: existingRecord.apt_date,
        doctor: existingRecord.doctor,
        clinic: existingRecord.clinic,
        treatment: existingRecord.treatment,
        package: existingRecord.package,
        visited_status: '', // Set to blank
        remark: '', // Set to blank
        next_call: null // Set to blank
      };

      // Create the new entry
      await CrmVis_record.create(newEntryData);
    }

    // Successfully updated
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}


const apt1=  async (req, res) => {
  console.log(req.body);
  const { lead_input1 } = req.body;

  try {
    if (lead_input1 === '') {
      return res.status(400).json({ msg: "Fill side form" });
    }

    // Find the KYC record by lead_input1
    const existingKYC = await KYC.findOne({ where: { lead_no:lead_input1 } });

    
    if (existingKYC) {
      // Extract kycId from the found KYC record
      const kyc_id = existingKYC.id;

     
      const dataToSave = { ...req.body, kyc_id };
      console.log(dataToSave)

     
      await CrmFu_record.create(dataToSave);
      const records = await CrmFu_record.findAll({ where: { kyc_id } });
      console.log(records)
      return res.status(200).json({data:records}); // Return the newly created KYC record
    } else {
      // KYC record does not exist, return error
      return res.status(404).json({ msg: 'KYC record not found' });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

const apt2= async (req, res) => {
  console.log('req body',req.body);
  const { lead_input2 } = req.body;

  try {
    if (lead_input2 === '') {
      return res.status(400).json({ msg: "Fill side form" });
    }

    // Find the KYC record by lead_input1
    const existingKYC = await KYC.findOne({ where: { lead_no:lead_input2 } });

    console.log(existingKYC)
    if (existingKYC) {
      // Extract kycId from the found KYC record
      const kyc_id = existingKYC.id;

     
      const dataToSave = { ...req.body, kyc_id };
      console.log(dataToSave)

      // Create a new KYC record with the data
    const newRecord =  await CrmApt_record.create(dataToSave);
      const records = await CrmApt_record.findAll({ where: { kyc_id } });
      console.log(records)
      // records.reverse()
      return res.status(200).json({data:records,id: newRecord.id}); // Return the newly created KYC record
    } else {
      // KYC record does not exist, return error
      return res.status(404).json({ msg: 'KYC record not found' });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

const apt3= async (req, res) => {
  console.log(req.body);
  const { lead_input3 ,councelor} = req.body;

  try {
    if (lead_input3 == '') {
      return res.status(400).json({ msg: "Fill side form" });
    }

    // Find the KYC record by lead_input1
    const existingKYC = await KYC.findOne({ where: { lead_no:lead_input3 } });

    
    if (existingKYC) {
      // Extract kycId from the found KYC record
      const kyc_id = existingKYC.id;
      existingKYC.lead_owner=councelor;
      existingKYC.save();
     
      const dataToSave = { ...req.body, kyc_id };
      console.log(dataToSave)

      const newRecord =await CrmVis_record.create(dataToSave);
      const records = await CrmVis_record.findAll({ where: { kyc_id } });
      console.log(records)
      return res.status(200).json({data:records,id:newRecord.id}); // Return the newly created KYC record
    } else {
      // KYC record does not exist, return error
      return res.status(404).json({ msg: 'KYC record not found' });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

const apt4=async (req, res) => {
  console.log(req.body);
  const { lead_input4 } = req.body;

  try {
    if (lead_input4 == '') {
      return res.status(400).json({ msg: "Fill side form" });
    }

    // Find the KYC record by lead_input1
    const existingKYC = await KYC.findOne({ where: { lead_no:lead_input4} });

    
    if (existingKYC) {
      // Extract kycId from the found KYC record
      const kyc_id = existingKYC.id;

     
      const dataToSave = { ...req.body, kyc_id };
      console.log(dataToSave)

      const newRecord =await CrmConv_record.create(dataToSave);
      const records = await CrmConv_record.findAll({ where: { kyc_id } });
      console.log(records)
      return res.status(200).json({data:records,id:newRecord.id}); // Return the newly created KYC record
    } else {
      // KYC record does not exist, return error
      return res.status(404).json({ msg: 'KYC record not found' });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

const login =async (req, res) => {
  const {userEmail, userPassword } = req.body;
 console.log(req.body)
  try {
      const user = await Admin.findOne({ where: { userEmail } });
      if (!user) {
          return res.status(404).json({ msg: 'Admin not found' });
      }
console.log(user)
      const inputPasswordHash = md5(userPassword);
      console.log(inputPasswordHash)
      if (user.userPassword !== inputPasswordHash) {
        
        // console.log(inputPasswordHash)
          return res.status(401).json({ msg: 'Invalid username or password' });
      }

      req.session.user = {
        id: user.userId,
        userEmail: user.userEmail,
        userPassword: user.userPassword,
        clinicId:user.clinicId,
        userName:user.userName
      };
      const name = req.session.user.userName;
      req.session.save()
      // console.log(req.session.user)
      res.status(200).json({ msg: 'Login successful',name:name });
      // res.render('form-new')
      
      
  } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ msg: 'Error authenticating user' });
  }
}

const register = async (req, res) => {
  console.log(req.body)
  const { userEmail, userPassword } = req.body;

  try {
      const existingUser = await Admin.findOne({ where: { userEmail } });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
      }

      const passwordHash = md5(userPassword);
      await Admin.create({ userEmail, userPassword: passwordHash });

      res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user' });
  }
}

const logout= (req, res) => {
  console.log('1')
  req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ msg: 'Error logging out' });
      }
      res.clearCookie('connect.sid'); // Clear the session cookie manually
      res.status(200).json({ msg: 'Logout successful' });
  });
}

module.exports = {
  bankBranchMasterCtrl,
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
  kycCtrl,
  dashboardCtrl,
  modifyApt,
  modifyVisit,
  apt1,
  apt2,
  apt3,
  apt4,
  login,
  register,
  logout

};
