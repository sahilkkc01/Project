var express = require('express');
var router = express.Router();



router.get('/1', (req, res) => {

    res.render('ApplicationConfig/application-configuration')
})



module.exports = router;
