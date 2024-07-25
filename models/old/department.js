const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  dept_code: {
    type: String
  },
  dept_desc: {
    type: String
  },
  dept_isClinic: {
    type: Boolean
  }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
