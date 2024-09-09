const { OpeningBalance, OpeningBalanceItem, Indent, IndentItem, Requisition, RequisitionItem, Prefix, CurrentItemStock, PurchaseOrder, POItemDetails, IssueToClinic, IssueToClinicItems, GRN, GRNItem, IssueItems } = require('../models/palashInvSchmea');
const { ItemMasterNew, ItemStoreTax, ItemConv, ItemSupplier } = require('../models/adminInventorySchema');
const {Op,Sequelize}= require('sequelize');

const createOpeningBalance = async (req, res) => {
    console.log(req.body);
    try {
        const { clinic, store, total_cgst_amount, total_sgst_amount, total_igst_amount, total_net_amount, total_amount, remarks, items } = req.body;

        // Extract batch codes from the items
        const batchCodes = items.map(item => item.batch_code);

        // Check if any of the batch codes already exist in the OpeningBalanceItem table
        const existingItems = await OpeningBalanceItem.findAll({
            where: {
                batch_code: batchCodes
            }
        });

        if (existingItems.length > 0) {
            // If any batch codes are found, return an error
            return res.status(400).json({
                success: false,
                message: `Batch codes already exist: ${existingItems.map(item => item.batch_code).join(', ')}`
            });
        }

        // Create opening balance record
        const openingBalance = await OpeningBalance.create({
            clinic,
            store,
            total_cgst_amount,
            total_sgst_amount,
            total_igst_amount,
            total_net_amount,
            total_amount,
            remarks
        });

        // Create associated items and include clinic name in each item
        const openingBalanceItems = items.map(item => ({
            ...item,
            opening_balance_id: openingBalance.id,
            clinic: clinic,
            store: store // Add clinic and store to each item
        }));

        await OpeningBalanceItem.bulkCreate(openingBalanceItems);

        // Create a new record in CurrentItemStock for each item
        const currentItemStockPromises = items.map(async (item) => {
            await CurrentItemStock.create({
                clinic: clinic,
                store: store,
                item_id: item.item_id,
                item_code: item.item_code,
                batchCode: item.batch_code,
                uom: item.uom,
                availableStock: item.total_quantity,
                expiryDate: item.expiry_date,
                isFree: false // or set based on your application logic
            });
        });

        await Promise.all(currentItemStockPromises);

        res.status(201).json({ success: true, message: 'Opening balance and items saved successfully' });
    } catch (error) {
        console.error('Error saving opening balance and items:', error);
        res.status(500).json({ success: false, message: 'Failed to save opening balance and items' });
    }
};



const getOpeningBalance = async (req, res) => {
    console.log(req.body);
    try {
        const op = await OpeningBalanceItem.findAll();
        res.status(200).json(op);
    } catch (error) {
        console.error('Error fetching opening balance details:', error);
        res.status(500).json({ msg: 'An error occurred while fetching opening balance details.' });
    }
};
const getCurrentItemStock = async (req, res) => {
    console.log(req.body);
    try {
        const op = await CurrentItemStock.findAll();
        res.status(200).json(op);
    } catch (error) {
        console.error('Error fetching opening balance details:', error);
        res.status(500).json({ msg: 'An error occurred while fetching opening balance details.' });
    }
};

const getStoreIndent = async (req, res) => {
    console.log(req.body);
    try {
        const op = await Indent.findAll();
        res.status(200).json(op);
    } catch (error) {
        console.error('Error fetching store indents:', error);
        res.status(500).json({ msg: 'An error occurred while fetching store indents.' });
    }
};

