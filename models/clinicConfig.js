const { DataTypes } = require('sequelize');
const { sequelize} = require('../sequelize')

const BankBranchMaster = sequelize.define('BankBranchMaster', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  bank_branch_m_code: {
    type: DataTypes.STRING
  },
  bank_branch_m_desc: {
    type: DataTypes.STRING
  },
  bank_branch_m_bank: {
    type: DataTypes.STRING
  },
  bank_branch_m_micr_no: {
    type: DataTypes.STRING
  },
  bank_branch_m_ifsc_code: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},{ alter:true,
  tableName: 'bankbranchmasters'
});

const CashCounterMaster = sequelize.define('CashCounterMaster', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  cash_counter_master_code: {
    type: DataTypes.STRING
  },
  cash_counter_name: {
    type: DataTypes.STRING
  },
  clinic_name: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'cashcountermasters'
});

const CityMaster = sequelize.define('CityMaster', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  city_master_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'citymasters'
});

const Classification = sequelize.define('Classification', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  classification_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  classification_desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'classifications'
});

const ClinicConfiguration = sequelize.define('ClinicConfiguration', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  clinic_code: {
    type: DataTypes.STRING
  },
  clinic_desc: {
    type: DataTypes.STRING
  },
  clinic_cont_no: {
    type: DataTypes.BIGINT
  },
  clinic_email: {
    type: DataTypes.STRING
  },
  clinic_cont_no_2: {
    type: DataTypes.BIGINT
  },
  clinic_fax_no: {
    type: DataTypes.STRING
  },
  clinic_reg_no: {
    type: DataTypes.STRING
  },
  clinic_result_receive_data: {
    type: DataTypes.STRING
  },
  clinic_add_line1: {
    type: DataTypes.STRING
  },
  clinic_add_line2: {
    type: DataTypes.STRING
  },
  clinic_add_line_3: {
    type: DataTypes.STRING
  },
  clinic_country: {
    type: DataTypes.STRING
  },
  clinic_state: {
    type: DataTypes.STRING
  },
  clinic_city: {
    type: DataTypes.STRING
  },
  clinic_pincode: {
    type: DataTypes.BIGINT
  },
  clinic_area: {
    type: DataTypes.STRING
  },
  clinic_estb_no: {
    type: DataTypes.STRING
  },
  clinic_pan_no: {
    type: DataTypes.STRING
  },
  clinic_type: {
    type: DataTypes.STRING
  },
  clinic_server: {
    type: DataTypes.STRING
  },
  clinic_cluster: {
    type: DataTypes.STRING
  },
  clinic_tin_no: {
    type: DataTypes.STRING
  },
  clinic_gstin_no: {
    type: DataTypes.STRING
  },
  dept_desc: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  alter:true,
  tableName: 'clinicconfigurations'
});

const Cluster = sequelize.define('Cluster', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  clus_code: {
    type: DataTypes.STRING
  },
  clus_desc: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'clusters'
});
const BankMaster = sequelize.define('BankMaster', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  bank_m_code: {
    type: DataTypes.STRING
  },
  bank_m_desc: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'bankmasters'
});

const CountryMaster = sequelize.define('CountryMaster', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  count_m_code: {
    type: DataTypes.STRING
  },
  count_m_name: {
    type: DataTypes.STRING
  },
  count_m_nat: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'countrymasters'
});

const StateMaster = sequelize.define('StateMaster', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  state_m_code: {
    type: DataTypes.STRING
  },
  state_m_name: {
    type: DataTypes.STRING
  },
  state_m_count: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'statemasters'
});


const Department = sequelize.define('Department', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  dept_code: {
    type: DataTypes.STRING
  },
  dept_desc: {
    type: DataTypes.STRING
  },
  dept_isClinic: {
    type: DataTypes.BOOLEAN
  },
  dept_sub_spec: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'departments',
  timestamps: true
});

const Designation = sequelize.define('Designation', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  desg_code: {
    type: DataTypes.STRING
  },
  desg_desc: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'designations'
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
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  doc_dept: {
    type: DataTypes.JSON
  },
  doc_class: {
    type: DataTypes.JSON
  },
}, { alter:true,
  tableName: 'doctors'
});

const DocCatMaster = sequelize.define('DocCatMaster', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  doc_cat_master_code: {
    type: DataTypes.STRING
  },
  doc_cat_master_desc: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'doccatmasters'
});
const UploadedFile = sequelize.define('UploadedFile', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  filename: {
      type: DataTypes.STRING,
      allowNull: false
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  }
}, { alter:true,
  tableName: 'uploadedfiles'
});

