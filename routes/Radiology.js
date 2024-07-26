const radioRouter = require('express').Router();
const {
       AR_Modality,AR_Modality_View,AR_Temp_Res,
       AR_Temp_Res_View,AR_Temp_Mast_View,
       AR_Temp_Master,define_Radio,AR_Test_Master,
       AR_Test_Mast_View,ModalityDetails,
       TemplateResult,TemplateMaster,TestMaster,
       ModalityView,TemplateResultDetails,
       TempMaster,AnomalyScan,SaveStatusData} = require('../controllers/Radiology')


//Rendering Ejs files for Radiology
radioRouter.get('/1', AR_Modality);
radioRouter.get('/2', AR_Modality_View);
radioRouter.get('/3', AR_Temp_Res);
radioRouter.get('/4', AR_Temp_Res_View);
radioRouter.get('/5', AR_Temp_Master);
radioRouter.get('/6', AR_Temp_Mast_View);
radioRouter.get('/7', define_Radio);
radioRouter.get('/8', AR_Test_Master);
radioRouter.get('/9', AR_Test_Mast_View);

//fetching details for ejs files:---
radioRouter.get('/getModalityDetails',ModalityDetails);
radioRouter.get('/getTemplateResult', TemplateResult)
radioRouter.get('/getTemplateMaster', TemplateMaster)
radioRouter.get('/getTestMaster',TestMaster)

//Post Routes for the Radiology
radioRouter.post('/modalityView', ModalityView);
radioRouter.post('/templateResultDetails', TemplateResultDetails);
radioRouter.post('/templateMaster', TempMaster);
radioRouter.post('/anomalyScan', AnomalyScan);
radioRouter.post('/save-status-data', SaveStatusData);

module.exports = {
  radioRouter,
}