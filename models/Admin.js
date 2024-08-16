const { DataTypes } = require('sequelize');
const{sequelize} = require('../sequelize');

const SuperAdmin = sequelize.define('superadmin',{
    username:{
        type:DataTypes.STRING,
    },
    Password:{
        type:DataTypes.STRING,
    },
    clinicName:{
        type:DataTypes.STRING,
    },
    clinicId:{
        type:DataTypes.STRING,
    },
    mobileNumber:{
        type:DataTypes.STRING,
    },
    createdBy:{
        type:DataTypes.STRING,
    },
    rights:{
        type:DataTypes.JSON,
    },
    Freeze:{
        type:DataTypes.BOOLEAN,
    },   
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    timestamps: true,
    alter:true,
    tableName: 'superadmin'
  })

  module.exports={SuperAdmin}