const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  desg_code: {
    type: String
  },
  desg_desc: {
    type: String
  }
});

const Designation = mongoose.model('Designation', designationSchema);

module.exports = Designation;
