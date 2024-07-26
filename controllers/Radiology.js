const CryptoJS = require('crypto-js')
const { Rad_ModalityDetails, Rad_TempResDet, Rad_TempMaDet, Rad_AnomalyScan } = require('../models/Radiology');

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

//Radiology Get Routes
const AR_Modality = (req, res) => {
    const schema = 'Rad_ModalityDetails';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('Radiology/1-AR-modality', { a: Encschema });
}

const AR_Modality_View = async (req, res) => {

    const secretKey = "ll"
    const itemId = req.query.id;
    const id = decryptData(decodeURIComponent(itemId), secretKey);
  
    //checking for the data in Rad_modality table:---
    let data = '';
    if (id) {
      const modalityData = await Rad_ModalityDetails.findByPk(id);
      data = { id: modalityData.dataValues.id, md_code: modalityData.dataValues.md_code, description: modalityData.dataValues.description }
      res.render('Radiology/2-AR-modality-view', { data });
    } else {
      data = { id: '', md_code: '', description: '' }
      res.render('Radiology/2-AR-modality-view', { data });
    }
  
}

const AR_Temp_Res = (req, res) => {
    const schema = 'Rad_TempResDet';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('Radiology/3-AR-template-result', { a: Encschema });
}

const AR_Temp_Res_View = async (req, res) => {

    const secretKey = "ll"
    const itemId = req.query.id;
    const id = decryptData(decodeURIComponent(itemId), secretKey);
  
    console.log(id);
    let data = '';
    if (id) {
      const TempResult = await Rad_TempResDet.findByPk(id);
      data = { id: TempResult.dataValues.id, trd_code: TempResult.dataValues.trd_code, description: TempResult.dataValues.description }
      res.render('Radiology/4-AR-template-result-view', { data });
    } else {
      data = { id: '', trd_code: '', description: '' }
      res.render('Radiology/4-AR-template-result-view', { data });
    }
}

const AR_Temp_Master = (req, res) => {
    const schema = 'Rad_TempMaDet';
    const Encschema = encryptDataForUrl(schema.toString());
    res.render('Radiology/5-AR-template-master', { a: Encschema });
}

const AR_Temp_Mast_View =  async (req, res) => {
    const secretKey = "ll"
    const itemId = req.query.id;
    const id = decryptData(decodeURIComponent(itemId), secretKey);
  
    let data = '';
    if (id) {
      const TempMasRes = await Rad_TempMaDet.findByPk(id);
      
      data = { 
        id: TempMasRes.dataValues.id, 
        tmd_code: TempMasRes.dataValues.tmd_code, 
        description: TempMasRes.dataValues.description, 
        gender:TempMasRes.dataValues.gender,
        templateResult:TempMasRes.dataValues.templateResult,
        designTemplate:TempMasRes.dataValues.designTemplate
      }
  
      res.render('Radiology/6-AR-template-master-view', { data });
    } else {
      data = { id: '', tmd_code: '', description: '' ,gender:'',templateResult:'',designTemplate:''}
      res.render('Radiology/6-AR-template-master-view', { data });
    }
}

const define_Radio = async (req, res) => {
    res.render('Radiology/7-AR-template-master-define-radiologist');
}

const AR_Test_Master = async(req, res) => {
    res.render('Radiology/8-AR-test-master');
}

const AR_Test_Mast_View =  async (req, res) => {

    const secretKey = "ll"
    const itemId = req.query.id;
    const id = decryptData(decodeURIComponent(itemId), secretKey);
  
    let data = '';
    if (id) {
      const AnomScan = await Rad_AnomalyScan.findByPk(id);
      
      data = { 
        id: AnomScan.dataValues.id, 
        as_code: AnomScan.dataValues.as_code, 
        description: AnomScan.dataValues.description, 
        TAT:AnomScan.dataValues.TAT,
        printTN:AnomScan.dataValues.printTN,
        modality:AnomScan.dataValues.modality,
        services:AnomScan.dataValues.services
      }
  
      res.render('Radiology/9-AR-test-master-view', { data });
    } else {
      data = { id: '', as_code: '', description: '' ,TAT:'',printTN:'',modality:'',services:''}
      res.render('Radiology/9-AR-test-master-view', { data });
    }
}


