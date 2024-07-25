const fs = require('fs');
const path = require('path');
// const multer = require('multer');
// const bcrypt = require('bcrypt');


var UserData = {
  clinic_id: "123",
  userId: "123",
  userName: "Lifelinker"
}
const {
  CompanyHF,
  BCExpMaster,
  bcCompDetails,
  ComTypeNew,
  // bcService_Master,
  State,
  City,
  bcSerMasAssignConcent,
  bcSerMastApplyLev,
  // BcSerRateDocCateg,
  bcTariffMasterNew,
  bcAdvAgent,
  // BcTrfSer,
  BcAssCompNew,
  Adnin,
  bcBullRateChange,
  Doctor,
  ServiceMasterSchema,
  SelectedService,
  CompanyType,
  selectedDoctor
} = require('../models/billingSchema')


const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
}



const bcHFCtrl = async (req, res) => {
  console.log('1')
  try {
    console.log(req.body)
    var { header_text, footer_text, comp_logo, head_image, comp_footer_image } = req.body;
    comp_logo = 'BC_' + new Date().getTime() + '_' + comp_logo.substring(comp_logo.lastIndexOf('\\') + 1);
    head_image = 'BC_' + new Date().getTime() + '_' + head_image.substring(head_image.lastIndexOf('\\') + 1);
    comp_footer_image = 'BC_' + new Date().getTime() + '_' + comp_footer_image.substring(comp_footer_image.lastIndexOf('\\') + 1);

    await CompanyHF.create({
      header_text,
      footer_text,
      comp_logo,
      head_image,
      comp_footer_image,
    });

    res.status(200).json({ msg: 'Form saved successfully!' });
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
};


const bcExpMCtrl = async (req, res) => {
  try {
    //     console.log('1')
    const { header_text, footer_text } = req.body
    const { comp_logo, head_image, comp_footer_image } = req.file
    if (!header_text || !footer_text || !comp_footer_image || !head_image || !comp_logo) return res.status(400).send({ msg: 'All fields are required!' });
    const existing = await BCExpMaster.findOne({ where: { exp_master_code: req.body.exp_master_code } });
    if (existing) {
      return res.status(400).send({ msg: 'Code already exists.' });
    }
    await BCExpMaster.create(req.body);
    res.status(200).json({ msg: 'Form saved successfully!' });
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
};

const updateExpMaster = async (req, res) => {
  const ExpId = req.body.id;
  // console.log(id)
  console.log(ExpId)
  req.flash('ExpId', ExpId);
  req.flash('AssId', ExpId);
  res.sendStatus(200);
}
const updateSelSer = async (req, res) => {
  const ExpId = req.body.id;
  // console.log(id)
  console.log(ExpId+"updateSelSer")
  req.flash('ExpId', ExpId);
  // req.flash('AssId', ExpId);rs
  
  res.sendStatus(200);
}

const updateTariff = async (req, res) => {
  const id = req.body.id;
  // console.log(id)
  console.log(id+"updatetariff")
  req.flash('id', id);
  // req.flash('AssId', ExpId);rs
  res.sendStatus(200);
}

const BCExpMasterNew = async (req, res) => {
  try {
    const AssId = req.flash('AssId')[0];
    // console.log("SATYA");
    console.log("Id is here", AssId);
    const isExist = await BCExpMaster.findOne({ where: { exp_master_code: req.body.exp_master_code } });
    if (isExist) return res.status(400).send({ msg: 'Code already exists.' });
    await BCExpMaster.create({
      userId: UserData.userId,
      clinic_id: UserData.clinic_id,
      exp_master_code: req.body.exp_master_code,
      exp_master_desc: req.body.exp_master_desc,
    });
    res.status(200).json({ msg: 'Form saved successfully!' });
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
}

const companyTypeSubmit = async (req, res) => {
  try {
    if (req.body.query === '0') {

    const ExpId = req.flash('ExpId')[0];
    // console.log("SATYA");
    console.log("Id is here", ExpId);
    const isExist = await CompanyType.findOne({ where: { code: req.body.code } });
    if (isExist) return res.status(400).send({ msg: 'Code already exists.' });
    await CompanyType.create({
      userId: UserData.userId,
      clinic_id: UserData.clinic_id,
      code: req.body.code,
      description: req.body.description,
    });
    res.status(200).json({ msg: 'Form saved successfully!' });
  }
  else{
    const existing = await CompanyType.findOne({ where: { code: req.body.code }  });
    await existing.update(req.body);
    return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });

  }
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
}





const showExpMaster = async (req, res) => {
  const ExpId = req.flash('ExpId')[0];
  console.log(ExpId);
  let result = ''
  if (ExpId) {
    try {
      console.log("Here");
      const result = await BCExpMaster.findOne({ where: { id: ExpId } });
      console.log(result);
      // console.log(ExpId);
      res.render('billing/bc-expense master-new', { result: result })
    } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  else {
    res.render('billing/bc-expense master-new', { result: result });
  }
}

const showDoc = async (req, res) => {
  const ExpId = req.flash('ExpId')[0];
  console.log(ExpId);
  let result = ''
  if (ExpId) {
    try {
      console.log("Here");
      const result = await selectedDoctor.findOne({ where: { id: ExpId } });
      console.log(result);
      // console.log(ExpId);
      res.render('billing/BCDSPT30-doctor-share-part-2', { result: result })
    } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  else {
    res.render('billing/BCDSPT30-doctor-share-part-2', { result: result });
  }
}


const selServices = async(req,res)=>{
  const ExpId = req.flash('ExpId')[0];
  console.log(ExpId+"u2");
  let result = ''
  if (ExpId) {
    try {
      console.log("Here");
      const result = await SelectedService.findOne({ where: { id: ExpId } });
      console.log(result+"hi");
      // console.log(ExpId);
      res.render('billing/BCSRDCWN19-service-rate-doctor-category-wise-new', { result: result })
    } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  else {
    res.render('billing/BCSRDCWN19-service-rate-doctor-category-wise-new', { result: result });
  }
}

const companyType = async(req,res)=>{
  const id = req.flash('id')[0];
  console.log(id+"u2");
  let result = ''
  if (id) {
    try {
      console.log("Here");
      const result = await CompanyType.findOne({ where: { id: id } });
      console.log(result+"hi");
      // console.log(ExpId);
      res.render('billing/company_adding', { result: result })
    } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  else {
    res.render('billing/company_adding', { result: result });
  }
}

const showSerMaster = async (req, res) => {
  const id = req.flash('id')[0];
  console.log(id);
  let result = ''
  if (id) {
    try {
      console.log("Here");
      const result = await ServiceMasterSchema.findOne({ where: { id: id } });
      console.log(result);
      // console.log(ExpId);
      res.render('billing/BCSMN5-service-master-new', { result: result })
    } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  else {
    res.render('billing/BCSMN5-service-master-new', { result: result });
  }
}


















const getExpM = async (req, res) => {
  try {
    const details = await BCExpMaster.findAll();
    // console.log(details)
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
};

const getDoc = async (req, res) => {
  try {
    const details = await selectedDoctor.findAll();
    // console.log(details)
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
};


const getTariffM = async (req, res) => {
  try {
    const details = await bcTariffMasterNew.findAll();
    // console.log(details)
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
};


const getServ =async(req,res)=>{
  try {
    const details = await SelectedService.findAll();
    // console.log(details)
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
}
const changeExpStatus = async (req, res) => {
  try {
    console.log(req.body);
    await BCExpMaster.update({ exp_status: req.body.exp_status }, { where: { id: req.body.id } })
    res.status(200).json({ msg: 'Status changed successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
}
const changeDocStatus = async (req, res) => {
  try {
    console.log(req.body);
    await selectedDoctor.update({ status: req.body.exp_status }, { where: { id: req.body.id } })
    res.status(200).json({ msg: 'Status changed successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
}
const changeTariffMasterStatus = async (req, res) => {
  try {
    console.log(req.body);
    await bcTariffMasterNew.update({ trf_status: req.body.exp_status }, { where: { id: req.body.id } })
    res.status(200).json({ msg: 'Status changed successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
}


const changeSerStatus = async (req, res) => {
  try {
    console.log(req.body);
    await SelectedService.update({ status: req.body.exp_status }, { where: { id: req.body.id } })
    res.status(200).json({ msg: 'Status changed successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
}

const bcCompMasMCtrl = async (req, res) => {
  try {

    const contact_number = req.body.comp_cont;
    let number = '';
    number = number + contact_number
    if (number.length > 10) return res.status(500).send({ msg: "Contact Number is not valid please enter a valid number!" })
    const existing = await bcCompDetails.findOne({ where: { comp_code: req.body.comp_code } });
    if (existing) {
      return res.status(400).send({ msg: 'Code already exists.' });
    }

    await bcCompDetails.create(req.body);
    res.status(200).json({ msg: 'Form saved successfully!' });
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
};
const bcSerNew = async (req, res) => {
  try {
    res.status(200).json({ msg: 'Form saved successfully!' });
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
}

const bcComTypeNew = async (req, res) => {
  try {
    const contact_number = req.body.contact_number;
    let number = '';
    number = number + contact_number
    if (number.length > 10) return res.status(500).send({ msg: "Contact Number is not valid please enter a valid number!" })
    const existing = await ComTypeNew.findOne({ where: { code: req.body.code } });
    if (existing) {
      return res.status(400).send({ msg: 'Data already exists.' });
    }
    await ComTypeNew.create(req.body);
    res.status(200).json({ msg: 'Form saved successfully!' });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
}

// const bcserviceMaster = async (req, res) => {
//   try {
//     console.log(req.body);
//     const isExist = await bcService_Master.findOne({ where: { service_Code: req.body.service_Code } });
//     if (isExist) {
//       return res.status(400).json({ msg: 'Data already exists.' });
//     }
//     await bcService_Master.create(req.body);
//     res.status(200).json({ msg: 'Form saved successfully!' });
//   } catch (error) {
//     res.status(500).json({ msg: 'An error occurred while saving Form' });
//   }
// }


const jsonStoraInDB = async (req, res) => {
  try {
    await sequelize.sync({ force: true }); // Drops and re-creates the database tables

    for (const [stateId, name] of Object.entries(data)) {
      const state = await State.create({ stateCode: stateId, stateName: name });

    }
    for (const cityName of cities) {
      await City.create({ name: cityName, stateCode: state.stateCode });
    }
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
}






const updateAndCreatJson = async (req, res) => {
  try {
    function updateJsonFile(filePath, newData) {
      try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(fileData);

        // Update the JSON object with new data
        const updatedJson = { ...json, ...newData };

        // Write the updated JSON object back to the file
        fs.writeFileSync(filePath, JSON.stringify(updatedJson, null, 2), 'utf-8');
        console.log(`File updated successfully: ${filePath}`);
      } catch (err) {
        console.error(`Error updating file: ${err.message}`);
      }
    }
    function findJsonFile(dir, fileName) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);

        // Check if the current path is a directory
        if (fs.statSync(filePath).isDirectory()) {
          // Recursively search in the directory
          const result = findJsonFile(filePath, fileName);
          if (result) {
            return result;
          }
        } else if (file === fileName) {

          return filePath;
        }
      }

      return null;
    }
    // Example usage
    const directory = 'C:\\Users\\SATYAPRAKASH ROY\\Downloads\\Billing\\Billing\\public\\jsonFile';
    const jsonFileName = 'data.json';
    const newData = { newKey: 'newValue' };

    const result = await findJsonFile(directory, jsonFileName);

    if (result) {
      console.log(`File found: ${result}`);
      await updateJsonFile(result, newData);
    } else {
      console.log('File not found');
    }
    await createJsonFile()
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
}

const createJsonFile = async (req, res) => {
  try {
    const directory = 'C:\\Users\\SATYAPRAKASH ROY\\Downloads\\Billing\\Billing\\public\\jsonFile';
    console.log("Here");
    await jsonFile(directory, State);
    console.log("Here1");
    const jsonFile = async function (dir, database) {
      const data = await State.findAll();
      console.log(data);
      const jsonString = JSON.stringify(data, null, 2);

      fs.writeFile(dir, jsonString, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('JSON data has been written successfully');
        }
      });
    }

    res.status(200).json({ msg: "uplodeded successfully" });
  } catch (error) {
    res.status(500).json({ msg: 'An error ' });
  }
}

const bcSerMasAssignConc = async (req, res) => {
  try {
    console.log(req.body);
    await bcSerMasAssignConcent.create(req.body);
    res.status(200).json({ msg: "Services Assign successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'An error occurred while saving Form', error });
  }
}

const bcSerMastApplyLevl = async (req, res) => {
  try {
    console.log(req.body);
    
    await bcSerMastApplyLev.create(req.body);
    res.status(200).json({ msg: "Services master level applyed successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
}

const createCitytoJson = async (req, res) => {
  try {
    console.log("hii");
    console.log(req.body);
    const data = await City.findAll();
    const jsonString = JSON.stringify(data, null, 2);
    const filePath = path.join(__dirname, 'City.json');

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
      } else {
        console.log('File has been created successfully');
      }
    });
    res.status(200).json("Successsfully")
  } catch (error) {
    console.log(error);
    res.status(500).json("fail", error);
  }
}

const createStatetoJson = async (req, res) => {
  try {
    const data = await State.findAll();
    const jsonString = JSON.stringify(data, null, 2);
    const filePath = path.join(__dirname, 'state.json');

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
      } else {
        console.log('File has been created successfully');
      }
    });
    res.status(200).json("Successsfully")
  } catch (error) {
    console.log(error);
    res.status(500).json("fail", error);
  }
}

const bcTariffMasNew = async (req, res) => {
  console.log('Received body:', req.body); // Improved logging for debugging

  try {
    // Handling creation of a new tariff
    if (req.body.query === '0') {
      // Validate required fields
      if (!req.body.code || !req.body.contact_person) {
        return res.status(400).json({ msg: 'Missing required fields' });
      }

      const newTariff = await bcTariffMasterNew.create({
        trf_code: req.body.code,
        trf_name: req.body.contact_person // Assuming trf_name should be req.body.trf_name if contact_person is incorrect
      });

      return res.status(200).json({ msg: "Tariff Master Added successfully", data: newTariff });

    } else {
      // Handling updating an existing tariff
      console.log("Updating an existing tariff");

      const existing = await bcTariffMasterNew.findOne({ where: { id: req.body.itemid } });
      if (!existing) {
        return res.status(404).json({ msg: 'Tariff not found' });
      }

      // Update the tariff
      const updatedTariff = await existing.update({
        trf_code: req.body.code,
        trf_name: req.body.contact_person // Again, check field correctness
      });

      return res.status(200).json({ msg: 'Tariff details updated successfully!', data: updatedTariff });
    }

  } catch (error) {
    console.error('Error occurred while processing tariff:', error);
    return res.status(500).json({ msg: 'An error occurred while saving the tariff', error: error.message });
  }
}


const getTariffList = async (req, res) => {
  try {
    const getAllTariff = await bcTariffMasterNew.findAll();
    res.status(200).json(getAllTariff);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
}

const getCompanyType = async (req, res) => {
  try {
    console.log("Fetching company types...");
    const getAllCompany = await CompanyType.findAll();
    console.log("Fetched data:", getAllCompany);
    res.status(200).json(getAllCompany);
  } catch (error) {
    console.error("Error fetching company types:", error);
    // Send a generic error message to the client
    res.status(500).json({ error: 'An error occurred while fetching company types.' });
  }
}


const changeTrfStatus = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.id
    const trf_status = req.body.exp_status
    await bcTariffMasterNew.update({ trf_status: trf_status }, { where: { id: id } })
    res.status(200).json({ msg: "Tariff Master Updated successfully" });
  } catch (error) {
    res.status(500).json("fail", error);
  }
}
const changeCompTypeStatus = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.id
    const status = req.body.exp_status
    await CompanyType.update({ status: status }, { where: { id: id } })
    res.status(200).json({ msg: "Company Type Updated successfully" });
  } catch (error) {
    res.status(500).json("fail", error);
  }
}

const bcAdvAgntNew = async (req, res) => {
  try {
    if(req.body.query==="0"){
    const Id = req.flash('id')[0];
    console.log(Id);
    const isExist = await bcAdvAgent.findOne({ where: { adv_agnt_code: req.body.code } })

    if (isExist) return res.status(500).json({ msg: "Agent Code already exist" });

    await bcAdvAgent.create({ adv_agnt_code: req.body.code, description: req.body.description, userId: UserData.userId })
    res.status(200).json({ msg: "Adv Agnt Added successfully" });
    }
    else{
      const existing = await bcAdvAgent.findOne({ where: { adv_agnt_code: req.body.code } });
      await existing.update(req.body);
      return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
}
const doctorSelected = async (req, res) => {
  try {
      console.log(req.body);

      // Destructure control parameters from the first object in the doctors array
      const { query, itemid } = req.body.doctors[0];
      console.log(query + itemid);
      console.log(req.body.doctors[1]);

      if (query === '0') {
          console.log("Handling creation of new doctors");
          const doctors = req.body.doctors.slice(1); // Skip the first element as it is the control parameter

          // Ensure doctors is actually an array
          if (!Array.isArray(doctors) || doctors.length === 0) {
              return res.status(400).json({ msg: "Invalid data format: Expected a non-empty array of doctors." });
          }

          // Process each doctor
          const doctorsData = doctors.map(doc => ({
              ...doc,
              userId: UserData.userId  // Ensure UserData is accessible here
          }));

          await selectedDoctor.bulkCreate(doctorsData);
          res.status(200).json({ msg: "Doctors added successfully.", data: doctorsData });

      } else {
          console.log("Handling update of an existing doctor");

          const existing = await selectedDoctor.findByPk(itemid);
          if (!existing) {
              console.log(`Doctor with id ${itemid} not found for update.`);
              return res.status(404).json({ msg: 'Doctor not found' });
          }

          // Log what data is attempted to be updated
          console.log(`Updating doctor with id ${itemid} using data`, req.body.doctors[1]);

          await existing.update(req.body.doctors[1]);
          console.log(`Updated doctor with id ${itemid}`);
          res.status(200).json({ msg: 'Doctor details updated successfully!', data: existing });
      }

  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ msg: 'An error occurred while saving the form', error: error.message });
  }
}


// const bcTrfSer = async (req, res) => {
//   try {
//     await BcTrfSer.create(req.body);
//     res.status(200).json("Trf Services Added Successsfully!")
//   } catch (error) {
//     res.status(500).json({ msg: 'An error occurred while saving Form' });
//   }
// }

// const bcDocShare = async (req, res) => {
//   try {

//   } catch (error) {

//   }
// }

const bcAssCompNew = async (req, res) => {
  try {
    if(req.body.query==='0'){
    console.log("Data of body", req.body);
    const isExist = await BcAssCompNew.findOne({ where: { code: req.body.code } });
    console.log(isExist);
    if (isExist) {
      res.status(500).json({ msg: "Already Exist!" })
    }
    else {
      console.log("HERE");
      await BcAssCompNew.create(req.body);
      res.status(200).json({ msg: "Ass Comp Added successfully!" })
    }
  }
  else{
    const existing = await BcAssCompNew.findOne({ where: { code: req.body.code } });
    await existing.update(req.body);
    return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
  }
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
} 
const getAccComData = async (req, res) => {
  try {
    const accComData = await BcAssCompNew.findAll();
    res.status(200).json(accComData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
}

const changeAssCom = async (req, res) => {
  try {
    const { b, status } = req.body;
    console.log(req.body);
    await BcAssCompNew.update({ status: status }, { where: { id: b } });
    res.status(200).json({ msg: "Ass Comp Updated successfully!" })
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred while saving Form' });
  }
}



const insertUser = async (req, res) => {
  try {
    const reqBody = req.body;
    const { name, email, mobile, userStatus, password, role, clinicId } = reqBody

    if (!name || !email || !mobile || !userStatus || !password || !role || !clinicId)
      return res.status(400).json({ success: false, message: "All fileds are required" });

    const userData = await Adnin.findOne({ where: { userEmail: email } });
    if (!userData) {
      const spassword = await securePassword(password);
      await Adnin.create({
        userName: name,
        userEmail: email,
        userMobile: mobile,
        userStatus: userStatus,
        userPassword: spassword,
        userRole: role,
        clinicId: clinicId
      }, {
        new: true
      });
      return res.status(200).json({ success: true, message: "User Added Successfully" })
    } else {
      return res.status(400).json({ success: false, message: "User Already Exist" })
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}


const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userVerifyData = await Adnin.findOne({ where: { userEmail: email } });
    if (userVerifyData) {
      const passwordMatch = await bcrypt.compare(password, userVerifyData.userPassword);
      if (passwordMatch) {
        const userData = {
          userId: userVerifyData.userId,
          userName: userVerifyData.userName,
          clinicId: userVerifyData.clinicId
        }
        console.log(userData);
        req.session.userData = userData
        return res.status(200).json({ success: true, message: "Login Successfully" })
      } else {
        res.status(500).json({ message: "Email and Password is incorrect" });
      }
    } else {
      res.status(500).json({ message: "Email and Password is incorrect" });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}


const BcblRateChange = async (req, res) => {
  console.log("here1");
  try {
    await bcBullRateChange.create(req.body);
    res.status(200).json({ success: true, message: "Rate Change Added Successfully" })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: true, msg: "Error on submillting file!" })
  }
}


const allTariff = async (req, res) => {
  try {
    const allTariffData = await bcBullRateChange.findAll();
    console.log(allTariffData);
    console.log("Hello");
    // res.status(200).json({ success: true, data: allTariffData })
    res.render('billing/BCBRCLOT28-bulk-rate-change-list-of-tariff', { allTariffData: allTariffData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: true, msg: "Error on featching Data!", error: error.message })
  }
}

const loadUpdatePage = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    req.flash('id', id);
    res.redirect('/3')
  } catch (error) {
    res.status(500).json({ success: true, msg: "Error on submillting file!", error })
  }
}

const getAdvAgent = async (req, res) => {
  try {
    console.log("hello");
    const agentData = await bcAdvAgent.findAll();
    res.status(200).json(agentData)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
}

const changeStatusAdvagnt = async (req, res) => {
  try {
    console.log(req.body);
    await bcAdvAgent.update({ adv_agnt_status: req.body.exp_status }, { where: { id: req.body.id } })
    res.status(200).json({ msg: 'Status changed successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
}

const getAllDoctor = async (req, res) => {
  try {
    const gatAllDoctor = await Doctor.findAll();
    res.status(200).json(gatAllDoctor)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
}

const insertServiseRate = async (req, res) => {
  console.log('servies rate');
  try {
    if(req.body.query==='0'){
    console.log(req.body);
    const isExist = await ServiceMasterSchema.findOne({ where: { serviceCode: req.body.serviceCode } });
    if (isExist) {
      alert("Code already exists"); // Replace alert with console.log for server-side logging
      return res.status(400).send({ msg: 'Code already exists.' });
    }
    const Data = await ServiceMasterSchema.create(req.body);
    console.log(Data);
    res.status(200).json({ msg: 'Service Rate Added Successfully!' })
  }
    else{
      const existing = await ServiceMasterSchema.findOne({ where: { serviceCode: req.body.serviceCode } });

      await existing.update(req.body);
      return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });

    }    
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message })
  }
}

const getAllServiesMst = async (req, res) => {
  try {
    const getAllSerMstList = await ServiceMasterSchema.findAll();
    res.status(200).json(getAllSerMstList)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
}

const serMstStatusChange = async (req, res) => {
  try {
    const id = req.body.id;
    const status = req.body.status;
    await ServiceMasterSchema.update({ status: status }, { where: { id: id } });
    res.status(200).json({ msg: 'Status changed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message })
  }
}
const serviceMstStatusChange = async (req, res) => {
  console.log(req.body)
  try {
    const { id, exp_status } = req.body;
    console.log("Updating status for ID:", id, "New Status:", exp_status);

    if (!id || exp_status === undefined) {
      return res.status(400).json({ success: false, msg: 'Invalid request data' });
    }
    let status = exp_status


    await ServiceMasterSchema.update({ status }, { where: { id } });
    res.status(200).json({ success: true, msg: 'Status changed successfully!' });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
}


const getServices = async(req,res)=>{
  try {
    console.log(1);
    const getAllSerMstList = await ServiceMasterSchema.findAll();
    res.status(200).json(getAllSerMstList)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }

}

const updateSerMst = async (req, res) => {
  const serId = req.body.id;
  console.log(serId)
  // console.log(ExpId)
  req.flash('serId', serId);
  res.sendStatus(200);

}

const updatePageSer = async (req, res) => {
  const serId = req.flash('ExpId')[0];
  console.log(serId);
  let result = ''
  if (serId) {
    try {
      console.log("Here");
      const result = await ServiceMasterSchema.findOne({ where: { id: serId } });
      console.log(result);
      // console.log(ExpId);
     
      res.render('billing/BCSMN5-service-master-new', { result: result })
    } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  else {
    res.render('billing/BCSMN5-service-master-new', { result: result });
  }
}

const getAllTrfList = async (req, res) => {
  try {
    console.log("Hello");
    const getAllList = await ServiceMasterSchema.findAll();
    console.log(getAllList);
    res.status(200).json(getAllList);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
}


const updateTrfMaster = async (req, res) => {
  const trfMstId = req.body.id;
  console.log("Set Id for Testing", trfMstId);
  req.flash('trfMstId', trfMstId);
  res.sendStatus(200);
}
const updateCompType = async (req, res) => {
  const id = req.body.id;
  console.log("Set Id for Testing", id);
  req.flash('id', id);
  res.sendStatus(200);
}


const loadTrfPage = async (req, res) => {
  const id = req.flash('id')[0];
  console.log("Id is here for testing", id);
  let result = ''
  if (id) {
    try {
      console.log("Here");
      const result = await bcTariffMasterNew.findOne({ where: { id: id } });
      console.log(result);
      // console.log(ExpId);
      res.render('billing/BCTMN26-tariff-master-new', { result: result })
    } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  else {
    res.render('billing/BCTMN26-tariff-master-new', { result: result });
  }
}

  const Selectedservice = async (req, res) => {
    try {
      console.log(req.body);

      // Destructure control parameters from the first object in the array
      const { query, itemid } = req.body[0];
      console.log(query + itemid);
      console.log(req.body[1]);

      if (query === '0') {
        console.log("query0")
        if (!req.body[1] || Object.keys(req.body[1]).length === 0) {
          return res.status(400).json({ msg: 'Invalid input data for creation' });
        }

        const serviceData = {
          ...req.body[1],
          userId: UserData.userId
        };

        const newService = await SelectedService.create(serviceData);
        res.status(200).json({ msg: 'Form saved successfully!', data: newService });
      } else {
        console.log("query1")
        const existing = await SelectedService.findByPk(itemid);
        if (!existing) {
          console.log(`Service with id ${itemid} not found for update.`);
          return res.status(404).json({ msg: 'Service not found' });
        }

        // Log what data is attempted to be updated
        console.log(`Updating service with id ${itemid} using data`, req.body[1]);

        await existing.update(req.body[1]);
        console.log(`Updated service with id ${itemid}`);
        res.status(200).json({ msg: 'Service details updated successfully!', data: existing });
      }

    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ msg: 'An error occurred while saving the form', error: error.message });
    }
  };




const getTariffs = async (req, res) => {
  try {
      const tariffs = await bcTariffMasterNew.findAll();
      res.json(tariffs);
  } catch (error) {
      console.error('Failed to fetch tariffs:', error);
      res.status(500).json({ msg: 'Failed to fetch tariffs', error: error.message });
  }
};



module.exports = {
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
  loadUpdatePage,
  BCExpMaster,
  bcAdvAgent,
  BcAssCompNew,
  getAdvAgent,
  changeStatusAdvagnt,
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
  showSerMaster,
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
  updateTariff,
  changeTariffMasterStatus,
  doctorSelected,
  getTariffs,
  getDoc,
  changeDocStatus,
  showDoc
}