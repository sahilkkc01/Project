const CryptoJS = require('crypto-js');

const { Supplier, SupplierCategory, StoreDetails, TaxCategory, ItemMove, CurrencyMaster, RackMaster, BinMaster, ShelfMaster, PackageMembership, ItemMasterNew, ItemCategoryNew, ItemGroupNew, StorageTypeNew, DispensingTypeNew,
    MoleculeNew, PregnancyClassNew, ItemCompanyNew, TherapeuticClassNew, UnitOfMeasurementNew, TearmAndConditionNew,
    ItemLocation,
    ItemConv,
    ItemStoreTax,
    ItemOtherDetails,
    ItemSupplier,
    ItemStoreMinMax,
    CostCenterCodeNew,
    StrUnitMasterNew,
    WorkOrderItemNew,
    HSNCodeNew,
    RateContract
} = require("../models/adminInventorySchema");

let store = {};
const setId = (req, res) => {
    const id = req.body.id;
    const key = 'dataKey';
    store[key] = id;
    res.sendStatus(200);
}


function encryptDataForUrl(data) {
    console.log("Satya");
    const secretKey = 'll'; // Replace with your actual secret key
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    const encodedEncrypted = encodeURIComponent(encrypted);
    return encodedEncrypted;
}

function decryptData(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}


const saveStatusData = async (req, res) => {
    try {
        console.log(req.body);
        const { id, status, schema: encryptedSchema } = req.body;
        const secretKey = 'll'; // Replace with your actual secret key

        // Decrypt id and schema
        const Schema = decryptData(decodeURIComponent(encryptedSchema), secretKey); // URL decode

        console.log('Decrypted id:', id);
        console.log('Decrypted schema:', Schema);

        // Use decrypted id and schema to fetch data from the model
        const Model = require('../model/adminInventorySchema')[Schema];
        const data = await Model.findByPk(id);
        if (data) {
            // Update status and save
            data.status = status;
            await data.save();
            res.sendStatus(200);
        } else {
            res.status(404).send('Data not found');
        }
    } catch (error) {
        console.error('Error updating status:', error.message);
        res.status(500).send('Internal Server Error');
    }
}


