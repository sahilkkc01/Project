var express = require("express");
var router = express.Router();
const {sequelize} = require("../sequelize");
const { Sequelize } = require("sequelize");
const { QueryTypes } = require("sequelize");

const fs = require("fs");
const { PR_patientReg, PR_BillFindPatient } = require("../models/plshBill");

const CryptoJS = require("crypto-js");

//decryption and encryption fxn
function decryptData(encryptedData, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
function encryptDataForUrl(data) {
  console.log(data);
  const secretKey = "ll"; // Replace with your actual secret key
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  const encodedEncrypted = encodeURIComponent(encrypted);
  return encodedEncrypted;
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/storeRowId", (req, res) => {
  const { rowId } = req.body;
  console.log(req.body)
  console.log(req.body.rowId);
  req.session.rowId = rowId;
  console.log(req.session.rowId);
  res.send({ message: "Row ID stored in session", rowId: req.session.rowId });
});

router.get("/1", (req, res) => {
  res.render("plshBilling/find-patient");
});

router.get("/2", (req, res) => {
  let Id;
  if (req.session.rowId) {
    Id = req.session.rowId;
    console.log("Row Data", Id);
    res.render("plshBilling/patient-details-patient-advance", { Id: Id,patient2:{} });
  } else {
    console.log("Hello");
    res.redirect("/plshBill/1");
  }
});

router.get("/3", (req, res) => {
  let Id;
  if (req.session.rowId) {
    Id = req.session.rowId;
    console.log("Row Data", Id);
    res.render("plshBilling/patient-details-refund-patient-advance", {
      Id: Id,
      
    });
  } else {
    console.log("Hello");
    res.redirect("/plshBill/1");
  }
});

router.get("/4", (req, res) => {
  let Id;
  if (req.session.rowId) {
    Id = req.session.rowId;
    console.log("Row Data", Id);
    res.render("plshBilling/company-advance", { Id: Id,patient2:{} });
  } else {
    console.log("Hello");
    res.redirect("/plshBill/1");
  }
});
router.get("/5", (req, res) => {
  let Id;
  if (req.session.rowId) {
    Id = req.session.rowId;
    console.log("Row Data", Id);
    res.render("plshBilling/company-refund",{
      Id: Id,
});
  } else {
    console.log("Hello");
    res.redirect("/plshBill/1");
  }
});

