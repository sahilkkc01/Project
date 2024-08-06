const { OpeningBalance, OpeningBalanceItem, Indent, IndentItem, Requisition, RequisitionItem, Prefix } = require('../models/palashInvSchmea');
const {ItemMasterNew}= require('../models/adminInventorySchema')

const createOpeningBalance = async (req, res) => {
    console.log(req.body);
    try {
        const { clinic, store, total_cgst_amount, total_sgst_amount, total_igst_amount, total_net_amount, total_amount, remarks, items } = req.body;

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

        // Create associated items
        const openingBalanceItems = items.map(item => ({
            ...item,
            opening_balance_id: openingBalance.id
        }));

        await OpeningBalanceItem.bulkCreate(openingBalanceItems);

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
      console.error('Error fetching bank branch master details:', error);
      res.status(500).json({ msg: 'An error occurred while fetching bank branch master details.' });
    }
  };
const getStoreIndent = async (req, res) => {
    console.log(req.body);
    try {
      const op = await Indent.findAll();
    
      res.status(200).json(op);
    } catch (error) {
      console.error('Error fetching bank branch master details:', error);
      res.status(500).json({ msg: 'An error occurred while fetching bank branch master details.' });
    }
  };

// controllers/itemDetailsController.js


const getItemDetails = async (req, res) => {

  const itemId = req.params.itemId;
  try {
    const itemDetails = await ItemMasterNew.findOne({ where: { id: itemId } });
    if (itemDetails) {
        console.log(itemDetails)
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
    console.error('Error fetching contract details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching contract details.' });
}
 
};
const getItems = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    console.log(itemId)
    // Fetch item details from the database
    const item = await ItemMasterNew.findOne({
      where: { id: itemId }, // Assuming the primary key field is named `item_id`
      // You can include additional attributes if necessary
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item); // Send the entire item object as response
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

  if (month >= 4) { // Financial year starts in April
    startYear = year % 100; // Last two digits of the start year
    endYear = (year + 1) % 100; // Last two digits of the end year
  } else {
    startYear = (year - 1) % 100;
    endYear = year % 100;
  }

  return `${startYear}-${endYear}`;
};


const createOrUpdateIndent = async (req, res) => {
  console.log(req.body);
  try {
    const { indent_no, indent_date, exp_del_date, from_store, to_store, mr_no_pat, patient_name, remark, freeze, items } = req.body;
    const financialYear = getFinancialYear();

    let indent;
    if (indent_no) {
      // Update existing indent
      indent = await Indent.findOne({ where: { indent_no } });
      if (!indent) {
        return res.status(404).json({ message: 'Indent not found' });
      }

      // Update the indent record
      await Indent.update({
        indent_date,
        exp_del_date,
        from_store,
        to_store,
        mr_no_pat,
        patient_name,
        remark,
        freeze
      }, { where: { indent_no } });

      // Remove existing indent items
      await IndentItem.destroy({ where: { indent_id: indent.id } });

      // Add updated indent items
      const indentItems = items.map(item => ({
        indent_id: indent.id,
        item_id: item.item_id,
        indent_quantity: item.indent_quantity,
        available_stock: item.available_stock
      }));
      await IndentItem.bulkCreate(indentItems);

      res.status(200).json({ message: 'Indent updated successfully', indent: { ...indent.toJSON(), indent_no } });
    } else {
      // Fetch prefix for indent
      const prefixRecord = await Prefix.findOne({ where: { name: 'Indent' } });
      if (!prefixRecord) {
        return res.status(404).json({ message: 'Prefix for Indent not found' });
      }
      const prefix = prefixRecord.prefix;

      // Create a new indent
      indent = await Indent.create({
        indent_date,
        exp_del_date,
        from_store,
        to_store,
        mr_no_pat,
        patient_name,
        remark,
        freeze
      });

      // Update indent_no with financial year and ID of the created indent
      const new_indent_no = `${financialYear}/${prefix}/${indent.id}`;
      await Indent.update({ indent_no: new_indent_no }, { where: { id: indent.id } });

      // Create the indent items records
      const indentItems = items.map(item => ({
        indent_id: indent.id,
        item_id: item.item_id,
        indent_quantity: item.indent_quantity,
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
    const { requisition_no, requisition_date, due_date, from_store, to_store, remark, freeze, items } = req.body;
    const financialYear = getFinancialYear();

    let requisition;
    if (requisition_no) {
      // Update existing requisition
      requisition = await Requisition.findOne({ where: { requisition_no } });
      if (!requisition) {
        return res.status(404).json({ message: 'Requisition not found' });
      }

      // Update the requisition record
      await Requisition.update({
        requisition_date,
        due_date,
        from_store,
        to_store,
        remark,
        freeze
      }, { where: { requisition_no } });

      // Remove existing requisition items
      await RequisitionItem.destroy({ where: { requisition_id: requisition.id } });

      // Add updated requisition items
      const requisitionItems = items.map(item => ({
        requisition_id: requisition.id,
        item_id: item.item_id,
        requisition_quantity: item.requisition_quantity,
        available_stock: item.available_stock
      }));
      await RequisitionItem.bulkCreate(requisitionItems);

      res.status(200).json({ message: 'Requisition updated successfully', requisition: { ...requisition.toJSON(), requisition_no } });
    } else {
      // Fetch prefix for requisition
      const prefixRecord = await Prefix.findOne({ where: { name: 'Purchase Requisition' } });
      if (!prefixRecord) {
        return res.status(404).json({ message: 'Prefix for Purchase Requisition not found' });
      }
      const prefix = prefixRecord.prefix;

      // Create a new requisition
      requisition = await Requisition.create({
        requisition_date,
        due_date,
        from_store,
        to_store,
        remark,
        freeze
      });

      // Update requisition_no with financial year and ID of the created requisition
      const new_requisition_no = `${financialYear}/${prefix}/${requisition.id}`;
      await Requisition.update({ requisition_no: new_requisition_no }, { where: { id: requisition.id } });

      // Create the requisition items records
      const requisitionItems = items.map(item => ({
        requisition_id: requisition.id,
        item_id: item.item_id,
        requisition_quantity: item.requisition_quantity,
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
  
      // Delete the indent from the database
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
        const indentId = req.params.id;
        const { freeze } = req.body;

        // Update the freeze status in the database
        await Indent.update({ freeze }, { where: { id: indentId } });

        res.status(200).json({ message: 'Freeze status updated successfully' });
    } catch (error) {
        console.error('Error updating freeze status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getindent= async (req, res) => {
  const { id } = req.params;
  try {
      const indent = await Indent.findByPk(id);
      const items = await IndentItem.findAll({
          where: { indent_id: id }
      });

      // Fetch item details from ClinicConfiguration based on item_id
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

      res.json({ indent, items: detailedItems });
  } catch (error) {
      console.error('Error fetching indent:', error);
      res.status(500).json({ message: 'Error fetching indent', error });
  }
}




module.exports = {
    createOpeningBalance,getOpeningBalance,getItemDetails,createOrUpdateIndent,getStoreIndent,getIndentDetails,getItems,deleteIndent,updateFreezeStatus,getindent,createOrUpdateRequisition
};