const newSupplierCategory = async (req, res) => {
    console.log(req.body);
    if (req.body.id) {
        console.log(req.body.id);
        await SupplierCategory.update(req.body, { where: { id: req.body.id } })
        res.status(200).json({
            success: true,
            message: "Thank you for submitting",
        })
    }
    else {
        const isExist = await SupplierCategory.findOne({ where: { code: req.body.code } });
        if (isExist) {
            res.status(500).json({ success: false, msg: "This Code is already Exists" })
        }
        else {
            const Supp = await SupplierCategory.create(req.body)
            res.status(200).json({
                success: true,
                message: "Thank you for submitting",
            })
        }
    }

}
const newSupplier = async (req, res) => {
    try {
        if (req.body.id) {
            console.log(req.body.id);
            await Supplier.update(req.body, { where: { id: req.body.id } })
            res.status(200).json({
                success: true,
                message: "Thank you for submitting",
            })
        }
        else {
            const isExist = await Supplier.findOne({ where: { code: req.body.code } });
            if (isExist) {
                res.status(500).json({ success: false, msg: "This Code is already Exists" })
            }
            else {
                const Supp = await Supplier.create(req.body)
                res.status(200).json({
                    success: true,
                    message: "Thank you for submitting",
                })
            }
        }

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
const newStore = async (req, res) => {
    try {
        if (req.body.id) {
            console.log(req.body.id);
            await StoreDetails.update(req.body, { where: { id: req.body.id } })
            res.status(200).json({
                success: true,
                message: "Thank you for submitting",
            })
        }
        else {
            const isExist = await StoreDetails.findOne({ where: { code: req.body.code } });
            if (isExist) {
                res.status(500).json({ success: false, msg: "This Code is already Exists" })
            }
            else {
                const Supp = await StoreDetails.create(req.body)
                res.status(200).json({
                    success: true,
                    message: "Thank you for submitting",
                })
            }
        }

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}
const newTax = async (req, res) => {
    console.log(req.body)
    try {
        if (req.body.id) {
            console.log(req.body.id);
            await TaxCategory.update(req.body, { where: { id: req.body.id } })
            return res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        }
        else {
            const { tax_code } = req.body;
            const isExist = await TaxCategory.findOne({ where: { tax_code: tax_code } });
            if (isExist) {
                return res.status(500).json({ success: false, msg: "This Code is already Exists" })
            }
            else {
                console.log("Hello Satya");
                const Supp = await TaxCategory.create(req.body)
                return res.status(200).json({
                    success: true,
                    message: "Thank you for submitting",
                })
            }
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
const newItem = async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.id) {
            console.log(req.body.id);
            await ItemMove.update(req.body, { where: { id: req.body.id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        }
        else {
            const { item_code } = req.body;
            const isExist = await ItemMove.findOne({ where: { item_code: item_code } });
            if (isExist) {

                res.status(500).json({ success: false, msg: "This Code is already Exists" })
            }
            else {
                console.log("Hello Satya");
                const Supp = await ItemMove.create(req.body)
                res.status(200).json({
                    success: true,
                    message: "Thank you for submitting",
                })
            }
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
const newCurrency = async (req, res) => {
    try {
        if (req.body.id) {
            console.log(req.body.id);
            await CurrencyMaster.update(req.body, { where: { id: req.body.id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        }
        else {
            const { currency_code } = req.body;
            const isExist = await CurrencyMaster.findOne({ where: { currency_code: currency_code } });
            if (isExist) {

                res.status(500).json({ success: false, msg: "This Code is already Exists" })
            }
            else {
                console.log("Hello Satya");
                const Supp = await CurrencyMaster.create(req.body)
                res.status(200).json({
                    success: true,
                    message: "Thank you for submitting",
                })
            }
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
const newRank = async (req, res) => {
    console.log(req.body)
    try {
        if (req.body.id) {
            console.log(req.body.id);
            await RackMaster.update(req.body, { where: { id: req.body.id } })
            return res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        }
        else {
            const { rank_code } = req.body;
            const isExist = await RackMaster.findOne({ where: { rank_code: rank_code } });
            if (isExist) {

                return res.status(500).json({ success: false, msg: "This Code is already Exists" })
            }
            else {
                console.log("Hello Satya");
                const Supp = await RackMaster.create(req.body)
                return res.status(200).json({
                    success: true,
                    message: "Thank you for submitting",
                })
            }
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }




}
const newBin = async (req, res) => {

    console.log(req.body)
    try {
        if (req.body.id) {
            console.log(req.body.id);
            await BinMaster.update(req.body, { where: { id: req.body.id } })
            return res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        }
        else {
            const { bin_code } = req.body;
            const isExist = await BinMaster.findOne({ where: { bin_code: bin_code } });
            if (isExist) {
                return res.status(500).json({ success: false, msg: "This Code is already Exists" })
            }
            else {
                console.log("Hello Satya");
                const Supp = await BinMaster.create(req.body)
                return res.status(200).json({
                    success: true,
                    message: "Thank you for submitting",
                })
            }
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}
const newShelf = async (req, res) => {
    try {
        if (req.body.id) {
            console.log(req.body.id);
            await ShelfMaster.update(req.body, { where: { id: req.body.id } })
            res.status(200).json({
                success: true,
                message: "Thank you for submitting",
            })
        }
        else {
            const isExist = await ShelfMaster.findOne({ where: { shelf_code: req.body.shelf_code } });
            if (isExist) {
                res.status(500).json({ success: false, msg: "This Code is already Exists" })
            }
            else {
                const Supp = await ShelfMaster.create(req.body)
                res.status(200).json({
                    success: true,
                    message: "Thank you for submitting",
                })
            }
        }

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
const newPackageMember = async (req, res) => {
    console.log(req.body)
    try {
        const package = await PackageMembership.create(req.body)
        res.status(200).json({
            success: true,
            message: "Thank you for submitting",
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


const getAllBinMst = async (req, res) => {
    try {
        const binMst = await BinMaster.findAll()
        const schema = 'BinMaster';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ binMst, Encschema })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
const updateStatusBin = async (req, res) => {
    try {
        const Bid = req.body.id;
        const status = req.body.status;
        await BinMaster.update({ status: status }, { where: { id: Bid } })
        res.status(200).json({ msg: "Status Updated Successfully!" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error when are featching a data",
        });
    }
}

const getUpdatePageBin = async (req, res) => {
    try {
        const binId = req.body.id;
        // console.log(id)
        console.log(binId)
        req.flash('binId', binId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const loadBinPage = async (req, res) => {
    const binId = req.query.id;
    console.log(binId);
    let result = ''
    if (binId) {
        try {
            result = await BinMaster.findOne({ where: { id: binId } });
            console.log(result);
            const currentDate = new Date().toISOString().split('T')[0];
            res.render('adminInventry/36-IC-bin-master-new', { currentDate, result })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        res.render('adminInventry/36-IC-bin-master-new', { result: result });
    }
}

const getAllTax = async (req, res) => {
    try {
        const result = await TaxCategory.findAll();
        const schema = 'TaxCategory';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateTaxStatus = async (req, res) => {
    try {
        const Tid = req.body.id;
        const status = req.body.status;
        const Schema = req.body.Schema;
        const findSchema = decrypt(Schema);
        console.log(findSchema);
        await TaxCategory.update({ status: status }, { where: { id: Tid } });
        res.status(200).json({ success: true, message: "Tax Status Updated" })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getUpdateTaxPage = async (req, res) => {
    try {
        const taxId = req.body.id;
        console.log(taxId)
        req.flash('taxId', taxId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const loadTaxPage = async (req, res) => {
    const taxId = req.query.id;
    console.log(taxId);
    let result = ''
    if (taxId) {
        try {
            result = await TaxCategory.findOne({ where: { id: taxId } });
            console.log(result);
            const currentDate = new Date().toISOString().split('T')[0];
            res.render('adminInventry/28-IC-tax-new', { currentDate, result })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        res.render('adminInventry/28-IC-tax-new', { result: result });
    }
}

const getStoreList = async (req, res) => {
    try {
        const result = await StoreDetails.findAll();
        const schema = 'StoreDetails';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching department data:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updateStoreStatus = async (req, res) => {
    console.log(req.body);
    try {
        const storeId = req.body.id;
        const status = req.body.status;
        await StoreDetails.update({ status: status }, { where: { id: storeId } });
        res.status(200).json({ success: true, message: 'Store status updated successfully' })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const getUpdateStorePage = async (req, res) => {
    try {
        const storeId = req.body.id;
        console.log(storeId)
        req.flash('storeId', storeId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const loadStorePage = async (req, res) => {
    console.log(req.query.id);
    let result = ''
    const costCentCode = await CostCenterCodeNew.findAll();
    const clinic = await CostCenterCodeNew.findAll();
    const parentStore = await StoreDetails.findAll();
    if (req.query.id) {
        try {
            result = await StoreDetails.findOne({ where: { id: req.query.id } });
            console.log(result);
            const currentDate = new Date().toISOString().split('T')[0];
            res.render('adminInventry/26-IC-store-new', { currentDate, result, costCentCode, clinic, parentStore })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        res.render('adminInventry/26-IC-store-new', { result, costCentCode, clinic, parentStore });
    }
}

const getAllSuplyCategory = async (req, res) => {
    try {
        const result = await SupplierCategory.findAll();
        const schema = 'SupplierCategory';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const updateSCategoryStatus = async (req, res) => {
    console.log("Here is Data", req.body);
    try {
        const SCId = req.body.id;
        const status = req.body.status;
        await SupplierCategory.update({ status: status }, { where: { id: SCId } });
        res.status(200).json({ success: true, message: 'Status updated successfully' })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getUpdatePageSCategory = async (req, res) => {
    try {
        const SCategoryId = req.body.id;
        console.log(SCategoryId)
        req.flash('SCategoryId', SCategoryId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const loadSCategoryPage = async (req, res) => {
    const SCategoryId = req.query.id;
    console.log(SCategoryId);
    let result = ''
    if (SCategoryId) {
        try {
            result = await SupplierCategory.findOne({ where: { id: SCategoryId } });
            console.log(result);
            const currentDate = new Date().toISOString().split('T')[0];
            res.render('adminInventry/22-IC-supplier-category-new.ejs', { currentDate, result })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        res.render('adminInventry/22-IC-supplier-category-new.ejs', { result: result });
    }
}

const getAllCurMaster = async (req, res) => {
    try {
        const result = await CurrencyMaster.findAll();
        const schema = 'CurrencyMaster';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updateCurMasterStatus = async (req, res) => {
    try {
        const CMasterId = req.body.id;
        const status = req.body.status;
        await CurrencyMaster.update({ status: status }, { where: { id: CMasterId } });
        res.status(200).json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getUpdatePageCurMaster = async (req, res) => {
    try {
        const CurMasterId = req.body.id;
        console.log(CurMasterId)
        req.flash('CurMasterId', CurMasterId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const loadCurMasterPage = async (req, res) => {
    const CurMasterId = req.query.id;
    console.log(CurMasterId);
    let result = ''
    if (CurMasterId) {
        try {
            result = await CurrencyMaster.findOne({ where: { id: CurMasterId } });
            console.log(result);
            const currentDate = new Date().toISOString().split('T')[0];
            res.render('adminInventry/32-IC-currency-master-new.ejs', { currentDate, result })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        res.render('adminInventry/32-IC-currency-master-new.ejs', { result: result });
    }
}

const getAllRackMasterList = async (req, res) => {
    try {
        const result = await RackMaster.findAll()
        const schema = 'RackMaster';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const updateRackMasterStatus = async (req, res) => {
    try {
        const RMasterId = req.body.id
        const status = req.body.status
        await RackMaster.update({ status: status }, { where: { id: RMasterId } })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getUpdatePageRackMaster = async (req, res) => {
    try {
        const RMasterId = req.body.id;
        console.log(RMasterId)
        req.flash('RMasterId', RMasterId);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const SaveRateContract = async (req, res) => {
    console.log(req.body)
    return 
    try {
        const RMasterId = req.body.id;
        console.log(RMasterId)
        req.flash('RMasterId', RMasterId);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const loadRackMasterPage = async (req, res) => {
    const RMasterId = req.query.id;
    console.log(RMasterId);
    let result = ''
    if (RMasterId) {
        try {
            result = await RackMaster.findOne({ where: { id: RMasterId } });
            console.log(result);
            const currentDate = new Date().toISOString().split('T')[0];
            res.render('adminInventry/34-IC-rack-master-new', { currentDate, result })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        res.render('adminInventry/34-IC-rack-master-new', { result: result });
    }
}

const getItemMovementMaster = async (req, res) => {
    try {
        const result = await ItemMove.findAll();
        const schema = 'ItemMove';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updateStatusItemMove = async (req, res) => {
    try {
        const ItemMoveId = req.body.id;
        const status = req.body.status;
        await ItemMove.update({ status: status }, { where: { id: ItemMoveId } });
        res.status(200).json({ success: true, message: "Status Updated Successfully" })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updatePageItemMove = async (req, res) => {
    try {
        const ItemModeId = req.body.id;
        console.log(ItemModeId)
        req.flash('ItemModeId', ItemModeId);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const loadItemMovePage = async (req, res) => {
    const ItemModeId = req.query.id;
    console.log(ItemModeId);
    let result = ''
    if (ItemModeId) {
        try {
            result = await ItemMove.findOne({ where: { id: ItemModeId } });
            console.log(result);
            const currentDate = new Date().toISOString().split('T')[0];
            res.render('adminInventry/30-IC-item-movement-master-new', { currentDate, result })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        res.render('adminInventry/30-IC-item-movement-master-new', { result: result });
    }
}
const getSupplierList = async (req, res) => {
    try {
        const result = await Supplier.findAll();
        const schema = 'Supplier';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const getSupplierListItem = async (req, res) => {
    try {
        const supplierList = await Supplier.findAll();
        console.log(supplierList);
        res.status(200).json(supplierList)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


const updateSupplierStatus = async (req, res) => {
    try {
        const supplierId = req.body.id;
        const status = req.body.status;
        await Supplier.update({ status: status }, { where: { id: supplierId } });
        res.status(200).json({ success: true, message: 'Status updated successfully.' })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

const getUpdateSupplierPage = async (req, res) => {
    try {
        const suppilerId = req.body.id;
        console.log(suppilerId)
        req.flash('suppilerId', suppilerId);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const loadSuppilerPage = async (req, res) => {
    const suppilerId = req.query.id;
    console.log(suppilerId);
    const SupCat = await SupplierCategory.findAll();
    const Currency = await CurrencyMaster.findAll();
    let result = ''
    if (suppilerId) {
        try {
            result = await Supplier.findOne({ where: { id: suppilerId } });
            console.log(result);
            const currentDate = new Date().toISOString().split('T')[0];
            res.render('adminInventry/24-IC-supplier-new', { currentDate, result, SupCat, Currency })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        res.render('adminInventry/24-IC-supplier-new', { result: result, SupCat, Currency });
    }
}

const getShelfMasterList = async (req, res) => {
    try {
        const result = await ShelfMaster.findAll();
        const schema = 'ShelfMaster';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching department data:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updateShelfMasterStatus = async (req, res) => {
    try {
        const ShelfMstId = req.body.id;
        const status = req.body.status;
        await ShelfMaster.update({ status: status }, { where: { id: ShelfMstId } });
        res.status(200).json({ success: true, message: 'Status updated successfully.' })
    } catch (error) {
        console.error('Error fetching department data:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getUpdateShelfMasterPage = async (req, res) => {
    try {
        const ShelfMstId = req.body.id;
        console.log(ShelfMstId)
        req.flash('ShelfMstId', ShelfMstId);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error fetching department data:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const loadShelfMstPage = async (req, res) => {
    const ShelfMstId = req.query.id;
    console.log(ShelfMstId);
    let result = ''
    if (ShelfMstId) {
        try {
            result = await ShelfMaster.findOne({ where: { id: ShelfMstId } });
            console.log(result);
            const currentDate = new Date().toISOString().split('T')[0];
            res.render('adminInventry/38-IC-shelf-master-new', { currentDate, result })
        } catch (error) {
            console.error('Error fetching department data:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        res.render('adminInventry/38-IC-shelf-master-new', { result: result });
    }
}

const getPackList = async (req, res) => {
    try {
        const result = await PackageMembership.findAll()
        const schema = 'PackageMembership';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });

    } catch (error) {
        console.error('Error fetching department data:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


const newItemMaster = async (req, res) => {
    console.log('11');
    console.log("Request body:", req.body);
    try {
        console.log("Inside try block");

        // Check if an item with the same item_code already exists using Sequelize
        const existingItem = await ItemMasterNew.findOne({
            where: {
                item_code: req.body.item_code
            }
        });

        if (existingItem) {
            console.log("Duplicate item_code found");
            return res.status(400).json({ success: false, msg: "Duplicate item_code. Item already exists!" });
        }

        // If not, proceed to save the new item
        await ItemMasterNew.create(req.body);
        console.log("Item saved successfully");
        res.status(200).json({ success: true, msg: "Item saved successfully!" });
    } catch (error) {
        console.error('Error saving item data:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const fetchMinMax = async (req, res) => {
    console.log('11');
    console.log("Request body:", req.body);
    try {
        console.log("Inside try block");

        // Check if an item with the same item_code already exists using Sequelize
        item = await ItemStoreMinMax.findOne({
            where: {
                store_id: req.body.store_id
            }
        });
        console.log(item);

       
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Details not found for the provided itemCode' });
        }
    } catch (error) {
        console.error('Error saving item data:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




const getItemMasterDaitle = async (req, res) => {
    try {
        const result = await ItemMasterNew.findAll();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching Item Data Save', error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
const itemLocationSave = async (req, res) => {
    console.log(req.body);
    try {
        // Check if an item location with the same itemCode and store already exists
        const existingItem = await ItemLocation.findOne({
            where: {
                itemCode: req.body.itemCode,
                store: req.body.store,
                rack:req.body.rack
            }
        });

        if (existingItem) {
            return res.status(400).json({
                success: false,
                msg: "Duplicate entry"
            });
        }

        // If not, proceed to save the new item location
        await ItemLocation.create(req.body);
        res.status(200).json({ msg: "Save Successfully" });
    } catch (error) {
        console.error('Error saving Item Location Data', error);
        res.status(500).json({
            success: false,
            msg: "Internal error",
        });
    }
}


const itemConvSave = async (req, res) => {
    console.log(req.body);
    try {
      // Check if the same entry exists in the database for the specific itemCode, from_uom, and to_uom
      const existingEntry = await ItemConv.findOne({
        where: {
          itemCode: req.body.itemCode,
          from_uom: req.body.from_uom,
          to_uom: req.body.to_uom
        }
      });
  
      if (existingEntry) {
        return res.status(400).json({
          success: false,
          msg: "This conversion already exists for the specified itemCode"
        });
      }
  
      await ItemConv.create(req.body);
      res.status(200).json({ msg: "Save Successfully" });
    } catch (error) {
      console.error('Error saving Item Conversion Data', error);
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  };
  
  module.exports = itemConvSave;
  
const itemStoreTax = async (req, res) => {
    console.log(req.body);
    try {
        // Check if the same entry exists in the database
       
        await ItemStoreTax.create(req.body);
        res.status(200).json({ msg: "Save Successfully" });
    } catch (error) {
        console.error('Error saving Item  Data', error);
        res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};
const itemStoreMinMax = async (req, res) => {
    console.log(req.body);
    try {
      const data = req.body.data;
      for (const item of data) {
        const { itemCode, store_id, store_name } = item;
        const existingItem = await ItemStoreMinMax.findOne({
          where: {
            itemCode: itemCode,
            store_id: store_id,
            store_name: store_name,
          },
        });
  
        if (existingItem) {
          // Update existing item
          await existingItem.update(item);
        } else {
          // Create new item
          await ItemStoreMinMax.create(item);
        }
      }
      res.status(200).json({ msg: "Save Successfully" });
    } catch (error) {
      console.error('Error saving Item Data', error);
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  };
  

const itemOtherDtls = async (req, res) => {
    console.log(req.body);
    try {
        const { itemCode, contra_indication, side_effects, help_url } = req.body;

        // Check if the entry with the given itemCode exists
        const existingItem = await ItemOtherDetails.findOne({ where: { itemCode:itemCode } });

        if (existingItem) {
            // Update the existing entry
            await ItemOtherDetails.update(
                { contra_indication, side_effects, help_url },
                { where: { itemCode } }
            );
            res.status(200).json({ msg: "Updated Successfully" });
        } else {
            // Create a new entry
            await ItemOtherDetails.create(req.body);
            res.status(200).json({ msg: "Saved Successfully" });
        }
    } catch (error) {
        console.error('Error saving Item Data', error);
        res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};





const newItemCategory = async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            console.log(id);
            await ItemCategoryNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { Item_code } = req.body;
            console.log(Item_code);
            const isExist = await ItemCategoryNew.findOne({ where: { Item_code: Item_code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await ItemCategoryNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getItemCategoryList = async (req, res) => {
    try {
        const ItemCatData = await ItemCategoryNew.findAll();
        const schema = 'ItemCategoryNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ ItemCatData, Encschema })
    } catch (error) {
        console.error('Error fetching Item Data ', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const loadItemCatPage = async (req, res) => {
    const itemCatId = req.query.id;
    console.log(itemCatId);
    let result = ''
    if (itemCatId) {
        try {
            result = await ItemCategoryNew.findOne({ where: { id: itemCatId } });
            store = {}
            console.log(result);
            res.render('adminInventry/item-category-new', { result: result });
        } catch (error) {
            console.error('Error fetching Item Data Save', error);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    else {
        res.render('adminInventry/item-category-new', { result: result });
    }
}

const newItemGroup = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await ItemGroupNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await ItemGroupNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await ItemGroupNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
const loadItemGroupPage = async (req, res) => {
    const itemGrpId = req.query.id
    console.log(itemGrpId);
    let result = ''
    if (itemGrpId) {
        try {
            console.log("Hello Satya");
            result = await ItemGroupNew.findOne({ where: { id: itemGrpId } });
            console.log(result);
            res.render('adminInventry/item-group-new', { result: result });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/item-group-new', { result: result })
    }
}


const getItemGroupList = async (req, res) => {
    try {
        const result = await ItemGroupNew.findAll();
        const schema = 'ItemGroupNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema })
    } catch (error) {
        console.log('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const loadStoreTypePage = async (req, res) => {
    const storeTypeId = req.query.id;
    console.log(storeTypeId);
    let result = ''
    if (storeTypeId) {
        try {
            console.log("Hello Satya");
            result = await StorageTypeNew.findOne({ where: { id: storeTypeId } });
            store = {}
            console.log(result);
            res.render('adminInventry/storage-type-new', { result: result });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/storage-type-new', { result })
    }
}
const newStoreType = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await StorageTypeNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await StorageTypeNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await StorageTypeNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllStorageType = async (req, res) => {
    try {
        const result = await StorageTypeNew.findAll();
        const schema = 'StorageTypeNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const loadDispensingPage = async (req, res) => {
    const disTypeId = req.query.id;
    console.log(disTypeId);
    let result = ''
    if (disTypeId) {
        try {
            console.log("Hello Satya");
            result = await DispensingTypeNew.findOne({ where: { id: disTypeId } });
            store = {}
            console.log(result);
            res.render('adminInventry/dispensing-type-new', { result: result });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/dispensing-type-new', { result })
    }
}

const newDisType = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await DispensingTypeNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await DispensingTypeNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await DispensingTypeNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllDisType = async (req, res) => {
    try {
        const result = await DispensingTypeNew.findAll();
        const schema = 'DispensingTypeNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const loadMoleculePage = async (req, res) => {
    const molId = req.query.id;
    console.log(molId);
    let result = ''
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await MoleculeNew.findOne({ where: { id: molId } });
            console.log(result);
            res.render('adminInventry/molecule-new', { result: result });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/molecule-new', { result })
    }
}

const newMolecule = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await MoleculeNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await MoleculeNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await MoleculeNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllMoleculeList = async (req, res) => {
    try {
        const result = await MoleculeNew.findAll();
        const schema = 'MoleculeNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema })
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
const getLocationDtls = async (req, res) => {
    console.log(req.body);
    try {
        const result = await ItemLocation.findAll({
            where: {
                itemCode: req.body.code
            }
        });
       
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getStoreDetailsByClinic = async (req, res) => {
    console.log(req.body);
    try {
        const result = await StoreDetails.findAll({
            where: {
                clinic: req.body.clinic
            }
        });
       
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching Store Data', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getConvDtls = async (req, res) => {
    console.log(req.body);
    try {
        const result = await ItemConv.findAll({
            where: {
                itemCode: req.body.code
            }
        });
       
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getStoreTaxDtls = async (req, res) => {
    console.log('133')
    console.log(req.body);
    try {
        const result = await ItemStoreTax.findAll({
            where: {
                itemCode: req.body.code
            }
        });
       
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// const getSuppDtls = async (req, res) => {
//     console.log('1')
//     console.log(req.body);
//     try {
//         const result = await Supplier.findAll({
//             where: {
//                 code: req.body.code
//             }
//         });
       
//         res.status(200).json(result);
//     } catch (error) {
//         console.error('Error fetching Item Data Save', error.message);
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };
const deleteItemLocation= async (req, res) => {
    try {
        const itemId = req.body.id;
        await ItemLocation.destroy({
            where: {
                id: itemId
            }
        });
        res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const deleteItemStoreTax= async (req, res) => {
    try {
        const itemId = req.body.id;
        await ItemStoreTax.destroy({
            where: {
                id: itemId
            }
        });
        res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


const loadPregnancyClassPage = async (req, res) => {
    const key = 'dataKey';
    const molId = store[key];
    console.log(molId);
    let result = ''
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await MoleculeNew.findOne({ where: { id: molId } });
            store = {}
            console.log(result);
            res.render('adminInventry/pregnancy-class-new', { result: result });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/pregnancy-class-new', { result })
    }
}



const newPregnancyClass = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await PregnancyClassNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await PregnancyClassNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await PregnancyClassNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllPregnancyClassList = async (req, res) => {
    try {
        const result = await PregnancyClassNew.findAll()
        const schema = 'PregnancyClassNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


const newItemCompany = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await ItemCompanyNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await ItemCompanyNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await ItemCompanyNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


const loadItemCompanyPage = async (req, res) => {
    const molId = req.query.id;
    console.log(molId);
    let result = ''
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await ItemCompanyNew.findOne({ where: { id: molId } });
            store = {}
            console.log(result);
            res.render('adminInventry/item-company-new', { result: result });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/item-company-new', { result })
    }
}

const getItemCompanyList = async (req, res) => {
    try {
        const result = await ItemCompanyNew.findAll();
        const schema = 'ItemCompanyNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.log('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


const loadTherapeuticClassPage = async (req, res) => {
    const molId = req.query.id;
    console.log(molId);
    let result = ''
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await TherapeuticClassNew.findOne({ where: { id: molId } });
            console.log(result);
            res.render('adminInventry/therapeutic-class-new', { result: result });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/therapeutic-class-new', { result })
    }
}



const newTheraputicClass = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await TherapeuticClassNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await TherapeuticClassNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await TherapeuticClassNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getTheraClassList = async (req, res) => {
    try {
        const result = await TherapeuticClassNew.findAll()
        const schema = 'TherapeuticClassNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const loadUnitOfMeasurmentPage = async (req, res) => {
    const molId = req.query.id;
    console.log(molId);
    let result = ''
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await UnitOfMeasurementNew.findOne({ where: { id: molId } });
            console.log(result);
            res.render('adminInventry/unit-of-measurement-new', { result: result });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/unit-of-measurement-new', { result })
    }
}


const newUnitOfMeasurement = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await UnitOfMeasurementNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await UnitOfMeasurementNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await UnitOfMeasurementNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getUnitOfMeasurementList = async (req, res) => {
    try {
        const result = await UnitOfMeasurementNew.findAll();
        const schema = 'UnitOfMeasurementNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const loadTermCondictionPage = async (req, res) => {
    const molId = req.query.id;
    console.log(molId);
    let result = ''
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await TearmAndConditionNew.findOne({ where: { id: molId } });

            console.log(result);
            res.render('adminInventry/terms-&-conditions-new', { result: result });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/terms-&-conditions-new', { result })
    }
}

const newTermCondition = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await TearmAndConditionNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await TearmAndConditionNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await TearmAndConditionNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllTermAndCond = async (req, res) => {
    try {
        const result = await TearmAndConditionNew.findAll();
        const schema = 'TearmAndConditionNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.log('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const saveItemSupp =async (req, res) => {
    console.log(req.body);
    try {
        const { itemCode, suppliers } = req.body;
  
        // Remove existing relationships for the item
        await ItemSupplier.destroy({ where: { itemCode } });
  
        // Create new relationships
        const relationships = suppliers.map(supplierCode => ({
            itemCode,
            supplierCode
        }));
        await ItemSupplier.bulkCreate(relationships);
  
        res.status(200).json({ msg: 'Suppliers successfully saved for the item' });
    } catch (error) {
        console.error('Error saving item suppliers:', error);
        res.status(500).json({ msg: 'Failed to save suppliers for the item' });
    }
  }




const loadRateContractPage = async (req, res) => {
    const key = 'dataKey';
    const molId = store[key];
    console.log(molId);
    let result = ''
    const supplier = await Supplier.findAll();
    const clinic = await Supplier.findAll();
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await RateContractNew.findOne({ where: { id: molId } });
            console.log(result);
            res.render('adminInventry/rate-contract-new', { result: result, supplier: supplier, clinic: clinic });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/rate-contract-new', { result, supplier, clinic })
    }
} 

const newRateContract = async (req, res) => {
    try {
        const { contractItems, ...rateContractData } = req.body;

        // Iterate over contractItems and save each as a new row in the RateContract table
        const promises = contractItems.map(item => {
            return RateContract.create({
                ...rateContractData,
                ...item
            });
        });

        const savedData = await Promise.all(promises);

        res.status(200).json({ message: 'Rate contract and items saved successfully', data: savedData });
    } catch (error) {
        console.error('Error saving rate contract:', error);
        res.status(500).json({ message: 'Error saving rate contract', error: error.message });
    }
}

const getAllRateContractList = async (req, res) => {
    try {
        const result = await RateContractNew.findAll();
        const schema = 'RateContractNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const changeFreeze = async (req, res) => {
    try {
        const id = req.body.id
        const freeze = req.body.isFreeze
        console.log(freeze);
        const isFreeze = await RateContractNew.update({ isFreeze: freeze }, { where: { id: id } })
        console.log(isFreeze);
        res.status(200).json({
            success: true,
            message: "Change Freeze status",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const loadStrUntMstPage = async (req, res) => {
    const molId = req.query.id;
    console.log(molId);
    let result = ''

    if (molId) {
        try {
            console.log("Hello Satya");
            result = await StrUnitMasterNew.findOne({ where: { id: molId } });
            res.render('adminInventry/strength-unit-master-new', { result: result, });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/strength-unit-master-new', { result })
    }
}


const newStrUnitMst = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await StrUnitMasterNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await StrUnitMasterNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await StrUnitMasterNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllStrUnitMstList = async (req, res) => {
    try {
        const result = await StrUnitMasterNew.findAll();
        const schema = 'StrUnitMasterNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


const loadWorkOrdItemPage = async (req, res) => {
    const molId = req.query.id;
    console.log(molId);
    let result = ''
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await WorkOrderItemNew.findOne({ where: { id: molId } });
            store = {}
            res.render('adminInventry/work-order-item-new', { result: result, });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/work-order-item-new', { result })
    }
}

const newWorkOrdItem = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await WorkOrderItemNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await WorkOrderItemNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await WorkOrderItemNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            msg: error.message,
        })
    }
}


const getWorkOrdItemList = async (req, res) => {
    try {
        const result = await WorkOrderItemNew.findAll();
        const schema = 'WorkOrderItemNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const loadCostCentCodePage = async (req, res) => {
    const molId = req.query.id;
    console.log(molId);
    let result = ''
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await CostCenterCodeNew.findOne({ where: { id: molId } });
            store = {}
            res.render('adminInventry/cost-center-codes-new', { result: result, });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/cost-center-codes-new', { result })
    }
}

const newCostCentCode = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        if (id) {
            console.log(id);
            await CostCenterCodeNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await CostCenterCodeNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await CostCenterCodeNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


const getCostCenterCodeList = async (req, res) => {
    try {
        const result = await CostCenterCodeNew.findAll();
        const schema = 'CostCenterCodeNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const loadHSNCodePage = async (req, res) => {
    const molId = req.query.id;
    console.log(molId);
    let result = ''
    if (molId) {
        try {
            console.log("Hello Satya");
            result = await CostCenterCodeNew.findOne({ where: { id: molId } });
            store = {}
            res.render('adminInventry/HSN-codes-master-new', { result: result, });
        } catch (error) {
            console.log('Error fetching Item Data Save', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    } else {
        res.render('adminInventry/HSN-codes-master-new', { result })
    }
}

const getHSNCodeList = async (req, res) => {
    try {
        const result = await HSNCodeNew.findAll();
        const schema = 'HSNCodeNew';
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema });
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}




const getItemCatList = async(req,res)=>{
    try {
        const result = await ItemMasterNew.findAll();
        const itemCat =await ItemCategoryNew.findAll()
        const itemGrp=await ItemGroupNew.findAll();
        const molecule=await MoleculeNew.findAll();
        const schema = 'ItemMasterNew';
        console.log("SATya");
        const Encschema = encryptDataForUrl(schema.toString());
        console.log("hdshfjvfsffjsh", Encschema);
        res.status(200).json({ result, Encschema ,itemCat,molecule,itemGrp});
    } catch (error) {
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
const newHSNCode = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.body;
        console.log(id);
        if (id) {
            console.log(id);
            await HSNCodeNew.update(req.body, { where: { id: id } })
            res.status(200).json({
                success: true,
                message: "Thank you for updating",
            })
        } else {
            const { code } = req.body;
            console.log(code);
            const isExist = await HSNCodeNew.findOne({ where: { code: code } })
            if (isExist) {
                res.status(400).json({ success: false, msg: "Item Code Already Exist!" })
            } else {
                await HSNCodeNew.create(req.body);
                res.status(200).json({ success: true, msg: "Item Category Data Save Succesfully" });
            }
        }
    } catch (error) {
        console.log(error.message);
        console.error('Error fetching Item Data Save', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    setId,
    saveStatusData,
    newSupplierCategory, newSupplier, newStore, newTax, newItem, newCurrency, newRank, newBin, newShelf, newPackageMember,
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
    itemLocationSave,
    getLocationDtls,
    deleteItemLocation,
    itemConvSave,
    getConvDtls,
    // getSuppDtls,
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
  getSupplierListItem,
  SaveRateContract

};