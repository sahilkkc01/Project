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
  clinic: {
    type: DataTypes.STRING,
},
  store: {
    type: DataTypes.STRING,
},
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
    item_code: {
      type: DataTypes.STRING,
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
    item_code: {
      type: DataTypes.STRING,
     
    },
    indent_quantity: {
      type: DataTypes.INTEGER,
     
    },
    uom: {
      type: DataTypes.STRING,
     
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
    item_code: {
      type: DataTypes.STRING,
    },
    requisition_quantity: {
      type: DataTypes.INTEGER,
    },
    uom: {
      type: DataTypes.STRING,
    },
    pending_quantity: {
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

  const CurrentItemStock = sequelize.define('InventoryItem', {
    clinic: {
      type: DataTypes.STRING,
    },
    store: {
      type: DataTypes.STRING,
    },
    
    item_id: {
      type: DataTypes.INTEGER,
    },
    item_code: {
      type: DataTypes.STRING,
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
    uom: {
      type: DataTypes.STRING,
    },
    expiryDate: {
      type: DataTypes.DATE,
    },
    
  }, {
    tableName: 'invcurrentitemstock',
    timestamps: true, // You can change this if you need timestamps
  });
  
  const PurchaseOrder = sequelize.define('PurchaseOrder', {
    po_no: {
      type: DataTypes.STRING,
  },
    date: {
        type: DataTypes.DATEONLY,
    },
    store: {
        type: DataTypes.STRING,
    },
    payment_mode: {
        type: DataTypes.STRING,
    },
    supplier: {
        type: DataTypes.STRING,
    },
    payment_terms: {
        type: DataTypes.STRING,
    },
    delivery: {
        type: DataTypes.STRING,
    },
    delivery_duration: {
        type: DataTypes.STRING,
    },
    guarantee_warranty: {
        type: DataTypes.STRING,
    },
    schedule: {
        type: DataTypes.STRING,
    },
    instructions: {
        type: DataTypes.TEXT,
    },
    gross_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_cgst: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_sgst: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_igst: {
        type: DataTypes.DECIMAL(10, 2),
    },
    other_charges: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_discount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    po_discount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_net_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    remarks: {
        type: DataTypes.TEXT,
    },
    freeze: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
}, {
    timestamps: true,
    tableName: 'invpurchase_orders'
});

const POItemDetails = sequelize.define('ItemDetails', {
  purchase_order_id: {
    type: DataTypes.INTEGER,
    references: {
        model: PurchaseOrder,
        key: 'id'
    }
},
po_no: {
  type: DataTypes.STRING,
},
  item_code: {
      type: DataTypes.STRING,
  },
  item_name: {
      type: DataTypes.STRING,
  },
  pr_quantity: {
      type: DataTypes.STRING,
  },
  pr_pending_quantity: {
      type: DataTypes.STRING,
  },
  purchase_uom: {
      type: DataTypes.STRING,
  },
  purchase_quantity: {
      type: DataTypes.STRING, 
  },
  stocking_uom: {
      type: DataTypes.STRING,
  },
  transaction_uom: { 
      type: DataTypes.STRING,
  },
  purchase_cost_price: {
      type: DataTypes.DECIMAL(10, 2),
  },
  cost_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  mrp: {
      type: DataTypes.DECIMAL(10, 2),
  },
  amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  available_stock: {
      type: DataTypes.STRING,
  },
  discount_on_sale: {
      type: DataTypes.DECIMAL(10, 2),
  },
  discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  cgst_percent: {
      type: DataTypes.STRING,
  },
  cgst_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  sgst_percent: {
      type: DataTypes.STRING,
  },
  sgst_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  igst_percent: {
      type: DataTypes.STRING,
  },
  igst_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  net_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  specification: {
      type: DataTypes.STRING,
  },
  hsn_code: {
      type: DataTypes.STRING,
  },
 
}, {
  timestamps: true,
  tableName: 'invpurchase_order_details'
});

// Define association
PurchaseOrder.hasMany(POItemDetails, { foreignKey: 'purchase_order_id' });
POItemDetails.belongsTo(PurchaseOrder, { foreignKey: 'purchase_order_id' });

const IssueToClinic = sequelize.define('IssueToClinic', {
  issue_number: DataTypes.STRING,
  issue_date: DataTypes.DATE,
  from_store: DataTypes.STRING,
  to_store: DataTypes.STRING,
  is_quarantine: DataTypes.BOOLEAN,
  remark: DataTypes.TEXT,
  total_cost_amount: DataTypes.DECIMAL(10, 2),
  mr_no: DataTypes.STRING,
  patient_name: DataTypes.STRING
}, {
  tableName: 'inv_issue_to_clinic'
});

const IssueItems = sequelize.define('IssueItems', {
  IssueToClinicId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'inv_issue_to_clinic',
      key: 'id'
    }
  },
  issue_number: DataTypes.STRING,
  item_code: DataTypes.STRING,
  item_name: DataTypes.STRING,
  batch_code: DataTypes.STRING,
  expiry_date: DataTypes.DATE,
  quantity: DataTypes.INTEGER,
  uom: DataTypes.STRING,
  pending_quantity: DataTypes.INTEGER,
  available_stock: DataTypes.INTEGER,
  issued_quantity: DataTypes.INTEGER,
  issued_uom: DataTypes.STRING,
  cost_price: DataTypes.DECIMAL(10, 2),
  total_cost_amount: DataTypes.DECIMAL(10, 2),
  
}, {
  tableName: 'inv_issue_items'
});




const GRN = sequelize.define('GRN', {
  grn_no: {
      type: DataTypes.STRING,
     
  },
  date: {
      type: DataTypes.DATEONLY,
     
  },
  gate_entry_no: {
      type: DataTypes.STRING
  },
  store: {
      type: DataTypes.INTEGER,
     
  },
  supplier: {
      type: DataTypes.INTEGER,
     
  },
  pay_mode: {
      type: DataTypes.STRING
  },
  invoice_date: {
      type: DataTypes.DATEONLY
  },
  invoice_no: {
      type: DataTypes.STRING
  },
  total_amount: {
      type: DataTypes.DECIMAL(10, 2)
  },
  sgst_amount: {
      type: DataTypes.DECIMAL(10, 2)
  },
  cgst_amount: {
      type: DataTypes.DECIMAL(10, 2)
  },
  igst_amount: {
      type: DataTypes.DECIMAL(10, 2)
  },
  other_charges: {
      type: DataTypes.DECIMAL(10, 2)
  },
  c_disc_amount: {
      type: DataTypes.DECIMAL(10, 2)
  },
  sch_disc_amount: {
      type: DataTypes.DECIMAL(10, 2)
  },
  grn_discount: {
      type: DataTypes.DECIMAL(10, 2)
  },
  net_amount: {
      type: DataTypes.DECIMAL(10, 2)
  },
  received_by: {
      type: DataTypes.STRING
  },
  remark: {
      type: DataTypes.TEXT
  },
  is_finalize: {
      type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  tableName: 'invgrns' // Ensure unique table name
});

const GRNItem = sequelize.define('GRNItem', {
  grn_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'invgrns', // Reference to GRN model
          key: 'id'
      }
  },
  grn_no: {
      type: DataTypes.STRING,
  },
  item_name: {
      type: DataTypes.STRING,
  },
  item_code: {
      type: DataTypes.STRING,
  },
  batch_code: {
      type: DataTypes.STRING,
  },
  expiry_date: {
      type: DataTypes.DATE,
  },
  bar_code: {
      type: DataTypes.STRING,
  },
  uom: {
      type: DataTypes.STRING,
  },
  received_quantity: {
      type: DataTypes.INTEGER,
  },
  uom_select: {
      type: DataTypes.STRING,
  },
  s_uom: {
      type: DataTypes.STRING,
  },
  conversion_factor: {
      type: DataTypes.FLOAT,
  },
  total_quantity: {
      type: DataTypes.INTEGER,
  },
  available_stock: {
      type: DataTypes.INTEGER,
  },
  cost_price: {
      type: DataTypes.DECIMAL(10, 2),
  },
  cost_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  avg_cost: {
      type: DataTypes.DECIMAL(10, 2),
  },
  avg_cost_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  mrp: {
      type: DataTypes.DECIMAL(10, 2),
  },
  abated_mrp: {
      type: DataTypes.DECIMAL(10, 2),
  },
  amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  c_disc_percent: {
      type: DataTypes.FLOAT,
  },
  c_disc_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  sch_disc_percent: {
      type: DataTypes.FLOAT,
  },
  sch_disc_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  cgst_percent: {
      type: DataTypes.FLOAT,
  },
  cgst_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  sgst_percent: {
      type: DataTypes.FLOAT,
  },
  sgst_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  igst_percent: {
      type: DataTypes.FLOAT,
  },
  igst_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  net_amount: {
      type: DataTypes.DECIMAL(10, 2),
  },
  remarks: {
      type: DataTypes.STRING,
  },
  rack: {
      type: DataTypes.STRING,
  },
  shelf: {
      type: DataTypes.STRING,
  },
  bin: {
      type: DataTypes.STRING,
  }
}, {
  timestamps: true,
  tableName: 'invgrn_items' // Unique table name for GRN items
});


// Define relationships
GRN.hasMany(GRNItem, { foreignKey: 'grn_id' });
GRNItem.belongsTo(GRN, { foreignKey: 'grn_id' });
module.exports = {GRN,GRNItem,IssueToClinic,IssueItems,OpeningBalanceItem,OpeningBalance,IndentItem,Indent,Requisition,RequisitionItem,Prefix,CurrentItemStock,PurchaseOrder,POItemDetails};