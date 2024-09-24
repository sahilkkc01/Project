const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const KYC = sequelize.define(
  "KYC",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clinic_id: { type: DataTypes.STRING, defaultValue: "0" },
    lead_no: { type: DataTypes.STRING },
    lead_date: { type: DataTypes.DATE },
    patient_name: { type: DataTypes.STRING },
    patient_age: { type: DataTypes.INTEGER },
    patient_gender: { type: DataTypes.STRING },
    spouce_name: { type: DataTypes.STRING },
    spouce_age: { type: DataTypes.INTEGER },
    married_life: { type: DataTypes.INTEGER },
    contact_no_wife: { type: DataTypes.STRING }, // Assuming phone numbers can be stored as strings
    contact_no_husband: { type: DataTypes.STRING },
    whatsapp_no: { type: DataTypes.STRING },
    email_id: { type: DataTypes.STRING },
    area: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    pincode: { type: DataTypes.INTEGER },
    past_history: { type: DataTypes.JSON }, // Assuming past_history can be stored as JSON data type
    source: { type: DataTypes.STRING },
    campaign: { type: DataTypes.STRING },
    lead_owner: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING(500) },
    reference: { type: DataTypes.STRING },
  },
  {
    tableName: "kycs",
    timestamps: true,
    alter:true
    // Other model options if needed
  }
);
//reports
const kycReports = sequelize.define(
  "kycReports",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kyc_id: { type: DataTypes.STRING },
    report: { type: DataTypes.STRING },
    remark: { type: DataTypes.STRING },
  },
  {
    tableName: "kycreports",
    timestamps: true,
  }
);

const CrmFu_record = sequelize.define(
  "CrmFu_record",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kyc_id: { type: DataTypes.STRING },
    remark: { type: DataTypes.STRING(500) },
    fu_status: { type: DataTypes.STRING },
    fu_next_call: { type: DataTypes.STRING },
    fu_next_call_time: { type: DataTypes.STRING },
  },
  {
    tableName: "crmfu_records",
    timestamps: true,
  }
);
const CrmApt_record = sequelize.define(
  "CrmApt_record",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kyc_id: { type: DataTypes.STRING },
    clinic: { type: DataTypes.STRING },
    doctor: { type: DataTypes.STRING },
    apt_date: { type: DataTypes.DATE },
    apt_time: { type: DataTypes.STRING },
    apt_status: { type: DataTypes.STRING },
  },
  {
    tableName: "crmapt_records",
    timestamps: true,
    // Other model options if needed
  }
);
const CrmVis_record = sequelize.define(
  "CrmVis_record",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kyc_id: { type: DataTypes.STRING },
    uhid_no: { type: DataTypes.STRING },
    apt_date: { type: DataTypes.STRING },
    clinic: { type: DataTypes.STRING },
    doctor: { type: DataTypes.STRING },
    councelor: { type: DataTypes.STRING },
    treatment: { type: DataTypes.STRING },
    package: { type: DataTypes.STRING },
    visited_status: { type: DataTypes.STRING },
    remark: { type: DataTypes.STRING },
    next_call: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "crmvis_records",
    timestamps: true,
    // Other model options if neede
  }
);

const CrmConv_record = sequelize.define(
  "CrmConv_record",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kyc_id: { type: DataTypes.STRING },

    uhid_no: { type: DataTypes.STRING },

    clinic: { type: DataTypes.STRING },
    doctor: { type: DataTypes.STRING },

    treatment: { type: DataTypes.STRING },
    package: { type: DataTypes.STRING },
    con_date: { type: DataTypes.STRING },
  },
  {
    tableName: "crmconv_records",
    timestamps: true,
    // Other model options if needed
  }
);

const Admin = sequelize.define(
  "Admin",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
    },
    userEmail: {
      type: DataTypes.STRING,
    },
    userMobile: {
      type: DataTypes.STRING,
    },
    userPassword: {
      type: DataTypes.STRING,
    },
    userRole: {
      type: DataTypes.STRING,
    },
    userStatus: {
      type: DataTypes.BOOLEAN,
    },
    clinicId: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "admins",
    timestamps: true,
    alter:true
  }
);

// Sync the model with the database
// sequelize.sync();

module.exports = {
  KYC,
  Admin,
  CrmFu_record,
  CrmApt_record,
  CrmVis_record,
  CrmConv_record,
  kycReports,
};
