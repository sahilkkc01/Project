const { DataTypes } = require('sequelize');
const {sequelize} = require('../sequelize');

const OpeningBalance = sequelize.define('OpeningBalance', {
    clinic: {
        type: DataTypes.STRING,
    },
    store: {
        type: DataTypes.STRING,
    },
    total_cgst_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_sgst_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_igst_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_net_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    remarks: {
        type: DataTypes.TEXT,
    }
}, { 
    tableName:"invopeningbalance",
    timestamps: true 
});

const OpeningBalanceItem = sequelize.define('OpeningBalanceItem', {
    opening_balance_id: {
        type: DataTypes.INTEGER,
        references: {
            model: OpeningBalance,
            key: 'id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
    },
    batch_code: {
        type: DataTypes.STRING,
    },
    expiry_date: {
        type: DataTypes.DATE,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    uom: {
        type: DataTypes.STRING,
    },
    s_uom: {
        type: DataTypes.STRING,
    },
    conversion_factor: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_quantity: {
        type: DataTypes.INTEGER,
    },
    cp: {
        type: DataTypes.DECIMAL(10, 2),
    },
    mrp: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_cp: {
        type: DataTypes.DECIMAL(10, 2),
    },
    discount_on_sale: {
        type: DataTypes.DECIMAL(10, 2),
    },
    cgst: {
        type: DataTypes.DECIMAL(10, 2),
    },
    cgst_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    sgst: {
        type: DataTypes.DECIMAL(10, 2),
    },
    sgst_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    igst: {
        type: DataTypes.DECIMAL(10, 2),
    },
    igst_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_net_cp: {
        type: DataTypes.DECIMAL(10, 2),
    },
    discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
    }
}, { 
    tableName:'invopeningbalanceitem',
    timestamps: true 
});

OpeningBalance.hasMany(OpeningBalanceItem, {
    foreignKey: 'opening_balance_id',
    sourceKey: 'id'
});
OpeningBalanceItem.belongsTo(OpeningBalance, {
    foreignKey: 'opening_balance_id',
    targetKey: 'id'
});

const Indent = sequelize.define('Indent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  indent_no: {
    type: DataTypes.STRING,
  },
  indent_date: {
    type: DataTypes.DATE,
  },
  exp_del_date: {
    type: DataTypes.DATE,
  },
  from_store: {
    type: DataTypes.STRING,
  },
  to_store: {
    type: DataTypes.STRING,
  },
  mr_no_pat: {
    type: DataTypes.STRING,
  },
  patient_name: {
    type: DataTypes.STRING,
  },
  remark: {
    type: DataTypes.STRING,
  },
  reference_no: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  po_no: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  grn_no: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  issue_no: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  freeze: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  clinic: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
}, {
  tableName: 'invstoreindents',
  timestamps: true
});
  const IndentItem = sequelize.define('IndentItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    indent_id: {
      type: DataTypes.INTEGER,
     
    },
    item_id: {
      type: DataTypes.INTEGER,
     
    },
    indent_quantity: {
      type: DataTypes.INTEGER,
     
    },
    pending_quantity: {
      type: DataTypes.INTEGER,
     
    },
    available_stock: {
      type: DataTypes.INTEGER,
     
    }
  }, {
    tableName: 'invstoreindent_items',
    timestamps: true
  });
  
  const Requisition = sequelize.define('Requisition', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    requisition_no: {
      type: DataTypes.STRING,
    },
    requisition_date: {
      type: DataTypes.DATE,
    },
    due_date: {
      type: DataTypes.DATE,
    },
    from_store: {
      type: DataTypes.STRING,
    },
    to_store: {
      type: DataTypes.STRING,
    },
    remark: {
      type: DataTypes.STRING,
    },
    reference_no: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    po_no: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    grn_no: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    issue_no: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    freeze: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    clinic: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    tableName: 'invstorerequisitions',
    timestamps: true
  });
  
  // Define the RequisitionItem model
  const RequisitionItem = sequelize.define('RequisitionItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    requisition_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Requisition,
        key: 'id'
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
    },
    requisition_quantity: {
      type: DataTypes.INTEGER,
    },
    available_stock: {
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'invstorerequisition_items',
    timestamps: true
  });
  
  // Define associations if needed
  Requisition.hasMany(RequisitionItem, { foreignKey: 'requisition_id' });
  RequisitionItem.belongsTo(Requisition, { foreignKey: 'requisition_id' });

  const Prefix = sequelize.define('Prefix', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    
    },
    value: {
      type: DataTypes.STRING,
     
    },
    prefix: {
      type: DataTypes.STRING, 
    },
  }, {
    tableName: 'prefixes', // Optional: specify the table name if it's different
    timestamps: false, // Optional: disable timestamps if not needed
  });
  
  

module.exports = {OpeningBalanceItem,OpeningBalance,IndentItem,Indent,Requisition,RequisitionItem,Prefix};