const mongoose = require('mongoose');

const classificationSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  classification_code: {
    type: String,
    required: true
  },
  classification_description: {
    type: String,
    required: true
  }
});

const Classification = mongoose.model('Classification', classificationSchema);

module.exports = Classification;
