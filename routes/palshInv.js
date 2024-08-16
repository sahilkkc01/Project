const {
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
  deleteRequisition,
  getCurrentItemStock,
  getUniqueItemsWithStock,
  savePurchaseOrder,
  approvePR,
  fetchRequisitionItemsWithDetails
} = require('../controllers/palashInvCtrls');
const router = require('express').Router();

router.get('/1',(req,res)=>{
  res.render('PalashInv/recorder-item');
})

// router.get('/2',(req,res)=>{
//     res.render('PalashInv/expired-item-list');
// })

// router.get('/3',(req,res)=>{
//     res.render('PalashInv/pending-indents-list');
// })

// router.get('/4',(req,res)=>{
//     res.render('PalashInv/pending-purchase-order-list');
// })

// router.get('/5',(req,res)=>{
//     res.render('PalashInv/pending-purchase-requisition-list');
// })

router.get('/6',(req,res)=>{
  res.render('PalashInv/item-stock');
})

router.get('/7',(req,res)=>{
  res.render('PalashInv/opening-balance');
})

router.get('/8',(req,res)=>{
  res.render('PalashInv/opening-balance-new-copy');
})

router.get('/9',(req,res)=>{
  res.render('PalashInv/store-indents-list');
})

router.get('/10',(req,res)=>{
 
  const {id} = req.query;
  res.render('PalashInv/store-indents-list-new',{id});
})

router.get('/11',(req,res)=>{
  
  res.render('PalashInv/purchase-requisition');
})

router.get('/12',(req,res)=>{
  const {id} = req.query;
  res.render('PalashInv/purchase-requisition-new',{id});
})

router.get('/13',(req,res)=>{
  res.render('PalashInv/purchase-requisition-new-add-items');
})

router.get('/14',(req,res)=>{
  res.render('PalashInv/goods-received-notes-main-items');
})

router.get('/15',(req,res)=>{
  res.render('PalashInv/goods-received-notes-free-items');
})

router.get('/16',(req,res)=>{
  res.render('PalashInv/goods-received-notes-new');
})

router.get('/17',(req,res)=>{
  res.render('PalashInv/approve-purchase-requisition-copy');
})

router.get('/18',(req,res)=>{
  res.render('PalashInv/goods-return-notes');
})

router.get('/19',(req,res)=>{
  res.render('PalashInv/goods-return-notes-new');
})

router.get('/20',(req,res)=>{
  res.render('PalashInv/issue-to-clinic');
})

router.get('/21',(req,res)=>{
  res.render('PalashInv/issue-to-clinic-new');
})

router.get('/22',(req,res)=>{
  res.render('PalashInv/receive-item-against-issue');
})

router.get('/23',(req,res)=>{
  res.render('PalashInv/receive-item-against-issue-new');
})

router.get('/24',(req,res)=>{
  res.render('PalashInv/approve-purchase-order');
})

router.get('/25',(req,res)=>{
  res.render('PalashInv/return-item');
})

router.get('/26',(req,res)=>{
  res.render('PalashInv/return-item-new');
})

router.get('/27',(req,res)=>{
  res.render('PalashInv/receive-item-against-return');
})

router.get('/28',(req,res)=>{
  res.render('PalashInv/receive-item-against-return-new');
})

router.get('/29',(req,res)=>{
  res.render('PalashInv/expired-item-return');
})

router.get('/30',(req,res)=>{
  res.render('PalashInv/expired-item-return-new');
})

router.get('/31',(req,res)=>{
  res.render('PalashInv/stock-adjustment');
})

router.get('/32',(req,res)=>{
  res.render('PalashInv/stock-adjustment-new');
})

router.get('/33',(req,res)=>{
  res.render('PalashInv/approve-indent');
})

router.get('/34',(req,res)=>{
  res.render('PalashInv/scrap-sale');
})

router.get('/35',(req,res)=>{
  res.render('PalashInv/scrap-sale-new');
})

router.get('/36',(req,res)=>{
  res.render('PalashInv/purchase-order');
})

router.get('/37',(req,res)=>{
  res.render('PalashInv/purchase-order-new');
})

router.get('/38',(req,res)=>{
  res.render('PalashInv/purchase-order-new-get-items-TABLE-INCOMPLETE');
})
router.get('/39',(req,res)=>{
  res.render('PalashInv/material-consumption');
})

router.get('/40',(req,res)=>{
  res.render('PalashInv/material-consumption-new');
})

router.get('/41',(req,res)=>{
  res.render('PalashInv/physical-item-stock');
})

