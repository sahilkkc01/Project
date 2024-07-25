const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const SupplierCategory = sequelize.define('SupplierCategory', {
    description: {
        type: DataTypes.STRING,

    },
    code: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tblsuppliercategory',
})

const StoreDetails = sequelize.define('StoreDetails', {
    clinic: {
        type: DataTypes.STRING,

    },
    parent_store: {
        type: DataTypes.STRING,

    },
    cost_center_code: {
        type: DataTypes.STRING,

    },
    code: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,

    },
    apply_all_items: {
        type: DataTypes.STRING,

    },
    apply_to_category: {
        type: DataTypes.STRING,

    },
    is_quarantine_store: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tblstore',
});
const TaxCategory = sequelize.define('TaxCategory', {
    tax_desc: {
        type: DataTypes.STRING,

    },
    tax_code: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tbltaxcategory',
});
const ItemMove = sequelize.define('ItemMove', {
    item_desc: {
        type: DataTypes.STRING,

    },
    item_code: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tblitemmove',
});
const CurrencyMaster = sequelize.define('CurrencyMaster', {
    currency_desc: {
        type: DataTypes.STRING,

    },
    currency_code: {
        type: DataTypes.STRING,

    },
    currency_symbol: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tblcurrencyMaster',
});
const RackMaster = sequelize.define('RackMaster', {
    rank_desc: {
        type: DataTypes.STRING,
    },
    rank_code: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tblrackmaster',
});
const ItemLocation = sequelize.define('itemlocation', {
    itemCode: {
        type: DataTypes.STRING,
    },
    store: {
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

    },
}, {
    alert: true,
    timestamps: true,
    tableName: 'itemlocation',
});
const ItemConv = sequelize.define('itemConv', {
    itemCode: {
        type: DataTypes.STRING,
    },
    from_uom: {
        type: DataTypes.STRING,
    },
    to_uom: {
        type: DataTypes.STRING,

    },
    conversion_factor: {
        type: DataTypes.INTEGER,

    },

}, {
    alert: true,
    timestamps: true,
    tableName: 'itemConv',
});
const BinMaster = sequelize.define('BinMaster', {
    bin_desc: {
        type: DataTypes.STRING,
    },
    bin_code: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tblbinmaster',
});
const ShelfMaster = sequelize.define('ShelfMaster', {
    shelf_desc: {
        type: DataTypes.STRING,
    },
    shelf_code: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tblshelfmaster',
});


