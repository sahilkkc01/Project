const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Testcateg = sequelize.define(
  "Testcateg",
  {
    UserId: {
      type: DataTypes.STRING,
    },
    code: {
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
    tableName: "testcateg",
  }
);
const ParameterMastercateg = sequelize.define(
  "ParameterMastercateg",
  {
    UserId: {
      type: DataTypes.STRING,
    },
    code: {
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
    tableName: "parametermastercateg",
  }
);
const TubeMaster = sequelize.define(
  "TubeMaster",
  {
    UserId: {
      type: DataTypes.STRING,
    },
    code: {
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
    tableName: "tubemaster",
  }
);
const TemplateMaster = sequelize.define(
  "TemplateMaster",
  {
    UserId: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    design: {
      type: DataTypes.STRING,
    },
    code: {
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
    tableName: "templatemaster",
  }
);
const SampleMaster = sequelize.define(
  "SampleMaster",
  {
    UserId: {
      type: DataTypes.STRING,
    },
    code: {
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
    tableName: "samplemaster",
  }
);
const MachineMaster = sequelize.define(
  "MachineMaster",
  {
    UserId: {
      type: DataTypes.STRING,
    },
    code: {
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
    tableName: "machinemaster",
  }
);
const MachineParameterMaster = sequelize.define(
  "MachineParameterMaster",
  {
    UserId: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    machineName: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "machineparametermaster",
  }
);
const MachineParameterLinking = sequelize.define(
  "MachineParameterLinking",
  {
    UserId: {
      type: DataTypes.STRING,
    },
    machineParameter: {
      type: DataTypes.STRING,
    },
    Parameter: {
      type: DataTypes.STRING,
    },
    machineName: {
      type: DataTypes.STRING,
    },
    freeze: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "machineparameterlinking",
  }
);
const Test = sequelize.define(
  "Test",
  {
    UserId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "test",
  }
);

module.exports = {
  Testcateg,
  ParameterMastercateg,
  TubeMaster,
  TemplateMaster,
  SampleMaster,
  MachineMaster,
  MachineParameterMaster,
  MachineParameterLinking,
  Test,
};
