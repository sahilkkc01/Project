const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/submit', async (req, res) => {
 res.json({msg:"ok"})
});

module.exports = router;
