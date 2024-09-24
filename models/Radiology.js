const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Rad_ModalityDetails = sequelize.define(
  "Rad_ModalityDetails",
  {
    UserId: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    md_code: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "rad_modalitydetails",
  }
);

const Rad_TempResDet = sequelize.define(
  "Rad_TempResDet",
  {
    UserId: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    trd_code: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "rad_tempresdet",
  }
);

const Rad_TempMaDet = sequelize.define(
  "Rad_TempMasDet",
  {
    UserId: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    tmd_code: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    templateResult: {
      type: DataTypes.STRING,
    },
    designTemplate: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "rad_tempmasdet",
  }
);

const Rad_AnomalyScan = sequelize.define(
  "Rad_AnomalyScan",
  {
    UserId: {
      type: DataTypes.STRING,
      defaultValue: "0", // Updated to be a string default value; defaultValue should match the type
    },
    as_code: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    TAT: {
      type: DataTypes.STRING,
    },
    printTN: {
      type: DataTypes.STRING,
    },
    modality: {
      type: DataTypes.STRING,
    },
    services: {
      type: DataTypes.STRING,
    },
    templateId: {
      type: DataTypes.STRING, // Changed to store an array of integers
    },
  },
  {
    timestamps: true,
    tableName: "rad_anomalyscan",
  }
);

module.exports = {
  Rad_ModalityDetails,
  Rad_TempResDet,
  Rad_TempMaDet,
  Rad_AnomalyScan,
};