const EmrCC = sequelize.define('EmrCC', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  emrCC_code: {
    type: DataTypes.STRING
  },
  emrCC_desc: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'emrccs'
});

const EmrFieldvalue = sequelize.define('EmrFieldvalue', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  emr_fv_code: {
    type: DataTypes.STRING
  },
  emr_fv_desc: {
    type: DataTypes.STRING
  },
  emr_fv_used_for: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'emrfieldvalues'
});

const PrimarySymptoms = sequelize.define('PrimarySymptoms', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  prim_symp_code: {
    type: DataTypes.STRING
  },
  prim_symp_desc: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'primarysymptoms'
});

const RegionMaster = sequelize.define('RegionMaster', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  region_m_code: {
    type: DataTypes.STRING
  },
  region_m_name: {
    type: DataTypes.STRING
  },
  country_id: {
    type: DataTypes.STRING
  },
  state_id: {
    type: DataTypes.STRING
  },
  city_id: {
    type: DataTypes.STRING
  },
  region_m_pincode: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'regionmasters'
});

const Specialization = sequelize.define('Specialization', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  spec_code: {
    type: DataTypes.STRING
  },
  spec_desc: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'specializations'
});

const SubSpecialization = sequelize.define('SubSpecialization', {
  clinic_id: {
    type: DataTypes.STRING,
    defaultValue: '0'
  },
  sub_spec_code: {
    type: DataTypes.STRING
  },
  sub_spec_desc: {
    type: DataTypes.STRING
  },
  sub_spec_spec: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { alter:true,
  tableName: 'subspecializations'
});

const Country = sequelize.define('Country', {
  country_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nationality_id: {
    type: DataTypes.STRING
  }
}, { alter:true,
  tableName: 'countries'
});

const State = sequelize.define('State', {
  state_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  state_name: {
    type: DataTypes.STRING
  }
}, { alter:true,
  tableName: 'states'
});

const Clinic_name = sequelize.define('Clinic_name', {
  clinic: {
    type: DataTypes.STRING
  }
}, { alter:true,
  tableName: 'clinic_names'
});
const Source = sequelize.define('Source', {
  source: {
    type: DataTypes.STRING
  }
}, { alter:true,
  tableName: 'sources'
});

const Employee = sequelize.define('Employee', {
  clinic_id: {
    type: DataTypes.INTEGER,
 
    defaultValue: 0
  },
  emp_first_name: {
    type: DataTypes.STRING,
    
  },
  emp_middle_name: {
    type: DataTypes.STRING,
    
  },
  emp_last_name: {
    type: DataTypes.STRING,
    
  },
  emp_dob: {
    type: DataTypes.DATE,
    
  },
  emp_gender: {
    type: DataTypes.STRING,
    
  },
  emp_desig: {
    type: DataTypes.STRING,
    
  },
  emp_clinic: {
    type: DataTypes.STRING,
    
  },
  emp_date_of_join: {
    type: DataTypes.DATE,
    
  },
  emp_marital_status: {
    type: DataTypes.STRING,
    
  },
  emp_number: {
    type: DataTypes.STRING,
 
   
  },
  emp_pf_number: {
    type: DataTypes.STRING,
 
   
  },
  emp_pan_number: {
    type: DataTypes.STRING,
 
   
  },
  emp_email_id: {
    type: DataTypes.STRING,
 
   
  },
  emp_access_card_number: {
    type: DataTypes.STRING,
 
   
  },
  emp_exp: {
    type: DataTypes.STRING,
    
  },
  emp_edu: {
    type: DataTypes.STRING,
    
  },
  emp_image: {
    type: DataTypes.STRING,
    
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { 
  tableName: 'employees',
  alter:true,
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = Employee;

// Define associations if any (for example, between CityMaster, State, and Country)

// CityMaster.belongsTo(State, { foreignKey: 'state_id' });
// CityMaster.belongsTo(Country, { foreignKey: '_country_id' });

// Export models
// sequelize.sync();

module.exports = {
  BankBranchMaster,
  CashCounterMaster,
  CityMaster,
  Classification,
  ClinicConfiguration,
  Cluster,
  CountryMaster,
  Department,
  Designation,
  Doctor,
  DocCatMaster,
  EmrCC,
  EmrFieldvalue,
  PrimarySymptoms,
  RegionMaster,
  Specialization,
  SubSpecialization,
  Country,
  State,
  Clinic_name,
  Employee,
  BankMaster,
  StateMaster,
  UploadedFile,
  Source
   
};

