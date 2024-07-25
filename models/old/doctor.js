const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  doc_name: {
    type: String
  },
  doc_dob: {
    type: Date
  },
  doc_spec: {
    type: String
  },
  doc_sub_spec: {
    type: String
  },
  doc_type: {
    type: String
  },
  doc_catg: {
    type: String
  },
  doc_mark_exec: {
    type: String
  },
  doc_gender: {
    type: String
  },
  doc_sign: {
    type: String
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
