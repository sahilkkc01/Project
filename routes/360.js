var express = require('express');
const { getPatientByUHID } = require('../controllers/360Ctrl');
var router = express.Router();




router.get('/dash', function(req, res, next) {
    res.render('360');
  });

  router.get('/patient/:uhid', getPatientByUHID)

  module.exports=router;