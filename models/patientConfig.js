const { DataTypes } = require('sequelize');
const {sequelize} = require('../sequelize');

const SourceL1 = sequelize.define('SourceL1', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
      
    },
    description: {
      type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_SourceL1'
  });
const SourceL2 = sequelize.define('SourceL2', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING, 
    },
    description: {
      type: DataTypes.STRING,
    },
    PatientL1:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_SourceL2'
  });
const PatientSourceCharges = sequelize.define('PatientSourceCharges', {
    UserId:{
        type:DataTypes.STRING,
    },
    patientType: {
      type: DataTypes.STRING,
    },
    services:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_PatientSourceCharges'
  });  
const PatientRelation = sequelize.define('PatientRelation', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_PatientRelation'
  });   

const ReferalName = sequelize.define('ReferalName', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_ReferalName'
  });   
const SpecialRegistration = sequelize.define('SpecialRegistration', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_SpecialRegistration'
  });    
const PrefixMaster = sequelize.define('PrefixMaster', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    gender:{
      type:DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_PrefixMaster'
  });    
  const NationalityMaster = sequelize.define('NationalityMaster', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_NationalityMaster'
  });
  const LanguageMaster = sequelize.define('LanguageMaster', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_LanguageMaster'
  });
  const TreatmentReq = sequelize.define('TreatmentReq', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_TreatmentReq'
  });
  const EducationDetails = sequelize.define('EducationDetails', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_EducationDetails'
  });
  const CampMaster = sequelize.define('CampMaster', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_CampMaster'
  });
  const VisitMaster = sequelize.define('VisitMaster', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    freeDays:{
      type: DataTypes.INTEGER
    },
    visitType:{
      type: DataTypes.STRING,
    },
    services:{
      type:DataTypes.STRING,
    },
    isClinical:{
      type:DataTypes.STRING,
      defaultValue:"0"
    },
    isFree:{
      type:DataTypes.STRING,
      defaultValue:"0"
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_VisitMaster'
  });
  const PatientConcent = sequelize.define('PatientConcent', {
    UserId:{
        type:DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    departments:{
      type: DataTypes.STRING,
    },
    fields:{
      type: DataTypes.STRING,
    },
    template:{
      type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    timestamps: true,
    tableName: 'PC_PatientConcent'
  });
  const AgentInfo = sequelize.define('AgentInfo', {
    artRegNo: {
        type: DataTypes.STRING,
        
    },
    regDate: {
        type: DataTypes.DATE,
        
    },
    artBankName: {
        type: DataTypes.STRING,
        
    },
    agentName: {
        type: DataTypes.STRING,
        
    },
    agentDob: {
        type: DataTypes.DATE,
        
    },
    occupation: {
        type: DataTypes.STRING,
        
    },
    yearOfMarriage: {
        type: DataTypes.STRING,
        
    },
    isMarried: {
        type: DataTypes.STRING,
        
    },
    spouseName: {
        type: DataTypes.STRING,
        
    },
    spouseDob: {
        type: DataTypes.DATE,
        
    },
    previousDone: {
        type: DataTypes.STRING,
        
    },
    donations: {
        type: DataTypes.INTEGER,
        
    },
    mobileNo: {
        type: DataTypes.STRING,
        
    },
    altMobileNo: {
        type: DataTypes.STRING,
        
    },
    landlineNo: {
        type: DataTypes.STRING,
        
    },
    addressLine1: {
        type: DataTypes.STRING,
        
    },
    addressLine2: {
        type: DataTypes.STRING,
        
    },
    street: {
        type: DataTypes.STRING,
        
    },
    landmark: {
        type: DataTypes.STRING,
        
    },
    country: {
        type: DataTypes.STRING,
        
    },
    state: {
        type: DataTypes.STRING,
        
    },
    city: {
        type: DataTypes.STRING,
        
    },
    area: {
        type: DataTypes.STRING,
        
    },
    panNo: {
        type: DataTypes.STRING,
        
    },
    aadharNo: {
        type: DataTypes.STRING,
        
    },
    accountNo: {
        type: DataTypes.STRING,
        
    },
    bankName: {
        type: DataTypes.STRING,
        
    },
    branchName: {
        type: DataTypes.STRING,
        
    },
    accHolderName: {
        type: DataTypes.STRING,
        
    },
    ifscCode: {
        type: DataTypes.STRING,
        
    },
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    }
}, {
    timestamps: true,
    tableName: 'PC_AgentInformation'
});

  module.exports={SourceL1,SourceL2,PatientSourceCharges,PatientRelation,ReferalName,SpecialRegistration,PrefixMaster,NationalityMaster,LanguageMaster,TreatmentReq,EducationDetails,CampMaster,VisitMaster,PatientConcent,AgentInfo}