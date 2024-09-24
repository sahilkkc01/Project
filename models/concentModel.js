const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const PR_patientReg = sequelize.define(
  "PR_patientReg",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mr_no: {
      type: DataTypes.STRING(255),
    },
    ArtBankName: {
      type: DataTypes.TEXT,
    },
    Agent: {
      type: DataTypes.TEXT,
    },
    patientImg: {
      type: DataTypes.STRING,
    },
    spouseImg: {
      type: DataTypes.STRING,
    },
    ReferralDetails: {
      type: DataTypes.TEXT,
    },
    RegistrationType: {
      type: DataTypes.TEXT,
    },
    SorOfRef: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.TEXT,
    },
    age_days: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    age_months: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    age_years: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    altMobileNo: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    area: {
      type: DataTypes.TEXT,
    },
    bloodGroup: {
      type: DataTypes.STRING(10),
      defaultValue: "",
    },
    camp: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.TEXT,
    },
    clinic_status: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    company_name: {
      type: DataTypes.TEXT,
    },
    country: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    date: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    Gender: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    dob: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    education: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    familyName: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    fatherName: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    firstName: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    id_proof_number: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    id_proof_type: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    inHouseDoctor: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    is_vip: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    is_employee: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    is_insured: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    is_international: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    externalDoctor: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    landlineNo: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    lastName: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    marital_status: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    marriage_anniversary: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    middleName: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    mobileNo: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    mobile_1: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    mobile_2: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    occupation: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    phone1: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    phone2: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    pin_code: {
      type: DataTypes.STRING(20),
      defaultValue: "",
    },
    prefix: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    religion: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },

    special_registration: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    state: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_address: {
      type: DataTypes.TEXT,
    },
    spouse_age_day: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    spouse_age_month: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    spouse_age_year: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    spouse_area: {
      type: DataTypes.TEXT,
    },
    spouse_blood_group: {
      type: DataTypes.STRING(10),
      defaultValue: "",
    },
    spouse_city: {
      type: DataTypes.TEXT,
    },
    spouse_company_name: {
      type: DataTypes.TEXT,
    },
    spouse_country: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_dob: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    spouse_education: {
      type: DataTypes.TEXT,
    },
    spouse_email: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_familyName: {
      type: DataTypes.TEXT,
    },
    spouse_firstName: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_gender: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    spouse_id_proof: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_id_proof_number: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_is_international: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    spouse_lastName: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_marital_status: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    spouse_marriage_anniversary: {
      type: DataTypes.STRING,
    },
    spouse_middleName: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_mobile_1: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_mobile_2: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_motherName: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_nationality: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_occupation: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_pin_code: {
      type: DataTypes.STRING(20),
      defaultValue: "",
    },
    spouse_preferred_language: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    spouse_prefix: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    spouse_religion: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    spouse_residence_phone_1: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_residence_phone_2: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_residence_phone_3: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    spouse_special_registration: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    spouse_state: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    sponsor_associated_company: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    sponsor_company: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    sponsor_investigation_no: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    sponsor_member_relation: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    sponsor_patient_category: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    sponsor_patient_source: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    sponsor_remark: {
      type: DataTypes.TEXT,
    },
    sponsor_tariff: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    ifsc_code: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    branch: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    bank_name: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    account_type: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    account_no: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    account_holder: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
  },
  {
    timestamps: true, // Set to true if you have createdAt and updatedAt columns
    alter: true,
    tableName: "pr_patientreg", // Ensure the table name is as per your database
  }
);

const concent = sequelize.define(
  "concent",
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Cname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Cfile: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Cstatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Csection: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    alert: true,
    tableName: "concent",
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = {
  PR_patientReg,
  concent,
};
