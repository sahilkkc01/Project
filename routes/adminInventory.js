var express = require('express');
var router = express.Router();
const session = require('express-session');
var flash = require('express-flash');

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60
  },
}));
router.use(flash());


const { setId, newSupplierCategory, newSupplier, newStore, newTax, newItem, newCurrency, newRank, newBin, newShelf, newPackageMember
  ,
  getAllBinMst,
  updateStatusBin,
  getUpdatePageBin,
  loadBinPage,
  getAllTax,
  updateTaxStatus,
  getUpdateTaxPage,
  loadTaxPage,
  getStoreList,
  updateStoreStatus,
  getUpdateStorePage,
  loadStorePage,
  getAllSuplyCategory,
  updateSCategoryStatus,
  getUpdatePageSCategory,
  loadSCategoryPage,
  getAllCurMaster,
  updateCurMasterStatus,
  getUpdatePageCurMaster,
  loadCurMasterPage,
  getAllRackMasterList,
  updateRackMasterStatus,
  getUpdatePageRackMaster,
  loadRackMasterPage,
  getItemMovementMaster,
  updateStatusItemMove,
  updatePageItemMove,
  loadItemMovePage,
  getSupplierList,
  updateSupplierStatus,
  getUpdateSupplierPage,
  loadSuppilerPage,
  getShelfMasterList,
  updateShelfMasterStatus,
  getUpdateShelfMasterPage,
  loadShelfMstPage,
  getPackList,
  newItemMaster,
  getItemMasterDaitle,
  loadItemCatPage,
  newItemCategory,
  getItemCategoryList,
  getItemGroupList,
  loadItemGroupPage,
  newItemGroup,
  loadStoreTypePage,
  newStoreType,
  getAllStorageType,
  loadDispensingPage,
  newDisType,
  getAllDisType,
  loadMoleculePage,
  newMolecule,
  getAllMoleculeList,
  newPregnancyClass,
  loadPregnancyClassPage,
  getAllPregnancyClassList,
  loadItemCompanyPage,
  newItemCompany,
  getItemCompanyList,
  newTheraputicClass,
  loadTherapeuticClassPage,
  getTheraClassList,
  loadUnitOfMeasurmentPage,
  newUnitOfMeasurement,
  getUnitOfMeasurementList,
  loadTermCondictionPage,
  newTermCondition,
  getAllTermAndCond,
  saveStatusData,
  itemLocationSave,
  getLocationDtls,
  deleteItemLocation,
  itemConvSave,
  getConvDtls,
  getSuppDtls,
  getStoreDetailsByClinic,
  itemStoreTax,
  getStoreTaxDtls,
  deleteItemStoreTax,
  itemOtherDtls,
  saveItemSupp,
  itemStoreMinMax,
  fetchMinMax,
  loadCostCentCodePage,
  newCostCentCode,
  loadRateContractPage,
  newRateContract,
  getAllRateContractList,
  changeFreeze,
  loadStrUntMstPage,
  newStrUnitMst,
  getAllStrUnitMstList,
  loadWorkOrdItemPage,
  newWorkOrdItem,
  getWorkOrdItemList,
    getCostCenterCodeList,
  loadHSNCodePage,
  newHSNCode,
  getHSNCodeList,
  getItemCatList,
  getSupplierListItem
} = require('../controllers/adminInventryControllers');
const { RackMaster, ShelfMaster, BinMaster, ItemMasterNew, UnitOfMeasurementNew, StoreDetails, TaxCategory, ItemSupplier, ItemOtherDetails, MoleculeNew, ItemGroupNew,  ItemCategoryNew, DispensingTypeNew, StorageTypeNew, PregnancyClassNew, TherapeuticClassNew, StrUnitMasterNew } = require('../models/adminInventorySchema');




/* GET users listing. */
router.get('/Inventory-Module', function (req, res, next) {
  res.render('adminInventry/index')
});

router.get('/1', (req, res) => {
  res.render('adminInventry/29-IC-item-movement-master')
})

router.get('/2', (req, res) => {
  res.render('adminInventry/31-IC-currency-master')
})

router.get('/3', (req, res) => {
  res.render('adminInventry/rack-master')
})

router.get('/4', (req, res) => {
  res.render('adminInventry/bin-master')
})

router.get('/5', (req, res) => {
  res.render('adminInventry/tax')
});

router.get('/6', (req, res) => {
  res.render('adminInventry/store')
})

router.get('/7', (req, res) => {
  res.render('adminInventry/supplierCategory')
})

