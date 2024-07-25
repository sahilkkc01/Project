const mongoose = require('mongoose');

const clinicConfigurationSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  clinic_code: {
    type: String
  },
  clinic_desc: {
    type: String
  },
  clinic_cont_no: {
    type: String
  },
  clinic_cont_no_2: {
    type: String
  },
  clinic_fax_no: {
    type: String
  },
  clinic_reg_no: {
    type: String
  },
  clinic_result_receive_data: {
    type: String
  },
  clinic_add_line1: {
    type: String
  },
  clinic_add_line2: {
    type: String
  },
  clinic_add_line_3: {
    type: String
  },
  clinic_country: {
    type: String
  },
  clinic_state: {
    type: String
  },
  clinic_city: {
    type: String
  },
  clinic_pincode: {
    type: String
  },
  clinic_area: {
    type: String
  },
  clinic_estb_no: {
    type: String
  },
  clinic_pan_no: {
    type: String
  },
  clinic_db: {
    type: String
  },
  clinic_server: {
    type: String
  },
  clinic_cluster: {
    type: String
  },
  clinic_tin_no: {
    type: String
  },
  clinic_gstin_no: {
    type: String
  }
});

const ClinicConfiguration = mongoose.model('ClinicConfiguration', clinicConfigurationSchema);

module.exports = ClinicConfiguration;
