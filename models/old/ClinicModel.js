const mongoose = require('mongoose');

const lf_clinicSchema = new mongoose.Schema({
  ll_clinic_id: { type: String, required: true, unique: true },
  ll_name: { type: String, required: true },
  ll_address: { type: String, required: true },
  ll_city: { type: String, required: true },
  ll_state: { type: String, required: true },
  ll_password: { type: String, required: true },
  ll_status: { type: String, required: true },
  ll_phone: { type: String, required: true },
  ll_email: { type: String, required: true },
}, { timestamps: true });

const Clinic = mongoose.model('Clinic', lf_clinicSchema);

module.exports = Clinic;
