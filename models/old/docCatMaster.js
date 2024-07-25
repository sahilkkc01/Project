const mongoose = require('mongoose');

const docCatMasterSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  doc_cat_master_code: {
    type: String
  },
  doc_cat_master_desc: {
    type: String
  }
});

const DocCatMaster = mongoose.model('DocCatMaster', docCatMasterSchema);

module.exports = DocCatMaster;
