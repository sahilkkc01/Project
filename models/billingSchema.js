
const { DataTypes } = require('sequelize');
const {sequelize} = require('../sequelize');
const flash = require('express-flash');

const ServiceMaster = sequelize.define('ServiceMaster', {
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ser_code: {
    type: DataTypes.STRING
  },
  ser_code_type: {
    type: DataTypes.STRING
  },
  ser_code_details: {
    type: DataTypes.STRING
  },
  ser_spec: {
    type: DataTypes.STRING
  },
  ser_sub_spec: {
    type: DataTypes.STRING
  },
  ser_sac_code: {
    type: DataTypes.STRING
  },
  ser_short_desc: {
    type: DataTypes.STRING
  },
  ser_long_desc: {
    type: DataTypes.STRING
  },
  ser_name: {
    type: DataTypes.STRING
  },
  ser_base_rate: {
    type: DataTypes.DECIMAL
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  alter: true,
  tableName: 'service_masters' // Specify the table name
});


const BCExpMaster = sequelize.define('BCExpMaster', {
  userId: {
    type: DataTypes.INTEGER,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  exp_master_code: {
    type: DataTypes.STRING
  },
  exp_master_desc: {
    type: DataTypes.STRING
  },
  exp_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  alter: true,
  tableName: 'exp_masters' // Specify the table name
});

const ConcessionMaster = sequelize.define('ConcessionMaster', {
  userId: {
    type: DataTypes.INTEGER,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  exp_master_code: {
    type: DataTypes.STRING
  },
  exp_master_desc: {
    type: DataTypes.STRING
  },
  exp_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  alter: true,
  tableName: 'BCConcessionMaster' // Specify the table name
});

const SacMaster = sequelize.define('SacMaster', {
  userId: {
    type: DataTypes.INTEGER,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  exp_master_code: {
    type: DataTypes.STRING
  },
  exp_master_desc: {
    type: DataTypes.STRING
  },
  exp_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  alter: true,
  tableName: 'BCSacMaster' // Specify the table name
});
const RefundMaster = sequelize.define('RefundMaster', {
  userId: {
    type: DataTypes.INTEGER,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  exp_master_code: {
    type: DataTypes.STRING
  },
  exp_master_desc: {
    type: DataTypes.STRING
  },
  exp_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  alter: true,
  tableName: 'BCRefundMaster' // Specify the table name
});
const bcCompDetails = sequelize.define('bcCompDetails', {
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  comp_code: {
    type: DataTypes.STRING
  },
  comp_cont_person: {
    type: DataTypes.STRING
  },
  comp_pers_role: {
    type: DataTypes.STRING
  },
  comp_cont: {
    type: DataTypes.STRING
  },
  comp_type: {
    type: DataTypes.STRING
  },
  comp_email: {
    type: DataTypes.STRING
  },
  comp_add: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  alter: true,
  tableName: 'companies' // Specify the table name
});


const CompanyHF = sequelize.define('CompanyHF', {
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  header_text: {
    type: DataTypes.STRING
  },
  footer_text: {
    type: DataTypes.STRING
  },
  comp_logo: {
    type: DataTypes.STRING
  },
  head_image: {
    type: DataTypes.STRING
  },
  comp_footer_image: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  alter: true,
  tableName: 'company_hf' // Specify the table name
});


const ComTypeNew = sequelize.define('comTypeNew', {
  code: {
    type: DataTypes.STRING,
    defaultValue: 0
  },
  contact_person: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  contact_number: {
    type: DataTypes.STRING
  },
  company_type: {
    type: DataTypes.STRING
  },
  email_address: {
    type: DataTypes.STRING
  },
  company_address: {
    type: DataTypes.STRING
  },
  patient_source_category: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  alter: true,
  tableName: 'ComTypeNew' // Specify the table name
});


// const bcService_Master = sequelize.define('bcService_Master', {
//   service_Code: {
//     type: DataTypes.STRING
//   },
//   service_Name: {
//     type: DataTypes.STRING
//   },
//   specialization: {
//     type: DataTypes.STRING
//   },
//   sub_Specialization: {
//     type: DataTypes.STRING
//   }
// }, {
//   timestamps: true, // Adds createdAt and updatedAt timestamps
//   alter: true,
//   tableName: 'bcService_Master' // Specify the table name
// });



const State = sequelize.define('State', {
  stateCode: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  stateName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'state'
});


const City = sequelize.define('City', {
  cityName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stateCode: {
    type: DataTypes.STRING,
    references: {
      model: State,
      key: 'stateCode'
    }
  }
}, {
  timestamps: false,
  tableName: 'city'
});

City.belongsTo(State, { foreignKey: 'stateCode' });
State.hasMany(City, { foreignKey: 'stateCode' });

const bcSerMasAssignConcent = sequelize.define('bcSerMasAssignConcent', {
  department: {
    type: DataTypes.STRING,
  },
  template_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Service-Master-Assign'
});


const bcSerMastApplyLev = sequelize.define('bcSerMastApplyLev', {

  
  l1: {
    type: DataTypes.STRING,
  },
  l2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  l3: {
    type: DataTypes.STRING,
    allowNull: false
  },
  l4: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Service-Master-Applay-level'
});

const selectedDoctor = sequelize.define('selectedDoctor', {
  Userid: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  spec: {
    type: DataTypes.STRING,
  },
  subSpec: {
    type: DataTypes.STRING,
  },
  subSpecs: {
    type: DataTypes.JSON,  // Use JSONB or JSON depending on your needs and DB support
  },
  tariff: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  timestamps: false,
  tableName: 'selectedDoctor'
});

const DoctorService = sequelize.define('DoctorService', {
  UserId:{
    type:DataTypes.STRING,
  },
  doctorName: {
    type: DataTypes.STRING,
 
  },
  services: {
    type: DataTypes.JSON,
    
  }
},{
  timestamps: true,
  tableName: 'bcDoctorService'
});





const bcTariffMasterNew = sequelize.define('bcTariffMasterNew', {
  trf_code: {
    type: DataTypes.STRING,
  
  },
  trf_name: {
    type: DataTypes.STRING,
    
  },
  services:{
    type:DataTypes.JSON,
  },
  trf_status:{
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
}, {
  timestamps: false,
  tableName: 'BcTariffMasterNew'
});

const bcAdvAgent = sequelize.define('bcAdvAgent', {
  userId:{
    type: DataTypes.STRING,
  },
  adv_agnt_code: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adv_agnt_status: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
}, {
  timestamps: true,
  tableName: 'bcAdvAgent'
});

// const BcTrfSer = sequelize.define('BcTrfSer', {
//   service_code: {
//     type: DataTypes.STRING,
//   },
//   service_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   specialization: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   sub_specialization: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   timestamps: false,
//   tableName: 'BCTriff-Services'
// });


const BcAssCompNew = sequelize.define('BcAssCompNew', {
  code: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tariff: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
}, {
  timestamps: true,
  tableName: 'BcAssCompNews'
});

const Adnin = sequelize.define('Admin', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  }
}, {
  timestamps: true,
  alter: true,
  tableName: 'Admin'
})

const bcBullRateChange = sequelize.define('bcBullRateChange', {
  UserId:{
    type:DataTypes.STRING
  },
  TariffCode:{
  type: DataTypes.STRING
},
  TariffName: {
    type: DataTypes.STRING
  },
  remarks: {
    type: DataTypes.STRING
  },
  effectiveDate: {
    type: DataTypes.DATE
  },
  freeze: {
    type: DataTypes.BOOLEAN
  },
  bulkRateChange: {
    type: DataTypes.JSON // Assuming bulkRateChange is a JSON field
  },
  status:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  alter: true,
  tableName: 'bcBullRateChange' // Specify the table name
});


const Doctor = sequelize.define('Doctor', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  doc_photo: {
    type: DataTypes.STRING
  },
  doc_name: {
    type: DataTypes.STRING
  },
  doc_dob: {
    type: DataTypes.DATE
  },
  doc_spec: {
    type: DataTypes.STRING
  },
  doc_sub_spec: {
    type: DataTypes.STRING
  },
  doc_type: {
    type: DataTypes.STRING
  },
  doc_catg: {
    type: DataTypes.STRING
  },
  doc_mark_exec: {
    type: DataTypes.STRING
  },
  doc_gender: {
    type: DataTypes.STRING
  },
  doc_sign: {
    type: DataTypes.STRING
  },
  doc_marital_status: {
    type: DataTypes.STRING
  },
  doc_emp_no: {
    type: DataTypes.STRING
  },
  doc_pf_no: {
    type: DataTypes.STRING
  },
  doc_pan_no: {
    type: DataTypes.STRING
  },
  doc_doj: {
    type: DataTypes.DATE
  },
  doc_access_card_no: {
    type: DataTypes.STRING
  },
  doc_reg_no: {
    type: DataTypes.STRING
  },
  doc_email: {
    type: DataTypes.STRING
  },
  doc_experience: {
    type: DataTypes.STRING
  },
  doc_education: {
    type: DataTypes.STRING  
  }
},
{
  timestamps: true,
  tableName:'Doctor'
});

const SelectedService = sequelize.define('SelectedService', {
  userId:{
    type:DataTypes.STRING,
  },
  docCategory:{
    type:DataTypes.STRING,

  },
  serviceName: {
      type: DataTypes.STRING,
      
  },
  className: {
      type: DataTypes.STRING,
    
  },
  serviceRate:{
    type: DataTypes.STRING,
    

  },
  status : {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
}, {
  timestamps: true,
  tableName: 'Selectedservices'
});


const   ServiceMasterSchema = sequelize.define('tbl_service_master', {
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
  service_tax:{
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
  staffDiscount:{
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
  staffParentAccount:{
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
  concession:{
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
  doctor:{
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
  rateEditable:{
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
  S_Citizen_Con:{
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
  luxuryTax:{
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
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
}
, {
  timestamps: false,
  tableName: 'services'
});

const CompanyType = sequelize.define('companyType', {
  userId: {
    type: DataTypes.INTEGER,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  code: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
}, {
  timestamps: true,
  tableName: 'companyType'
});



module.exports = {
  CompanyHF,
  bcCompDetails,
  BCExpMaster,
  ServiceMaster,
  ComTypeNew,
  // bcService_Master,
  State,
  City,
  bcSerMasAssignConcent,
  bcSerMastApplyLev,
  bcTariffMasterNew,
  bcAdvAgent,
  // BcTrfSer,
  BcAssCompNew,
  Adnin,
  bcBullRateChange,
  Doctor,
  ServiceMasterSchema,
  SelectedService,
  CompanyType,
  selectedDoctor,
  ConcessionMaster,
  SacMaster,
  RefundMaster,
  DoctorService
};

