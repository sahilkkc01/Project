const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const NewPackage = sequelize.define(
  "PKG_NewPackage",
  {
    packageFreezed: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    packageApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    packageCode: {
      type: DataTypes.STRING,
    },
    packageName: {
      type: DataTypes.STRING,
    },
    packageRate: {
      type: DataTypes.INTEGER,
    },
    packageEffDate: {
      type: DataTypes.DATE,
    },
    packageExpDate: {
      type: DataTypes.DATE,
    },
    specialization: {
      type: DataTypes.STRING,
    },
    subSpecialization: {
      type: DataTypes.STRING,
    },
    shortDescription: {
      type: DataTypes.TEXT,
    },
    longDescription: {
      type: DataTypes.TEXT,
    },
    service_tax: {
      type: DataTypes.STRING,
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
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    selectAll: {
      type: DataTypes.STRING,
    },
    applicableMemberRelations: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    alert: true,
    timestamps: true,
    tableName: "pkg_newpackage",
  }
);

const packageMedicine = sequelize.define(
  "Medicine",
  {
    oralMedicine: {
      type: DataTypes.STRING,
    },
    injection: {
      type: DataTypes.STRING,
    },
    PackageId: {
      type: DataTypes.INTEGER,
      references: {
        model: NewPackage,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "packagemedicines",
  }
);

const PackageService = sequelize.define(
  "PackageService",
  {
    Service_id: {
      type: DataTypes.INTEGER,
    },
    PackageId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "packageservices",
  }
);

const ServiceMaster = sequelize.define(
  "ServiceMaster",
  {
    clinic_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ser_code: {
      type: DataTypes.STRING,
    },
    ser_code_type: {
      type: DataTypes.STRING,
    },
    ser_code_details: {
      type: DataTypes.STRING,
    },
    ser_spec: {
      type: DataTypes.STRING,
    },
    ser_sub_spec: {
      type: DataTypes.STRING,
    },
    ser_sac_code: {
      type: DataTypes.STRING,
    },
    ser_short_desc: {
      type: DataTypes.STRING,
    },
    ser_long_desc: {
      type: DataTypes.STRING,
    },
    ser_name: {
      type: DataTypes.STRING,
    },
    ser_base_rate: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    alter: true,
    tableName: "service_masters", // Specify the table name
  }
);

const DefienRule = sequelize.define(
  "DefienRule",
  {
    procedure: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    applicable_relations: {
      type: DataTypes.STRING,
    },
    age_limit: {
      type: DataTypes.INTEGER,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    rate_limit: {
      type: DataTypes.INTEGER,
    },
    is_consumables: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    discount_on_quantity: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    unlimited_quantity: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    include_in_adjustable_head: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rate_type: {
      type: DataTypes.STRING,
    },
    defServicesId: {
      type: DataTypes.INTEGER,
    },
    PackageId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: "defienrule",
  }
);

const SelectedService = sequelize.define(
  "SelectedService",
  {
    userId: {
      type: DataTypes.STRING,
    },
    docCategory: {
      type: DataTypes.STRING,
    },
    serviceName: {
      type: DataTypes.STRING,
    },
    className: {
      type: DataTypes.STRING,
    },
    serviceRate: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "selectedservices",
  }
);
const ConcentMaster = sequelize.define(
  "ConcentMaster",
  {
    concent_code: {
      type: DataTypes.STRING,
    },
    concent_desc: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "pkgconcentmaster",
  }
);
const PackageConcents = sequelize.define(
  "PackageConcents",
  {
    package_code: {
      type: DataTypes.STRING,
    },
    concents: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: true,
    tableName: "pkgpackageconcents",
  }
);

const Package = sequelize.define("MYPackage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  packageId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serviceArray: {
    type: DataTypes.JSON,
  },
  medicineArray: {
    type: DataTypes.JSON,
  },
  serviceComponent: {
    type: DataTypes.STRING,
  },
  pharmacyComponent: {
    type: DataTypes.STRING,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
  },
  totalDiscount: {
    type: DataTypes.INTEGER,
  },
  totalRate: {
    type: DataTypes.STRING,
  },
},
{
  timestamps: true,
  tableName: "packageserv_med",
});

// Part of embryology
const PatientCounseling = sequelize.define(
  "PatientCounseling",
  {
      mrn: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      package_id:{
        type: DataTypes.INTEGER  
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
      amount:{
          type: DataTypes.JSON
      }
  },
  {
      timestamps: true,
      tableName: "patient_counseling",
  }
);



module.exports = {
  NewPackage,
  packageMedicine,
  PackageService,
  ServiceMaster,
  DefienRule,
  SelectedService,
  ConcentMaster,
  PackageConcents,
  Package,
  PatientCounseling,
  
};