router.get('/17', (req, res) => {
  res.render('adminInventry/supplier')
})

router.get('/18', (req, res) => {
  res.render('adminInventry/shelf-master')
})

router.get('/19', (req, res) => {
  res.render('adminInventry/list-of-packages')
})

router.get('/22', (req, res) => {
  res.render('adminInventry/item-category')
})

router.get('/24', (req, res) => {
  res.render('adminInventry/item-group')
})

router.get('/26', (req, res) => {
  res.render('adminInventry/storage-type')
})
router.get('/28',(req,res)=>{
  res.render('adminInventry/dispensing-type')
})

router.get('/30',(req,res)=>{
  res.render('adminInventry/molecule')
})

router.get('/32',(req,res)=>{
  res.render('adminInventry/pregnancy-class')
})

router.get('/34',(req,res)=>{
  res.render('adminInventry/item-company')
})

router.get('/36',(req,res)=>{
  res.render('adminInventry/therapeutic-class')
})

router.get('/38',(req,res)=>{
  res.render('adminInventry/unit-of-measurement')
})
router.get('/40',(req,res)=>{
  res.render('adminInventry/terms-&-conditions')
})

router.get('/50',(req,res)=>{
  res.render('adminInventry/cost-center-codes')
})

router.get('/50',(req,res)=>{
  res.render('adminInventry/cost-center-codes')
})


router.get('/44',(req,res)=>{
  res.render('adminInventry/rate-contract')
})

router.get('/46',(req,res)=>{
  res.render('adminInventry/strength-unit-master')
})

router.get('/48',(req,res)=>{
  res.render('adminInventry/work-order-item')
})

router.get('/52',(req,res)=>{
  res.render('adminInventry/HSN-codes-master')
})
router.get('/51',loadCostCentCodePage);

router.get('/45', loadRateContractPage);
router.get('/47', loadStrUntMstPage)
router.get('/49', loadWorkOrdItemPage)
router.get('/53',loadHSNCodePage);
router.get('/51',loadCostCentCodePage);




router.get('/20', function (req, res, next) {
  const currentDate = new Date().toISOString().split('T')[0];
  res.render('adminInventry/1-PC-package-membership-details', { currentDate })
})

router.get('/21', function (req, res, next) {
  const currentDate = new Date().toISOString().split('T')[0];
  res.render('adminInventry/item-new', { currentDate })
})
router.get('/43', function (req, res, next) {
  const currentDate = new Date().toISOString().split('T')[0];
 
  res.render('adminInventry/item-list', { currentDate })
})
router.get('/99', function (req, res, next) {
  const currentDate = new Date().toISOString().split('T')[0];
  res.render('adminInventry/42-IC-item-supplier', { currentDate })
})
router.get('/100', function (req, res, next) {
  const currentDate = new Date().toISOString().split('T')[0];
  res.render('adminInventry/41-IC-item-store', { currentDate })
})