router.get('/42',(req,res)=>{
  
    res.render('PalashInv/42-PIM-physical-item-stock-new[12-30]')
  })
  router.get('/43', (req, res) => {
    res.render('PalashInv/43-PIM-approve-goods-received-notes-main-items[12-42]');
  });
  
  router.get('/44', (req, res) => {
    res.render('PalashInv/44-PIM-approve-goods-received-notes-free-items[13-05]');
  });
  
  router.get('/45', (req, res) => {
    res.render('PalashInv/45-PIM-stock-adjustment[13-36]');
  });
  
  router.get('/46', (req, res) => {
    res.render('PalashInv/46-PIM-item-enquiry[13-42]');
  });
  
  router.get('/47', (req, res) => {
    res.render('PalashInv/47-PIM-item-enquiry-new[13-45]');
  });
  
  router.get('/48', (req, res) => {
    res.render('PalashInv/48-PIM-item-enquiry-add-item[14-00]');
  });
  
  router.get('/49', (req, res) => {
    res.render('PalashInv/49-PIM-quotation-details[14-09]');
  });
  
  router.get('/50', (req, res) => {
    res.render('PalashInv/50-PIM-quotation-details-new[14-19]');
  });
  
  router.get('/51', (req, res) => {
    res.render('PalashInv/51-PIM-quotation-details-new-enquiry-details[14-27]');
  });
  
  router.get('/52', (req, res) => {
    res.render('PalashInv/52-PIM-quotation-details-new-add-items[14-33]');
  });
  
  router.get('/53', (req, res) => {
    res.render('PalashInv/53-PIM-item-sales-return[14-43]');
  });
  
  router.get('/54', (req, res) => {
    res.render('PalashInv/54tab-PIM-item-sales-return-new[14-45]');
  });
  
  router.get('/55', (req, res) => {
    res.render('PalashInv/55-PIM-work-order[14-50]');
  });
  
  router.get('/56', (req, res) => {
    res.render('PalashInv/56-PIM-work-order-new[15-00]');
  });

  router.get('/57', (req, res) => {
    res.render('PalashInv/57-PIM-approve-work-order[15-14]');
  });
  
  router.get('/58', (req, res) => {
    res.render('PalashInv/58-PIM-suspend-stock-transaction[15-27]');
  });
  
  router.get('/59', (req, res) => {
    res.render('PalashInv/59-PIM-suspend-stock-transaction-new[15-29]');
  });
  
  router.get('/60', (req, res) => {
    res.render('PalashInv/60-PIM-issue-to-qs[15-37]');
  });
  
  router.get('/61', (req, res) => {
    res.render('PalashInv/61-PIM-issue-to-qs-new[15-39]');
  });
  
  router.get('/62', (req, res) => {
    res.render('PalashInv/62-PIM-receive-item-against-qs[15-48]');
  });
  
  router.get('/63', (req, res) => {
    res.render('PalashInv/63-PIM-receive-item-against-qs-new[15-51]');
  });
  
  router.get('/64', (req, res) => {
    res.render('PalashInv/64-PIM-issue-grn-item-to-qs');
  });
  
  router.get('/65', (req, res) => {
    res.render('PalashInv/65-PIM-issue-grn-item-to-qs-new');
  });
  
  router.get('/66', (req, res) => {
    res.render('PalashInv/66-PIM-receive-grn-to-qs-item[15-59]');
  });
  
  router.get('/67', (req, res) => {
    res.render('PalashInv/67-PIM-receive-grn-to-qs-item-new[16-00]');
  });
  
  router.get('/68', (req, res) => {
    res.render('PalashInv/68-PIM-approve-goods-return-note[16-08]');
  });
  
  router.get('/69', (req, res) => {
    res.render('PalashInv/69-PIM-approve-expired-item-return[16-19]');
  });
  
  router.get('/70', (req, res) => {
    res.render('PalashInv/70-PIM-approve-scrap-sale[16-37]');
  });
  
  router.get('/71', (req, res) => {
    res.render('PalashInv/71-PIM-mrp-adjustment[16-44]');
  });
  
  router.get('/72', (req, res) => {
    res.render('PalashInv/72-PIM-mrp-adjustment-new[16-45]');
  });
  
  router.get('/73', (req, res) => {
    res.render('PalashInv/73-PIM-mrp-adjustment-new-get-items[17-02]');
  });
  
  router.get('/74', (req, res) => {
    res.render('PalashInv/74-PIM-approve-mrp-adjustment[17-27]');
  });
  
  router.get('/75', (req, res) => {
    res.render('PalashInv/75-PIM-approve-direct[17-40]');
  });

  router.post('/save-opening-balance', createOpeningBalance);
  router.get('/get-opening-balance', getOpeningBalance);
  router.get('/get-current-item-stock-dtls', getCurrentItemStock);
  router.get('/getAll-indents', getStoreIndent);
  router.get('/get-opening-balance-item/:itemId', getItemDetails);
  router.get('/get-current-item-stock/:itemId', getItemDetails);
  router.get('/get-indent-details/:itemId', getIndentDetails);
  router.get('/get-items/:item_code', getItems);
  router.get('/get-indent/:id', getIndent);
  
  router.post('/createindent', createOrUpdateIndent);
  router.delete('/delete-indent/:id', deleteIndent);
  router.post('/update-freeze-status/:type/:id', updateFreezeStatus);
  
  router.post('/createrequisition', createOrUpdateRequisition);
  router.get('/getAll-requisitions', getAllRequisitions);

  router.get('/get-requisition-details/:id', getRequisitionDetails);
  router.get('/get-requisition/:id', getRequisition);
  router.delete('/delete-requisition/:id', deleteRequisition); // Add this route
  router.post('/approve-requisition/:id', approvePR); // Add this route

  router.get('/get-current-item-counts',getUniqueItemsWithStock)

  router.post('/save-purchase-order',savePurchaseOrder)

  router.get('/getprdata',fetchRequisitionItemsWithDetails)

  
  

  module.exports = router