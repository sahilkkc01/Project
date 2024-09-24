const { ItemMasterNew } = require("../models/adminInventorySchema");
const { NewPackage, packageMedicine, ServiceMaster, PackageService, DefienRule, SelectedService, ConcentMaster, PackageConcents, Package } = require("../models/packageConfig");
const CryptoJS = require('crypto-js');
const { CurrentItemStock } = require("../models/palashInvSchmea");

//decryption and encryption fxn
function decryptData(encryptedData, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
function encryptDataForUrl(data) {

  const secretKey = 'll'; // Replace with your actual secret key
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  const encodedEncrypted = encodeURIComponent(encrypted);
  return encodedEncrypted;
}

var UserData = {
  clinic_id: "123",
  userId: "123",
  userName: "Lifelinker"
}

const getNewPackage = async (req, res) => {
  try {
    const details = await NewPackage.findAll();

    // const encModData = details.map(data => {
    //   const encryptedId = encryptDataForUrl(data.id.toString());
    //   return {
    //     ...data.toJSON(),
    //     id: encryptedId,
    //   };
    // });

    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching classification details:', error);
    res.status(500).json({ error: 'An error occurred while fetching classification details.' });
  }
};

const newPackageSubmit = async (req, res) => {
  console.log(req.body);
  try {
  
    if (1) {
      // Handling creation of a new package
  const isExist = await NewPackage.findOne({ where: { packageCode: req.body.packageCode } });

      if (isExist) {
        console.log('Code already exists')
        return res.status(400).json({ msg: 'Code already exists.' });
      }

      try {
        const newPackage = await NewPackage.create({
          ...req.body,
          UserId: req.body.UserId // Ensure UserId is correctly included in the request body
        });
        return res.status(200).json({ msg: 'Form saved successfully!', data: newPackage });
      } catch (creationError) {
        console.error('Error during package creation:', creationError);
        return res.status(500).json({ msg: 'Failed to create the package.', error: creationError.message });
      }
      
    } else {
      // Handling update of an existing package
      const existing = await NewPackage.findOne({ where: { packageCode: req.body.packageCode } });
      if (!existing) {
        return res.status(404).json({ msg: 'Package not found for the provided code.' });
      }
      await existing.update(req.body);
      return res.status(200).json({ msg: 'Package details updated successfully!', data: existing });
    }
  } catch (error) {
    console.error('Error in newPackageSubmit:', error);
    return res.status(500).json({ msg: 'An error occurred while processing your request.', error: error.message });
  }
}



const itemMasterData = async (req, res) => {
  try {

    const item = await Itempackage.findAll();

    return res.status(200).json({ item });

  } catch (error) {
    console.error('Error in TestCategSubmit:', error);
    res.status(500).json({ msg: 'An error occurred while processing your request.' });
  }
}

const SaveStatusData = async (req, res) => {
  try {

    const { id: encryptedId, status, schema: encryptedSchema } = req.body;
    const secretKey = 'll'; // Replace with your actual secret key

    // Decrypt id and schema
    const id = decryptData(decodeURIComponent(encryptedId), secretKey); // URL decode
    const schema = decryptData(decodeURIComponent(encryptedSchema), secretKey); // URL decode

    console.log('Decrypted id:', id);
    console.log('Decrypted schema:', schema);

    // Use decrypted id and schema to fetch data from the model
    const Model = require('../models/packageConfig')[schema];
    const data = await Model.findByPk(id);

    if (data) {
      // Update status and save
      data.status = status;

      await data.save();
      console.log(data)
      res.sendStatus(200);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).send('Internal Server Error');
  }
}

const packageDataById = async (req, res) => {
  try {

  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).send('Internal Server Error');
  }
}



