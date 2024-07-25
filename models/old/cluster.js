const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema({
  clinic_id: {
    type: String,
    default: '0'
  },
  cluster_code: {
    type: String
  },
  cluster_desc: {
    type: String
  }
});

const Cluster = mongoose.model('Cluster', clusterSchema);

module.exports = Cluster;
