const { DataTypes } = require('sequelize');
const {sequelize} = require('../sequelize');


const expensedetails = sequelize.define('expensedetails', {
  userId: {
    type: DataTypes.INTEGER,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  clinic: {
    type: DataTypes.STRING
  },
  expenseAgainst: {
    type: DataTypes.STRING
  },
  voucherNo: {
    type: DataTypes.STRING
  },
  voucherDate: {
    type: DataTypes.STRING
  },
  amount: {
    type: DataTypes.STRING
  },
  voucherCreatedBy: {
    type: DataTypes.STRING
  },
  remarks: {
    type: DataTypes.STRING,
  },
  isFreezeExpenses: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  alert: true,
  tableName: 'plshBillExpenseDetails',
  timestamps: true
});


// const advance = sequelize.define('advance', {
//     userId: {
//         type: DataTypes.INTEGER,
//     },
//     clinic_id: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0
//     },
//     advanceType: {
//         type: DataTypes.STRING,
//     },
//     company: {
//         type: DataTypes.STRING,
//     },
//     advanceAgainst: {
//         type: DataTypes.STRING,
//     },
//     amount: {
//         type: DataTypes.INTEGER,
//     },
//     remarks: {
//         type: DataTypes.STRING,
//     },
//     package_bill_freeze: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     }
// }, {
//     alert: true,
//     tableName: 'plshAdvance',
//     timestamps: true // This will add createdAt and updatedAt fields
// });


const CompanyRefund = sequelize.define('refund', {
  userId: {
    type: DataTypes.INTEGER,
    defaultValue:1
  },
  clinic_name: {
    type: DataTypes.STRING,
    defaultValue:1
  },
  patient_id: {
    type: DataTypes.STRING,
    defaultValue:1
  },
  rec_no: {
    type: DataTypes.STRING,
    defaultValue:1
  },
  refund_date: {
    type: DataTypes.DATE
  },
  Adv_recipt_no:{
    type: DataTypes.STRING,
    defaultValue:""
  },
  refundAmount: {
    type: DataTypes.DECIMAL
  },
  totalAdvance: {
    type: DataTypes.DECIMAL
  },
  advanceConsumed: {
    type: DataTypes.DECIMAL
  },
  totalRefund: {
    type: DataTypes.DECIMAL
  },
  advanceAvailable: {
    type: DataTypes.DECIMAL
  },
  remarks: {
    type: DataTypes.STRING,
  },
  isApprove:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  freeze:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }

}, {
  timestamps: true,
  alter:true,
  tableName: 'plshCompanyRefunds',
});


const concent = sequelize.define('concent', {
  userId: {
    type: DataTypes.INTEGER,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  Cname: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Cfile: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Cstatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  Csection: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  alert: true,
  tableName: 'concent',
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const PR_patientReg = sequelize.define('PR_patientReg', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
    defaultValue: '',
  },
  age_months: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  age_years: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  altMobileNo: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  area: {
    type: DataTypes.TEXT,
  },
  bloodGroup: {
    type: DataTypes.STRING(10),
    defaultValue: '',
  },
  camp: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.TEXT,
  },
  clinic_status: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  company_name: {
    type: DataTypes.TEXT,
  },
  country: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  Gender: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  dob: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  education: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  familyName: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  fatherName: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  firstName: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  id_proof_number: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  id_proof_type: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  inHouseDoctor: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  is_vip: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  is_employee: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  is_insured: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  is_international: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  externalDoctor: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  landlineNo: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  lastName: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  marital_status: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  marriage_anniversary: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  middleName: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  mobileNo: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  mobile_1: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  mobile_2: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  occupation: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  phone1: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  phone2: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  pin_code: {
    type: DataTypes.STRING(20),
    defaultValue: '',
  },
  prefix: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  religion: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },

  special_registration: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  state: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_address: {
    type: DataTypes.TEXT,
  },
  spouse_age_day: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  spouse_age_month: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  spouse_age_year: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  spouse_area: {
    type: DataTypes.TEXT,
  },
  spouse_blood_group: {
    type: DataTypes.STRING(10),
    defaultValue: '',
  },
  spouse_city: {
    type: DataTypes.TEXT,
  },
  spouse_company_name: {
    type: DataTypes.TEXT,
  },
  spouse_country: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_dob: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  spouse_education: {
    type: DataTypes.TEXT,
  },
  spouse_email: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_familyName: {
    type: DataTypes.TEXT,
  },
  spouse_firstName: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_gender: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  spouse_id_proof: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_id_proof_number: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_is_international: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  spouse_lastName: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_marital_status: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  spouse_marriage_anniversary: {
    type: DataTypes.STRING,
  },
  spouse_middleName: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_mobile_1: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_mobile_2: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_motherName: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_nationality: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_occupation: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_pin_code: {
    type: DataTypes.STRING(20),
    defaultValue: '',
  },
  spouse_preferred_language: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  spouse_prefix: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  spouse_religion: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  spouse_residence_phone_1: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_residence_phone_2: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_residence_phone_3: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  spouse_special_registration: {
    type: DataTypes.STRING(50),
    defaultValue: '',
  },
  spouse_state: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  sponsor_associated_company: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  sponsor_company: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  sponsor_investigation_no: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  sponsor_member_relation: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  sponsor_patient_category: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  sponsor_patient_source: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  sponsor_remark: {
    type: DataTypes.TEXT,
  },
  sponsor_tariff: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  ifsc_code: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  branch: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  bank_name: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  account_type: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  account_no: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  account_holder: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
}, {
  timestamps: true, // Set to true if you have createdAt and updatedAt columns
  alter: true,
  tableName: 'PR_patientReg', // Ensure the table name is as per your database
});

