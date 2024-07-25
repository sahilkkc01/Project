const mongoose = require('mongoose');

const countryMasterSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  country_master_code: {
    type: String
  },
  country_master_name: {
    type: String
  },
  country_master_nationality: {
    type: String
  }
});

const CountryMaster = mongoose.model('CountryMaster', countryMasterSchema);

module.exports = CountryMaster;
