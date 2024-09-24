const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const SemenSample = sequelize.define(
  "SemenSample",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    clinchId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    parent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Storage: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "collected",
    },
    stage: {
      type: DataTypes.STRING,
      defaultValue: "Fresh",
    },
    date_of_collect: {
      type: DataTypes.DATE,
    },
    time_of_collect: {
      type: DataTypes.TIME,
    },
    sexual_abstinence_days: {
      type: DataTypes.INTEGER,
    },
    ph_value: {
      type: DataTypes.STRING,
    },
    collected_method: {
      type: DataTypes.STRING,
    },
    received_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time_of_receiving: {
      type: DataTypes.TIME,
    },
    no_of_labels: {
      type: DataTypes.INTEGER,
    },
    received_by: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "embro_semen_sample_collection",
    timestamps: true,
  }
);

const PR_patientReg = sequelize.define(
  "PR_patientReg",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    height: { type: DataTypes.STRING, defaultValue: "" },
    weight: { type: DataTypes.STRING, defaultValue: "" },
    bmi: { type: DataTypes.STRING, defaultValue: "" },
    gender: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    coupleId: { type: DataTypes.STRING, defaultValue: "" },

    mr_no: {
      type: DataTypes.STRING(255),
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    AgencyName: {
      type: DataTypes.TEXT,
    },
    Agent: {
      type: DataTypes.TEXT,
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
    residence_phone_1: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    residence_phone_2: {
      type: DataTypes.STRING(100),
      defaultValue: "",
    },
    residence_phone_3: {
      type: DataTypes.STRING(100),
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
    tableName: "pr_patientReg", // Ensure the table name is as per your database
  }
);

const WashSemenSample = sequelize.define(
  "WashSemenSample",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    clinchId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    sample_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    collected_on: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    mrn: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    fresh: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    capacitated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    capacitatedData: {
      type: DataTypes.JSON,
    },
    volume: {
      type: DataTypes.FLOAT,
    },
    concentration: {
      type: DataTypes.FLOAT,
    },
    total_sperm: {
      type: DataTypes.FLOAT,
    },
    rapid_progressive: {
      type: DataTypes.FLOAT,
    },
    slow_progressive: {
      type: DataTypes.FLOAT,
    },
    non_progressive: {
      type: DataTypes.FLOAT,
    },
    immobile: {
      type: DataTypes.FLOAT,
    },
    total_motile_prog: {
      type: DataTypes.FLOAT,
    },
    normal_in: {
      type: DataTypes.FLOAT,
    },
    abnormal_in: {
      type: DataTypes.FLOAT,
    },
    head_defects: {
      type: DataTypes.FLOAT,
    },
    mid_piece_defects: {
      type: DataTypes.FLOAT,
    },
    tail_defects: {
      type: DataTypes.FLOAT,
    },
    excess_residual_cytoplasm: {
      type: DataTypes.FLOAT,
    },
    teratoz_index: {
      type: DataTypes.FLOAT,
    },
    normal_prog_motile: {
      type: DataTypes.FLOAT,
    },
    semen_appearance: {
      type: DataTypes.STRING,
    },
    homogenize: {
      type: DataTypes.STRING,
    },
    complete_sample: {
      type: DataTypes.STRING,
    },
    diagnosis: {
      type: DataTypes.STRING,
    },
    degree_of_diagnosis: {
      type: DataTypes.STRING,
    },
    vitality_test_method: {
      type: DataTypes.STRING,
    },
    vitality_test_in: {
      type: DataTypes.STRING,
    },
    viscosity: {
      type: DataTypes.STRING,
    },
    washing_technique: {
      type: DataTypes.STRING,
    },
    washing_done_by: {
      type: DataTypes.STRING,
    },
    large_halo: {
      type: DataTypes.FLOAT,
    },
    medium_halo: {
      type: DataTypes.FLOAT,
    },
    small_halo: {
      type: DataTypes.FLOAT,
    },
    no_halo: {
      type: DataTypes.FLOAT,
    },
    fragmented: {
      type: DataTypes.FLOAT,
    },
    non_fragmented: {
      type: DataTypes.FLOAT,
    },
    total: {
      type: DataTypes.FLOAT,
    },
    dfi_percent: {
      type: DataTypes.FLOAT,
    },
    manual_calculation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    macs_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hba: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dfi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    picsi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    general_remarks: {
      type: DataTypes.STRING,
    },
    private_remarks: {
      type: DataTypes.STRING,
    },

    bound_motile_sperm: {
      type: DataTypes.FLOAT,
    },
    non_bound_motile_sperm: {
      type: DataTypes.FLOAT,
    },
    total_hba: {
      type: DataTypes.FLOAT,
    },
    hba_positive_sperm_percent: {
      type: DataTypes.FLOAT,
    },
    hba_negative_sperm_percent: {
      type: DataTypes.FLOAT,
    },
    total_percent: {
      type: DataTypes.FLOAT,
    },
    total: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "embro_wash_semen_sample",
    timestamps: true,
  }
);

const DiscardedSample = sequelize.define(
  "DiscardedSample",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    clinchId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    patient_id: {
      type: DataTypes.INTEGER,
    },
    sample_id: {
      type: DataTypes.INTEGER,
    },
    discardDate: {
      type: DataTypes.DATE,
    },
    discardTime: {
      type: DataTypes.TIME,
    },
    discarded_by: {
      type: DataTypes.STRING,
    },
    reason_for_discard: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "embrodiscarded_samples",
    timestamps: true,
  }
);