const PackageMembership = sequelize.define('PackageMembership', {
    packageCode: {
        type: DataTypes.STRING,
    },
    packageName: {
        type: DataTypes.STRING,
    },
    packageRate: {
        type: DataTypes.INTEGER,
    },
    packageEffectiveDate: {
        type: DataTypes.DATE,
    },
    packageExpiryDate: {
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
    serviceTax: {
        type: DataTypes.STRING,
    },
    service_tax_percentage: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    service_tax_amount: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    staffDiscount: {
        type: DataTypes.STRING,
    },
    staff_discount_percentage: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    staff_discount_amount: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    staffParentDiscount: {
        type: DataTypes.STRING,
    },
    staff_parent_discount_percentage: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    staff_parent_discount_amount: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    concession: {
        type: DataTypes.STRING,
    },
    concession_percentage: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    concession_amount: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    outsource_test_checkbox: {
        type: DataTypes.STRING,
    },
    outsource_test_percentage: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    outsource_test_amount: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    consultant_rate_checkbox: {
        type: DataTypes.STRING,
    },
    consultant_rate_percentage: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    consultant_rate_amount: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    hospital_rate_checkbox: {
        type: DataTypes.STRING,
    },
    hospital_rate_percentage: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    hospital_rate_amount: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    family: {
        type: DataTypes.STRING,
    },
    count: {
        type: DataTypes.INTEGER,
    },
    applicableMemberRelations: {
        type: DataTypes.STRING,
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tblpackagemembership',
});



const ItemMasterNew = sequelize.define('ItemMaster', {
    item_code: {
        type: DataTypes.STRING,

    },
    brand_name: {
        type: DataTypes.STRING,

    },
    item_name: {
        type: DataTypes.STRING,

    },
    item_group: {
        type: DataTypes.STRING,

    },
    dispensing_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pregnancy_class: {
        type: DataTypes.STRING,
        allowNull: true
    },
    manufactured_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    purchase_uom: {
        type: DataTypes.STRING,

    },
    base_uom: {
        type: DataTypes.STRING,

    },
    base_unit_mrp: {
        type: DataTypes.FLOAT,

    },
    discount_on_sale: {
        type: DataTypes.FLOAT,

    },
    AnalysisRequired: {
        type: DataTypes.STRING,

    },
    expiry_alert_before_in_days: {
        type: DataTypes.INTEGER,

    },
    hsn_codes: {
        type: DataTypes.STRING,

    },
    walk_in_patients_discount_on_sale: {
        type: DataTypes.FLOAT,

    },
    staff_discount_on_sale: {
        type: DataTypes.FLOAT,

    },
    registered_patients_discount_on_sale: {
        type: DataTypes.FLOAT,

    },
    strength: {
        type: DataTypes.STRING,
        allowNull: true
    },
    strength_unit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    molecule_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    item_category: {
        type: DataTypes.STRING,

    },
    storage_type: {
        type: DataTypes.STRING,

    },
    storage_degree: {
        type: DataTypes.FLOAT,

    },
    therapeutic_class: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stocking_uom: {
        type: DataTypes.STRING,

    },
    selling_uom: {
        type: DataTypes.STRING,

    },
    base_unit_cost_price: {
        type: DataTypes.FLOAT,

    },
    route: {
        type: DataTypes.STRING,

    },
    batchesRequired: {
        type: DataTypes.STRING,


    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'ItemMaster'
});

const ItemCategoryNew = sequelize.define('ItemCategoryNew', {
    Item_code: {
        type: DataTypes.STRING,
    },
    Item_description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'item_categories',
});

const ItemGroupNew = sequelize.define('ItemCategory', {
    code: {
        type: DataTypes.STRING,


    },
    description: {
        type: DataTypes.STRING,

    },
    general_ledger: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'item_Groups',
    timestamps: true,
});

const StorageTypeNew = sequelize.define('StorageType', {
    code: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'storage_types',
    timestamps: true,
});

const DispensingTypeNew = sequelize.define('DispensingTypeNew', {
    code: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'dispensing_type',
    timestamps: true,
});


const MoleculeNew = sequelize.define('MoleculeNew', {
    code: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'molecule',
    timestamps: true,
});


const PregnancyClassNew = sequelize.define('PregnancyClassNew', {
    code: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'pregnancy_class',
    timestamps: true,
});
const ItemCompanyNew = sequelize.define('ItemCompanyNew', {
    code: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'item_company',
    timestamps: true,
});


const TherapeuticClassNew = sequelize.define('TherapeuticClassNew', {
    code: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'therapeutic-class',
    timestamps: true,
});
const UnitOfMeasurementNew = sequelize.define('UnitOfMeasurementNew', {
    code: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'unit-of-measurement',
    timestamps: true,
});

const TearmAndConditionNew = sequelize.define('TearmAndConditionNew', {
    code: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,

    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'tearm-&-condition',
    timestamps: true,
});
const ItemStoreMinMax = sequelize.define('ItemStoreMinMax', {
    // Define your columns here
    itemCode: {
      type: DataTypes.STRING,
     
    },
    store_id: {
      type: DataTypes.INTEGER,
      
    },
    store_name: {
      type: DataTypes.STRING,
      
    },
    min: {
      type: DataTypes.INTEGER,
    
    },
    max: {
      type: DataTypes.INTEGER,
    
    },
    reorder: {
      type: DataTypes.INTEGER,
  
    },
    isSelected: {
      type: DataTypes.BOOLEAN,
     
    }
  }, {
    // Other model options go here
    tableName: 'ItemStoreMinMax', // Make sure this matches your actual table name
    timestamps: true // Disable createdAt and updatedAt if you don't use them
  });
const ItemStoreTax = sequelize.define('ItemStoreTax', {
    itemCode: {
        type: DataTypes.STRING,

    },
    store: {
        type: DataTypes.STRING,

    },
    tax: {
        type: DataTypes.STRING,

    },
    applicable_for: {
        type: DataTypes.STRING,

    },
    applicable_on: {
        type: DataTypes.STRING,

    },
    percentage: {
        type: DataTypes.INTEGER,

    },
    taxType: {
        type: DataTypes.STRING,

    },
   

}, {
    alert: true,
    tableName: 'ItemStoreTax', 
    timestamps: true,
});
const ItemOtherDetails = sequelize.define('ItemOtherDetails', {
    itemCode: {
        type: DataTypes.STRING,

    },
    contra_indication: {
        type: DataTypes.TEXT,

    },
    side_effects: {
        type: DataTypes.TEXT,

    },
    help_url: {
        type: DataTypes.TEXT,

    },
   
}, {
    alert: true,
    tableName: 'ItemOtherDetails', 
    timestamps: true,
});

const ItemSupplier = sequelize.define('ItemSupplier', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    itemCode: {
        type: DataTypes.STRING,
       
       
    },
    supplierCode: {
        type: DataTypes.STRING,
     
    },
  
}, {
    tableName: 'ItemSupplier',
    timestamps: true
});

const Supplier = sequelize.define('Supplier', {
    code: {
        type: DataTypes.STRING,
    },
    description: {
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
    pin_code: {
        type: DataTypes.STRING,
    },
    supplier_category: {
        type: DataTypes.STRING,
    },
    address_line_1: {
        type: DataTypes.TEXT,
    },
    address_line_2: {
        type: DataTypes.TEXT,
    },
    address_line_3: {
        type: DataTypes.TEXT,
    },
    depreciation: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.STRING,
    },
    po_auto_close_days: {
        type: DataTypes.STRING,
    },
    contact_person_1_name: {
        type: DataTypes.STRING,
    },
    contact_person_1_mobile_no: {
        type: DataTypes.STRING,
    },
    contact_person_1_email: {
        type: DataTypes.STRING,
    },
    contact_person_1_phone_no: {
        type: DataTypes.STRING,
    },
    contact_person_1_fax: {
        type: DataTypes.STRING,
    },
    contact_person_2_name: {
        type: DataTypes.STRING,
    },
    contact_person_2_mobile_no: {
        type: DataTypes.STRING,
    },
    contact_person_2_email: {
        type: DataTypes.STRING,
    },
    contact_person_2_phone_no: {
        type: DataTypes.STRING,
    },
    contact_person_2_fax: {
        type: DataTypes.STRING,
    },
    mode_of_payment: {
        type: DataTypes.STRING,
    },
    terms_of_payment: {
        type: DataTypes.STRING,
    },
    tax_nature: {
        type: DataTypes.STRING,
    },
    currency: {
        type: DataTypes.STRING,
    },
    mst_number: {
        type: DataTypes.STRING,
    },
    cst_number: {
        type: DataTypes.STRING,
    },
    vat_number: {
        type: DataTypes.STRING,
    },
    gstin_number: {
        type: DataTypes.STRING,
    },
    drug_licence_number: {
        type: DataTypes.STRING,
    },
    service_tax_number: {
        type: DataTypes.STRING,
    },
    pan_number: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    alert: true,
    timestamps: true,
    tableName: 'tblsupplier',
});

const CostCenterCodeNew = sequelize.define('CostCenterCodeNew', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    alert: true,
    tableName: 'AdmInvcost_center_code',
    timestamps: true,
});


sequelize.sync();

module.exports = {
    SupplierCategory, Supplier, StoreDetails, TaxCategory, ItemMove, CurrencyMaster, RackMaster, BinMaster, ShelfMaster, PackageMembership, ItemMasterNew, ItemGroupNew, StorageTypeNew, DispensingTypeNew, MoleculeNew, PregnancyClassNew,
    ItemCompanyNew, TherapeuticClassNew, UnitOfMeasurementNew, TearmAndConditionNew, ItemLocation, ItemConv,
    ItemStoreMinMax,
    ItemStoreTax,
    ItemOtherDetails,
    ItemSupplier,
    ItemCategoryNew,
    CostCenterCodeNew
};