//fetching details for our ejs view Pages:---
const ModalityDetails =  async (req, res) => {
    try {
      const modalityData = await Rad_ModalityDetails.findAll({});
  
      // Check if the data array is empty
      if (modalityData.length === 0) {
        return res.status(404).json({ msg: "No data available right now..." });
      }
  
      const encModData = modalityData.map(modalityData => {
        const encryptedId = encryptDataForUrl(modalityData.id.toString());
        return {
          ...modalityData.toJSON(),
          id: encryptedId,
        };
      });
  
      return res.status(200).json({ encModData });
  
    } catch (error) {
      console.error('Error fetching modality details:', error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

const TemplateResult =  async (req, res) => {
    try {
  
      const TempResult = await Rad_TempResDet.findAll();
  
      const TempData = TempResult.map(TempResult => {
        const encryptedId = encryptDataForUrl(TempResult.id.toString());
        return {
          ...TempResult.toJSON(),
          id: encryptedId,
        };
      });
  
      return res.status(200).json({ response: "OK", TempData })
  
    } catch (error) {
      console.error('Error fetching modality details:', error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

const TemplateMaster = async (req, res) => {
    try {
  
      const tempMaster = await Rad_TempMaDet.findAll();
      const TempMasData = tempMaster.map(tempMaster => {
        const encryptedId = encryptDataForUrl(tempMaster.id.toString());
        return {
          ...tempMaster.toJSON(),
          id: encryptedId,
        };
      });
  
      return res.status(200).json({ TempMasData });
  
    } catch (error) {
      console.error('Error fetching modality details:', error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

const TestMaster = async(req,res)=>{
    try {
      
      const TestMaster = await Rad_AnomalyScan.findAll();
      const TestMasData = TestMaster.map(TestMaster => {
        const encryptedId = encryptDataForUrl(TestMaster.id.toString());
        return {
          ...TestMaster.toJSON(),
          id: encryptedId,
        };
      });    
  
      return res.status(200).json({TestMasData})
  
    } catch (error) {
      console.error('Error fetching modality details:', error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

//Post Forms for updation and creation of Entries

const ModalityView = async (req, res) => {
    try {
      const modalityView = req.body;
  
      if (modalityView.id) {
        const data = await Rad_ModalityDetails.update(
          { description: modalityView.description },
          { where: { id: modalityView.id } }
        );
  
        return res.status(200).json({ msg: "Entree updated Successfully..." })
      }
  
      // Check for duplicate code number
      const dupCodeNum = await Rad_ModalityDetails.findOne({
        where: { md_code: modalityView.code },
      });
  
      if (dupCodeNum) {
        return res.status(400).json({ msg: "Code number already exists..." });
      }
  
      // Create a new entry in the Rad_ModalityDetails table
      await Rad_ModalityDetails.create({
        description: modalityView.description,
        md_code: modalityView.code,
      });
  
      return res.status(201).json({ msg: "New entry created..." });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

const TemplateResultDetails = async (req, res) => {
    try {
      const tempResult = req.body;
  
      if (tempResult.id) {
        const data = await Rad_TempResDet.update(
          { description: tempResult.description },
          { where: { id: tempResult.id } }
        );
  
        return res.status(200).json({ msg: "Entree updated Successfully..." })
      }
  
      // Checking for duplicate results in the Rad_TemplateResultDetails table
      const dupCodeNum = await Rad_TempResDet.findOne({
        where: { trd_code: tempResult.code }
      });
  
      if (dupCodeNum) {
        return res.status(400).json({ msg: "Code Number already exists..." });
      }
  
      // Creating a new entry in the Rad_TemplateResultDetails table
      await Rad_TempResDet.create({
        trd_code: tempResult.code,
        description: tempResult.description
      });
  
      return res.status(201).json({ msg: "New entry created..." });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

const TempMaster =  async (req, res) => {
    try {
      const tempMaster = req.body;
      
      if (tempMaster.id) {
        const data = await Rad_TempMaDet.update(
          { description: tempMaster.description, gender:tempMaster.gender, templateResult:tempMaster.templateResult,designTemplate: tempMaster.design_template },
          { where: { id: tempMaster.id } }
        );
  
        return res.status(200).json({ msg: "Entree updated Successfully..." })
      }
  
      // Check if the code number already exists
      const existingCode = await Rad_TempMaDet.findOne({
        where: { tmd_code: tempMaster.code }
      });
  
      if (existingCode) {
        return res.status(400).json({ msg: "Code number already registered..." });
      }
  
      // Create a new entry for the code number
      const newEntry = await Rad_TempMaDet.create({
        tmd_code: tempMaster.code,
        description: tempMaster.description,
        gender: tempMaster.gender,
        templateResult: tempMaster.templateResult,
        designTemplate: tempMaster.design_template
      });
  
      return res.status(200).json({ msg: "New entry created..." });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

const AnomalyScan =  async (req, res) => {
    try {
      const anomaly = req.body;
  
      if (anomaly.id) {
  
        const secretKey ="ll";
      const template = anomaly.selectedTemplates.map((template)=>{
        const temp =  decryptData(decodeURIComponent(template), secretKey);
        return temp;    
      })
      let tempId= '';
      template.map((temp)=>{
              tempId += `${temp},`;
      })
       console.log(tempId)
        const data = await Rad_AnomalyScan.update(
          { 
            description: anomaly.description, 
            TAT: anomaly.TAT,
            printTN: anomaly.PrintTestName,
            modality: anomaly.Modality,
            services: anomaly.Services,
            templateId:tempId
          },
          { where: { id: anomaly.id } }
        );
  
        return res.status(200).json({ msg: "Entree updated Successfully..." })
      }
  
      // Check for duplicate code number
      const existingAnomaly = await Rad_AnomalyScan.findOne({
        where: { as_code: anomaly.code }
      });
  
      if (existingAnomaly) {
        return res.status(400).json({ msg: "Code number already registered..." });
      }
      const secretKey ="ll";
      const template = anomaly.selectedTemplates.map((template)=>{
        const temp =  decryptData(decodeURIComponent(template), secretKey);
        return temp;    
      })
      let tempId = '';
      template.map((temp)=>{
              tempId += `${temp} ,`;
      })
  
      // Create new entry
      const newEntry = await Rad_AnomalyScan.create({
        as_code: anomaly.code,
        description: anomaly.description,
        TAT: anomaly.TAT,
        printTN: anomaly.PrintTestName,
        modality: anomaly.Modality,
        services: anomaly.Services,
        templateId:tempId
      });
  
      console.log(newEntry.dataValues);
      return res.status(201).json({ msg: "New entry created..." });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

const SaveStatusData = async (req, res) => {
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
      const Model = require('../models/Radiology')[schema];
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
}

module.exports = {
    AR_Modality,
    AR_Modality_View,
    AR_Temp_Res,
    AR_Temp_Res_View,
    AR_Temp_Mast_View,
    AR_Temp_Master,
    define_Radio,
    AR_Test_Master,
    AR_Test_Mast_View,
    ModalityDetails,
    TemplateResult,
    TemplateMaster,
    TestMaster,
    ModalityView,
    TemplateResultDetails,
    TempMaster,
    AnomalyScan,
    SaveStatusData
}