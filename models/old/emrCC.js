const mongoose = require('mongoose');

const emrCCSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  emrCC_code: {
    type: String
  },
  emrCC_desc: {
    type: String
  }
});

const EmrCC = mongoose.model('EmrCC', emrCCSchema);

module.exports = EmrCC;