const EmbryoTransfer = sequelize.define(
  "EmbryoTransfer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    embryosTransferred: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
    },
    catheter: {
      type: DataTypes.ENUM(
        "COOK Soft",
        "Embryo Transfer Catheter",
        "Gynetics-Tulip",
        "Hard",
        "IUI Catheter",
        "Labotech",
        "Obturator",
        "Soft",
        "Wallace"
      ),
      allowNull: true,
      defaultValue: null,
    },
    difficulty: {
      type: DataTypes.ENUM("Difficult", "Easy", "Impossible", "Moderate"),
      allowNull: true,
      defaultValue: null,
    },
    transferDFE: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    ecoguided: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    mucous: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    blood: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    repetition: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    bladder: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    allies: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    dilator: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    doctor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    embryologist: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    cycle_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    // sequelize, // We need to pass the connection instance
    modelName: "EmbryoTransfer", // Model name
    tableName: "embryo_transfers", // Table name
  }
);

// const EmbryoTransfer = sequelize.define('EmbryoTransfer', {
//     userId: {
//         type: DataTypes.INTEGER,
//         defaultValue: 1
//     },
//     clinchId: {
//         type: DataTypes.INTEGER,
//         defaultValue: 1
//     },
//     cycleId: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0,
//     },
//     patient_Id: {
//         type: DataTypes.INTEGER,
//     },
//     date: {
//         type: DataTypes.DATEONLY
//     },
//     time: {
//         type: DataTypes.TIME
//     },
//     embryos_id: {
//         type: DataTypes.STRING,
//     },
//     catheter: {
//         type: DataTypes.STRING
//     },
//     difficulty: {
//         type: DataTypes.STRING
//     },
//     transfer_dfe: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     ecoguided: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     repetition: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     blood: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     mucous: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     bladder: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     allies: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     dialator: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     comments: {
//         type: DataTypes.TEXT
//     },
//     doctor: {
//         type: DataTypes.STRING
//     },
//     embryologist: {
//         type: DataTypes.STRING
//     }
// }, {
//     timestamps: true,
//     tableName: 'embroEmbryoTransfer'
// });

const CanisterData = sequelize.define(
  "embryo_sperm_freezeData",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    clinchId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    patient_id: {
      type: DataTypes.INTEGER,
    },
    sample_id: {
      type: DataTypes.INTEGER,
    },
    canister: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    freeze_in: {
      type: DataTypes.ENUM("vials", "straws"),
      allowNull: false,
    },
    actual_date_renewal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    done_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    term_duration: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    vial_holder: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vial_position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "embryo_sperm_freezeData", // You can specify the table name if it is different
    timestamps: false, // Disable timestamps if you don't need createdAt/updatedAt fields
  }
);

// stimulation and culture model

const treatmentAdvice = sequelize.define(
  "treatmentAdvice",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    treatment: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "emb_treatmentadvice",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);