const newPharmacyItem = async (req, res) => {
  try {
    const package = await NewPackage.findOne({ where: { packageCode: req.body.PackageId } });
    await packageMedicine.create({ oralMedicine: req.body.oralMedicine, injection: req.body.injunction, PackageId: package.id })
    res.status(200).json({
      success: true,
      message: 'New pharmacy item created successfully',
    })
  } catch (error) {
    console.log('Error updating status:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

const getServices = async (req, res) => {
  try {
    const NewPackage = await ServiceMaster.findAll();
    res.status(200).json(NewPackage)
  } catch (error) {
    console.log('Error updating status:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

const newServicesItem = async (req, res) => {
  try {
    const package = await NewPackage.findOne({ where: { packageCode: req.body.PackageId } });
    let Service_id = req.body.Service_id
    if (Service_id.length >= 0) {
      for (let i = 0; i < Service_id.length; i++) {
        await PackageService.create({ PackageId: package.id, Service_id: Service_id[i] })
      }
    }
    res.status(200).json({
      success: true,
      message: 'New services item created successfully',
    })
  } catch (error) {
    console.log('Error updating status:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

const getAllServices = async (req, res) => {
  try {
    const packageData = await NewPackage.findOne({ where: { packageCode: req.body.PackageId } });
    const package = await PackageService.findAll({ where: { PackageId: packageData.id } });
    let packageId;
    const fetchSerName = async () => {
      const servicePromises = package.map(async (item) => {
        const service = await ServiceMaster.findOne({ where: { id: item.Service_id } });
        packageId=item.PackageId
        return  service;
      });
      
      const serviceNames = await Promise.all(servicePromises);
      return  serviceNames ;
    }
    const SerName = await fetchSerName();
    console.log(packageId);
    
    console.log(SerName);
    res.status(200).json({SerName,packageId})
  } catch (error) {
    console.log('Error updating status:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

const newDefineRule = async (req, res) => {
  try {
    await DefienRule.create(req.body);
    res.status(200).json({
      success: true,
      message: 'New define rule created successfully',
    })
  } catch (error) {
    console.log('Error updating status:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

const getAllTariff = async (req, res) => {
  try {
    const tariffServices = await SelectedService.findAll();
    res.status(200).json(tariffServices);
  } catch (error) {
    console.log('Error updating status:', error.message);
    res.status(500).send('Internal Server Error');
  }
}
const getAllConcents = async (req, res) => {
  
  console.log(req.params); // Ensure this is for debugging purposes only.
  console.log('Entered getAllConcents function'); // More descriptive log.
  try {
    const data = await ConcentMaster.findAll();

    const packageCode = req.params.packageCode;
    // Assuming PackageConcents is a model, we should use a query method like findAll or findOne.
    const packageConsents = await PackageConcents.findAll({
      where: { package_code: packageCode } // Assuming 'packageCode' is the field name in your model.
    });

    // Respond with both sets of data.
    res.status(200).json({ allConcents: data, packageConsents: packageConsents });
  } catch (error) {
    console.error('Error fetching consents:', error.message); // Use console.error for errors.
    res.status(500).send('Internal Server Error');
  }
}


const saveConcets = async (req, res) => {
  const { package_code, concents } = req.body;
  console.log(req.body)

  try {
    // Check if a package with the given package_code already exists
    const existingPackage = await PackageConcents.findOne({
      where: { package_code: package_code }
    });

    if (existingPackage) {
      // Update the existing record
      await existingPackage.update({
        concents: concents
      });
      res.send({ message: 'Package and consents updated successfully!' });
    } else {
      // Create a new record if it does not exist
      await PackageConcents.create(req.body);
      res.send({ message: 'Package and consents created successfully!' });
    }
  } catch (error) {
    console.error('Failed to save or update package and consents:', error);
    res.status(500).send({
      message: 'Error saving or updating package and consents',
      error: error.message,
    });
  }
};

const addpackage = async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    const packageData = await Package.create(body);
    console.log(packageData);

    res.status(200).json({ success: true, package: packageData });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const drugsData = async (req, res) => {
  try {
    // Fetch all items from ItemMasterNew
    const items = await ItemMasterNew.findAll({
      attributes: ["id", "item_name", "brand_name", "molecule_name"],
    });

    // Fetch all stock data for these items
    const itemIds = items.map((item) => item.id);
    const stockData = await CurrentItemStock.findAll({
      where: {
        item_id: itemIds,
      },
      attributes: ["availableStock", "item_id"], // Only select the availableStock field
    });

    // Convert stockData into a map for quick lookup
    const stockMap = stockData.reduce((acc, stock) => {
      acc[stock.item_id] = stock.availableStock;
      return acc;
    }, {});

    // Combine the item data with available stock
    const itemData = items.map((item) => ({
      id: item.id,
      item_name: item.item_name,
      brand_name: item.brand_name,
      molecule_name: item.molecule_name,
      availableStock: stockMap[item.id] || 0, // Default to 0 if no stock data is available
    }));

    console.log(itemData);
    res.status(200).send(itemData);
  } catch (error) {
    console.log("error", error);
  }
};




module.exports = {drugsData,addpackage, getNewPackage, newPackageSubmit, itemMasterData, SaveStatusData, newPharmacyItem, getServices, newServicesItem, getAllServices, newDefineRule,getAllTariff ,getAllConcents,saveConcets}