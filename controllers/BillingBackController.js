const fs = require('fs');
const path = require('path');
// const multer = require('multer');
//const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js')

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
  selectedDoctor,
  ConcessionMaster,
  SacMaster,
  RefundMaster,
  DoctorService
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
    var { compHeaderContent, compFooterContent, comp_logo, head_image, comp_footer_image } = req.body;
    comp_logo = 'BC_' + new Date().getTime() + '_' + comp_logo.substring(comp_logo.lastIndexOf('\\') + 1);
    head_image = 'BC_' + new Date().getTime() + '_' + head_image.substring(head_image.lastIndexOf('\\') + 1);
    comp_footer_image = 'BC_' + new Date().getTime() + '_' + comp_footer_image.substring(comp_footer_image.lastIndexOf('\\') + 1);

    await CompanyHF.create({
      compHeaderContent,
      compFooterContent,
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
  res.sendStatus(200);
}
const updateSelSer = async (req, res) => {
  const ExpId = req.body.id;
  // console.log(id)
  console.log(ExpId+"updateSelSer")

  
  res.sendStatus(200);
}

const updateTariff = async (req, res) => {
  const id = req.body.id;
  // console.log(id)
  console.log(id+"updatetariff")
  // req.query.id('AssId', ExpId);rs
  res.sendStatus(200);
}

const BCExpMasterNew = async (req, res) => {
  
    const AssId = req.query.id;
    // console.log("SATYA");
    console.log("Id is here", AssId);
    try {
      if(req.body.query==='0'){
      console.log(req.body)
      await BCExpMaster.create({...req.body,UserId:UserData.userId});
      res.status(200).json({ msg: 'Form saved successfully!' });
      }
      else{
        const existing = await BCExpMaster.findOne({ where: { exp_master_code: req.body.exp_master_code }  });
        await existing.update(req.body);
        return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
      }

    } catch (error) {
      console.error('Error in TemplateMasterSubmit:', error);
      res.status(500).json({ msg: 'An error occurred while saving the form.' });
    }
}

const BCConcessionNew = async (req, res) => {
 
    const AssId = 
    // console.log("SATYA");
    console.log("Id is here", AssId);
    try {
      if(req.body.query==='0'){
      console.log(req.body)
      await ConcessionMaster.create({...req.body,UserId:UserData.userId});
      res.status(200).json({ msg: 'Form saved successfully!' });
      }
      else{
        const existing = await ConcessionMaster.findOne({ where: { exp_master_code: req.body.exp_master_code }  });
        await existing.update(req.body);
        return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
      }

    } catch (error) {
      console.error('Error in TemplateMasterSubmit:', error);
      res.status(500).json({ msg: 'An error occurred while saving the form.' });
    }
}


const BCSacMasterNew = async (req, res) => {
 
  const AssId = req.query.id;
  // console.log("SATYA");
  console.log("Id is here", AssId);
  try {
    if(req.body.query==='0'){
    console.log(req.body)
    await SacMaster.create({...req.body,UserId:UserData.userId});
    res.status(200).json({ msg: 'Form saved successfully!' });
    }
    else{
      const existing = await SacMaster.findOne({ where: { exp_master_code: req.body.exp_master_code }  });
      await existing.update(req.body);
      return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
    }

  } catch (error) {
    console.error('Error in TemplateMasterSubmit:', error);
    res.status(500).json({ msg: 'An error occurred while saving the form.' });
  }
}
const BCRefundMasterNew = async (req, res) => {
 
  const AssId = req.query.id;
  // console.log("SATYA");
  console.log("Id is here", AssId);
  try {
    if(req.body.query==='0'){
    console.log(req.body)
    await RefundMaster.create({...req.body,UserId:UserData.userId});
    res.status(200).json({ msg: 'Form saved successfully!' });
    }
    else{
      const existing = await RefundMaster.findOne({ where: { exp_master_code: req.body.exp_master_code }  });
      await existing.update(req.body);
      return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
    }

  } catch (error) {
    console.error('Error in TemplateMasterSubmit:', error);
    res.status(500).json({ msg: 'An error occurred while saving the form.' });
  }
}

const companyTypeSubmit = async (req, res) => {
  try {
    if (req.body.query === '0') {

    const ExpId = req.query.id;
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
  const id = req.query.id;
  console.log(id,"Deepak");

  const secretKey = "ll"
  const ExpId = decryptData(decodeURIComponent(id), secretKey);

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

const showConcessionMaster = async (req, res) => {
  const id = req.query.id;
  console.log(id,"Deepak");

  const secretKey = "ll"
  const ExpId = decryptData(decodeURIComponent(id), secretKey);

  let result = ''
  if (ExpId) {
    try {
      console.log("Here");
      const result = await ConcessionMaster.findOne({ where: { id: ExpId } });
      console.log(result);
      // console.log(ExpId);
      res.render('billing/BC-concessionMaster', { result: result })
    } catch (error) {
      console.error('Error fetching department data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  else {
    res.render('billing/BC-concessionMaster', { result: result });
  }
}



const showDoc = async (req, res) => {
  const id = req.query.id;
  console.log(id,"Deepak");

  const secretKey = "ll"
  const Id = decryptData(decodeURIComponent(id), secretKey);
  let result = ''
  if (Id) {
      try {
          const result = await selectedDoctor.findByPk(Id);
          console.log(result);
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
  const id = req.query.id;
    console.log(id,"Deepak");

    const secretKey = "ll"
    const ExpId = decryptData(decodeURIComponent(id), secretKey);

  let result = ''
  if (ExpId) {
    try {
     
      const result = await SelectedService.findOne({ where: { id: ExpId } });
      console.log(result);
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
  const id = req.query.id;
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
  const id = req.query.id
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
    const encModData = await BCExpMaster.findAll();
    
    const details = encModData.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
};
const getConcession = async (req, res) => {
  try {
    const encModData = await ConcessionMaster.findAll();
    
    const details = encModData.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
};

const getSacMaster = async (req, res) => {
  try {
    const encModData = await SacMaster.findAll();
    
    const details = encModData.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
};

const getRefundMaster = async (req, res) => {
  try {
    const encModData = await RefundMaster.findAll();
    
    const details = encModData.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
};
const getDoc = async (req, res) => {
  try {
    const encModData = await selectedDoctor.findAll();
    
    const details = encModData.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
};


const getTariffM = async (req, res) => {
  try {
    const details = await bcTariffMasterNew.findAll();
    const tariffData = details.map(tariff => ({
      id: tariff.id,
      trf_code: tariff.trf_code,
      trf_name: tariff.trf_name,
      trf_status: tariff.trf_status,
      services: tariff.services.map(service => ({
        code: service.code,
        name: service.name,
        rate: service.rate
      }))
    }));
    const result = tariffData.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data,
        id: encryptedId,
      };
    });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching tariff and service details:', error);
    res.status(500).json({ error: 'An error occurred while fetching tariff and service details.' });
  }
};


const getServ =async(req,res)=>{
  try {
    const agentData = await SelectedService.findAll();
    
    const details = agentData.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

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

const changeConcessionStatus = async (req, res) => {
  try {
    console.log(req.body);
    await ConcessionMaster.update({ exp_status: req.body.exp_status }, { where: { id: req.body.id } })
    res.status(200).json({ msg: 'Status changed successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
}

const changeSacStatus = async (req, res) => {
  try {
    console.log(req.body);
    await SacMaster.update({ exp_status: req.body.exp_status }, { where: { id: req.body.id } })
    res.status(200).json({ msg: 'Status changed successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
}
const changeRefundStatus = async (req, res) => {
  try {
    console.log(req.body);
    await RefundMaster.update({ exp_status: req.body.exp_status }, { where: { id: req.body.id } })
    res.status(200).json({ msg: 'Status changed successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
}

const changeBulkTariffStatus = async (req, res) => {
  try {
    console.log(req.body);
    await bcBullRateChange.update({ status: req.body.exp_status }, { where: { id: req.body.id } })
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
    const filePath = path.join(__dirname, '../myjson', 'City.json');

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
    const filePath = path.join(__dirname, '../myjson', 'state.json');

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
        trf_name: req.body.contact_person,
        services: req.body.services // Storing services as a JSON field
      });

      return res.status(200).json({ msg: "Tariff Master Added successfully", data: newTariff });

    } else {
      // Handling updating an existing tariff
      console.log("Updating an existing tariff");

      const existing = await bcTariffMasterNew.findOne({ where: { id: req.body.itemid } });
      if (!existing) {
        return res.status(404).json({ msg: 'Tariff not found' });
      }

      // Update the tariff including services
      const updatedTariff = await existing.update({
        trf_code: req.body.code,
        trf_name: req.body.contact_person,
        services: req.body.services // Update services as well
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
    const Id = req.query.id;
    console.log(Id);
    const isExist = await bcAdvAgent.findOne({ where: { adv_agnt_code: req.body.code } })

    if (isExist) return res.status(500).json({ msg: "Advance Code already exist" });

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
  const { doctors } = req.body;

  try {
      await Promise.all(doctors.map(async doc => {
          if (doc.id) {
              const existingDoctor = await selectedDoctor.findByPk(doc.id);
              if (existingDoctor) {
                  await existingDoctor.update(doc);
                  console.log(`Doctor updated: ${doc.id}`);
              } else {
                  await selectedDoctor.create(doc);
                  console.log(`New doctor added: ${doc.name}`);
              }
          } else {
              await selectedDoctor.create(doc);
              console.log(`New doctor added: ${doc.name}`);
          }
      }));

      res.status(200).json({ msg: 'Doctors processed successfully.' });
  } catch (error) {
      console.error('Error processing doctors:', error);
      res.status(500).json({ msg: 'An error occurred while processing doctors.', error: error.message });
  }
};





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
    const details = await BcAssCompNew.findAll();

    const accComData = details.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

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
  try {
    const {
      selectedTariffs,
      bulkRateChange,
      remarks,
      effectiveDate,
      freeze,
      query
    } = req.body;

    const tariffCode = selectedTariffs.map(t => t.trf_code).join(', ');

    if (query === "0") {
      // Check if the TariffCode already exists
      const existingRateChange = await bcBullRateChange.findOne({ where: { TariffCode: tariffCode } });

      if (existingRateChange) {
        return res.status(400).json({ success: false, message: "Tariff Code Already Exists" });
      }

      const newRateChange = {
        TariffCode: tariffCode,
        TariffName: selectedTariffs.map(t => t.trf_name).join(', '),
        remarks,
        effectiveDate,
        freeze,
        bulkRateChange,
        UserId: UserData.userId // Assuming UserData is available in the context
      };

      await bcBullRateChange.create(newRateChange);
      res.status(200).json({ success: true, message: "Rate Change Added Successfully" });
    } else {
      const existing = await bcBullRateChange.findOne({ where: { TariffCode: tariffCode } });
      if (existing) {
        await existing.update(req.body);
        return res.status(200).json({ success: true, message: 'Department details updated successfully!', data: existing });
      } else {
        return res.status(404).json({ success: false, message: 'Tariff Code Not Found' });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Error on submitting form!" });
  }
};





const allTariff = async (req, res) => {
  try {
    const details = await bcBullRateChange.findAll();

    const accComData = details.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(accComData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
};

const loadUpdatePage = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    res.redirect('/3')
  } catch (error) {
    res.status(500).json({ success: true, msg: "Error on submillting file!", error })
  }
}

const getAdvAgent = async (req, res) => {
  try {
    console.log("hello");
    const details = await bcAdvAgent.findAll();
    
    const agentData = details.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(agentData)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
}

// const changeStatusAdvagnt = async (req, res) => {
//   try {
//     console.log(req.body);
//     await bcAdvAgent.update({ adv_agnt_status: req.body.exp_status }, { where: { id: req.body.id } })
//     res.status(200).json({ msg: 'Status changed successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
//   }
// }

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


const getServices = async (req, res) => {
  try {
    console.log(1);
    const result = await ServiceMasterSchema.findAll();

    // const getAllSerMstList = result.map(data => {
    //   const encryptedId = encryptDataForUrl(data.id.toString());
    //   return {
    //     ...data.toJSON(), 
    //     id: encryptedId,
    //   };
    // });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.', details: error.message });
  }
}

const updateSerMst = async (req, res) => {
  const serId = req.body.id;
  console.log(serId)
  // console.log(ExpId)
 
  res.sendStatus(200);

}

const updatePageSer = async (req, res) => {
    const id = req.query.id;
    console.log(id,"Deepak");

    const secretKey = "ll"
    const serId = decryptData(decodeURIComponent(id), secretKey);
  
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
    const details = await ServiceMasterSchema.findAll();
    const getAllList = details.map(data => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });
    console.log(getAllList);
    res.status(200).json(getAllList);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching classification details.', error });
  }
}


const updateTrfMaster = async (req, res) => {
  const trfMstId = req.body.id;
  console.log("Set Id for Testing", trfMstId);
  res.sendStatus(200);
}
const updateCompType = async (req, res) => {
  const id = req.body.id;
  console.log("Set Id for Testing", id);
 
  res.sendStatus(200);
}


const loadTrfPage = async (req, res) => {
  const Id = req.query.id;
    console.log(Id,"Deepak");

    const secretKey = "ll"
    const id = decryptData(decodeURIComponent(Id), secretKey);
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
          // Process all entries except the first (control parameters)
          for (let i = 1; i < req.body.length; i++) {
              const serviceEntry = req.body[i];
              if (!serviceEntry || Object.keys(serviceEntry).length === 0) {
                  continue; // Skip any empty entries or add error handling
              }

              const serviceData = {
                  ...serviceEntry,
                  userId: UserData.userId // Make sure UserData is correctly defined and accessible
              };

              const newService = await SelectedService.create(serviceData);
              console.log(`Service created: ${newService.id}`);
          }
          res.status(200).json({ msg: 'All services saved successfully!' });
      } else {
          console.log("query1")
          const existing = await SelectedService.findByPk(itemid);
          if (!existing) {
              console.log(`Service with id ${itemid} not found for update.`);
              return res.status(404).json({ msg: 'Service not found' });
          }

          // Assuming only one service is updated when query is not '0'
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


const addDoctorServices = async (req, res) => {
  try {
    const { doctorName, services } = req.body;

    // Check if a record already exists for this doctor
    let existingRecord = await DoctorService.findOne({
      where: { doctorName: doctorName }
    });

    if (existingRecord) {
      // If it exists, update the existing record
      await existingRecord.update({
        services: services // Assuming you want to replace the entire services array
      });
      console.log(`Updated record for ${doctorName}`);
      res.status(200).json({ message: 'Services updated successfully', data: existingRecord });
    } else {
      // If no existing record, create a new one
      const newRecord = await DoctorService.create({
        UserId: UserData.userId, // Assuming you have access to UserData where userId is stored
        doctorName,
        services
      });
      console.log(newRecord);
      res.status(201).json({ message: 'Services successfully added', data: newRecord });
    }
  } catch (error) {
    console.error('Error adding services:', error);
    res.status(500).json({ message: 'Failed to add services', error: error.message });
  }
};


const SaveStatusData = async (req, res) => {
  try {
    console.log(req.body);
    const { id: encryptedId, status, schema: encryptedSchema ,tableStatus:EnctableStatus} = req.body;
    const secretKey = 'll'; // Replace with your actual secret key

    // Decrypt id and schema
    const id = decryptData(decodeURIComponent(encryptedId), secretKey); // URL decode
    const schema = decryptData(decodeURIComponent(encryptedSchema), secretKey); // URL decode
    const tableStatus = decryptData(decodeURIComponent(EnctableStatus), secretKey); // URL decode

    console.log('Decrypted id:', id);
    console.log('Decrypted schema:', schema);
    console.log('Decrypted tableStatus:', tableStatus);

    // Use decrypted id and schema to fetch data from the model
    const Model = require('../models/billingSchema')[schema];
    const data = await Model.findByPk(id);

    if (data) {``
    
      // Update status and save
      data[tableStatus] = status;

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
}

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
  // changeStatusAdvagnt,
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
  showDoc,
  showConcessionMaster,
  getConcession,
  BCConcessionNew,
  changeConcessionStatus,
  BCSacMasterNew,
  getSacMaster,
  changeSacStatus,
  BCRefundMasterNew,
  getRefundMaster,
  changeRefundStatus,
  addDoctorServices,
  changeBulkTariffStatus,
  SaveStatusData
}