const { DataTypes } = require('sequelize');
const{ sequelize }= require('../sequelize');

const PR_patientReg = sequelize.define('PR_patientReg', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clinic_id:{
    type:DataTypes.INTEGER,
    defaultValue:0
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
  patientImg:{
    type:DataTypes.STRING,
  },
  spouseImg:{
    type:DataTypes.STRING,
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
    defaultValue:''
  },
  Gender: {
    type: DataTypes.STRING,
    defaultValue:''
  },
  dob: {
    type: DataTypes.STRING,
    defaultValue:''
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
    defaultValue:''
  },
  fatherName: {
    type: DataTypes.STRING(100),
    defaultValue:''
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
    defaultValue:''
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
  account_type:{
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  account_no:{
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  account_holder:{
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
}, {
  timestamps: true, // Set to true if you have createdAt and updatedAt columns
  alter:true,
  tableName: 'PR_patientReg', // Ensure the table name is as per your database
});


const PR_ReferralDoc = sequelize.define('PR_ReferralDoc', {
  firstName: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  middleName: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  specialization: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  doctorType: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  contactNumber: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  emailId: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  address: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  PanCard: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  id_proof_type: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  id_proof_number: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  bank_name: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  branch: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  ifsc_code: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  account_no: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  account_holder: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
}, {
  timestamps: true,
  alter: true,
  tableName: 'PR_ReferralDoc',
});


const PR_Appointment = sequelize.define('PR_Appointment',{
  mrNo:{
    type:DataTypes.STRING,
  },
  age_days: {
    type: DataTypes.STRING,
    defaultValue:0
  },
  age_months: {
    type: DataTypes.STRING,
    defaultValue:0
  },
  age_years: {
    type: DataTypes.STRING,
    defaultValue:0
  },
  appointment_date: {
    type: DataTypes.STRING,
    defaultValue:''
  },
  appointment_reason: {
    type: DataTypes.STRING,
    defaultValue:'',
  },
  clinic: {
    type: DataTypes.STRING,
    defaultValue:''
  },
  department: {
    type: DataTypes.STRING,
    defaultValue:''
  },
  dob: {
    type: DataTypes.STRING,
  },
  doctor: {
    type: DataTypes.STRING,
    defaultValue:''
  },
  firstName: {
    type: DataTypes.STRING,
    defaultValue:''
  },
  from_time: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue:''
  },
  mobile_code: {
    type: DataTypes.STRING,
    defaultValue:''
  },
  mobile_number: {
    type: DataTypes.STRING,
    defaultValue:''
  },
  remark: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },

  special_registration: {
    type: DataTypes.STRING,
  },
  to_time: {
    type: DataTypes.STRING,
  }
},{
  tableName: 'PR_Appointment',
  alter:true,
  timestamps: true,
})


const PR_PatientVisit = sequelize.define('PR_PatientVisit', {
  mrNo: {
      type: DataTypes.STRING,
  },
  unit: {
      type: DataTypes.STRING,
     
  },
  Visitdate: {
      type: DataTypes.DATEONLY,
      
  },
  time: {
      type: DataTypes.TIME,
    
  },
  reasonOfVisit: {
      type: DataTypes.STRING,

  },
  department: {
      type: DataTypes.STRING,
    
  },
  doctor: {
      type: DataTypes.STRING,
  },
  cabin: {
      type: DataTypes.STRING,

  },
  referenceDoctor: {
      type: DataTypes.STRING,

  },
  remarks: {
      type: DataTypes.TEXT,

  },
  visitNotes: {
      type: DataTypes.TEXT,

  }
}, {
  tableName: 'pr_patientvisits',
alter:true,
  timestamps: true // Enable this if you want createdAt and updatedAt timestamps
});


const PR_formNewCouple = sequelize.define('PR_formNewCouple', {
  clinic_id:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  mrNo: {
      type: DataTypes.STRING,
  },
  PatientName: {
      type: DataTypes.STRING,
  },
  Couple_mrNo: {
      type: DataTypes.STRING,
    
  },
  CoupleName: {
      type: DataTypes.STRING,
  },
  CoupleDob: {
      type: DataTypes.DATEONLY,

  },
}, {
  tableName: 'pr_formnewcouple',
alter:true,
  timestamps: true // Enable this if you want createdAt and updatedAt timestamps
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
    defaultValue:null,
    allowNull:true,
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
  validFromCorporate:{
    type: DataTypes.STRING,
  },
  validToCorporate:{
    type: DataTypes.STRING,
  },
  corporateRemarks:{
    type: DataTypes.TEXT,
  },
  cashRemarks:{
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'pr_billfindpatient',
  alter: true,
  timestamps: true // Enable this if you want createdAt and updatedAt timestamps
});




module.exports = {
    PR_patientReg,
    PR_ReferralDoc,
    PR_Appointment,
    PR_PatientVisit,
    PR_formNewCouple,
    PR_BillFindPatient
}