router.get('/get-rack-details',async (req, res) => {
  console.log('11')
  try {
    const rack = await RackMaster.findAll();
    res.status(200).json(rack);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
})
router.get('/get-shelf-details',async (req, res) => {
  console.log('11')
  try {
    const shelf = await ShelfMaster.findAll();
    res.status(200).json(shelf);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
})
router.get('/get-bin-details',async (req, res) => {
  console.log('11')
  try {
    const bin = await BinMaster.findAll();
    res.status(200).json(bin);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
})
router.get('/get-clinic-details',async (req, res) => {
  console.log('11')
  try {
    const data = await ClinicConfiguration.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
})
const {ClinicConfiguration}=require('../models/clinicConfig')
router.get('/get-store-details',async (req, res) => {
  console.log('11')
  try {
    const clinic = await StoreDetails.findAll();
    res.status(200).json(clinic);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
})
router.get('/get-tax-details',async (req, res) => {
  console.log('11')
  try {
    const data = await TaxCategory.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
})
router.get('/get-UOM-details',async (req, res) => {
  console.log('11')
  try {
    const UOM = await UnitOfMeasurementNew.findAll();
    res.status(200).json(UOM);
  } catch (error) {
    console.error('Error fetching  details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching  details.' });
  }
})
router.get('/get-StrenghUnit-details',async (req, res) => {
  console.log('11')
  try {
    const UOM = await StrUnitMasterNew.findAll();
    res.status(200).json(UOM); 
  } catch (error) {
    console.error('Error fetching  details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching  details.' });
  }
})
router.get('/get-ItemGroup-details',async (req, res) => {
  console.log('11')
  try {
   
    const data = await ItemGroupNew.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching  details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching  details.' });
  }
})
router.get('/get-ItemCat-details',async (req, res) => {
  console.log('56789')
  try {
   
    const data= await ItemCategoryNew.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching  details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching  details.' });
  }
})
router.get('/get-DispType-details',async (req, res) => {
  console.log('56789')
  try {
   
    const data= await DispensingTypeNew.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching  details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching  details.' });
  }
})
router.get('/get-StorgeType-details',async (req, res) => {
  console.log('56789')
  try {
   
    const data= await StorageTypeNew.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching  details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching  details.' });
  }
})
router.get('/get-Molecule-details',async (req, res) => {
  console.log('11')
  try {
    const data = await MoleculeNew.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching  details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching  details.' });
  }
})
router.get('/get-item-details',async (req, res) => {
  console.log('11')
  try {
    const item = await ItemMasterNew.findAll();
    console.log(item)
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
})
router.get('/get-PregClass-details',async (req, res) => {
  console.log('11')
  try {
    const data = await PregnancyClassNew.findAll();
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
})
router.get('/get-TherClass-details',async (req, res) => {
  console.log('11')
  try {
    const data = await TherapeuticClassNew.findAll();
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching designation details:', error);
    res.status(500).json({ msg: 'An error occurred while fetching designation details.' });
  }
})








// Route to set the ID in the store
router.post('/set-id', setId);
router.post('/save-status-data',saveStatusData);

router.post('/SupplierCategorySubmit', newSupplierCategory);
router.post('/SupplierSubmit', newSupplier);
router.post('/StoreSubmit', newStore);
router.post('/TaxSubmit', newTax);
router.post('/ItemSubmit', newItem);
router.post('/CurrencyMoveSubmit', newCurrency);
router.post('/RankSubmit', newRank);
router.post('/BinmasterSubmit', newBin);
router.post('/ShelfmasterSubmit', newShelf);
router.post('/PackageMembershipSubmit', newPackageMember)
router.post('/ItemMstSubmit', newItemMaster);
router.post('/ItemCatSubmit', newItemCategory)
router.post('/ItemGroupSubmit', newItemGroup)
router.post('/storeTypeFormSubmit',newStoreType)
router.post('/dispensingTypeFormSubmit',newDisType)
router.post('/moleculeFormSubmit',newMolecule)
router.post('/pregnancyClassFormSubmit',newPregnancyClass)
router.post('/itemCompanyFormSubmit',newItemCompany)
router.post('/therapeuticClassFormSubmit',newTheraputicClass)
router.post('/unitOfMeasurFormSubmit',newUnitOfMeasurement)
router.post('/term&CondictionFormSubmit',newTermCondition)
router.post('/CostCentCodeSubmit',newCostCentCode);

router.get('/12', loadItemMovePage)
router.get('/15', loadBinPage)
router.get('/11', loadTaxPage)
router.get('/10', loadStorePage)
router.get('/8', loadSCategoryPage)
router.get('/13', loadCurMasterPage)
router.get('/14', loadRackMasterPage)
router.get('/9', loadSuppilerPage)
router.get('/16', loadShelfMstPage)
router.get('/23', loadItemCatPage)
router.get('/25', loadItemGroupPage)
router.get('/27', loadStoreTypePage)
router.get('/29',loadDispensingPage);
router.get('/31', loadMoleculePage)
router.get('/33',loadPregnancyClassPage);
router.get('/35',loadItemCompanyPage)
router.get('/37',loadTherapeuticClassPage);
router.get('/39',loadUnitOfMeasurmentPage)
router.get('/41',loadTermCondictionPage)

router.get('/get-All-Item', getItemMasterDaitle);
router.post('/itemLocationSave', itemLocationSave);
router.post('/itemConvSave', itemConvSave);
router.post('/itemStoreTaxSave', itemStoreTax);
router.post('/itemStoreMinMaxSave', itemStoreMinMax);
router.post('/route-to-fetch-details', fetchMinMax);
router.post('/itemOtherDtlsSave', itemOtherDtls);

router.get('/get-ItemMovement-list', getItemMovementMaster);
router.post('/update-itemMove-status', updateStatusItemMove);
router.post('/update-page-Item-Move', updatePageItemMove)

router.get('/get-bin-mst_data', getAllBinMst)
router.post('/update-Staus-Bin', updateStatusBin)
router.post('/get-update-bin', getUpdatePageBin);

router.get('/get-tax-list', getAllTax);
router.post('/update-tax-status', updateTaxStatus)
router.post('/update-page-tax', getUpdateTaxPage)

router.get('/getAll-store-list', getStoreList);
router.post('/update-status-store', updateStoreStatus);
router.post('/update-store-page', getUpdateStorePage);

router.get('/getAll-SCategory-list', getAllSuplyCategory);
router.post('/update-status-SCategory', updateSCategoryStatus);
router.post('/update-page-SCategory', getUpdatePageSCategory);


router.get('/getAll-CurMaster-list', getAllCurMaster);
router.post('/update-status-CurMaster', updateCurMasterStatus);
router.post('/update-page-CurMaster', getUpdatePageCurMaster);


router.get('/get-rackMaster-List', getAllRackMasterList);
router.post('/update-status-RackMaster', updateRackMasterStatus);
router.post('/update-page-RackMaster', getUpdatePageRackMaster)

router.post('/work-ord-item-FormSubmit',newWorkOrdItem)
router.post('/HSNSubmit',newHSNCode);

router.post('/get-item-suppliers', async (req, res) => {
  try {
      const { itemCode } = req.body;
      const currentSuppliers = await ItemSupplier.findAll({ where: { itemCode } });
      res.status(200).json(currentSuppliers);
  } catch (error) {
      console.error('Error fetching item suppliers:', error);
      res.status(500).json({ msg: 'Failed to fetch item suppliers' });
  }
});

router.post('/getItemOtherDetails', async (req, res) => {
  try {
    console.log('s',req.body)
      const { itemCode } = req.body;
      const itemDetails = await ItemOtherDetails.findOne({ where: { itemCode:itemCode } });

      if (itemDetails) {
          res.status(200).json(itemDetails);
      } else {
          res.status(200).json({
              itemCode: '',
              itemName: '',
              contra_indication: '',
              side_effects: '',
              help_url: ''
          });
      }
  } catch (error) {
      console.error('Error fetching item details:', error);
      res.status(500).json({ msg: 'Failed to fetch item details' });
  }
});

router.post('/save-item-suppliers', saveItemSupp);

router.get('/get-supplier-list', getSupplierList);
router.get('/get-supplier-list-item', getSupplierListItem);
router.post('/get-store-tax-list', getStoreTaxDtls);
router.post('/update-suppiler-status', updateSupplierStatus);
router.post('/update-supplier-page', getUpdateSupplierPage);

router.get('/get-shelf-master-list', getShelfMasterList);
router.post('/update-shelfMst-status', updateShelfMasterStatus);
router.post('/update-shelfMst-page', getUpdateShelfMasterPage);

router.get('/getAll-pack-list', getPackList);

router.get('/getAll-itemCat-list', getItemCategoryList);

router.get('/getAll-itemGroup-list', getItemGroupList);

router.get('/getAll-storageType-list',getAllStorageType);

router.get('/getAll-dispeningType-list',getAllDisType)

router.get('/getAll-molecule-list',getAllMoleculeList);
router.post('/get-Location-list',getLocationDtls);
router.post('/get-store-by-clinic',getStoreDetailsByClinic);
router.post('/get-conv-list',getConvDtls);
// router.post('/get-supplier-list',getSuppDtls);
router.post('/delete-item-location',deleteItemLocation);
router.post('/delete-item-store-tax',deleteItemStoreTax);

router.get('/getAll-preClass-list',getAllPregnancyClassList)

router.get('/getAll-itemCompany-list',getItemCompanyList);

router.get('/getAll-therapeutic-list',getTheraClassList)

router.get('/getAll-unitOfMeasur-list',getUnitOfMeasurementList)

router.get('/getAll-tarm&Cond',getAllTermAndCond)
router.get('/getAll-rateContract-list',getAllRateContractList)
router.post('/isFreeze-change',changeFreeze);

router.get('/getAll-str-unit-mst-list',getAllStrUnitMstList)

router.get('/get-work-ord-Item',getWorkOrdItemList)

router.get('/get-cost-center-code',getCostCenterCodeList);

router.get('/get-HSN-code',getHSNCodeList);

router.get('/get-item-cat-list',getItemCatList);
router.post('/rateContractFormSubmit',newRateContract)
router.post('/str-unit-mst-FormSubmit',newStrUnitMst)

module.exports = router;