router.get("/6", async function (req, res) {
  const id = req.query.id;
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const currentTime = now.toTimeString().split(" ")[0]; // HH:MM:SS
  console.log("patient", req.session.rowId);
  if (req.session.rowId) {
    try {
      const patient = await PR_patientReg.findByPk(req.session.rowId);
      console.log("patient mr", patient.mr_no);
      // console.log("patient s mr", req.session.mrNo);
      if (patient) {
        console.log(1);
        if (patient.mr_no) {
          console.log(2);
          const patient2 = id
            ? await PR_BillFindPatient.findByPk(
                decryptData(decodeURIComponent(id), "ll")
              )
            : null;
          console.log("patient2", patient2);
          if (id && !patient2) {
            req.session.alert = "No patient found for the provided ID.";
            return res.redirect("/plshBill/1");
          }

          // Render the page with the patient data and current date and time
          return res.render("plshBilling/bill-details", {
            patient: patient,
            patient2: patient2 || "",
            currentDate: currentDate,
            currentTime: currentTime,
          });
        } else {
          req.session.alert = "Mismatch in patient MR number.";
          return res.redirect("/plshBill/1");
        }
      } else {
        // Handle case where no patient is found for the given id
        return res.redirect("/plshBill/1");
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
      return res.status(500).send("Internal Server Error");
    }
  } else {
    // Redirect if no rowId is in the session and no ID is provided
    return res.redirect("/plshBill/1");
  }
});

router.get("/getFieldValues", async (req, res) => {
  const { tableName, fieldName } = req.query;

  if (!tableName || !fieldName) {
    return res.status(400).json({ msg: "Invalid parameters" });
  }

  try {
    const query = `SELECT DISTINCT ${fieldName} as value FROM ${tableName}`;
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching field values:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/25", (req, res) => {
  res.render("plshBilling/bill-details");
});

router.get("/7", (req, res) => {
  let Id;
  if (req.session.rowId) {
    Id = req.session.rowId;
    console.log("Row Data", Id);
    res.render("plshBilling/bills-summary");
  } else {
    console.log("Hello");
    res.redirect("/plshBill/1");
  }
  
 
});

router.get("/8", (req, res) => {
  res.render("plshBilling/refund-services");
});
router.get("/34", (req, res) => {
  res.render("plshBilling/bills-for-approval");
});

router.get("/9", (req, res) => {
  res.render("plshBilling/approval-refund-service");
});

router.get("/10", (req, res) => {
  res.render("plshBilling/expenses");
});

router.get("/12", (req, res) => {
  if (req.session.rowId) {
    Id = req.session.rowId;
    
    res.render("plshBilling/approve-advance-refund");
  } else {
    console.log("Hello");
    res.redirect("/plshBill/1");
  }
 
});

router.get("/13", (req, res) => {
  res.render("plshBilling/billing-dashboard");
});

router.get("/14", (req, res) => {
  res.render("plshBilling/procedure-doctor");
});

router.get("/15", (req, res) => {
  res.render("plshBilling/procedure-doctor-search");
});

router.get("/16", (req, res) => {
  res.render("plshBilling/payment-mode-change");
});

router.get("/17", (req, res) => {
  res.render("plshBilling/doctor-payment");
});

router.get("/18", (req, res) => {
  res.render("plshBilling/doctor-payment-table-data-change");
});

router.get("/19", (req, res) => {
  res.render("plshBilling/doctor-payment-add-doctor");
});

router.get("/20", (req, res) => {
  res.render("plshBilling/doctor-payment-calculate");
});

router.get("/21", (req, res) => {
  res.render("plshBilling/company-invoice");
});

router.get("/22", (req, res) => {
  res.render("plshBilling/company-invoice-new");
});

router.get("/23", (req, res) => {
  res.render("plshBilling/company-invoice-new-add-company-bill");
});

router.get("/24", (req, res) => {
  res.render("plshBilling/package-consumption");
});

router.get("/32", (req, res) => {
  res.render("plshBilling/concent");
});

router.get("/35", async(req, res) => {
  console.log(req.query)
  const { id } = req.query;
  const decryptedDeptId =decryptData(decodeURIComponent(id), 'll'); // Extract dept_id from query parameters
    console.log('aa',decryptedDeptId)

  try {
    if (id) {
      const bill = await PR_BillFindPatient.findByPk(decryptedDeptId);
    
      const patientData = await PR_patientReg.findOne({
        where: {
          mr_no: bill.mrNo,  // Assuming bill has a field named 'mrNo'
        }
      });
      const patientDataPlain = patientData.get({ plain: true });
      if (!bill) {
        console.error('not found:', dept_id);
        return res.status(404).render('error', { message: 'not found' });
      }
      // const services= await BillServices.findAll({billId:bill.id})
      const data = bill.get({ plain: true });
      console.log('values:', data);
      return res.render("plshBilling/PrintBill", { a: data,patient: patientDataPlain });
    } else {
      return res.render("plshBilling/PrintBill", { a: '' });
    }
  } catch (error) {
    console.error('Error fetching  data:', error);
    return res.status(500).render('error', { message: 'Internal Server Error' });
  }

});

router.get("/concent", (req, res) => {

  res.render("plshBilling/concent");
});
router.get("/33", (req, res) => {
  if (req.session.rowId) {
    Id = req.session.rowId;
    console.log("Row Data", Id);
    res.render("plshBilling/approve-company-adv-ref")
  } else {
 
    res.redirect("/plshBill/1");
  }
  res.render("plshBilling/approve-company-adv-ref");
});

const {
  loadExpenses,
  newExpenses,
  getExpenses,
  getPaymentModeChange,
  saveStatusData,
  getAllDoctor,
  newCompanyAdvance,
  getAdvance,
  newCompRefund,
  getCompanyRefund,
  storeDataInDb,
  getConcent,
  getpatientBills,
  getServish,
  newBill,
  getApprove,
  newPatientAdvance,
  getPatientAdv,
  newRefund,
  setId,
  getAllApproveReq,
  getPatientServicesDaitle,
  getPrescriptions,
  getPatientAdvance,
  getPatientRefund,
  approvePatientRefundByRecNo,
  getCompanyAdvance,
  approveCompanyRefundByRecNo,
  getServiceDataById,
  sendForServiceApproval,
  getRefundServices,
  getServiceDataByBillId,
  approveSeriveRefund,
  getPatientPackages,
 
} = require("../controllers/plshBillingControllers");
const path = require("path");
const { error, PDFDocument } = require("pdf-lib");
const { billPatientSubmit } = require("../controllers/patientReg");
const { BillServices } = require("../models/PatientReg");

router.post("/setAproveId", setId);

router.post("/save-status-data", saveStatusData);

router.get("/00", storeDataInDb);
router.get("/get-Patient-package-services", getPatientPackages);

router.post("/expenses-form-submit", newExpenses);
router.post("/company-advance-form-submit", newCompanyAdvance);
router.post("/company-refaund-form-submit", newCompRefund);
router.post("/bill-form-submit", newBill);
router.post("/patient-form-submit", newPatientAdvance); 
router.post("/patient-Refund-form-submit", newRefund);

router.get("/get-service", async (req, res) => {
  try {
    const services = await sequelize.query("SELECT * FROM services", {
      type: sequelize.QueryTypes.SELECT,
    });
    console.log(services)
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/print-concent", async (req, res) => {
  try {
    const { patientReg } = req.body;
    console.log(req.body);
    const findPatient = await PR_patientReg.findOne({
      where: { mr_no: patientReg },
    });

    if (req.body.fileName == "file1") {
      const pdfPath = path.join(__dirname, "../views/Concent/pdf", "form-6.pdf");
      let firstPage = await getPath(pdfPath);

      DrawText(firstPage.firstPage, findPatient.clinic_id.toString(), 280, 730, 8); 
      DrawText(firstPage.firstPage, findPatient.address, 75, 718, 8);

      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file2") {
      const pdfPath = path.join(__dirname, "../views/Concent/pdf", "form-7.pdf");
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, findPatient.firstName , 80, 535, 9);
      DrawText(firstPage.firstPage, findPatient.spouse_firstName  , 405, 535, 9); 
      DrawText(firstPage.firstPage, 'Doctor'  , 80, 513, 9);
      DrawText(firstPage.firstPage, findPatient.firstName  , 212, 317, 9);
      DrawText(firstPage.firstPage, findPatient.spouse_firstName  , 318, 317, 9);
    
      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file3") {
      const pdfPath = path.join(__dirname, "../views/Concent/pdf", "form-8.pdf");
      let firstPage = await getPath(pdfPath);
  // Name (at the top)
DrawText(firstPage.firstPage, findPatient.firstName, 105, 600, 8);

// Doctor's Name
DrawText(firstPage.firstPage, 'DOCTOR', 220, 635, 8);

// ART Bank's No.
DrawText(firstPage.firstPage, 'findPatient.artBankNo', 90, 600, 8);

// ART Bank's Registration No.
DrawText(firstPage.firstPage, 'findPatient.artBankRegNo', 300, 600, 8);

// Obtained from (ART Bank)
DrawText(firstPage.firstPage, 'findPatient.artBankObtainedFrom', 120, 580, 8);

// ART Clinic Name
DrawText(firstPage.firstPage, 'findPatient.clinicName', 330, 580, 8);


      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "form-12") {
      const pdfPath = path.join(__dirname, "../concent/pdf", "form-12.pdf");
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, findPatient.address, 210, 620, 8);
      DrawText(firstPage.firstPage, findPatient.address, 220, 390, 8);
      DrawText(firstPage.firstPage, findPatient.address, 315, 390, 8);

      await respond(firstPage.pdfDoc);
    }
    async function respond(pdfDoc) {
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync("./filled-consent-form.pdf", pdfBytes);
      res.status(200).json({
        success: true,
        message: "PDF filled and saved successfully.",
      });
    }

    // const pdfPath = path.join(__dirname, '../concent/pdf', 'form-7.pdf')
    // const existingPdfBytes = fs.readFileSync(pdfPath);
    // // const existingPdfBytes = fs.readFileSync('../concent/consent-art-rules-2022-36.pdf');
    // const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // // Get the form
    // const pages = pdfDoc.getPages();
    // const firstPage = pages[0];

    // function DrawText(text, x, y, size) {
    //   firstPage.drawText(text, {
    //     x: x,
    //     y: y,
    //     size: size,
    //   });
    // }

    // DrawText(text1, 345, 756, 9);
    // DrawText(text2, 120, 744, 9);
    // DrawText(text3, 105, 619, 9);
    // DrawText(text4, 80, 527, 9);
    // DrawText(text5, 405, 527, 9);
    // DrawText(text6, 80, 505, 9);
    // DrawText(text7, 210, 310, 9);
    // DrawText(text8, 318, 310, 9);
    // DrawText(text9, 110, 77, 9);
    // DrawText(text10, 125, 64, 9);
    // // Save the PDF with the filled fields
    // const pdfBytes = await pdfDoc.save();
    // fs.writeFileSync('./filled-consent-form.pdf', pdfBytes);
    async function getPath(pdfPath) {
      const existingPdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      return { firstPage, pdfDoc };
    }
    // const existingPdfBytes = fs.readFileSync('../concent/consent-art-rules-2022-36.pdf');

    // Get the form

    // firstPage.drawText(clinicName, {
    //   x: 275,
    //   y: 722,
    //   size: 8,
    // });
    // firstPage.drawText(clinicAddress, {
    //   x: 75,
    //   y: 710,
    //   size: 8,
    // });

    function DrawText(firstPage, text, x, y, size) {
      firstPage.drawText(text, {
        x: x,
        y: y,
        size: size,
      });
    }
    // Save the PDF with the filled fields
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/11", loadExpenses);

router.get("/get-expenses", getExpenses);
router.get("/get-doctor", getAllDoctor);
router.get("/get-advance", getAdvance);
router.get("/get-comp-refund", getCompanyRefund);
// router.get("/get-company-advance", getCompanyAdvance);
router.get("/getpatientBills", getpatientBills);
router.get("/get-concent", getConcent);
router.get("/get-patient", getpatientBills);
router.post("/get-servish", getServish);
router.get("/get-approvel", getApprove);
router.get("/get-patient-advance", getPatientAdv);
router.get("/getPatientAdvances", getPatientAdvance);
router.get("/getCompanyAdvance", getCompanyAdvance);
router.get("/getPatientRefunds", getPatientRefund);
router.get("/getCompanyRefund", getCompanyRefund);
router.get("/get-approve-request", getAllApproveReq);
router.get("/get-patient-daitle", getPatientServicesDaitle);
router.get("/getServiceData/:id", getServiceDataById);
router.get("/get-payment-change", getPaymentModeChange);

router.post("/billPatientSubmit", billPatientSubmit);

router.get("/filter-data", async (req, res) => {
  console.log("1");
  try {
    const { table, limit, offset, sortby, ...filters } = req.query;
    console.log(table);
    // Dynamically select the model based on the 'table' parameter
    const Model = require("../models/plshBill")[table];
    console.log(Model);
    if (!Model) {
      return res.status(400).json({ message: "Invalid table name" });
    }

    console.log(sortby);
    // Construct Sequelize filters
    let sequelizeFilters = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        sequelizeFilters[key] = { [Op.like]: `%${value}%` };
      }
    }

    const options = {
      where: sequelizeFilters,
      limit: limit ? parseInt(limit) : 10,
      offset: offset ? parseInt(offset) : 0,
      order: sortby ? [[sortby, "ASC"]] : [], // Default ordering
    };

    // Fetch data from the specified table
    const data = await Model.findAndCountAll(options);
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
});

// router.post('/form-6', async (req, res) => {
//   const { clinicName, clinicAddress } = req.body;
//   try {
//     // Load the existing PDF
//     const pdfPath = path.join(__dirname, '../concent/pdf', 'form-6.pdf');
//     const existingPdfBytes = fs.readFileSync(pdfPath);
//     // const existingPdfBytes = fs.readFileSync('../concent/consent-art-rules-2022-36.pdf');
//     const pdfDoc = await PDFDocument.load(existingPdfBytes);
//     // Get the form
//     const pages = pdfDoc.getPages();
//     const firstPage = pages[0];

//     firstPage.drawText(clinicName, {
//       x: 275,
//       y: 722,
//       size: 8,
//     });
//     firstPage.drawText(clinicAddress, {
//       x: 75,
//       y: 710,
//       size: 8,
//     });
//     // Save the PDF with the filled fields
//     const pdfBytes = await pdfDoc.save();
//     fs.writeFileSync('./filled-consent-form.pdf', pdfBytes);

//     res.send('PDF filled and saved successfully.');
//   } catch (error) {
//     console.error('Error filling PDF:', error);
//     res.status(500).send('Error filling PDF.');
//   }
// });
router.post("/form-7", async (req, res) => {
  try {
    const {
      text1,
      text2,
      text3,
      text4,
      text5,
      text6,
      text7,
      text8,
      text9,
      text10,
    } = req.body;
    // Load the existing PDF
    const pdfPath = path.join(__dirname, "../concent/pdf", "form-7.pdf");
    const existingPdfBytes = fs.readFileSync(pdfPath);
    // const existingPdfBytes = fs.readFileSync('../concent/consent-art-rules-2022-36.pdf');
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // Get the form
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    function DrawText(text, x, y, size) {
      firstPage.drawText(text, {
        x: x,
        y: y,
        size: size,
      });
    }

    DrawText(text1, 345, 756, 9);
    DrawText(text2, 120, 744, 9);
    DrawText(text3, 105, 619, 9);
    DrawText(text4, 80, 527, 9);
    DrawText(text5, 405, 527, 9);
    DrawText(text6, 80, 505, 9);
    DrawText(text7, 210, 310, 9);
    DrawText(text8, 318, 310, 9);
    DrawText(text9, 110, 77, 9);
    DrawText(text10, 125, 64, 9);
    // Save the PDF with the filled fields
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync("./filled-consent-form.pdf", pdfBytes);

    res.send("PDF filled and saved successfully.");
  } catch (error) {
    console.error("Error filling PDF:", error);
    res.status(500).send("Error filling PDF.");
  }
});

router.get('/filter-data', async (req, res) => {
  console.log('1');
  try {
    const { table, limit, offset, sortby, ...filters } = req.query;
    console.log(table);
    // Dynamically select the model based on the 'table' parameter
    const Model = require('../models/plshBill')[table];
    console.log(Model);
    if (!Model) {
      return res.status(400).json({ message: 'Invalid table name' });
    }
   
    console.log(sortby);
    // Construct Sequelize filters
    let sequelizeFilters = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        sequelizeFilters[key] = { [Op.like]: `%${value}%` };
      }
    }

    const options = {
      where: sequelizeFilters,
      limit: limit ? parseInt(limit) : 10,
      offset: offset ? parseInt(offset) : 0,
      order: sortby ? [[sortby, 'ASC']] : [], // Default ordering
    };

    // Fetch data from the specified table
    const data = await Model.findAndCountAll(options);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data' });
  }
});

router.post('/sendForServiceApproval', sendForServiceApproval);





router.get("/prescriptions", getPrescriptions);
router.get("/getBillRefundData", getRefundServices);
router.get("/getApprServiceData/:approvalId", getServiceDataByBillId);

router.post('/approvePatRefund',approvePatientRefundByRecNo)
router.post('/approveServiceRefund',approveSeriveRefund)
router.post('/approveCompanyRefund',approveCompanyRefundByRecNo)
module.exports = router;
