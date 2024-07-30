const fs = require('fs');
const path = require('path');
const multer = require('multer')
const CryptoJS = require('crypto-js');
function encryptDataForUrl(data) {
  const secretKey = 'll'; // Replace with your actual secret key
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  const encodedEncrypted = encodeURIComponent(encrypted);
  return encodedEncrypted;
}

const { 
  BankBranchMaster, 
  Designation, 
  EmrCC, 
  EmrFieldvalue, 
  RegionMaster, 
  SubSpecialization, 
  CashCounterMaster, 
  Classification, 
  ClinicConfiguration, 
  Country, 
  State, 
  CityMaster, 
  Department, 
  DocCatMaster, 
  Doctor, 
  PrimarySymptoms, 
  Clinic_name,
  Specialization,
  Cluster,
  Employee,
  BankMaster,
  CountryMaster,
  StateMaster,
  Source
} = require('../models/clinicConfig');

//saving photo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Adjust the folder as necessary
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


// Bank Branch Master Controller
const bankBranchMasterCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await BankBranchMaster.findOne({ where: { bank_branch_m_code: req.body.bank_branch_m_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const bankBranch = await BankBranchMaster.create(req.body);
      return res.status(200).json({ msg: 'Bank branch details saved successfully!', data: bankBranch });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await BankBranchMaster.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Bank branch not found.' });
      }

      // Check if new bank_branch_m_code exists for another bank branch master
      if (req.body.bank_branch_m_code && req.body.bank_branch_m_code !== existing.bank_branch_m_code) {
        const codeExists = await BankBranchMaster.findOne({ where: { bank_branch_m_code: req.body.bank_branch_m_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Bank branch details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      return res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving bank branch details:', error);
    return res.status(500).json({ msg: 'An error occurred while saving bank branch details.' });
  }
};


const clusturCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await Cluster.findOne({ where: { clus_code: req.body.clus_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const clus = await Cluster.create(req.body);
      return res.status(200).json({ msg: 'Cluster details saved successfully!', data: clus });

    // Check if query parameter is '1' (update existing data)
    } else  {
      const existing = await Cluster.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Cluster not found.' });
      }

      // Check if new clus_code exists for another cluster
      if (req.body.clus_code && req.body.clus_code !== existing.clus_code) {
        const codeExists = await Cluster.findOne({ where: { clus_code: req.body.clus_code } });
        
        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Cluster details updated successfully!', data: existing });
    }

    // If query parameter is neither '0' nor '1'
    res.status(400).json({ msg: 'Invalid query parameter.' });

  } catch (error) {
    console.error('Error saving cluster details:', error);
    res.status(500).json({ msg: 'An error occurred while saving cluster details.' });
  }
};

const desgCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await Designation.findOne({ where: { desg_code: req.body.desg_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const desg = await Designation.create(req.body);
      return res.status(200).json({ msg: 'Details saved successfully!', data: desg });

    // Check if query parameter is '1' (update existing data)
    } else{
      const existing = await Designation.findOne({ where: { id: req.body.itemid } });

      // Check if new desg_code exists for another designation
      if (req.body.desg_code && req.body.desg_code !== existing.desg_code) {
        const codeExists = await Designation.findOne({ where: { desg_code: req.body.desg_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Details updated successfully!', data: existing });
    }


  } catch (error) {
    console.error('Error saving designation details:', error);
    res.status(500).json({ msg: 'An error occurred while saving designation details.' });
  }
};

const empCtrl = async (req, res) => {
  console.log('Request body:', req.body);
  const file = req.files;

  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existingEmp = await Employee.findOne({ where: { emp_number: req.body.emp_number } });

      if (existingEmp) {
        return res.status(400).send({ msg: 'Employee number already exists.' });
      }

      const existingPan = await Employee.findOne({ where: { emp_pan_number: req.body.emp_pan_number } });

      if (existingPan) {
        return res.status(400).send({ msg: 'PAN number already exists.' });
      }

      const empData = {
        ...req.body,
        emp_image: req.file ? path.basename(req.file.path) : null
      };
      const emp = await Employee.create(empData);
      return res.status(200).json({ msg: 'Employee details saved successfully!', data: emp });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existingEmp = await Employee.findOne({ where: { id: req.body.itemid } });

      if (!existingEmp) {
        return res.status(404).send({ msg: 'Employee not found.' });
      }

      // Check if new emp_pan_number exists for another employee
      if (req.body.emp_pan_number && req.body.emp_pan_number !== existingEmp.emp_pan_number) {
        const panExists = await Employee.findOne({ where: { emp_pan_number: req.body.emp_pan_number } });

        if (panExists) {
          return res.status(400).send({ msg: 'PAN number already exists.' });
        }
      }

      const empData = {
        ...req.body,
        emp_image: req.file ? path.basename(req.file.path) : existingEmp.emp_image // Store only the file name
      };

      await existingEmp.update(empData);
      return res.status(200).json({ msg: 'Employee details updated successfully!', data: existingEmp });

    // If query parameter is neither '0' nor '1'
    } else {
      res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving employee details:', error);
    res.status(500).json({ msg: 'An error occurred while saving employee details.' });
  }
};

module.exports = empCtrl;


// Cash Counter Master Controller
const cashCounterMasterCtrl = async (req, res) => {
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await CashCounterMaster.findOne({ where: { cash_counter_master_code: req.body.cash_counter_master_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const cashCounter = await CashCounterMaster.create(req.body);
      return res.status(200).json({ msg: 'Cash Counter details saved successfully!', data: cashCounter });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await CashCounterMaster.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Cash Counter not found.' });
      }

      // Check if new cash_counter_master_code exists for another cash counter master
      if (req.body.cash_counter_master_code && req.body.cash_counter_master_code !== existing.cash_counter_master_code) {
        const codeExists = await CashCounterMaster.findOne({ where: { cash_counter_master_code: req.body.cash_counter_master_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Cash Counter details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      return res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving cash counter details:', error);
    return res.status(500).json({ msg: 'An error occurred while saving cash counter details.' });
  }
};


// Classification Controller
const classificationCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await Classification.findOne({ where: { classification_code: req.body.classification_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const classification = await Classification.create(req.body);
      return res.status(200).json({ msg: 'Classification details saved successfully!', data: classification });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await Classification.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Classification not found.' });
      }

      // Check if new classification_code exists for another classification
      if (req.body.classification_code && req.body.classification_code !== existing.classification_code) {
        const codeExists = await Classification.findOne({ where: { classification_code: req.body.classification_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Classification details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving classification details:', error);
    res.status(500).json({ msg: 'An error occurred while saving classification details.' });
  }
};


// Get all Classification
const getClassification = async (req, res) => {
  try {
    const classifications = await Classification.findAll();

    // Encrypt the ID for each classification
    const encryptedClassifications = classifications.map(classification => {
      const encryptedId = encryptDataForUrl(classification.id.toString());
      return {
        ...classification.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedClassifications);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching classification details.' });
  }
};
const getClustur = async (req, res) => {
  try {
    const clus = await Cluster.findAll();

    // Encrypt the ID for each cluster
    const encryptedClus = clus.map(cluster => {
      const encryptedId = encryptDataForUrl(cluster.id.toString());
      return {
        ...cluster.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedClus);
  } catch (error) {
    console.error('Error fetching cluster details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching cluster details.' });
  }
};

const getClinic = async (req, res) => {
  try {
    const clinics = await ClinicConfiguration.findAll();

    // Encrypt the ID for each clinic
    const encryptedClinics = clinics.map(clinic => {
      const encryptedId = encryptDataForUrl(clinic.id.toString());
      return {
        ...clinic.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedClinics);
  } catch (error) {
    console.error('Error fetching clinic details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching clinic details.' });
  }
};


// Clinic Configuration Controller
const clinicConfigCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existingConfig = await ClinicConfiguration.findOne({ where: { clinic_code: req.body.clinic_code } });

      if (existingConfig) {
        return res.status(400).send({ msg: 'Clinic code already exists.' });
      }

      const clinicConfig = await ClinicConfiguration.create(req.body);
      return res.status(200).json({ msg: 'Clinic Configuration details saved successfully!', data: clinicConfig });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existingConfig = await ClinicConfiguration.findOne({ where: { id: req.body.itemid } });

      // Check if new clinic_code exists for another clinic configuration
      if (req.body.clinic_code && req.body.clinic_code !== existingConfig.clinic_code) {
        const codeExists = await ClinicConfiguration.findOne({ where: { clinic_code: req.body.clinic_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Clinic code already exists.' });
        }
      }

      await existingConfig.update(req.body);
      return res.status(200).json({ msg: 'Clinic Configuration details updated successfully!', data: existingConfig });

    } else {
      return res.status(400).send({ msg: 'Invalid query parameter.' });
    }

  } catch (error) {
    console.error('Error saving clinic configuration details:', error);
    res.status(500).json({ msg: 'An error occurred while saving clinic configuration details.' });
  }
};



// Country Controller
const getCountry = async (req, res) => {
  try {
    const countries = await Country.findAll({ attributes: ['country_id'] });
    const countryIds = countries.map(country => country.country_id);
    res.status(200).json(countryIds);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ msg: 'An error occurred while fetching countries.' });
  }
};

// State Controller
const getState = async (req, res) => {
  try {
    const { countryId } = req.query;
    const states = await State.findAll({ where: { countryId: countryId }, attributes: ['state_id'] });
    res.status(200).json(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ msg: 'An error occurred while fetching states.' });
  }
};

// City Controller
const getCity = async (req, res) => {
  try {
    const { stateId } = req.query;
    const cityDoc = await CityMaster.findOne({ where: { stateId: stateId } });
    const cities = cityDoc ? cityDoc[stateId] : [];
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ msg: 'An error occurred while fetching cities.' });
  }
};

//   Controller
const departmentCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await Department.findOne({ where: { dept_code: req.body.dept_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const dept = await Department.create(req.body);
      return res.status(200).json({ msg: 'Department details saved successfully!', data: dept });

    // Check if query parameter is '1' (update existing data)
    } else  {
      const existing = await Department.findOne({ where: { id: req.body.itemid } });

      // Check if new dept_code exists for another department
      if (req.body.dept_code && req.body.dept_code !== existing.dept_code) {
        const codeExists = await Department.findOne({ where: { dept_code: req.body.dept_code } });
        
        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
    }

 

  } catch (error) {
    console.error('Error saving department details:', error);
    res.status(500).json({ msg: 'An error occurred while saving department details.' });
  }
};

const CityMCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await CityMaster.findOne({ where: { city_master_code: req.body.city_master_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const city = await CityMaster.create(req.body);
      return res.status(200).json({ msg: 'City Master saved successfully!', data: city });

    // Check if query parameter is '1' (update existing data)
    } else  {
      const existing = await CityMaster.findOne({ where: { id: req.body.itemid } });

      // Check if new dept_code exists for another department
      if (req.body.city_master_code && req.body.city_master_code !== existing.city_master_code) {
        const codeExists = await CityMaster.findOne({ where: { city_master_code: req.body.city_master_code } });
        
        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'City Master updated successfully!', data: existing });
    }

 

  } catch (error) {
    console.error('Error saving department details:', error);
    res.status(500).json({ msg: 'An error occurred while saving department details.' });
  }
};


// Doc Cat Master Controller
const docCatCtrl = async (req, res) => {
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await DocCatMaster.findOne({ where: { doc_cat_master_code: req.body.doc_cat_master_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const docCat = await DocCatMaster.create(req.body);
      res.status(200).json({ msg: 'Doctor Category details saved successfully!', data: docCat });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await DocCatMaster.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Doctor Category not found.' });
      }

      // Check if new doc_cat_master_code exists for another DocCat
      if (req.body.doc_cat_master_code && req.body.doc_cat_master_code !== existing.doc_cat_master_code) {
        const codeExists = await DocCatMaster.findOne({ where: { doc_cat_master_code: req.body.doc_cat_master_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      res.status(200).json({ msg: 'Doctor Category details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      return res.status(400).json({ msg: 'Invalid query parameter.' });
    }

    // Save DocCat data to JSON file
    const data = await DocCatMaster.findAll();
    const filteredData = data.map(item => ({
      id: item.id,
      clinic_id: item.clinic_id,
      doc_cat_master_code: item.doc_cat_master_code,
      doc_cat_master_desc: item.doc_cat_master_desc
    }));
    const jsonString = JSON.stringify(filteredData, null, 2);
    const filePath = path.join(__dirname, '..', 'DocCat.json');

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
      } else {
        console.log('File has been created successfully');
      }
    });

  } catch (error) {
    console.error('Error saving doc cat details:', error);
    res.status(500).json({ msg: 'An error occurred while saving doc cat details.' });
  }
};




// Get all DocCatMaster
const getDocCat = async (req, res) => {
  try {
    const docCats = await DocCatMaster.findAll();

    // Encrypt the ID for each docCat
    const encryptedDocCats = docCats.map(docCat => {
      const encryptedId = encryptDataForUrl(docCat.id.toString());
      return {
        ...docCat.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedDocCats);
  } catch (error) {
    console.error('Error fetching doc cat details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching doc cat details.' });
  }
};


// Doctor Controller
const docInfoCtrl = async (req, res) => {
  
  console.log(req.body);
  const file = req.files;
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await Doctor.findOne({ where: { doc_pan_no: req.body.doc_pan_no } });

      if (existing) {
        return res.status(400).send({ msg: 'PAN number already exists.' });
      }

      const docData = {
        ...req.body,
        doc_photo: file.doc_photo ? file.doc_photo[0].path : null,
        doc_sign: file.doc_sign ? file.doc_sign[0].path : null,
      };

      const doc = await Doctor.create(docData);
      return res.status(200).json({ msg: 'Doctor details saved successfully!', data: doc });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await Doctor.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Doctor not found.' });
      }

      // Check if new doc_pan_no exists for another doctor
      if (req.body.doc_pan_no && req.body.doc_pan_no !== existing.doc_pan_no) {
        const panExists = await Doctor.findOne({ where: { doc_pan_no: req.body.doc_pan_no } });

        if (panExists) {
          return res.status(400).send({ msg: 'PAN number already exists.' });
        }
      }

      const docData = {
        ...req.body,
        imagePath: file ? file.path : existing.imagePath // keep existing path if no new file uploaded
      };

      await existing.update(docData);
      return res.status(200).json({ msg: 'Doctor details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving doctor details:', error);
    res.status(500).json({ msg: 'An error occurred while saving doctor details.' });
  }
}

// Get all Doctor
const getDocinfo = async (req, res) => {
  try {
    const docs = await Doctor.findAll();

    // Encrypt the ID for each doctor
    const encryptedDocs = docs.map(doc => {
      const encryptedId = encryptDataForUrl(doc.id.toString());
      return {
        ...doc.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedDocs);
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching doctor details.' });
  }
};


// Get all Designation
const getDesginfo = async (req, res) => {
  try {
    const designations = await Designation.findAll();

    // Encrypt the ID for each designation
    const encryptedDesignations = designations.map(designation => {
      const encryptedId = encryptDataForUrl(designation.id.toString());
      return {
        ...designation.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedDesignations);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
};

const getEmptinfo = async (req, res) => {
  try {
    const employees = await Employee.findAll();

    // Encrypt the ID for each employee
    const encryptedEmployees = employees.map(employee => {
      const encryptedId = encryptDataForUrl(employee.id.toString());
      return {
        ...employee.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedEmployees);
  } catch (error) {
    console.error('Error fetching employee details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching employee details.' });
  }
};

const getCityinfo = async (req, res) => {
  try {
    const cities = await CityMaster.findAll();

    // Encrypt the ID for each city
    const encryptedCities = cities.map(city => {
      const encryptedId = encryptDataForUrl(city.id.toString());
      return {
        ...city.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedCities);
  } catch (error) {
    console.error('Error fetching city details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching city details.' });
  }
};

const getDeptInfo = async (req, res) => {
  try {
    const depts = await Department.findAll();
    // console.log(depts)
    const encryptedDepts = depts.map(dept => {
      const encryptedId = encryptDataForUrl(dept.id.toString());
      return {
          ...dept.toJSON(),
          id: encryptedId,
      };
  });

  res.status(200).json(encryptedDepts);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
};


const getCashInfo = async (req, res) => {
  try {
    const cash = await CashCounterMaster.findAll();

    // Encrypt the ID for each cash counter
    const encryptedCash = cash.map(cashCounter => {
      const encryptedId = encryptDataForUrl(cashCounter.id.toString());
      return {
        ...cashCounter.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedCash);
  } catch (error) {
    console.error('Error fetching cash counter details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching cash counter details.' });
  }
};

const getSourceInfo = async (req, res) => {
  try {
    const src = await Source.findAll();
    res.status(200).json(src);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
};

// EmrCC Controller
const emrCCCtrl = async (req, res) => {
  console.log('111')
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await EmrCC.findOne({ where: { emrCC_code: req.body.emrCC_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const emr = await EmrCC.create(req.body);
      return res.status(200).json({ msg: 'EMR details saved successfully!', data: emr });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await EmrCC.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'EMR not found.' });
      }

      // Check if new emrCC_code exists for another EMR CC
      if (req.body.emrCC_code && req.body.emrCC_code !== existing.emrCC_code) {
        const codeExists = await EmrCC.findOne({ where: { emrCC_code: req.body.emrCC_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'EMR details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      return res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving EMR details:', error);
    return res.status(500).json({ msg: 'An error occurred while saving EMR details.' });
  }
};


// EmrFieldvalue Controller

const emrfieldCtrl = async (req, res) => {
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await EmrFieldvalue.findOne({ where: { emr_fv_code: req.body.emr_fv_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const emr = await EmrFieldvalue.create(req.body);
      return res.status(200).json({ msg: 'EMR Field details saved successfully!', data: emr });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await EmrFieldvalue.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'EMR Field not found.' });
      }

      // Check if new emr_fv_code exists for another EMR field value
      if (req.body.emr_fv_code && req.body.emr_fv_code !== existing.emr_fv_code) {
        const codeExists = await EmrFieldvalue.findOne({ where: { emr_fv_code: req.body.emr_fv_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'EMR Field details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      return res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving EMR Field details:', error);
    return res.status(500).json({ msg: 'An error occurred while saving EMR Field details.' });
  }
};


// Get all EmrCC
const getEmrInfo = async (req, res) => {
  try {
    const emrs = await EmrCC.findAll();

    // Encrypt the ID for each EMR record
    const encryptedEmrs = emrs.map(emr => {
      const encryptedId = encryptDataForUrl(emr.id.toString());
      return {
        ...emr.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedEmrs);
  } catch (error) {
    console.error('Error fetching EMR details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching EMR details.' });
  }
};


// Get all EmrFieldvalue
const getEmrFieldInfo = async (req, res) => {
  try {
    const emrFields = await EmrFieldvalue.findAll();

    // Encrypt the ID for each EMR Field record
    const encryptedEmrFields = emrFields.map(emrField => {
      const encryptedId = encryptDataForUrl(emrField.id.toString());
      return {
        ...emrField.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(encryptedEmrFields);
  } catch (error) {
    console.error('Error fetching EMR Field details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching EMR Field details.' });
  }
};


// Primary Symptoms Controller
const primSympCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await PrimarySymptoms.findOne({ where: { prim_symp_code: req.body.prim_symp_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const symp = await PrimarySymptoms.create(req.body);
      res.status(200).json({ msg: 'Primary Symptoms saved successfully!', data: symp });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await PrimarySymptoms.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Primary Symptoms not found.' });
      }

      // Check if new prim_symp_code exists for another primary symptom
      if (req.body.prim_symp_code && req.body.prim_symp_code !== existing.prim_symp_code) {
        const codeExists = await PrimarySymptoms.findOne({ where: { prim_symp_code: req.body.prim_symp_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      res.status(200).json({ msg: 'Primary Symptoms details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving primary symptoms details:', error);
    res.status(500).json({ msg: 'An error occurred while saving primary symptoms details.' });
  }
};

const bankMasterCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await BankMaster.findOne({ where: { bank_m_code: req.body.bank_m_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const bm = await BankMaster.create(req.body);
      return res.status(200).json({ msg: 'Bank branch saved successfully!', data: bm });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await BankMaster.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Bank branch not found.' });
      }

      // Check if new bank_m_code exists for another bank master
      if (req.body.bank_m_code && req.body.bank_m_code !== existing.bank_m_code) {
        const codeExists = await BankMaster.findOne({ where: { bank_m_code: req.body.bank_m_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Bank branch details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      return res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving bank branch details:', error);
    return res.status(500).json({ msg: 'An error occurred while saving bank branch details.' });
  }
};

const countMasterCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await CountryMaster.findOne({ where: { count_m_code: req.body.count_m_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const cm = await CountryMaster.create(req.body);
      return res.status(200).json({ msg: 'Country details saved successfully!', data: cm });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await CountryMaster.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Country not found.' });
      }

      // Check if new count_m_code exists for another country master
      if (req.body.count_m_code && req.body.count_m_code !== existing.count_m_code) {
        const codeExists = await CountryMaster.findOne({ where: { count_m_code: req.body.count_m_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Country details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      return res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving country details:', error);
    return res.status(500).json({ msg: 'An error occurred while saving country details.' });
  }
};
const stateMasterCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await StateMaster.findOne({ where: { state_m_code: req.body.state_m_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const sm = await StateMaster.create(req.body);
      return res.status(200).json({ msg: 'State details saved successfully!', data: sm });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await StateMaster.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'State not found.' });
      }

      // Check if new state_m_code exists for another state master
      if (req.body.state_m_code && req.body.state_m_code !== existing.state_m_code) {
        const codeExists = await StateMaster.findOne({ where: { state_m_code: req.body.state_m_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'State details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      return res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving state details:', error);
    return res.status(500).json({ msg: 'An error occurred while saving state details.' });
  }
};

// Get all Primary Symptoms
const getPrimSymp = async (req, res) => {
  try {
    const symptoms = await PrimarySymptoms.findAll();
    const encryptedSymptoms = symptoms.map(symptom => {
      const encryptedId = encryptDataForUrl(symptom.id.toString());
      return {
        ...symptom.toJSON(),
        id: encryptedId,
      };
    });
    res.status(200).json(encryptedSymptoms);
  } catch (error) {
    console.error('Error fetching primary symptoms details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching primary symptoms details.' });
  }
};

// Get all Bank Master records
const getBankMas = async (req, res) => {
  try {
    const bankMasters = await BankMaster.findAll();
    const encryptedBankMasters = bankMasters.map(bankMaster => {
      const encryptedId = encryptDataForUrl(bankMaster.id.toString());
      return {
        ...bankMaster.toJSON(),
        id: encryptedId,
      };
    });
    res.status(200).json(encryptedBankMasters);
  } catch (error) {
    console.error('Error fetching bank master details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching bank master details.' });
  }
};

// Get all Country Master records
const getCountMas = async (req, res) => {
  try {
    const countryMasters = await CountryMaster.findAll();
    const encryptedCountryMasters = countryMasters.map(countryMaster => {
      const encryptedId = encryptDataForUrl(countryMaster.id.toString());
      return {
        ...countryMaster.toJSON(),
        id: encryptedId,
      };
    });
    res.status(200).json(encryptedCountryMasters);
  } catch (error) {
    console.error('Error fetching country master details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching country master details.' });
  }
};

const getSpec = (req, res) => {
  console.log('Fetching specializations');
  fs.readFile(path.join(__dirname, '../myjson', 'spec.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      res.status(500).send('Error reading the file');
      return;
    }
    
    try {
      const spec = JSON.parse(data);
      const encryptedSpec = spec.map(spec => {
        const encryptedId = encryptDataForUrl(spec.id.toString());
        return {
          ...spec,
          id: encryptedId,
        };
      });
      res.status(200).json(encryptedSpec);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ msg: 'Error parsing JSON data.' });
    }
  });
};


const getSubSpec = (req, res) => {
  console.log('Fetching sub-specializations');
  fs.readFile(path.join(__dirname, '../myjson', 'subSpec.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      res.status(500).send('Error reading the file');
      return;
    }
    
    try {
      const subSpecs = JSON.parse(data);
      const selectedSpec = req.query.spec;
      const filteredSubSpecs = subSpecs.find(spec => spec.spec_desc === selectedSpec);
      res.status(200).json(filteredSubSpecs ? filteredSubSpecs.sub_spec_desc : []);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ msg: 'Error parsing JSON data.' });
    }
  });
};

// Get all State Master records
const getStateMas = async (req, res) => {
  try {
    const stateMasters = await StateMaster.findAll();
    const encryptedStateMasters = stateMasters.map(stateMaster => {
      const encryptedId = encryptDataForUrl(stateMaster.id.toString());
      return {
        ...stateMaster.toJSON(),
        id: encryptedId,
      };
    });
    res.status(200).json(encryptedStateMasters);
  } catch (error) {
    console.error('Error fetching state master details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching state master details.' });
  }
};

// Get all Bank Branch Master records
const getBankBMas = async (req, res) => {
  try {
    const bankBranchMasters = await BankBranchMaster.findAll();
    const encryptedBankBranchMasters = bankBranchMasters.map(bankBranchMaster => {
      const encryptedId = encryptDataForUrl(bankBranchMaster.id.toString());
      return {
        ...bankBranchMaster.toJSON(),
        id: encryptedId,
      };
    });
    res.status(200).json(encryptedBankBranchMasters);
  } catch (error) {
    console.error('Error fetching bank branch master details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching bank branch master details.' });
  }
};


// Region Master Controller
const regMasterCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await RegionMaster.findOne({ where: { region_m_code: req.body.region_m_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const regMas = await RegionMaster.create(req.body);
      return res.status(200).json({ msg: 'Region Master details saved successfully!', data: regMas });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await RegionMaster.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Region Master not found.' });
      }

      // Check if new region_m_code exists for another region master
      if (req.body.region_m_code && req.body.region_m_code !== existing.region_m_code) {
        const codeExists = await RegionMaster.findOne({ where: { region_m_code: req.body.region_m_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Region Master details updated successfully!', data: existing });

    // If query parameter is neither '0' nor '1'
    } else {
      return res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving region master details:', error);
    return res.status(500).json({ msg: 'An error occurred while saving region master details.' });
  }
};
  

// Get all Region Master
const getRegion = async (req, res) => {
  try {
    const regions = await RegionMaster.findAll();
    const encryptedRegions = regions.map(region => {
      const encryptedId = encryptDataForUrl(region.id.toString());
      return {
        ...region.toJSON(),
        id: encryptedId,
      };
    });
    res.status(200).json(encryptedRegions);
  } catch (error) {
    console.error('Error fetching region master details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching region master details.' });
  }
};


// Sub Specialization Controller
const subSpecCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await SubSpecialization.findOne({ where: { sub_spec_code: req.body.sub_spec_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const subSpec = await SubSpecialization.create(req.body);
      res.status(200).json({ msg: 'Sub Specialization saved successfully!', data: subSpec });

      // Save data to JSON file
      const data = await SubSpecialization.findAll();
      const filteredData = data.map(item => ({
        id: item.id,
        clinic_id: item.clinic_id,
        sub_spec_code: item.sub_spec_code,
        sub_spec_desc: item.sub_spec_desc
      }));
      const jsonString = JSON.stringify(filteredData, null, 2);
      const filePath = path.join(__dirname, '..', 'subSpec.json');

      fs.writeFile(filePath, jsonString, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.log('File has been created successfully');
        }
      });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await SubSpecialization.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Sub Specialization not found.' });
      }

      // Check if new sub_spec_code exists for another sub specialization
      if (req.body.sub_spec_code && req.body.sub_spec_code !== existing.sub_spec_code) {
        const codeExists = await SubSpecialization.findOne({ where: { sub_spec_code: req.body.sub_spec_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      res.status(200).json({ msg: 'Sub Specialization details updated successfully!', data: existing });

      // Save data to JSON file
      const data = await SubSpecialization.findAll();
      const filteredData = data.map(item => ({
        id: item.id,
        clinic_id: item.clinic_id,
        sub_spec_code: item.sub_spec_code,
        sub_spec_desc: item.sub_spec_desc
      }));
      const jsonString = JSON.stringify(filteredData, null, 2);
      const filePath = path.join(__dirname, '..', 'subSpec.json');

      fs.writeFile(filePath, jsonString, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.log('File has been updated successfully');
        }
      });

    // If query parameter is neither '0' nor '1'
    } else {
      res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving sub specialization details:', error);
    res.status(500).json({ msg: 'An error occurred while saving sub specialization details.' });
  }
};

const SpecCtrl = async (req, res) => {
  console.log(req.body);
  try {
    // Check if query parameter is '0' (insert new data)
    if (req.body.query === '0') {
      const existing = await Specialization.findOne({ where: { spec_code: req.body.spec_code } });

      if (existing) {
        return res.status(400).send({ msg: 'Code already exists.' });
      }

      const subSpec = await Specialization.create(req.body);
      res.status(200).json({ msg: 'Specialization saved successfully!', data: subSpec });

      // Save data to JSON file
      const data = await Specialization.findAll();
      const filteredData = data.map(item => ({
        id: item.id,
        clinic_id: item.clinic_id,
        spec_code: item.spec_code,
        spec_desc: item.spec_desc
      }));
      const jsonString = JSON.stringify(filteredData, null, 2);
      const filePath = path.join(__dirname, '..', 'Spec.json');

      fs.writeFile(filePath, jsonString, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.log('File has been created successfully');
        }
      });

    // Check if query parameter is '1' (update existing data)
    } else if (req.body.query === '1') {
      const existing = await Specialization.findOne({ where: { id: req.body.itemid } });

      if (!existing) {
        return res.status(404).send({ msg: 'Specialization not found.' });
      }

      // Check if new spec_code exists for another specialization
      if (req.body.spec_code && req.body.spec_code !== existing.spec_code) {
        const codeExists = await Specialization.findOne({ where: { spec_code: req.body.spec_code } });

        if (codeExists) {
          return res.status(400).send({ msg: 'Code already exists.' });
        }
      }

      await existing.update(req.body);
      res.status(200).json({ msg: 'Specialization details updated successfully!', data: existing });

      // Save data to JSON file
      const data = await Specialization.findAll();
      const filteredData = data.map(item => ({
        id: item.id,
        clinic_id: item.clinic_id,
        spec_code: item.spec_code,
        spec_desc: item.spec_desc
      }));
      const jsonString = JSON.stringify(filteredData, null, 2);
      const filePath = path.join(__dirname, '..', 'Spec.json');

      fs.writeFile(filePath, jsonString, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.log('File has been updated successfully');
        }
      });

    // If query parameter is neither '0' nor '1'
    } else {
      res.status(400).json({ msg: 'Invalid query parameter.' });
    }
  } catch (error) {
    console.error('Error saving specialization details:', error);
    res.status(500).json({ msg: 'An error occurred while saving specialization details.' });
  }
};

const getClinicName = async (req, res) => {
  try {
    const clinics = await ClinicConfiguration.findAll();
    console.log(clinics)
    res.status(200).json(clinics);
  } catch (error) {
    console.error('Error fetching primary symptoms details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching primary symptoms details.' });
  }
};

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
  getClinicName,
  getDeptInfo,
  clusturCtrl,
  getClustur,
  desgCtrl,
  empCtrl,
  upload,
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
  getSubSpec
};
