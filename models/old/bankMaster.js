const mongoose = require('mongoose');

const bankMasterSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  bank_code: {
    type: String,
  },
  bank_description: {
    type: String,
  },
  branch_code: {
    type: String
  },
  branch_description: {
    type: String
  },
  bank: {
    type: String
  },
  bank_micr_number: {
    type: String
  }
});

const BankMaster = mongoose.model('BankMaster', bankMasterSchema);

module.exports = BankMaster;
