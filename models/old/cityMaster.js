const mongoose = require('mongoose');

const cityMasterSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  city_master_code: {
    type: String,
    required: true
  },
  state_id: {
    type: String,
    required: true
  },
  city_id: {
    type: String,
    required: true
  },
  _country_id: {
    type: String,
    required: true
  }
});

const CityMaster = mongoose.model('CityMaster', cityMasterSchema);

module.exports = CityMaster;
