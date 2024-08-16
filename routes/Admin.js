var express = require('express');
var router = express.Router();
var path = require('path');
var CryptoJS = require('crypto-js')
const session = require('express-session');
const { AdminSubmit, getAdmin } = require('../controllers/SuperAdmin');
const { SuperAdmin } = require('../models/Admin');
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


function decryptData(encryptedData, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/* GET home page. */
router.get('/1', function(req, res, next) {
  
  res.render('Admin/Admin_Listing');
});
router.get('/2', async(req,res)=>{
  const { id } = req.query;
  const decryptedId =decryptData(decodeURIComponent(id), 'll');
  if (id) {
  
    try {
      const dataAdmin = await SuperAdmin.findByPk(decryptedId);
      const AdminValues = dataAdmin.get({ plain: true });
      console.log('ssd',AdminValues)
      res.render('Admin/admin.ejs',{result:AdminValues})
    } catch (error) {
      console.error('Error fetching  data:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.render('Admin/admin.ejs',{result:""})
    }
   

  });



router.get('/getAdmin',getAdmin)


router.post('/AdminSubmit',AdminSubmit)

router.post('/save-status-data', async (req, res) => {
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
      const Model = require('../models/Admin')[schema]; 
      const data = await Model.findByPk(id);

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

module.exports = router;
