const {
  PR_patientReg,
  PR_ReferralDoc,
  PR_Appointment,
  PR_PatientVisit,
  PR_formNewCouple,
  PR_BillFindPatient,
  BillServices,
} = require("../models/PatientReg");
const session = require("express-session");

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
const patientRagistration = async (req, res) => {
  try {
    // Log the incoming data for debugging
    console.log(req.body);

    // Assuming the patient data is coming as a stringified JSON under the "jsonString" key
    const jsonString = req.body.jsonString;

    if (!jsonString) {
      return res.status(400).json({ msg: "No patient data provided" });
    }

    const patientData = JSON.parse(jsonString);
    const files = req.files;

    console.log(`Parsed Patient Data: ${JSON.stringify(patientData)}`);

    const pData = {
      ...patientData,
      patientImg: files && files.patientImg ? files.patientImg[0].path : null,
      spouseImg: files && files.spouseImg ? files.spouseImg[0].path : null,
    };

    console.log(pData);

    // Check for patient existence in the database
    const dupPatient = await PR_patientReg.findOne({
      where: { mr_no: patientData.mr_no },
    });

    if (dupPatient) {
      return res
        .status(400)
        .json({ msg: "Patient MR Number already registered..." });
    }

    // Registering new patient
    const data = await PR_patientReg.create(pData);

    // Final response to indicate successful registration
    if (data) {
      return res.status(200).json({ msg: "Form submitted successfully..." });
    } else {
      return res.status(500).json({ msg: "Error in saving patient details." });
    }
  } catch (error) {
    console.error("Error in patient registration:", error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error...", error: error.message });
  }
};

const AppointmentData = async (req, res) => {
  try {
    // Extract MR number from query parameters
    const mrNo = req.query.mrNo;
    console.log("Received MR No:", mrNo); // More descriptive console log

    // Find patient based on MR number
    const patient = await PR_patientReg.findOne({
      where: { mr_no: mrNo },
    });

    // Check if the patient was found
    if (!patient) {
      console.log(`No patient found with MR No: ${mrNo}`); // Logging for debugging
      return res
        .status(404)
        .json({ msg: "No patient found with this MR number." }); // 404 is more specific for not found
    }

    // If patient is found, perhaps do something with the patient data
    // For example, send the patient data back or proceed with additional processing
    res.json(patient); // Assuming you want to send the patient data back
  } catch (error) {
    console.error("Error fetching patient data:", error.message); // Enhanced error logging
    return res
      .status(500)
      .json({ msg: "Internal Server Error. Please try again later." });
  }
};

const newAppointment = async (req, res) => {
  try {
    const appointment = req.body;
    console.log(appointment);

    const patient = await PR_patientReg.findOne({
      where: { mr_no: appointment.mrNo },
    });
    console.log(patient);

    if (!patient) {
      return res
        .status(400)
        .json({ msg: "No Patient with this MR registration..." });
    }

    const data = await PR_Appointment.create({
      ...appointment,
    });
    console.log(data);

    return res.status(200).json({ msg: "Appointment created successfully..." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal Server Error..." });
  }
};

const newVisit = async (req, res) => {
  try {
    const visit = req.body;
    console.log(visit);

    const data = await PR_PatientVisit.create({
      ...visit,
    });
    console.log(data);

    // Store mrNo in the session
    req.session.mrNo = data.mrNo;
    console.log(`mrNo ${data.mrNo} stored in session`);

    return res.status(200).json({ msg: "Visit created successfully..." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal Server Error..." });
  }
};

const newCouple = async (req, res) => {
  try {
    const { mrNo } = req.body;

    // Check if mrNo already exists
    const existingRecord = await PR_formNewCouple.findOne({
      where: { mrNo: mrNo },
    });

    if (existingRecord) {
      // If mrNo exists, return a conflict response

      return res.status(409).send("MR No. already exists");
    }

    // If mrNo does not exist, create a new entry
    await PR_formNewCouple.create(req.body);

    res.status(200).send("Data saved successfully");
  } catch (error) {
    console.error("Failed to save data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const billPatientSubmit = async (req, res) => {
  try {
    // Destructure query, selectedBillServices, and other data from req.body
    const { query, selectedBillServices, ...updateData } = req.body;

    if (query == 1) {
      // If query is 1, update an existing record
      const { itemid } = req.body;

      // Find and update the main bill record in PR_BillFindPatient
      const result = await PR_BillFindPatient.update(
       req.body,
        {
          where: { id: itemid },
        }
      );

      if (result[0] === 0) {
        res.status(404).send("Patient record not found");
      } else {
        // If the patient record is updated, also update the selected services in BillServices
        await handleBillServices(itemid, selectedBillServices);
        res.status(200).send("Data updated successfully");
      }
    } else {
      // If query is not 1, create a new entry in PR_BillFindPatient
      const newBill = await PR_BillFindPatient.create(req.body);

      // Generate bill_no with prefix and the ID of the created bill
      const billNo = `BILL${newBill.id}`;

      // Update the new bill entry with the generated bill_no
      await newBill.update({ bill_no: billNo });

      // Save the selected services in BillServices
      await handleBillServices(newBill.id, selectedBillServices);

      res.status(200).send("Data saved successfully with Bill No: " + billNo);
    }
  } catch (error) {
    console.error("Failed to save data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Helper function to save or update the selectedBillServices in BillServices
const handleBillServices = async (billId, selectedBillServices) => {
  try {
    // Remove any existing services for this bill ID before inserting new ones
    await BillServices.destroy({
      where: { billId }
    });

    // Add the new selected services
    const servicesToInsert = selectedBillServices.map((service) => ({
      billId, // Associate the services with the bill ID
      serviceCode: service.serviceCode,
      serviceName: service.serviceName,
      serviceRate: service.serviceRate,
      concession_per: service.concession_per,
      concession_amount: service.concession_amount,
      service_amount: service.service_amount,
      totalAmount: service.totalAmount,
      netAmount: service.netAmount,
      doctor: service.doctor || null,
    }));

    // Bulk insert the new services
    await BillServices.bulkCreate(servicesToInsert);
  } catch (error) {
    console.error("Failed to handle bill services:", error);
    throw new Error("Error saving services");
  }
};





const SaveStatusData = async (req, res) => {
  try {
    console.log(req.body);
    const {
      id: encryptedId,
      status,
      schema: encryptedSchema,
      tableStatus: EnctableStatus,
    } = req.body;
    const secretKey = "ll"; // Replace with your actual secret key

    // Decrypt id and schema
    const id = decryptData(decodeURIComponent(encryptedId), secretKey); // URL decode
    const schema = decryptData(decodeURIComponent(encryptedSchema), secretKey); // URL decode
    const tableStatus = decryptData(
      decodeURIComponent(EnctableStatus),
      secretKey
    ); // URL decode

    console.log("Decrypted id:", id);
    console.log("Decrypted schema:", schema);
    console.log("Decrypted tableStatus:", tableStatus);

    // Use decrypted id and schema to fetch data from the model
    const Model = require("../models/PatientReg")[schema];
    const data = await Model.findByPk(id);

    if (data) {
      ``;

      // Update status and save
      data[tableStatus] = status;

      await data.save();
      console.log(data);
      res.sendStatus(200);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getpatientBills = async (req, res) => {
  try {
    if (!req.session.rowId) {
      return res.status(400).json({ error: "Session rowId is not available." });
    }

    // Fetch the patient using the rowId from the session
    const patient = await PR_patientReg.findByPk(req.session.rowId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    const patientMrNo = patient.mr_no;

    /* Fetch records matching the patient's MR number from PR_BillFindPatient */
    const encModData = await PR_BillFindPatient.findAll({
      where: {
        mrNo: patientMrNo,
      },
    });

    // Encrypt the id and prepare the response
    const details = encModData.map((data) => {
      const encryptedId = encryptDataForUrl(data.id.toString());
      return {
        ...data.toJSON(),
        id: encryptedId,
      };
    });

    res.status(200).json(details);
  } catch (error) {
    console.error("Error fetching patient bills:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching patient bills." });
  }
};

module.exports = {
  patientRagistration,
  AppointmentData,
  newAppointment,
  newVisit,
  newCouple,
  billPatientSubmit,
  SaveStatusData,
  getpatientBills,
};
