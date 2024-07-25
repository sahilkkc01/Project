const mongoose = require('mongoose');

const cashCounterMasterSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  cash_counter_master_code: {
    type: String,
    required: true
  },
  cash_counter_name: {
    type: String,
    required: true
  },
  cash_counter_clinic_name: {
    type: String,
    required: true
  }
});

const CashCounterMaster = mongoose.model('CashCounterMaster', cashCounterMasterSchema);

module.exports = CashCounterMaster;