const getItemDetails = async (req, res) => {
    const itemId = req.params.itemId;
    try {
        const itemDetails = await ItemMasterNew.findOne({ where: { id: itemId } });
        if (itemDetails) {
            console.log(itemDetails);
            res.status(200).json(itemDetails);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getIndentDetails = async (req, res) => {
    const itemId = req.params.itemId;
    try {
        const contractDetails = await IndentItem.findAll({
            where: { indent_id: itemId }
        });

        res.status(200).json({ details: contractDetails });
    } catch (error) {
        console.error('Error fetching indent details:', error);
        res.status(500).json({ msg: 'An error occurred while fetching indent details.' });
    }
};

const getItems = async (req, res) => {
    try {
        const item_code = req.params.item_code;
        console.log(item_code);
        const item = await ItemMasterNew.findOne({
            where: { item_code: item_code}
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getFinancialYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    let startYear, endYear;

    if (month >= 4) {
        startYear = year % 100;
        endYear = (year + 1) % 100;
    } else {
        startYear = (year - 1) % 100;
        endYear = year % 100;
    }

    return `${startYear}-${endYear}`;
};

const createOrUpdateIndent = async (req, res) => {
    console.log(req.body);
    try {
        const { clinic,indent_no, indent_date, exp_del_date, from_store, to_store, mr_no_pat, patient_name, remark, freeze, items } = req.body;
        const financialYear = getFinancialYear();

        let indent;
        if (indent_no) {
            indent = await Indent.findOne({ where: { indent_no } });
            if (!indent) {
                return res.status(404).json({ message: 'Indent not found' });
            }

            await Indent.update({
                clinic,
                indent_date,
                exp_del_date,
                from_store,
                to_store,
                mr_no_pat,
                patient_name,
                remark,
                freeze
            }, { where: { indent_no } });

            await IndentItem.destroy({ where: { indent_id: indent.id } });

            const indentItems = items.map(item => ({
                indent_id: indent.id,
                item_code: item.item_code,
                indent_quantity: item.indent_quantity,
                uom: item.uom,
                available_stock: item.available_stock
            }));
            await IndentItem.bulkCreate(indentItems);

            res.status(200).json({ message: 'Indent updated successfully', indent: { ...indent.toJSON(), indent_no } });
        } else {
            const prefixRecord = await Prefix.findOne({ where: { name: 'Indent' } });
            if (!prefixRecord) {
                return res.status(404).json({ message: 'Prefix for Indent not found' });
            }
            const prefix = prefixRecord.prefix;

            indent = await Indent.create({
                clinic,
                indent_date,
                exp_del_date,
                from_store,
                to_store,
                mr_no_pat,
                patient_name,
                remark,
                freeze
            });

            const new_indent_no = `${financialYear}/${prefix}/${indent.id}`;
            await Indent.update({ indent_no: new_indent_no }, { where: { id: indent.id } });

            const indentItems = items.map(item => ({
                indent_id: indent.id,
                item_code: item.item_code,
                indent_quantity: item.indent_quantity,
                uom: item.uom,
                available_stock: item.available_stock
            }));

            await IndentItem.bulkCreate(indentItems);

            res.status(201).json({ message: 'Indent created successfully', indent: { ...indent.toJSON(), indent_no: new_indent_no } });
        }
    } catch (error) {
        console.error('Error creating or updating indent:', error);
        res.status(500).json({ message: 'Error creating or updating indent', error });
    }
};

const createOrUpdateRequisition = async (req, res) => {
    console.log(req.body);
    try {
        const { clinic,requisition_no, requisition_date, due_date, from_store, to_store, remark, freeze, items } = req.body;
        const financialYear = getFinancialYear();

        let requisition;
        if (requisition_no) {
            requisition = await Requisition.findOne({ where: { requisition_no } });
            if (!requisition) {
                return res.status(404).json({ message: 'Requisition not found' });
            }

            await Requisition.update({
                clinic,
                requisition_date,
                due_date,
                from_store,
                to_store,
                remark,
                freeze
            }, { where: { requisition_no } });

            await RequisitionItem.destroy({ where: { requisition_id: requisition.id } });

            const requisitionItems = items.map(item => ({
                requisition_id: requisition.id,
                item_code: item.item_code,
                requisition_quantity: item.requisition_quantity,
                uom: item.uom,
                available_stock: item.available_stock
            }));
            await RequisitionItem.bulkCreate(requisitionItems);

            res.status(200).json({ message: 'Requisition updated successfully', requisition: { ...requisition.toJSON(), requisition_no } });
        } else {
            const prefixRecord = await Prefix.findOne({ where: { name: 'Purchase Requisition' } });
            if (!prefixRecord) {
                return res.status(404).json({ message: 'Prefix for Purchase Requisition not found' });
            }
            const prefix = prefixRecord.prefix;

            requisition = await Requisition.create({
                clinic,
                requisition_date,
                due_date,
                from_store,
                to_store,
                remark,
                freeze
            });

            const new_requisition_no = `${financialYear}/${prefix}/${requisition.id}`;
            await Requisition.update({ requisition_no: new_requisition_no }, { where: { id: requisition.id } });

            const requisitionItems = items.map(item => ({
                requisition_id: requisition.id,
                item_code: item.item_code,
                requisition_quantity: item.requisition_quantity,
                uom: item.uom,
                available_stock: item.available_stock
            }));

            await RequisitionItem.bulkCreate(requisitionItems);

            res.status(201).json({ message: 'Requisition created successfully', requisition: { ...requisition.toJSON(), requisition_no: new_requisition_no } });
        }
    } catch (error) {
        console.error('Error creating or updating requisition:', error);
        res.status(500).json({ message: 'Error creating or updating requisition', error });
    }
};

const deleteIndent = async (req, res) => {
    try {
        const indentId = req.params.id;
        const result = await Indent.destroy({
            where: { id: indentId }
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Indent not found' });
        }

        res.status(200).json({ message: 'Indent deleted successfully' });
    } catch (error) {
        console.error('Error deleting indent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateFreezeStatus = async (req, res) => {
    try {
        const { type, id } = req.params;
        const { freeze } = req.body;
  
        if (type === 'indent') {
            await Indent.update({ freeze }, { where: { id } });
        } else if (type === 'requisition') {
            await Requisition.update({ freeze }, { where: { id } });
        } else if (type === 'po') {
            await PurchaseOrder.update({ freeze }, { where: { id } });
        } else {
            return res.status(400).json({ message: 'Invalid type specified' });
        }
  
        res.status(200).json({ message: 'Freeze status updated successfully' });
    } catch (error) {
        console.error('Error updating freeze status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };
  


const getIndent = async (req, res) => {
    const { id } = req.params;
    try {
        const indent = await Indent.findByPk(id);
        const items = await IndentItem.findAll({
            where: { indent_id: id }
        });

        const itemDetailsPromises = items.map(async (item) => {
            console.log(item)
            const itemDetails = await ItemMasterNew.findOne({
                where: { item_code: item.item_code },  // Use item_code to find the item details
                attributes: ['item_name', 'purchase_uom', 'stocking_uom']
            });
            return {
                ...item.toJSON(),
                itemDetails: itemDetails ? itemDetails.toJSON() : {}
            };
        });

        const detailedItems = await Promise.all(itemDetailsPromises);

        res.json({ indent, items: detailedItems });
    } catch (error) {
        console.error('Error fetching indent:', error);
        res.status(500).json({ message: 'Error fetching indent', error });
    }
};

const getAllRequisitions = async (req, res) => {
  try {
    const requisitions = await Requisition.findAll();
    res.status(200).json(requisitions);
  } catch (error) {
    console.error('Error fetching requisitions:', error);
    res.status(500).json({ message: 'An error occurred while fetching requisitions.' });
  }
};
const getRequisitionDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const requisition = await Requisition.findByPk(id);
    if (!requisition) {
      return res.status(404).json({ message: 'Requisition not found' });
    }

    const items = await RequisitionItem.findAll({
      where: { requisition_id: id }
    });
    console.log(items);

    // Fetch item details from ItemMasterNew based on item_id
    const itemDetailsPromises = items.map(async (item) => {
      const itemDetails = await ItemMasterNew.findByPk(item.item_id, {
        attributes: ['item_name', 'purchase_uom', 'stocking_uom']
      });
      return {
        ...item.toJSON(),
        itemDetails: itemDetails ? itemDetails.toJSON() : {}
      };
    });

    const detailedItems = await Promise.all(itemDetailsPromises);

    res.json({ requisition, items: detailedItems });
  } catch (error) {
    console.error('Error fetching requisition:', error);
    res.status(500).json({ message: 'Error fetching requisition', error });
  }
};

const getRequisition = async (req, res) => {
  const { id } = req.params;
  try {
    const requisition = await Requisition.findByPk(id);
    if (!requisition) {
      return res.status(404).json({ message: 'Requisition not found' });
    }

    const items = await RequisitionItem.findAll({
      where: { requisition_id: id }
    });

    // Fetch item details from ItemMasterNew based on item_id
    const itemDetailsPromises = items.map(async (item) => {
        const itemDetails = await ItemMasterNew.findOne({
            where: { item_code: item.item_code }, // Search by item_code
            attributes: ['item_name', 'purchase_uom', 'stocking_uom']
        });
      return {
        ...item.toJSON(),
        itemDetails: itemDetails ? itemDetails.toJSON() : {}
      };
    });

    const detailedItems = await Promise.all(itemDetailsPromises);

    res.json({ requisition, items: detailedItems });
  } catch (error) {
    console.error('Error fetching requisition:', error);
    res.status(500).json({ message: 'Error fetching requisition', error });
  }
};

const deleteRecord = async (req, res) => {
    try {
        const { type, id } = req.params;
  
        let itemModel, mainModel, foreignKey;
  
        // Determine the models and foreign key based on the type
        if (type === 'requisition') {
            itemModel = RequisitionItem;
            mainModel = Requisition;
            foreignKey = 'requisition_id';
        } else if (type === 'indent') {
            itemModel = IndentItem;
            mainModel = Indent;
            foreignKey = 'indent_id';
        } else if (type === 'po') {
            itemModel = POItemDetails;
            mainModel = PurchaseOrder;
            foreignKey = 'purchase_order_id';
        } else {
            return res.status(400).json({ message: 'Invalid type specified' });
        }
  
        // Delete the associated items first
        await itemModel.destroy({
            where: { [foreignKey]: id }
        });
  
        // Delete the main record itself
        const result = await mainModel.destroy({
            where: { id }
        });
  
        if (result === 0) {
            return res.status(404).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found` });
        }
  
        res.status(200).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully` });
    } catch (error) {
        console.error(`Error deleting ${type}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };
  

const getUniqueItemsWithStock = async (req, res) => {
    try {
        const { store, clinic } = req.query;
        const whereCondition = { store };

        if (clinic) {
            whereCondition.clinic = clinic;
        }

        console.log('Request Query:', req.query);

        // Step 1: Get unique item_ids with summed availableStock and uom based on store and clinic (if provided)
        const uniqueItems = await CurrentItemStock.findAll({
            attributes: [
                'item_id',
                'uom',
                [Sequelize.fn('SUM', Sequelize.col('availableStock')), 'totalAvailableStock']
            ],
            where: whereCondition,
            group: ['item_id', 'uom']
        });

        console.log(uniqueItems);

        const itemIds = uniqueItems.map(item => item.item_id);
        const stockMap = uniqueItems.reduce((map, item) => {
            const key = `${item.item_id}-${item.uom}`;
            map[key] = {
                totalAvailableStock: item.get('totalAvailableStock'),
                uom: item.uom
            };
            return map;
        }, {});

        // Step 2: Fetch item details from ItemMasterNew based on the unique item_ids
        const itemDetails = await ItemMasterNew.findAll({
            where: {
                id: {
                    [Op.in]: itemIds
                }
            }
        });

        // Extract itemCodes from the item details for tax and conversion lookup
        const itemCodes = itemDetails.map(item => item.item_code);

        // Step 3: Fetch tax details from ItemStoreTax based on itemCodes
        const taxDetails = await ItemStoreTax.findAll({
            where: {
                itemCode: {
                    [Op.in]: itemCodes
                }
            },
            attributes: ['itemCode', 'CGST', 'SGST', 'IGST']
        });

        // Create a map for quick lookup of tax details by itemCode
        const taxMap = taxDetails.reduce((map, tax) => {
            map[tax.itemCode] = tax;
            return map;
        }, {});

        // Step 4: Fetch all conversion details from ItemConv based on itemCodes
        const conversionDetails = await ItemConv.findAll({
            where: {
                itemCode: {
                    [Op.in]: itemCodes
                }
            }
        });

        // Create a map for quick lookup of conversion details by itemCode
        const conversionMap = conversionDetails.reduce((map, conv) => {
            if (!map[conv.itemCode]) {
                map[conv.itemCode] = [];
            }
            map[conv.itemCode].push(conv);
            return map;
        }, {});

        // Step 5: Combine the item details with the totalAvailableStock, uom, tax details, and conversion details
        const result = itemDetails.map(item => {
            const stockInfo = uniqueItems.find(ui => ui.item_id === item.id); // Find the corresponding uniqueItem
            const itemKey = `${item.id}-${stockInfo ? stockInfo.uom : ''}`;
            const stockData = stockMap[itemKey] || {};
            const tax = taxMap[item.item_code] || {};
            const conversions = conversionMap[item.item_code] || [];
            return {
                ...item.toJSON(),
                availableStock: stockData.totalAvailableStock || 0,
                uom: stockData.uom || '',
                CGST: tax.CGST || 0,
                SGST: tax.SGST || 0,
                IGST: tax.IGST || 0,
                conversions: conversions.map(conv => conv.toJSON())
            };
        });

        console.log(result);

        // Send the result as JSON
        return res.status(200).json({
            message: 'Items fetched successfully',
            data: result
        });
    } catch (error) {
        console.error('Error fetching unique items and their stock:', error);
        return res.status(500).json({
            message: 'Error fetching unique items and their stock',
            error: error.message
        });
    }
};

const savePurchaseOrder = async (req, res) => {
    console.log(req.body);
    try {
        // Extracting the purchase order data from the request body
        const {
            date,
            store,
            payment_mode,
            supplier,
            payment_terms,
            delivery,
            delivery_duration,
            guarantee_warranty,
            schedule,
            instructions,
            gross_amount,
            total_cgst,
            total_sgst,
            total_igst,
            other_charges,
            total_discount,
            po_discount,
            total_net_amount,
            remarks,
            items
        } = req.body;

        // Get the financial year
        const financialYear = getFinancialYear();

        // Find the prefix for purchase order
        const prefixRecord = await Prefix.findOne({ where: { name: 'Purchase Order' } });
        if (!prefixRecord) {
            return res.status(404).json({ message: 'Prefix for PurchaseOrder not found' });
        }
        const prefix = prefixRecord.prefix;

        // Creating the purchase order
        const purchaseOrder = await PurchaseOrder.create({
            date,
            store,
            payment_mode,
            supplier,
            payment_terms,
            delivery,
            delivery_duration,
            guarantee_warranty,
            schedule,
            instructions,
            gross_amount,
            total_cgst,
            total_sgst,
            total_igst,
            other_charges,
            total_discount,
            po_discount,
            total_net_amount,
            remarks
        });

        // Generate and update the po_no
        const new_po_no = `${financialYear}/${prefix}/${purchaseOrder.id}`;
        await PurchaseOrder.update({ po_no: new_po_no }, { where: { id: purchaseOrder.id } });

        // Getting the purchase order ID
        const purchaseOrderId = purchaseOrder.id;

        // Creating the associated item details with po_no
        const itemDetails = items.map(item => ({
            purchase_order_id: purchaseOrderId,  // Keeping purchase_order_id
            po_no: new_po_no,                    // Adding po_no
            item_code: item.item_code,
            item_name: item.item_name,
            pr_quantity: item.pr_quantity,
            pr_pending_quantity: item.pr_pending_quantity,
            purchase_uom: item.purchase_uom,
            purchase_quantity: item.purchase_quantity,
            stocking_uom: item.stocking_uom,
            transaction_uom: item.transaction_uom,
            purchase_cost_price: item.purchase_cost_price,
            cost_amount: item.cost_amount,
            mrp: item.mrp,
            amount: item.amount,
            available_stock: item.available_stock,
            discount_on_sale: item.discount_percent,
            discount_amount: item.discount_amount,
            cgst_percent: item.cgst_percent,
            cgst_amount: item.cgst_amount,
            sgst_percent: item.sgst_percent,
            sgst_amount: item.sgst_amount,
            igst_percent: item.igst_percent,
            igst_amount: item.igst_amount,
            net_amount: item.net_amount,
            specification: item.specification,
            hsn_code: item.hsn_code
        }));

        // Bulk insert the item details
        await POItemDetails.bulkCreate(itemDetails);

        // Sending a success response
        res.status(201).json({
            message: 'Purchase order and items saved successfully!',
            purchaseOrder: { ...purchaseOrder.toJSON(), po_no: new_po_no },
            items: itemDetails
        });

    } catch (error) {
        console.error('Error saving purchase order:', error);
        res.status(500).json({ message: 'An error occurred while saving the purchase order', error: error.message });
    }
};



const approvePR = async (req, res) => {
    console.log('112')
    try {
      const { id } = req.params;
  
      // Check if the requisition exists
      const requisition = await Requisition.findOne({ where: { id } });
  
      if (!requisition) {
       
        return res.status(404).json({ message: 'Requisition not found' });
      }
  
      // Update the requisition to mark it as approved
      await Requisition.update(
        { approved: true }, // Assuming there is an 'approved' field in the Requisition model
        { where: { id } }
      );
  
      res.status(200).json({ message: 'Requisition approved successfully' });
    } catch (error) {
      console.error('Error approving requisition:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const approveIndent = async (req, res) => {
    console.log('Request received for approval');
    try {
        const { id } = req.params;
        console.log(`Indent ID: ${id}`);
  
        // Check if the indent exists
        const indent = await Indent.findOne({ where: { id } });
  
        if (!indent) {
            console.log('Indent not found');
            return res.status(404).json({ message: 'Indent not found' });
        }
  
        // Update the indent to mark it as approved
        await Indent.update(
            { approved: true }, // Assuming there is an 'approved' field in the Indent model
            { where: { id } }
        );
  
        console.log('Indent approved successfully');
        res.status(200).json({ message: 'Indent approved successfully' });
    } catch (error) {
        console.error('Error approving indent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  const approvePO = async (req, res) => {
    console.log('Request received for approval');
    try {
        const { id } = req.params;
        
  
        // Check if the indent exists
        const indent = await PurchaseOrder.findOne({ where: { id } });
  
        if (!indent) {
            console.log(' not found');
            return res.status(404).json({ message: 'Indent not found' });
        }
  
        // Update the indent to mark it as approved
        await PurchaseOrder.update(
            { approved: true }, // Assuming there is an 'approved' field in the Indent model
            { where: { id } }
        );
  
        console.log('approved successfully');
        res.status(200).json({ message: 'approved successfully' });
    } catch (error) {
        console.error('Error approving indent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

  
  const fetchRequisitionItemsWithDetails = async (req, res) => {
    console.log(req.query);
    const { supplierCode, store } = req.query;

    try {
        // Step 1: Fetch item codes from ItemSupplier based on supplierCode
        const itemSuppliers = await ItemSupplier.findAll({
            where: { supplierCode: supplierCode }
        });

        console.log('Item Suppliers:', itemSuppliers);

        if (itemSuppliers.length === 0) {
            return res.status(404).json({ message: 'No items found for the given supplier code' });
        }

        const itemCodes = itemSuppliers.map(item => item.itemCode);
        console.log('Item Codes:', itemCodes);

        // Step 2: Fetch all data from StoreRequisition
        const storeRequisitions = await Requisition.findAll();
        console.log('Store Requisitions:', storeRequisitions);

        // Step 3: Get unique item_ids with summed availableStock based on store
        const stockData = await CurrentItemStock.findAll({
            attributes: [
                'item_id',
                [Sequelize.fn('SUM', Sequelize.col('availableStock')), 'totalAvailableStock']
            ],
            where: { store },
            group: ['item_id']
        });

        const stockMap = stockData.reduce((map, item) => {
            map[item.item_id] = item.get('totalAvailableStock');
            return map;
        }, {});

        // Step 4: Fetch details from ItemMaster, ItemStoreTax, ItemConv for item details
        const itemDetailsPromises = itemCodes.map(async (code) => {
            const itemMaster = await ItemMasterNew.findOne({ where: { item_code: code } });
            const itemStoreTax = await ItemStoreTax.findOne({ where: { itemCode: code } });
            const itemConv = await ItemConv.findOne({ where: { itemCode: code } });

            return {
                itemMaster: itemMaster ? itemMaster.toJSON() : null,
                itemStoreTax: itemStoreTax ? itemStoreTax.toJSON() : null,
                itemConv: itemConv ? itemConv.toJSON() : null,
                availableStock: stockMap[itemMaster ? itemMaster.id : null] || 0 // Use summed stock
            };
        });

        const itemDetails = await Promise.all(itemDetailsPromises);

        // Step 5: Fetch StoreRequisitionItem data and combine with item details
        const requisitionItemPromises = storeRequisitions.map(async (requisition) => {
            const requisitionItems = await RequisitionItem.findAll({
                where: { requisition_id: requisition.id }
            });

            console.log(`Requisition Items for Requisition ID ${requisition.id}:`, requisitionItems);
            const filteredItems = requisitionItems.filter(item => itemCodes.includes(item.item_code));

            // Match filteredItems with itemDetails
            const detailedItems = filteredItems.map((item) => {
                const itemDetail = itemDetails.find(detail => detail.itemMaster && detail.itemMaster.item_code === item.item_code);

                return {
                    ...item.toJSON(), // Ensure item is a plain object
                    itemDetail: itemDetail || {}, // Include item detail if available
                    requisition: {
                        requisition_no: requisition.requisition_no,
                        requisition_date: requisition.requisition_date,
                        // Add other requisition details if needed
                    }
                };
            });

            return {
                items: detailedItems // Return detailed items with requisition info included
            };
        });

        const requisitionData = await Promise.all(requisitionItemPromises);
        console.log('Requisition Data with Detailed Items:', requisitionData);

        // Send the combined data as response
        res.status(200).json(requisitionData);
    } catch (error) {
        console.error('Error fetching requisition items with details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Function to save Issue and associated Items

  



  const getIssueToclinic = async (req, res) => {
    console.log('1')
    try {
    
        const item = await IssueToClinic.findAll();

        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const getAllPO = async (req, res) => {
   
    try {
    
        const item = await PurchaseOrder.findAll();

        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

getPOItems = async (req, res) => {
    const poId = req.params.id;
    try {
        const poItems = await POItemDetails.findAll({
            where: { purchase_order_id: poId }
        });
        res.status(200).json(poItems);
    } catch (error) {
        console.error('Error fetching purchase order items:', error);
        res.status(500).json({ message: 'Error fetching purchase order items' });
    }
};

getIssueItems = async (req, res) => {
    const Id = req.params.id;
    try {
        const poItems = await IssueItems.findAll({
            where: { IssueToClinicId: Id }
        });
        res.status(200).json(poItems);
    } catch (error) {
        console.error('Error fetching purchase order items:', error);
        res.status(500).json({ message: 'Error fetching purchase order items' });
    }
};

const getItemsOnSearch = async (req, res) => {
    console.log(req.query)
    try {
        const searchCriteria = {};

        // Build the search criteria from the query parameters
        if (req.query.item_name) searchCriteria.item_name = { [Op.like]: `%${req.query.item_name}%` };
        if (req.query.brand_name) searchCriteria.brand_name = { [Op.like]: `%${req.query.brand_name}%` };
        if (req.query.item_code) searchCriteria.item_code = req.query.item_code;
        if (req.query.item_category) searchCriteria.item_category = req.query.item_category;
        if (req.query.item_group) searchCriteria.item_group = req.query.item_group;
        if (req.query.molecule_name) searchCriteria.molecule_name = req.query.molecule_name;

        // Query the database for items using the search criteria
        const items = await ItemMasterNew.findAll({ where: searchCriteria });

        // Extract item codes from the retrieved items for further queries
        const itemCodes = items.map(item => item.item_code);

        // Concurrently fetch store tax details, conversion factors, and current item stock using the item codes
        const [storeTaxes, conversionFactors, currentStocks] = await Promise.all([
            ItemStoreTax.findAll({
                where: { itemCode: { [Op.in]: itemCodes } }
            }),
            ItemConv.findAll({
                where: { itemCode: { [Op.in]: itemCodes } }
            }),
            CurrentItemStock.findAll({
                where: { item_code: { [Op.in]: itemCodes },store: req.query.store ||'' }
            })
        ]);

        // Combine the items with their corresponding store tax details, conversion factors, and current item stock
        const results = items.map(item => {
            const itemTaxDetails = storeTaxes.filter(tax => tax.itemCode === item.item_code);
            const itemConversionDetails = conversionFactors.filter(conv => conv.itemCode === item.item_code);
            const itemStockDetails = currentStocks.filter(stock => stock.item_code === item.item_code);
            return {
                ...item.toJSON(),
                storeTaxes: itemTaxDetails,
                conversionFactors: itemConversionDetails,
                currentStock: itemStockDetails
            };
        });

        // Return the combined results
        res.status(200).json(results);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getItemsFromIndents = async (req, res) => {
    try {
        const searchCriteria = {};

        // Build the search criteria from the query parameters
        if (req.query.item_name) searchCriteria.item_name = { [Op.like]: `%${req.query.item_name}%` };
        if (req.query.indent_no) searchCriteria.indent_no = { [Op.like]: `%${req.query.indent_no}%` };
        if (req.query.item_code) searchCriteria.item_code = req.query.item_code;
        if (req.query.store) searchCriteria.store = req.query.store;

        // Query the Indent schema based on search criteria
        const indents = await Indent.findAll({
            where: req.query.indent_no // Use searchCriteria for querying indents
        });

        if (indents.length === 0) {
            return res.status(404).json({ message: 'No indents found' });
        }

        // Extract indent IDs and corresponding details for further queries
        const indentIds = indents.map(indent => indent.id);
        const indentDetails = indents.reduce((acc, indent) => {
            acc[indent.id] = {
                indent_no: indent.indent_no,
                indent_date: indent.indent_date
            };
            return acc;
        }, {});

        // Fetch items from IndentItems using the indent IDs
        const indentItems = await IndentItem.findAll({
            where: { indent_id: { [Op.in]: indentIds } }
        });

        if (indentItems.length === 0) {
            return res.status(404).json({ message: 'No items found for the specified indents' });
        }

        // Extract item codes from the retrieved indent items for further queries
        const itemCodes = indentItems.map(item => item.item_code);

        // Concurrently fetch store tax details, current item stock, conversion details, and item details using the item codes
        const [storeTaxes, currentStocks, conversionFactors, itemDetails] = await Promise.all([
            ItemStoreTax.findAll({
                where: { itemCode: { [Op.in]: itemCodes } }
            }),
            CurrentItemStock.findAll({
                where: { item_code: { [Op.in]: itemCodes }, store: req.query.store || '' }
            }),
            ItemConv.findAll({
                where: { itemCode: { [Op.in]: itemCodes } }
            }),
            ItemMasterNew.findAll({
                where: { item_code: { [Op.in]: itemCodes } }
            })
        ]);

        // Combine the indent items with their corresponding store tax details, current item stock, conversion factors, item details, and indent details
        const results = indentItems.map(item => {
            const itemTaxDetails = storeTaxes.filter(tax => tax.itemCode === item.item_code);
            const itemStockDetails = currentStocks.filter(stock => stock.item_code === item.item_code);
            const itemConversionDetails = conversionFactors.filter(conv => conv.itemCode === item.item_code);
            const itemDetail = itemDetails.find(detail => detail.item_code === item.item_code);
            const indentDetail = indentDetails[item.indent_id];

            return {
                ...item.toJSON(),
                indent_no: indentDetail.indent_no,
                indent_date: indentDetail.indent_date,
                storeTaxes: itemTaxDetails,
                currentStock: itemStockDetails,
                conversionFactors: itemConversionDetails,
                itemDetails: itemDetail
            };
        });

        // Return the combined results
        res.status(200).json(results);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getItemsFromPR = async (req, res) => {
    console.log(req.query.from_store)
    try {
        const searchCriteria = {};

        // Build the search criteria from the query parameters
        if (req.query.item_name) searchCriteria.item_code = { [Op.like]: `%${req.query.item_name}%` };
        if (req.query.requisition_no) searchCriteria.requisition_no = { [Op.like]: `%${req.query.requisition_no}%` };
        if (req.query.item_code) searchCriteria.item_code = req.query.item_code;
        if (req.query.from_store) searchCriteria.from_store = req.query.from_store;
 

        // Query the Requisition schema based on search criteria
        const requisitions = await Requisition.findAll({
            where: req.query.requisition_no // Use searchCriteria for querying requisitions
        });

        if (requisitions.length === 0) {
            return res.status(404).json({ message: 'No requisitions found' });
        }

        // Extract requisition IDs and corresponding details for further queries
        const requisitionIds = requisitions.map(requisition => requisition.id);
        const requisitionDetails = requisitions.reduce((acc, requisition) => {
            acc[requisition.id] = {
                requisition_no: requisition.requisition_no,
                requisition_date: requisition.requisition_date
            };
            return acc;
        }, {});

        // Fetch items from RequisitionItem using the requisition IDs
        const requisitionItems = await RequisitionItem.findAll({
            where: { requisition_id: { [Op.in]: requisitionIds } }
        });

        if (requisitionItems.length === 0) {
            return res.status(404).json({ message: 'No items found for the specified requisitions' });
        }

        // Extract item codes from the retrieved requisition items for further queries
        const itemCodes = requisitionItems.map(item => item.item_code);

        // Concurrently fetch store tax details, current item stock, conversion details, and item details using the item codes
        const [storeTaxes, currentStocks, conversionFactors, itemDetails] = await Promise.all([
            ItemStoreTax.findAll({
                where: { itemCode: { [Op.in]: itemCodes } }
            }),
            CurrentItemStock.findAll({
                where: { item_code: { [Op.in]: itemCodes }, store: req.query.from_store || '' }
            }),
            ItemConv.findAll({
                where: { itemCode: { [Op.in]: itemCodes } }
            }),
            ItemMasterNew.findAll({
                where: { item_code: { [Op.in]: itemCodes } }
            })
        ]);

        // Combine the requisition items with their corresponding store tax details, current item stock, conversion factors, item details, and requisition details
        const results = requisitionItems.map(item => {
            const itemTaxDetails = storeTaxes.filter(tax => tax.itemCode === item.item_code);
            const itemStockDetails = currentStocks.filter(stock => stock.item_code === item.item_code);
            const itemConversionDetails = conversionFactors.filter(conv => conv.itemCode === item.item_code);
            const itemDetail = itemDetails.find(detail => detail.item_code === item.item_code);
            const requisitionDetail = requisitionDetails[item.requisition_id];

            return {
                ...item.toJSON(),
                requisition_no: requisitionDetail.requisition_no,
                requisition_date: requisitionDetail.requisition_date,
                storeTaxes: itemTaxDetails,
                currentStock: itemStockDetails,
                conversionFactors: itemConversionDetails,
                itemDetails: itemDetail
            };
        });

        // Return the combined results
        res.status(200).json(results);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};







getItemBatches = async (req, res) => {
    const Id = req.params.id;
    try {
        const Items = await CurrentItemStock.findAll({
            where: { item_id: Id }
        });
        console.log(Items)
        res.status(200).json(Items);
    } catch (error) {
        console.error('Error fetching purchase order items:', error);
        res.status(500).json({ message: 'Error fetching purchase order items' });
    }
};

saveGRNData = async (req, res) => {
    console.log(req.body)
    const {
        date, gate_entry_no, store, supplier, pay_mode, invoice_date, invoice_no,
        total_amount, sgst_amount, cgst_amount, igst_amount, other_charges, c_disc_amount,
        sch_disc_amount, grn_discount, net_amount, received_by, remark, is_finalize, items
    } = req.body;

    try {
        // Retrieve the prefix for GRN records
        const prefixRecord = await Prefix.findOne({ where: { name: 'GRN' } });
        if (!prefixRecord) {
            return res.status(404).json({ message: 'Prefix for GRN not found' });
        }
        const prefix = prefixRecord.prefix;

        // Create the GRN record
        const grn = await GRN.create({
            date, gate_entry_no, store_id: store, supplier_id: supplier, pay_mode, invoice_date,
            invoice_no, total_amount, sgst_amount, cgst_amount, igst_amount, other_charges,
            c_disc_amount, sch_disc_amount, grn_discount, net_amount, received_by, remark, is_finalize
        });

        // Generate the new GRN number using a format
        const financialYear = getFinancialYear(date);  // Assuming a function to determine the financial year
        const new_grn_no = `${financialYear}/${prefix}/${grn.id}`;

        // Update the GRN record with the new number
        await GRN.update({ grn_no: new_grn_no }, { where: { id: grn.id } });

        // If there are items to add
        if (items && items.length > 0) {
            const itemsWithGrnId = items.map(item => ({
                grn_id: grn.id,
                grn_no: new_grn_no,
                ...item
            }));
            // Bulk create GRN items
            await GRNItem.bulkCreate(itemsWithGrnId);
        }

        res.status(201).send({ message: 'GRN saved successfully!', grnId: grn.id, grnNo: new_grn_no });
    } catch (error) {
        console.error('Failed to save GRN:', error);
        res.status(500).send({ message: 'Failed to save GRN', error: error.message });
    }
};

const saveIssueToClinic = async (req, res) => {
    console.log(req.body);
    const {
        issue_date, from_store, to_store, is_quarantine, remark,
        total_cost_amount, mr_no, patient_name, items
    } = req.body;

    try {
        // Retrieve the prefix for Issue to Clinic records
        const prefixRecord = await Prefix.findOne({ where: { name: 'Issue To Clinic' } });
        if (!prefixRecord) {
            return res.status(404).json({ message: 'Prefix for Issue To Clinic not found' });
        }
        const prefix = prefixRecord.prefix;

        // Create the Issue to Clinic record without the issue_number first
        const issue = await IssueToClinic.create({
            issue_date, from_store, to_store, is_quarantine, remark,
            total_cost_amount, mr_no, patient_name
        });

        // Generate the new issue number using a format that includes the issue ID
        const financialYear = getFinancialYear(issue_date); // Assuming a function to determine the financial year
        const issue_number = `${financialYear}/${prefix}/${issue.id}`;

        // Update the Issue record with the new issue number
        await issue.update({ issue_number });

        // If there are items to add
        if (items && items.length > 0) {
            const itemsWithIssueId = items.map(item => ({
                IssueToClinicId: issue.id,
                issue_number, // Include the dynamically generated issue number
                ...item
            }));
            // Bulk create issue items
            await IssueItems.bulkCreate(itemsWithIssueId);
        }

        res.status(201).send({ message: 'Issue to Clinic saved successfully!', issueId: issue.id, issueNumber: issue.issue_number });
    } catch (error) {
        console.error('Failed to save Issue to Clinic:', error);
        res.status(500).send({ message: 'Failed to save Issue to Clinic', error: error.message });
    }
}



module.exports = {
    saveIssueToClinic,
    createOpeningBalance,
    getOpeningBalance,
    getItemDetails,
    createOrUpdateIndent,
    getStoreIndent,
    getIndentDetails,
    getItems,
    deleteIndent,
    updateFreezeStatus,
    getIndent,
    createOrUpdateRequisition,
    getAllRequisitions,
    getRequisitionDetails,
    getRequisition,
    getCurrentItemStock,
    getUniqueItemsWithStock,
    savePurchaseOrder,
    approvePR,
    fetchRequisitionItemsWithDetails,
    getIssueToclinic,
    getAllPO,
    getPOItems,
    deleteRecord,
    getItemsOnSearch,
    getItemBatches,
    saveGRNData,
    approveIndent,
    approvePO,
    getItemsFromIndents,
    getItemsFromPR,
    getIssueItems
};