const ServiceMasterSchema = sequelize.define('tbl_service_master', {
  serviceCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  codeType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  codeDetails: {
    type: DataTypes.STRING,
    allowNull: true
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subSpecialization: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sacCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  shortDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  longDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serviceName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  baseServiceRate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  inHouse: {
    type: DataTypes.STRING,
  },
  inHouse_per: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inHouse_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  service_tax: {
    type: DataTypes.STRING,
  },
  service_per: {
    type: DataTypes.STRING,
    allowNull: true
  },
  service_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  staffDiscount: {
    type: DataTypes.STRING,
  },
  staffDiscount_per: {
    type: DataTypes.STRING,
    allowNull: true
  },
  staffDiscount_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  staffParentAccount: {
    type: DataTypes.STRING,
  },
  staffParent_per: {
    type: DataTypes.STRING,
    allowNull: true
  },
  staffParent_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  concession: {
    type: DataTypes.STRING,
  },
  concession_per: {
    type: DataTypes.STRING,
    allowNull: true
  },
  concession_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  doctor: {
    type: DataTypes.STRING,
  },
  doctor_per: {
    type: DataTypes.STRING,
    allowNull: true
  },
  doctor_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rateEditable: {
    type: DataTypes.STRING,
  },
  rateEditable_per: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rateEditable_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  S_Citizen_Con: {
    type: DataTypes.STRING,
  },
  S_Citizen_per: {
    type: DataTypes.STRING,
    allowNull: true
  },
  S_Citizen_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  luxuryTax: {
    type: DataTypes.STRING,
  },
  luxuryTax_per: {
    type: DataTypes.STRING,
    allowNull: true
  },
  luxuryTax_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  className: {
    type: DataTypes.STRING,
    allowNull: false
  },
  className_rate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}
  , {
    timestamps: false,
    tableName: 'services'
  });

// const Bill = sequelize.define('Bill', {
//     clinic_id: {
//         type: DataTypes.INTEGER,
//         defaultValue: 1
//     },
//     clinical_bill: {
//         type: DataTypes.STRING,

//     },
//     total_net_amount: {
//         type: DataTypes.DECIMAL
//     },
//     pay_amount: {
//         type: DataTypes.DECIMAL
//     },
//     advance: {
//         type: DataTypes.DECIMAL
//     },
//     remark: {
//         type: DataTypes.STRING,

//     },
//     concession_reason: {
//         type: DataTypes.STRING,

//     },
//     freeze_bill: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     against: {
//         type: DataTypes.STRING
//     },
//     option: {
//         type: DataTypes.STRING
//     }
// }, {
//     timestamps: true // Adds createdAt and updatedAt columns
// });


const Advance = sequelize.define('PatientAdvance', {
  date: {
    type: DataTypes.STRING, // Date
  },
  rec_no: {
    type: DataTypes.STRING, // Receipt No.
  },
  clinic_name: {
    type: DataTypes.STRING,
    defaultValue:'1' // Clinic Name
  },
  patient_id: {
    type: DataTypes.STRING, // Clinic Name
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Amount (stored as 'amount')
  },
  consume_amount: {
    type: DataTypes.DECIMAL(10, 2), // Consume Amount
  },
  balance_amount: {
    type: DataTypes.DECIMAL(10, 2), // Balance Amount
  },
  paymentMethod: {
    type: DataTypes.STRING, // Payment Mode (stored as 'paymentMethod')
  },
  referenceNo: {
    type: DataTypes.STRING, // Reference No. (stored as 'referenceNo')
  },
  chequeNo: {
    type: DataTypes.STRING, // Cheque No. (stored as 'chequeNo')
  },
  chequeDate: {
    type: DataTypes.STRING, // Cheque No. (stored as 'chequeNo')
  },
  bankName: {
    type: DataTypes.STRING, // Bank Name (stored as 'bankName')
  },
  referenceDate: {
    type: DataTypes.STRING, // Reference Date (stored as 'referenceDate')
  },
  bankDetails: {
    type: DataTypes.STRING, // Bank Details (stored as 'bankDetails')
  },
  defaultBankAccount: {
    type: DataTypes.STRING, // Default Bank Account (stored as 'defaultBankAccount')
  },
  ePaymentGatewayName: {
    type: DataTypes.STRING, // E-Payment Gateway Name (stored as 'ePaymentGatewayName')
  },
  ePaymentDetails: {
    type: DataTypes.STRING, // E-payment Details (stored as 'ePaymentDetails')
  },
  cardType: {
    type: DataTypes.STRING, // Card Type (stored as 'cardType')
  },
  cardNo: {
    type: DataTypes.STRING, // Card No. (stored as 'cardNo')
  },
  cardHolderName: {
    type: DataTypes.STRING, // Card Holder Name (stored as 'cardHolderName')
  },
  transactionDate: {
    type: DataTypes.STRING, // Card Holder Name (stored as 'cardHolderName')
  },
  approvalNo: {
    type: DataTypes.STRING, // Approval No. (stored as 'approvalNo')
  },
  printBillOnConfirm: {
    type: DataTypes.BOOLEAN, // Print Bill on Confirm (stored as 'printBillOnConfirm')
  },
  remarks: {
    type: DataTypes.TEXT, // Remarks (stored as 'remarks')
    allowNull: true
  }
}, {
  timestamps: true,
  alter: true,
  tableName: 'plshpatientadvance',
});


  
const CompanyAdvance = sequelize.define('CompanyAdvance', {
  date: {
    type: DataTypes.STRING, // Date
  },
  rec_no: {
    type: DataTypes.STRING, // Receipt No.
  },
  clinic_name: {
    type: DataTypes.STRING,
    defaultValue:'1' // Clinic Name
  },
  patient_id: {
    type: DataTypes.STRING, // Clinic Name
  },
  patient_name: {
    type: DataTypes.STRING, // Clinic Name
  },
  company_name: {
    type: DataTypes.STRING, // Clinic Name
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Amount (stored as 'amount')
  },
  consume_amount: {
    type: DataTypes.DECIMAL(10, 2), // Consume Amount
  },
  balance_amount: {
    type: DataTypes.DECIMAL(10, 2), // Balance Amount
  },
  paymentMethod: {
    type: DataTypes.STRING, // Payment Mode (stored as 'paymentMethod')
  },
  referenceNo: {
    type: DataTypes.STRING, // Reference No. (stored as 'referenceNo')
  },
  chequeNo: {
    type: DataTypes.STRING, // Cheque No. (stored as 'chequeNo')
  },
  chequeDate: {
    type: DataTypes.STRING, // Cheque No. (stored as 'chequeNo')
  },
  bankName: {
    type: DataTypes.STRING, // Bank Name (stored as 'bankName')
  },
  referenceDate: {
    type: DataTypes.STRING, // Reference Date (stored as 'referenceDate')
  },
  bankDetails: {
    type: DataTypes.STRING, // Bank Details (stored as 'bankDetails')
  },
  defaultBankAccount: {
    type: DataTypes.STRING, // Default Bank Account (stored as 'defaultBankAccount')
  },
  ePaymentGatewayName: {
    type: DataTypes.STRING, // E-Payment Gateway Name (stored as 'ePaymentGatewayName')
  },
  ePaymentDetails: {
    type: DataTypes.STRING, // E-payment Details (stored as 'ePaymentDetails')
  },
  cardType: {
    type: DataTypes.STRING, // Card Type (stored as 'cardType')
  },
  cardNo: {
    type: DataTypes.STRING, // Card No. (stored as 'cardNo')
  },
  cardHolderName: {
    type: DataTypes.STRING, // Card Holder Name (stored as 'cardHolderName')
  },
  transactionDate: {
    type: DataTypes.STRING, // Card Holder Name (stored as 'cardHolderName')
  },
  approvalNo: {
    type: DataTypes.STRING, // Approval No. (stored as 'approvalNo')
  },
  printBillOnConfirm: {
    type: DataTypes.BOOLEAN, // Print Bill on Confirm (stored as 'printBillOnConfirm')
  },
  remarks: {
    type: DataTypes.TEXT, // Remarks (stored as 'remarks')
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'plshcompany_advance',
});



 



const PR_BillFindPatient = sequelize.define('PR_BillFindPatient', {
  query: {
    type: DataTypes.INTEGER
  },
  itemid: {
    type: DataTypes.STRING
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  bill_no: {
    type: DataTypes.STRING,
  },
  mrNo: {
    type: DataTypes.STRING,
  },
  selectedBillServices: {
    type: DataTypes.JSON,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  totalPayAmount: {
    type: DataTypes.STRING,
  },
  clinicBillAmount: {
    type: DataTypes.STRING,
  },
  totalNetAmount: {
    type: DataTypes.STRING,
  },
  totalConcessionAmount: {
    type: DataTypes.STRING,
  },
  totalNetBillAmount: {
    type: DataTypes.STRING,
  },
  totalBillAmount: {
    type: DataTypes.STRING,
  },
  remarks: {
    type: DataTypes.STRING,
  },
  Advance: {
    type: DataTypes.STRING,
  },
  ConcessionReason: {
    type: DataTypes.STRING,
  },
  freeze: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  referenceNo: {
    type: DataTypes.STRING,
  },
  referenceDate: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
  },
  bankName: {
    type: DataTypes.STRING,
  },
  bankDetails: {
    type: DataTypes.TEXT,
  },
  defaultBankAccount: {
    type: DataTypes.STRING,
  },
  chequeNo: {
    type: DataTypes.STRING,
  },
  chequeDate: {
    type: DataTypes.STRING,
  },
  ePaymentGatewayName: {
    type: DataTypes.STRING,
  },
  ePaymentDetails: {
    type: DataTypes.TEXT,
  },
  transactionDate: {
    type: DataTypes.STRING,
  },
  cardType: {
    type: DataTypes.STRING,
  },
  cardNo: {
    type: DataTypes.STRING,
  },
  cardHolderName: {
    type: DataTypes.STRING,
  },
  approvalNo: {
    type: DataTypes.STRING,
  },
  discountRemarks: {
    type: DataTypes.TEXT,
  },
  billRemarks: {
    type: DataTypes.TEXT,
  },
  paymentMethod: {
    type: DataTypes.STRING,
  },
  payerType: {
    type: DataTypes.STRING,
  },
  payer: {
    type: DataTypes.STRING,
  },
  refNo: {
    type: DataTypes.STRING,
  },
  validFrom: {
    type: DataTypes.STRING,
  },
  validTo: {
    type: DataTypes.STRING,
  },
  financialRemarks: {
    type: DataTypes.TEXT,
  }, // New fields based on the latest image
  advancePayment: {
    type: DataTypes.STRING, // Assuming this is a numeric value stored as a string
  },
  adjustAdvancePayment: {
    type: DataTypes.STRING, // Assuming this is a numeric value stored as a string
  },
  paidAmount: {
    type: DataTypes.STRING, // Assuming this is a numeric value stored as a string
  },
  // Adding company and insurance fields
  company: {
    type: DataTypes.STRING,
  },
  insurance: {
    type: DataTypes.STRING,
  },
  validFromCorporate: {
    type: DataTypes.STRING,
  },
  validToCorporate: {
    type: DataTypes.STRING,
  },
  corporateRemarks: {
    type: DataTypes.TEXT,
  },
  cashRemarks: {
    type: DataTypes.TEXT,
  }
}, {
  tableName: 'pr_billfindpatient',
  alter: true,
  timestamps: true // Enable this if you want createdAt and updatedAt timestamps
});



const PatientRefund = sequelize.define('PatientRefund', {
  userId: {
    type: DataTypes.INTEGER,
    defaultValue:1
  },
  clinic_name: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  rec_no: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  Advance_receipt_no: {
    type: DataTypes.STRING,
    defaultValue:""
  },
  refundAmount: {
    type: DataTypes.DECIMAL
  },
  totalAdvance: {
    type: DataTypes.DECIMAL
  },
  advanceConsumed: {
    type: DataTypes.DECIMAL
  },
  totalRefund: {
    type: DataTypes.DECIMAL
  },
  advanceAvailable: {
    type: DataTypes.DECIMAL
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isApprove:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  freeze:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
}, {
  tableName: 'plshPatientRefund',
  alter:true,
  timestamps: true,
});

module.exports = {
  expensedetails,
  Advance,
  CompanyRefund,
  concent,
  PR_patientReg,
  ServiceMasterSchema,
  PatientRefund,
  PR_BillFindPatient,
  CompanyAdvance
}