const chiefComplaint = sequelize.define(
  "chiefComplaint",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    complaint: {
      type: DataTypes.JSON,
    },
    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_chiefcomplaint",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);

const preExistingCondition = sequelize.define(
  "preExistingCondition",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    preCondition: {
      type: DataTypes.JSON,
    },
    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_preexistingcondition",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);
const allergies = sequelize.define(
  "allergies",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    allergies: {
      type: DataTypes.JSON,
    },
    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_allergies",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);
//   const patientHistory = sequelize.define('patientHistory', {
//     clinic_id:{
//       type:DataTypes.INTEGER,
//       defaultValue:0
//     },
//     patientId: {
//         type: DataTypes.STRING,
//     },
//     doctorId: {
//         type: DataTypes.STRING,
//     },
//     Htype: {
//         type: DataTypes.STRING,

//     },
//     hchiefComplaint: {
//         type: DataTypes.STRING,
//     },
//     height: {
//         type: DataTypes.NUMBER,
//     },
//     weight: {
//         type: DataTypes.NUMBER,
//     },
//     bmi: {
//         type: DataTypes.DECIMAL(10,2),
//     },
//     bloodGroup: {
//         type: DataTypes.STRING,
//     },
//     pulse: {
//         type: DataTypes.NUMBER,
//     },
//     Bp: {
//         type: DataTypes.JSON,
//     },
//     durationInf: {
//         type: DataTypes.JSON,
//     },
//     marriageAge: {
//         type: DataTypes.NUMBER,
//     },
//     comment: {
//         type: DataTypes.TEXT,
//     },
//     note: {
//         type: DataTypes.TEXT,
//     },
//     Lmp: {
//         type: DataTypes.DATEONLY,
//     },
//     mH: {
//         type: DataTypes.JSON,
//     },
//     mHComment:{
//         type:DataTypes.STRING(2000)
//     },
//     fHComment: {
//         type: DataTypes.STRING(2000),
//     },
//     medicalHistory: {
//         type: DataTypes.JSON,
//     },
//     medicalHComment: {
//         type: DataTypes.STRING(2000),
//     },
//     oHPara: {
//         type: DataTypes.INTEGER(2),
//     },
//     oHAbortion: {
//         type: DataTypes.INTEGER(2),
//     },
//     oHEcotopic: {
//         type: DataTypes.INTEGER(2),
//     },
//     oHLiveBirth: {
//         type: DataTypes.INTEGER(2),
//     },
//     oHPregnancy: {
//         type: DataTypes.JSON,
//     },
//     rPL: {
//         type: DataTypes.STRING(3),
//     },
//     oHistoryComment: {
//         type: DataTypes.STRING(2000),
//     },
//     pastInfInvestigation:{
//         type:DataTypes.JSON,
//     },
//     pIIComment:{
//         type:DataTypes.STRING(2000),
//     },
//     partnerheight: {
//         type: DataTypes.NUMBER,
//     },
//     partnerweight: {
//         type: DataTypes.NUMBER,
//     },
//     partnerbmi: {
//         type: DataTypes.DECIMAL(10,2),
//     },
//     partnerbloodGroup: {
//         type: DataTypes.STRING,
//     },
//     partnerpulse: {
//         type: DataTypes.NUMBER,
//     },
//     partnerBp: {
//         type: DataTypes.JSON,
//     },
//     partnerComment:{
//         type:DataTypes.STRING(2000),
//     },
//     partnerPInfInv:{
//         type:DataTypes.JSON
//     },
//     otherRelH:{
//         type:DataTypes.STRING(2000),
//     },
//     Date: {
//         type: DataTypes.DATEONLY,
//     },
//   }, {
//     tableName: 'emb_patienthistory',
//     alter:true,
//     timestamps: true // Enable this if you want createdAt and updatedAt timestamps
//   });
const treatmentHist = sequelize.define(
  "treatmentHist",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    treatHist: {
      type: DataTypes.JSON,
    },
    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_treatmenthist",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);

const GeneralExamination = sequelize.define(
  "GeneralExamination",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    GeneralExamination: {
      type: DataTypes.JSON,
    },
    UsgExamination: {
      type: DataTypes.JSON,
    },

    comments: {
      type: DataTypes.TEXT, // Maximum of 2000 characters
    },
    notesAdvice: {
      type: DataTypes.TEXT, // Maximum of 2000 characters
    },
  },
  {
    timestamps: true,
    alter: true,
    tableName: "emb_generalExaminations",
  }
);

const diagnosis = sequelize.define(
  "diagnosis",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    infType: {
      type: DataTypes.STRING,
    },
    maleFactor: {
      type: DataTypes.STRING,
    },
    maleFactorRemarks: {
      type: DataTypes.STRING,
    },
    femaleFactor: {
      type: DataTypes.STRING,
    },
    femaleFactorRemarks: {
      type: DataTypes.STRING,
    },
    karyotypeAbnormality: {
      type: DataTypes.STRING,
    },
    karyotypeAbnormalityRemarks: {
      type: DataTypes.STRING,
    },
    noOfInfYear: {
      type: DataTypes.INTEGER(3),
    },
    other: {
      type: DataTypes.STRING,
    },

    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_diagnosis",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);

const doctorNotes = sequelize.define(
  "doctorNotes",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    doctorNotes: {
      type: DataTypes.JSON,
    },
    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_doctornotes",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);

const serviceAdvice = sequelize.define(
  "serviceAdvice",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    ServiceAdvice: {
      type: DataTypes.JSON,
    },
    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_serviceadvices",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);

const prescription = sequelize.define(
  "prescription",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    prescribedMedicine: {
      type: DataTypes.JSON,
    },
    prescribedComment: {
      type: DataTypes.STRING,
    },
    favourites: {
      type: DataTypes.STRING,
    },
    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_prescription",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);

const attachments = sequelize.define(
  "attachments",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    attachment: {
      type: DataTypes.JSON,
    },
    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_attachments",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);

const FollowUp = sequelize.define(
  "FollowUp",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    followUp: {
      type: DataTypes.JSON,
      // Assuming this field is optional
    },
  },
  {
    tableName: "emb_followups",
    alter: true,
    timestamps: true, // Assuming you want to track creation and update timestamps
  }
);

const procedureAdvice = sequelize.define(
  "procedureAdvice",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    procedure: {
      type: DataTypes.JSON,
      // Assuming this field is optional
    },
  },
  {
    tableName: "emb_procedureadvice",
    alter: true,
    timestamps: true, // Assuming you want to track creation and update timestamps
  }
);

const Day0Record = sequelize.define(
  "Day0Record",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Date: {
      type: DataTypes.DATEONLY, // Store the entire table data as JSON
    },
    Time: {
      type: DataTypes.TIME, // Store the entire table data as JSON
    },
    FertiMethod: {
      type: DataTypes.STRING,
    },
    primEmbrologist: {
      type: DataTypes.STRING,
    },
    secEmbrologist: {
      type: DataTypes.STRING,
    },
    incubator: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    reportData: {
      type: DataTypes.JSON, // Store the entire table data as JSON
    },
  },
  {
    tableName: "emb_day0record", // Customize the table name if necessary
    alter: true,
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Day1Record = sequelize.define(
  "Day1Record",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    primEmbrologist: {
      type: DataTypes.STRING,
    },
    secEmbrologist: {
      type: DataTypes.STRING,
    },
    Date: {
      type: DataTypes.DATEONLY, // Store the entire table data as JSON
    },
    incubator: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    reportData: {
      type: DataTypes.JSON, // Store the entire table data as JSON
    },
  },
  {
    tableName: "emb_day1record", // Customize the table name if necessary
    alter: true,
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Day2Record = sequelize.define(
  "Day2Record",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Date: {
      type: DataTypes.DATEONLY, // Store the entire table data as JSON
    },
    primEmbrologist: {
      type: DataTypes.STRING,
    },
    secEmbrologist: {
      type: DataTypes.STRING,
    },
    incubator: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    reportData: {
      type: DataTypes.JSON, // Store the entire table data as JSON
    },
  },
  {
    tableName: "emb_day2record", // Customize the table name if necessary
    alter: true,
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);
const Day3Record = sequelize.define(
  "Day3Record",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Date: {
      type: DataTypes.DATEONLY, // Store the entire table data as JSON
    },
    primEmbrologist: {
      type: DataTypes.STRING,
    },
    secEmbrologist: {
      type: DataTypes.STRING,
    },
    incubator: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    reportData: {
      type: DataTypes.JSON, // Store the entire table data as JSON
    },
  },
  {
    tableName: "emb_day3record", // Customize the table name if necessary
    alter: true,
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Day4Record = sequelize.define(
  "Day4Record",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Date: {
      type: DataTypes.DATEONLY, // Store the entire table data as JSON
    },
    primEmbrologist: {
      type: DataTypes.STRING,
    },
    secEmbrologist: {
      type: DataTypes.STRING,
    },
    incubator: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    reportData: {
      type: DataTypes.JSON, // Store the entire table data as JSON
    },
  },
  {
    tableName: "emb_day4record", // Customize the table name if necessary
    alter: true,
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);
const Day5Record = sequelize.define(
  "Day5Record",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Date: {
      type: DataTypes.DATEONLY, // Store the entire table data as JSON
    },
    primEmbrologist: {
      type: DataTypes.STRING,
    },
    secEmbrologist: {
      type: DataTypes.STRING,
    },
    incubator: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    reportData: {
      type: DataTypes.JSON, // Store the entire table data as JSON
    },
  },
  {
    tableName: "emb_day5record", // Customize the table name if necessary
    alter: true,
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);
const Day6Record = sequelize.define(
  "Day6Record",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    primEmbrologist: {
      type: DataTypes.STRING,
    },
    Date: {
      type: DataTypes.DATEONLY, // Store the entire table data as JSON
    },
    secEmbrologist: {
      type: DataTypes.STRING,
    },
    incubator: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
    },
    reportData: {
      type: DataTypes.JSON, // Store the entire table data as JSON
    },
  },
  {
    tableName: "emb_day6record", // Customize the table name if necessary
    alter: true,
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const SpermAdvanceResult = sequelize.define(
  "SpermAdvanceResult",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    referenceDate: {
      type: DataTypes.STRING,
    },
    referenceNo: {
      type: DataTypes.STRING,
    },
    clinic: {
      type: DataTypes.STRING,
    },
    uhid: {
      type: DataTypes.STRING,
    },
    patientAccount: {
      type: DataTypes.STRING,
    },
    patientRegistration: {
      type: DataTypes.STRING,
    },
    investigationRequestNo: {
      type: DataTypes.STRING,
    },
    investigationType: {
      type: DataTypes.STRING,
    },
    sampleReceivingDate: {
      type: DataTypes.DATEONLY,
    },
    sampleReceivingTime: {
      type: DataTypes.TIME,
    },
    sampleTakenDate: {
      type: DataTypes.DATEONLY,
    },
    sampleTakenTime: {
      type: DataTypes.TIME,
    },
    spermCollectionType: {
      type: DataTypes.STRING,
    },
    collectionAt: {
      type: DataTypes.STRING,
    },
    preparedBy: {
      type: DataTypes.STRING,
    },
    checkedBy: {
      type: DataTypes.STRING,
    },
    remark: {
      type: DataTypes.STRING,
    },
    anySpillageReported: {
      type: DataTypes.STRING,
    },
    volume: {
      type: DataTypes.STRING,
    },
    visualAppearance: {
      type: DataTypes.STRING,
    },
    examinationInitiatedTime: {
      type: DataTypes.STRING,
    },
    examinationEndTime: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    liquefaction: {
      type: DataTypes.STRING,
    },
    liquefactionTime: {
      type: DataTypes.STRING,
    },
    ph: {
      type: DataTypes.STRING,
    },
    viscosity: {
      type: DataTypes.STRING,
    },
    abstinencePeriod: {
      type: DataTypes.STRING,
    },
    spermConcentration: {
      type: DataTypes.STRING,
    },
    totalSpermNumber: {
      type: DataTypes.STRING,
    },
    rapidProgressive: {
      type: DataTypes.STRING,
    },
    slowProgressive: {
      type: DataTypes.STRING,
    },
    prProgressive: {
      type: DataTypes.STRING,
    },
    nonProgressive: {
      type: DataTypes.STRING,
    },
    totalMotile: {
      type: DataTypes.STRING,
    },
    immotile: {
      type: DataTypes.STRING,
    },
    debrisName: {
      type: DataTypes.STRING,
    },
    roundCells: {
      type: DataTypes.STRING,
    },
    agglutinationName: {
      type: DataTypes.STRING,
    },
    aggregationName: {
      type: DataTypes.STRING,
    },
    enterViability: {
      type: DataTypes.STRING,
    },
    spermViability: {
      type: DataTypes.STRING,
    },
    fructoseName: {
      type: DataTypes.STRING,
    },
    peroxidasePositiveCollisConcentration: {
      type: DataTypes.STRING,
    },
    systemImpression: {
      type: DataTypes.STRING,
    },
    impression: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "emb_spermadvanceresult", // Customize the table name if necessary
    alter: true,
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const stimulation = sequelize.define(
  "stimulation",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dayId: {
      type: DataTypes.INTEGER,
    },
    StimulationRows: {
      type: DataTypes.JSON,
      // Assuming this field is optional
    },
  },
  {
    tableName: "emb_stimulation",
    alter: true,
    timestamps: true, // Assuming you want to track creation and update timestamps
  }
);

const StimulationSubmit = sequelize.define(
  "StimulationSubmit",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    stimulationCompletedOn: {
      type: DataTypes.DATEONLY,
    },
    readyForOpu: {
      type: DataTypes.BOOLEAN,
    },
    failedCycle: {
      type: DataTypes.BOOLEAN,
    },
    reasonForFailure: {
      type: DataTypes.STRING,
    },
    stimulationRecordedBy: {
      type: DataTypes.STRING,
    },
    transfer: {
      type: DataTypes.STRING,
    },
    atrBa: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.TEXT,
    },
    firstTrigger: {
      type: DataTypes.JSON,
    },
    secondTrigger: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "emb_stimulationSubmit",
    alter: true,
    timestamps: true,
  }
);

const ScheduleEt = sequelize.define(
  "ScheduleEt",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    etDate: {
      type: DataTypes.DATEONLY,
    },
    etTime: {
      type: DataTypes.TIME,
    },
    etTimeERA: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    reviewedBy: {
      type: DataTypes.STRING,
    },
    fertStatus: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  {
    tableName: "emb_schedule_et",
    alter: true,
    timestamps: true, // createdAt and updatedAt fields are automatically added
  }
);

const Outcome = sequelize.define(
  "Outcome",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    clinicalPregnancyDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clinicalPregnancyRecordedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clinicalPregnancyLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    noOfSac: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clinicalPregnancyObservations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ongoingPregnancyObservations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    miscarriageDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    miscarriageTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    abortionType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clinicalMiscarriageObservations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deliveryDate2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthRecordedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modeOfDelivery: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neonatalComplications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postPartumMaternalComplications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    birthDetailsObservations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "emb_outcome_records",
    alter: true,
    timestamps: true, // createdAt and updatedAt fields are automatically added
  }
);

const ovumSchedule = sequelize.define(
  "ovumSchema",
  {
    cycleId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    clinchId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    Date: {
      type: DataTypes.DATE,
    },
    Time: {
      type: DataTypes.TIME,
    },
    Surgeon: {
      type: DataTypes.STRING,
    },
    AssistantSurgeon: {
      type: DataTypes.STRING,
    },
    Anesthetist: {
      type: DataTypes.STRING,
    },
    AnesthesiaType: {
      type: DataTypes.STRING,
    },
    PrimaryEmbryologist: {
      type: DataTypes.STRING,
    },
    SecondaryEmbryologist: {
      type: DataTypes.STRING,
    },
    OPUNotes: {
      type: DataTypes.STRING,
    },
    NoOfRightFollicles: {
      type: DataTypes.INTEGER,
    },
    NoOfLeftFollicles: {
      type: DataTypes.INTEGER,
    },
    NoOfOocytes: {
      type: DataTypes.INTEGER,
    },
    DenudationDate: {
      type: DataTypes.DATE,
    },
    DenudationTime: {
      type: DataTypes.TIME,
    },
    DenudationDoneBy: {
      type: DataTypes.STRING,
    },
    Option: {
      type: DataTypes.JSON,
    },
    Vitrification: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "embryo_ovumSchedule",
    defaultValue: "false",
  }
);

// MINE
//

const PatientCounseling = sequelize.define(
  "PatientCounseling",
  {
    cycle_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
    },
    mrn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    package_id: {
      type: DataTypes.INTEGER,
    },
    treatmentType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assignedDoctor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assignedAssistantDoctor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assignedCounselor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assignedCoordinator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clinicalCounselingDoneBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clinicalCounselingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    financialCounselingDoneBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    financialCounselingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notesDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notesRecordedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: true,
    tableName: "patient_counseling",
  }
);

//   geetapage.js

const History = sequelize.define(
  "History",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    patientId: {
      type: DataTypes.STRING,
    },
    doctorId: {
      type: DataTypes.STRING,
    },
    History: {
      type: DataTypes.JSON,
    },
    Date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "emb_history",
    alter: true,
    timestamps: true, // Enable this if you want createdAt and updatedAt timestamps
  }
);

const Package = sequelize.define(
  "Package",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    packageCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    packageName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    packageRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    packageEffDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    packageExpDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subSpecialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    longDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    service_tax: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    service_per: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    service_amount: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    staffDiscount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    staffDiscount_per: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    staffDiscount_amount: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    staffParentAccount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    staffParent_per: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    staffParent_amount: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    concession: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    concession_per: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    concession_amount: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    doctor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doctor_per: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    doctor_amount: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    rateEditable: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rateEditable_per: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    rateEditable_amount: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    S_Citizen_Con: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    S_Citizen_per: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    S_Citizen_amount: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    family: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    selectAll: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    applicableMemberRelations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "pkg_newpackage",
    timestamps: true, // This will handle `createdAt` and `updatedAt` automatically
  }
);

const ItemMasterNew = sequelize.define(
  "ItemMaster",
  {
    item_code: {
      type: DataTypes.STRING,
    },
    brand_name: {
      type: DataTypes.STRING,
    },
    item_name: {
      type: DataTypes.STRING,
    },
    item_group: {
      type: DataTypes.STRING,
    },
    dispensing_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pregnancy_class: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    manufactured_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purchase_uom: {
      type: DataTypes.STRING,
    },
    base_uom: {
      type: DataTypes.STRING,
    },
    base_unit_mrp: {
      type: DataTypes.FLOAT,
    },
    discount_on_sale: {
      type: DataTypes.FLOAT,
    },
    AnalysisRequired: {
      type: DataTypes.STRING,
    },
    expiry_alert_before_in_days: {
      type: DataTypes.INTEGER,
    },
    hsn_codes: {
      type: DataTypes.STRING,
    },
    walk_in_patients_discount_on_sale: {
      type: DataTypes.FLOAT,
    },
    staff_discount_on_sale: {
      type: DataTypes.FLOAT,
    },
    registered_patients_discount_on_sale: {
      type: DataTypes.FLOAT,
    },
    strength: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    strength_unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    molecule_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_category: {
      type: DataTypes.STRING,
    },
    storage_type: {
      type: DataTypes.STRING,
    },
    storage_degree: {
      type: DataTypes.FLOAT,
    },
    therapeutic_class: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stocking_uom: {
      type: DataTypes.STRING,
    },
    selling_uom: {
      type: DataTypes.STRING,
    },
    base_unit_cost_price: {
      type: DataTypes.FLOAT,
    },
    route: {
      type: DataTypes.STRING,
    },
    batchesRequired: {
      type: DataTypes.STRING,
    },
    batchesRequired: {
      type: DataTypes.STRING,
    },
    suspend: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    alert: true,
    timestamps: true,
    tableName: "adminvitemMaster",
  }
);

const CurrentItemStock = sequelize.define(
  "InventoryItem",
  {
    clinic: {
      type: DataTypes.STRING,
    },
    store: {
      type: DataTypes.STRING,
    },

    item_id: {
      type: DataTypes.INTEGER,
    },
    isFree: {
      type: DataTypes.BOOLEAN,
    },

    batchCode: {
      type: DataTypes.STRING,
    },
    availableStock: {
      type: DataTypes.INTEGER,
    },

    expiryDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "invcurrentitemstock",
    timestamps: true, // You can change this if you need timestamps
  }
);
// sequelize.sync()
module.exports = {
  SemenSample,
  WashSemenSample,
  DiscardedSample,
  PR_patientReg,
  EmbryoTransfer,
  CanisterData,
  treatmentAdvice,
  chiefComplaint,
  preExistingCondition,
  allergies,
  treatmentHist,
  GeneralExamination,
  diagnosis,
  doctorNotes,
  serviceAdvice,
  prescription,
  attachments,
  FollowUp,
  procedureAdvice,
  Day0Record,
  Day1Record,
  Day2Record,
  Day3Record,
  Day4Record,
  Day5Record,
  Day6Record,
  SpermAdvanceResult,
  stimulation,
  StimulationSubmit,
  ScheduleEt,
  Outcome,
  ovumSchedule,
  PatientCounseling,
  History,
  Package,
  ItemMasterNew,
  CurrentItemStock,
};
