const CryptoJS = require("crypto-js");
const PDFDocument = require("pdfkit");
const {
  serviceAdvice,
  doctorNotes,
  diagnosis,
  GeneralExamination,
  treatmentHist,
  History,
  allergies,
  chiefComplaint,
  treatmentAdvice,
  preExistingCondition,
  procedureAdvice,
  FollowUp,
  prescription,
  PatientCounseling,
  Day0Record,
  Day1Record,
  Day2Record,
  EmbryoTransfer,
  Day3Record,
  Day4Record,
  Day5Record,
  Day6Record,
  SpermAdvanceResult,
  StimulationSubmit,
  ScheduleEt,
  ItemMasterNew,
  Outcome,
  
} = require("../models/embrology");
const { PR_patientReg } = require("../models/PatientReg.js");

const {sequelize} = require("../sequelize");

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

const Day0Submit = async (req, res) => {
  try {
    // Extract form fields
    const {
      Date,
      Time,
      FertiMethod,
      primEmbrologist,
      secEmbrologist,
      incubator,
      remarks,
      reportData,
    } = req.body;

    let transformedReportData = JSON.parse(reportData).map((item) => ({
      attempts: item.attempts || "",
      breakage: item.breakage || "",
      comments: item.comments || "",
      oocyteNo: item.oocyteNo || "",
      spzMorpho: item.spzMorpho || "",
      spzLocation: item.spzLocation || null,
      oocyteMorpho1: item.oocyteMorpho1 || "",
      oocyteMorpho2: item.oocyteMorpho2 || "",
      oocyteMorpho3: item.oocyteMorpho3 || "",
      oocyteMorpho4: item.oocyteMorpho4 || "",
      oocyteMorpho5: item.oocyteMorpho5 || "",
      oocyteMorpho6: item.oocyteMorpho6 || "",
      semenSampleId: item.semenSampleId || "",
      stageSurvival: item.stageSurvival || "",
      semenSourceIcon: item.semenSourceIcon || "",
      embryoGrowthImage: item.embryoGrowthImage || "",
      polarBodyPosition: item.polarBodyPosition || "",
    }));

    // Create a new record in the database
    const newReport = await Day0Record.create({
      Date,
      Time,
      cycleId:req.session.cycle_id,
      FertiMethod,
      primEmbrologist,
      secEmbrologist,
      incubator,
      remarks,
      reportData: transformedReportData,
    });

    res.json({ success: true, report: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving report" });
  }
};

const Day1Submit = async (req, res) => {
  try {
    // Extract form fields
    const {
      primEmbrologist,
      Date,
      secEmbrologist,
      incubator,
      remarks,
      reportData,
    } = req.body;
    // Create a new record in the database
    let transformedReportData = JSON.parse(reportData).map((item) => ({
      pb: item.pb || "",
      pn: item.pn || "",
      grade: item.grade || "",
      pnSize: item.pnSize || "",
      viable: item.viable || "",
      oocyteNo: item.oocyteNo || "",
      noOfCells: item.noOfCells || "",
      spermSource: item.spermSource || "",
      cytoplasmicHalo: item.cytoplasmicHalo || "",
      npbDistribution: item.npbDistribution || "",
      zygoteMorphology: item.zygoteMorphology || "",
      embryoGrowthImageIcon: item.embryoGrowthImageIcon || "",
      embryoGrowthImageText: item.embryoGrowthImageText || "",
    }));
    const newReport = await Day1Record.create({
      primEmbrologist,
      secEmbrologist,
      incubator,
      cycleId:req.session.cycle_id,
      Date,
      remarks,
      reportData: transformedReportData,
    });

    res.json({ success: true, report: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving report" });
  }
};

const Day2Submit = async (req, res) => {
  try {
    const {
      primEmbrologist,
      Date,
      secEmbrologist,
      incubator,
      remarks,
      reportData,
    } = req.body;

    let transformedReportData = JSON.parse(reportData).map((item) => ({
      grade: item.grade || "",
      status: item.status || "",
      BigFrag: item.BigFrag || "",
      totalMN: item.totalMN || "",
      Frag_Dis: item.Frag_Dis || "",
      Frag_Per: item.Frag_Per || "",
      biNuclei: item.biNuclei || "",
      comments: item.comments || "",
      embryoNo: item.embryoNo || "",
      oocyteNo: item.oocyteNo || "",
      symmetry: item.symmetry || "",
      NoOfCells: item.NoOfCells || "",
      noVisible: item.noVisible || "",
      monoNuclei: item.monoNuclei || "",
      multiNuclei: item.multiNuclei || "",
      spermSource: item.spermSource || "",
      embryoGrowthImageIcon: item.embryoGrowthImageIcon || "",
      embryoGrowthImageText: item.embryoGrowthImageText || "",
    }));

    const newReport = await Day2Record.create({
      primEmbrologist,
      secEmbrologist,
      incubator,
      Date,
      cycleId:req.session.cycle_id,
      remarks,
      reportData: transformedReportData,
    });

    res.json({ success: true, report: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving report" });
  }
};

const Day3Submit = async (req, res) => {
  try {
    const {
      primEmbrologist,
      Date,
      secEmbrologist,
      incubator,
      remarks,
      reportData,
    } = req.body;

    let transformedReportData = JSON.parse(reportData).map((item) => ({
      grade: item.grade,
      status: item.status,
      BigFrag: item.BigFrag,
      totalMN: item.totalMN,
      Frag_Dis: item.Frag_Dis,
      Frag_Per: item.Frag_Per,
      biNuclei: item.biNuclei,
      comments: item.comments,
      embryoNo: item.embryoNo,
      oocyteNo: item.oocyteNo,
      symmetry: item.symmetry,
      NoOfCells: item.NoOfCells,
      noVisible: item.noVisible,
      monoNuclei: item.monoNuclei,
      multiNuclei: item.multiNuclei,
      spermSource: item.spermSource,
      assistedHatching: item.assistedHatching,
      embryoGrowthImageIcon: item.embryoGrowthImageIcon,
      embryoGrowthImageText: item.embryoGrowthImageText,
    }));

    const newReport = await Day3Record.create({
      primEmbrologist,
      secEmbrologist,
      incubator,
      Date,
      cycleId:req.session.cycle_id,
      remarks,
      reportData: transformedReportData,
    });

    res.json({ success: true, report: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving report" });
  }
};
const Day4Submit = async (req, res) => {
  try {
    const {
      primEmbrologist,
      Date,
      secEmbrologist,
      incubator,
      remarks,
      reportData,
    } = req.body;

    let transformedReportData = JSON.parse(reportData).map((item) => ({
      icm: item.icm || "",
      stage: item.stage || "",
      status: item.status || "",
      trofect: item.trofect || "",
      biopsied: item.biopsied || false,
      comments: item.comments || "",
      embryoNo: item.embryoNo || "",
      oocyteNo: item.oocyteNo || "",
      symmetry: item.symmetry || "",
      noOfCells: item.noOfCells || "",
      pgdStatus: item.pgdStatus || "",
      compaction: item.compaction || "",
      spermSource: item.spermSource || "",
      pgdKeyFindings: item.pgdKeyFindings || "",
      fragmentPercent: item.fragmentPercent || "",
      assistedHatching: item.assistedHatching || false,
      fragmentDistribution: item.fragmentDistribution || "",
      embryoGrowthImageIcon: item.embryoGrowthImageIcon || "",
      embryoGrowthImageText: item.embryoGrowthImageText || "",
    }));

    const newReport = await Day4Record.create({
      primEmbrologist,
      secEmbrologist,
      incubator,
      cycleId:req.session.cycle_id,
      Date,
      remarks,
      reportData: transformedReportData,
    });

    res.json({ success: true, report: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving report" });
  }
};
const Day5Submit = async (req, res) => {
  try {
    const {
      primEmbrologist,
      Date,
      secEmbrologist,
      incubator,
      remarks,
      reportData,
    } = req.body;

    let transformedReportData = JSON.parse(reportData).map((item) => ({
      icm: item.icm || "",
      addOn: item.addOn || "",
      grade: item.grade || "",
      stage: item.stage || "",
      status: item.status || "",
      trofect: item.trofect || "",
      biopsied: item.biopsied || false,
      comments: item.comments || "",
      embryoNo: item.embryoNo || "",
      oocyteNo: item.oocyteNo || "",
      pgdStatus: item.pgdStatus || "",
      spermSource: item.spermSource || "",
      computedGrade: item.computedGrade || "",
      expansionGrade: item.expansionGrade || "",
      pgdKeyFindings: item.pgdKeyFindings || "",
      embryoGrowthImageIcon: item.embryoGrowthImageIcon || "",
      embryoGrowthImageText: item.embryoGrowthImageText || "",
    }));

    const newReport = await Day5Record.create({
      primEmbrologist,
      secEmbrologist,
      incubator,
      cycleId:req.session.cycle_id,
      Date,
      remarks,
      reportData: transformedReportData,
    });

    res.json({ success: true, report: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving report" });
  }
};
const Day6Submit = async (req, res) => {
  try {
    const {
      primEmbrologist,
      Date,
      secEmbrologist,
      incubator,
      remarks,
      reportData,
    } = req.body;

    let transformedReportData = JSON.parse(reportData).map((item) => ({
      icm: item.icm || "",
      addOn: item.addOn || "",
      grade: item.grade || "",
      stage: item.stage || "",
      status: item.status || "",
      trofect: item.trofect || "",
      biopsied: item.biopsied || false,
      comments: item.comments || "",
      embryoNo: item.embryoNo || "",
      oocyteNo: item.oocyteNo || "",
      pgdStatus: item.pgdStatus || "",
      spermSource: item.spermSource || "",
      computedGrade: item.computedGrade || "",
      expansionGrade: item.expansionGrade || "",
      pgdKeyFindings: item.pgdKeyFindings || "",
      embryoGrowthImageIcon: item.embryoGrowthImageIcon || "",
      embryoGrowthImageText: item.embryoGrowthImageText || "",
    }));

    const newReport = await Day6Record.create({
      primEmbrologist,
      secEmbrologist,
      incubator,
      Date,
      cycleId:req.session.cycle_id,
      remarks,
      reportData: transformedReportData,
    });

    res.json({ success: true, report: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving report" });
  }
};

const serviceAdviceSubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Prepare the data to be saved
    const adviceData = {
      ServiceAdvice: req.body, // Assigning the entire incoming JSON data to the 'ServiceAdvice' key
      Date: new Date().toISOString().split("T")[0], // Formatting today's date as 'YYYY-MM-DD'
    };

    // Creating a new advice record with the modified data
    const newAdvice = await serviceAdvice.create(adviceData);

    // Responding with a success message and the newly created advice
    res.json({ success: true, advice: newAdvice });
  } catch (error) {
    console.error("Error saving advice:", error);
    res.status(500).json({ success: false, message: "Error saving advice" });
  }
};

const doctorNotesSubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Prepare the data to be saved
    const notesData = {
      doctorNotes: req.body, // Assigning the entire incoming JSON data to the 'ServiceAdvice' key
      Date: new Date().toISOString().split("T")[0], // Formatting today's date as 'YYYY-MM-DD'
    };

    // Creating a new advice record with the modified data
    const newnotes = await doctorNotes.create(notesData);

    // Responding with a success message and the newly created advice
    res.json({ success: true, newnotes: newnotes });
  } catch (error) {
    console.error("Error saving advice:", error);
    res.status(500).json({ success: false, message: "Error saving advice" });
  }
};

const examinationSubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Prepare the data to be saved
    const examinationData = {
      GeneralExamination: req.body.generalExamination, // Assigning the 'generalExamination' part of the request
      UsgExamination: req.body.usgExamination, // Assigning the 'usgExamination' part of the request
      comments: req.body.comments, // Extracting comments if provided
    };

    // Creating a new record with the structured data
    const newExamination = await GeneralExamination.create(examinationData);

    // Responding with a success message and the newly created record
    res.json({ success: true, newExamination: newExamination });
  } catch (error) {
    console.error("Error saving examination:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving examination" });
  }
};

const treatmentSubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Prepare the data to be saved
    const treatmentData = {
      clinic_id: req.body.clinic_id || 0, // Retrieve or default clinic ID
      patientId: req.body.patientId, // Ensure these are provided in the req.body or set defaults
      doctorId: req.body.doctorId,
      treatment: req.body, // Directly using req.body as it should be the JSON array of treatment details
    };

    // Creating a new treatment advice record with the structured data
    const newTreatmentAdvice = await treatmentAdvice.create(treatmentData);

    // Responding with a success message and the newly created treatment advice record
    res.json({ success: true, newTreatmentAdvice: newTreatmentAdvice });
  } catch (error) {
    console.error("Error saving treatment advice:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving treatment advice" });
  }
};

// Make sure to import the Sequelize model at the top of your file

const allergySubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Prepare the data to be saved
    const allergyData = {
      clinic_id: req.body.clinic_id || 0, // Retrieve or default clinic ID
      patientId: req.body.patientId, // Ensure these are provided in the req.body or set defaults
      doctorId: req.body.doctorId,
      allergies: req.body, // Directly using req.body as it should be the JSON array of allergies
      Date: new Date().toISOString().split("T")[0], // Formatting today's date as 'YYYY-MM-DD'
    };

    // Creating a new allergy record with the structured data
    const newAllergyRecord = await allergies.create(allergyData);

    // Responding with a success message and the newly created allergy record
    res.json({ success: true, newAllergyRecord: newAllergyRecord });
  } catch (error) {
    console.error("Error saving allergy:", error);
    res.status(500).json({ success: false, message: "Error saving allergy" });
  }
};

const complaintSubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Prepare the data to be saved
    const complaintData = {
      clinic_id: req.body.clinic_id || 0, // Retrieve or default clinic ID
      patientId: req.body.patientId, // Ensure these are provided in the req.body or set defaults
      doctorId: req.body.doctorId,
      complaint: req.body, // Directly using req.body as it should be the JSON data for the complaint
      Date: new Date().toISOString().split("T")[0], // Formatting today's date as 'YYYY-MM-DD'
    };

    // Creating a new chief complaint record with the structured data
    const newComplaintRecord = await chiefComplaint.create(complaintData);

    // Responding with a success message and the newly created chief complaint record
    res.json({ success: true, newComplaintRecord: newComplaintRecord });
  } catch (error) {
    console.error("Error saving chief complaint:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving chief complaint" });
  }
};

// Make sure to import the Sequelize model at the top of your file

// Make sure to import the Sequelize model at the top of your file

const HistSubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Convert incoming JSON to an array format suitable for the 'History' JSON type
    // This assumes the entire `req.body` is the history data you want to save
    const historyDataArray = req.body; // Since req.body is already an array of histories

    // Prepare the data to be saved
    const historyData = {
      clinic_id: req.body.clinic_id || 0, // Placeholder: Replace with actual logic to obtain clinic_id
      patientId: req.body.patientId || "defaultPatientId", // Placeholder: Replace with actual logic
      doctorId: req.body.doctorId || "defaultDoctorId", // Placeholder: Replace with actual logic
      History: historyDataArray, // Storing the array directly to 'History'
      Date: new Date().toISOString().split("T")[0], // Formatting today's date as 'YYYY-MM-DD'
    };

    // Creating a new history record with the structured data
    const newHistory = await History.create(historyData);

    // Responding with a success message and the newly created history record
    res.json({ success: true, newHistory: newHistory });
  } catch (error) {
    console.error("Error saving history:", error);
    res.status(500).json({ success: false, message: "Error saving history" });
  }
};

const procedureSubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Convert incoming JSON to a format suitable for the 'procedure' JSON type
    // This assumes the entire `req.body` is the procedure data you want to save
    const procedureDataArray = req.body; // Since req.body is already an array of procedure advice

    // Prepare the data to be saved
    const procedureData = {
      clinic_id: req.body.clinic_id || 0, // Replace with actual logic to obtain clinic_id
      patientId: req.body.patientId, // Ensure these are provided in the req.body or set defaults
      doctorId: req.body.doctorId, // Ensure these are provided in the req.body or set defaults
      procedure: procedureDataArray, // Storing the array directly to 'procedure'
      Date: new Date().toISOString().split("T")[0], // Formatting today's date as 'YYYY-MM-DD'
    };

    // Creating a new procedure advice record with the structured data
    const newProcedureRecord = await procedureAdvice.create(procedureData);

    // Responding with a success message and the newly created procedure advice record
    res.json({ success: true, newProcedureRecord: newProcedureRecord });
  } catch (error) {
    console.error("Error saving procedure advice:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving procedure advice" });
  }
};

const savePrescription = async (req, res) => {
  try {
    const {
      clinic_id,
      patientId,
      doctorId,
      prescribedMedicine,
      prescribedComment,
      favourites,
      Date,
    } = req.body;

    const newPrescription = await prescription.create({
      clinic_id,
      patientId,
      doctorId,
      prescribedMedicine,
      prescribedComment,
      favourites,
      Date,
    });

    res.status(200).json({
      success: true,
      message: "Prescription saved successfully",
      data: newPrescription,
    });
  } catch (error) {
    console.error("Error saving prescription:", error);
    res.status(500).json({
      success: false,
      message: "Error saving prescription",
      error: error.message,
    });
  }
};

const followUpSubmit = async (req, res) => {
  try {
    const { followUps, recordedBy, recordedDate } = req.body;

    const followUpsToSave = followUps.map((followUp) => {
      // Ensure the recordedDate is valid before converting it
      const safeRecordedDate = recordedDate
        ? new Date(recordedDate).toISOString().split("T")[0]
        : null;
      const safeFollowUpDate = followUp.followUpDate
        ? new Date(followUp.followUpDate).toISOString().split("T")[0]
        : safeRecordedDate;

      return {
        clinic_id: req.body.clinic_id || 0,
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        recordedBy: recordedBy,
        recordedDate: safeRecordedDate,
        followUp: followUp,
        Date: safeFollowUpDate, // Use the safe date conversion
      };
    });

    const newFollowUpRecords = await FollowUp.bulkCreate(followUpsToSave);
    res.json({
      success: true,
      message: "Follow-up records saved successfully",
      newFollowUpRecords,
      recordedBy,
      recordedDate,
    });
  } catch (error) {
    console.error("Error saving follow-up:", error);
    res.status(500).json({ success: false, message: "Error saving follow-up" });
  }
};

// Make sure to import the Sequelize model at the top of your file

const conditionsSubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Convert incoming JSON to an array format suitable for the 'preCondition' JSON type
    // This assumes the entire `req.body` is the conditions data you want to save
    const conditionsDataArray = req.body; // Since req.body is already an array of conditions

    // Prepare the data to be saved
    const conditionsData = {
      clinic_id: req.body.clinic_id || 0, // Placeholder: Replace with actual logic to obtain clinic_id
      patientId: req.body.patientId || "defaultPatientId", // Placeholder: Replace with actual logic
      doctorId: req.body.doctorId || "defaultDoctorId", // Placeholder: Replace with actual logic
      preCondition: conditionsDataArray, // Storing the array directly to 'preCondition'
      Date: new Date().toISOString().split("T")[0], // Formatting today's date as 'YYYY-MM-DD'
    };

    // Creating a new pre-existing condition record with the structured data
    const newConditionRecord = await preExistingCondition.create(
      conditionsData
    );

    // Responding with a success message and the newly created record
    res.json({ success: true, newConditionRecord: newConditionRecord });
  } catch (error) {
    console.error("Error saving pre-existing condition:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving pre-existing condition" });
  }
};

// Make sure to import the Sequelize model at the top of your file

const treatmentHistSubmit = async (req, res) => {
  try {
    // Log the incoming request body
    console.log(req.body);

    // Convert incoming JSON to an array format suitable for the 'treatHist' JSON type
    const treatmentHistoryArray = Object.values(req.body); // Converts the row1, row2, etc., into an array

    // Prepare the data to be saved
    const treatmentData = {
      // clinic_id: req.body.clinic_id, // Ensure this value is provided or retrieved from the context
      // patientId: req.body.patientId,
      // doctorId: req.body.doctorId,
      treatHist: treatmentHistoryArray, // Assigning the converted array to 'treatHist'
      Date: new Date().toISOString().split("T")[0], // Formatting today's date as 'YYYY-MM-DD'
    };

    // Creating a new treatment history record with the structured data
    const newTreatmentHist = await treatmentHist.create(treatmentData);

    // Responding with a success message and the newly created treatment history
    res.json({ success: true, newTreatmentHist: newTreatmentHist });
  } catch (error) {
    console.error("Error saving treatment history:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving treatment history" });
  }
};

const diagnosisDataSubmit = async (req, res) => {
  try {
    console.log(req.body); // Log the incoming request body

    // Map the incoming JSON data to the diagnosis model fields
    const diagnosisData = {
      // Assuming you have some way to get clinic_id, patientId, and doctorId
      maleFactor: req.body.maleFactor,
      maleFactorRemarks: req.body.maleFactorOther,
      femaleFactor: req.body.femaleFactor,
      femaleFactorRemarks: req.body.femaleFactorOther,
      karyotypeAbnormality: req.body.karyotypeAbnormality,
      karyotypeAbnormalityRemarks: req.body.karyotypeOther,
      noOfInfYear: req.body.yearsInfertile || 0,
      other: req.body.otherFactors,
      Date: new Date().toISOString().split("T")[0], // Today's date in 'YYYY-MM-DD' format
    };

    // Creating a new diagnosis record with the structured data
    const newDiagnosis = await diagnosis.create(diagnosisData);

    // Responding with a success message and the newly created diagnosis record
    res.json({ success: true, newDiagnosis: newDiagnosis });
  } catch (error) {
    console.error("Error saving diagnosis:", error);
    res.status(500).json({ success: false, message: "Error saving diagnosis" });
  }
};

const saveSpermAdvanceResult = async (req, res) => {
  try {
    console.log(req.body); // req.body now contains your form data as a JSON object
    const newReport = await SpermAdvanceResult.create(req.body);
    res.json({ success: true, report: newReport });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ success: false, message: "Error saving report" });
  }
};

const stimulationSubmit = async (req, res) => {
  try {
    const {
      stimulationCompletedOn,
      readyForOpu,
      failedCycle,
      reasonForFailure,
      stimulationRecordedBy,
      transfer,
      atrBa,
      remarks,
      firstTrigger,
      secondTrigger,
    } = req.body;

    const cycleId = req.session.cycle_id;
    console.log(cycleId) // Include cycleId in the data to save
    let dataToSave = {
      cycleId,
      stimulationCompletedOn,
      readyForOpu,
      failedCycle,
      stimulationRecordedBy,
      atrBa,
      transfer,
      remarks,
      reasonForFailure,
    };

    if (readyForOpu) {
      dataToSave.firstTrigger = firstTrigger;
      dataToSave.secondTrigger = secondTrigger;
    }

    // Check if a record with the given cycleId already exists
    let existingRecord = await StimulationSubmit.findOne({
      where: { cycleId },
    });

    let newRecord;
    if (existingRecord) {
      // Update the existing record
      newRecord = await existingRecord.update(dataToSave);
    } else {
      // Create a new record
      newRecord = await StimulationSubmit.create(dataToSave);
    }

    res.json({ success: true, data: newRecord });
  } catch (error) {
    console.error("Error saving stimulation data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving stimulation data" });
  }
};

const saveScheduleEt = async (req, res) => {
  try {
    const {  etDate, etTime, etTimeERA, reviewedBy, fertStatus } =
      req.body;

    // Check if a record with the given cycleId already exists
    let existingSchedule = await ScheduleEt.findOne({ where: { cycleId:req.session.cycle_id } });

    if (existingSchedule) {
      // If a record exists, update it
      existingSchedule = await existingSchedule.update({
        etDate,
        etTime,
        etTimeERA,
        reviewedBy,
        fertStatus,
      });

      res.status(200).json({
        success: true,
        message: "Schedule ET updated successfully",
        data: existingSchedule,
      });
    } else {
      // If no record exists, create a new one
      const newSchedule = await ScheduleEt.create({
        cycleId:req.session.cycle_id,
        etDate,
        etTime,
        etTimeERA,
        reviewedBy,
        fertStatus,
      });

      res.status(200).json({
        success: true,
        message: "Schedule ET saved successfully",
        data: newSchedule,
      });
    }
  } catch (error) {
    console.error("Error saving Schedule ET:", error);
    res.status(500).json({
      success: false,
      message: "Error saving Schedule ET",
      error: error.message,
    });
  }
};

// controllers/outcomeController.js

const submitOutcome = async (req, res) => {
  console.log(req.body);
  console.log(2);
  try {
    const {
      clinicalPregnancyDate,
      clinicalPregnancyRecordedBy,
      clinicalPregnancyLocation,
      noOfSac,
      clinicalPregnancyObservations,
      ongoingPregnancyObservations,
      miscarriageDate,
      miscarriageTime,
      abortionType,
      clinicalMiscarriageObservations,
      deliveryDate,
      birthRecordedBy,
      birthType,
      modeOfDelivery,
      neonatalComplications,
      postPartumMaternalComplications,
      birthDetailsObservations,
      betaHcgData,
    } = req.body;

    // Save all data including Beta HCG as JSON
    const outcome = await Outcome.create({
      clinicalPregnancyDate,
      clinicalPregnancyRecordedBy,
      clinicalPregnancyLocation,
      cycleId: req.session.cycle_id,
      noOfSac,
      clinicalPregnancyObservations,
      ongoingPregnancyObservations,
      miscarriageDate,
      miscarriageTime,
      abortionType,
      clinicalMiscarriageObservations,
      deliveryDate,
      birthRecordedBy,
      birthType,
      modeOfDelivery,
      neonatalComplications,
      postPartumMaternalComplications,
      birthDetailsObservations,
      betaHcgData, // JSON array of Beta HCG rows
    });

    res.status(200).json({ message: "Data saved successfully", outcome });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while saving data" });
  }
};

// controllers/sperm

const {
  SemenSample,
  WashSemenSample,
  CanisterData,
  DiscardedSample,
} = require("../models/embrology.js");
const { Op } = require("sequelize");

const newSemenSample = async (req, res) => {
  try {
    // Extract and convert request body
    const {
      no_of_labels,
      time_of_receiving,
      received_on,
      received_by,
      collected_method,
      ph_value,
      sexual_abstinence_days,
      time_of_collect,
      date_of_collect,
    } = req.body;
    console.log(req.session.patientId);

    // Convert and format data
    const formattedData = {
      no_of_labels: parseInt(no_of_labels, 10),
      time_of_receiving: time_of_receiving + ":00", // Format to 'HH:MM:SS'
      received_on: new Date(received_on), // Convert to Date object
      received_by,
      collected_method,
      ph_value: ph_value.toString(), // Ensure ph_value is a string
      sexual_abstinence_days: parseInt(sexual_abstinence_days, 10),
      time_of_collect: time_of_collect + ":00", // Format to 'HH:MM:SS'
      date_of_collect: new Date(date_of_collect), // Convert to Date object
      patient_id: req.session.patientId,
      cycleId: req.session.cycle_id
    };

    // Create new SemenSample record
    const newSample = await SemenSample.create(formattedData);

    // Return success response
    res.status(201).json({
      status: "success",
      message: "Semen Sample created successfully",
      data: newSample,
    });
  } catch (error) {
    console.error("Error creating Semen Sample:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSemenSample = async (req, res) => {
  try {
    console.log(req.session.patientId)
    console.log(req.session.cycle_id)
    const allSemenSample = await SemenSample.findAll({where:{cycleId: req.session.cycle_id,patient_id: req.session.patientId}});
    res.status(200).json(allSemenSample);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const WashSemenSampleStore = async (req, res) => {
  try {
    console.log(req.body);
    await SemenSample.update(
      { status: "Washed" },
      { where: { id: req.body.sample_id,cycleId: req.session.cycle_id, patient_id: req.session.patientId } }
    );
    await WashSemenSample.create({...req.body,cycleId: req.session.cycle_id, patient_id: req.session.patientId});
    res.status(201).json({
      success: "success",
      message: "Wash Semen Sample created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const DiscardedSemenSample = async (req, res) => {
  try {
    await SemenSample.update(
      { status: "Discarded" },
      { where: { id: req.body.sample_id,patient_id: req.session.patientId, cycleId: req.session.cycle_id } }
    );
    await DiscardedSample.create({...req.body,patient_id: req.session.patientId, cycleId: req.session.cycle_id});
    res.status(201).json({
      success: "success",
      message: "Discarded Semen Sample created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVolume = async (req, res) => {
  console.log(req.body);
  try {
    let data = await WashSemenSample.findOne({
      where: { sample_id: req.body.id,patient_id: req.session.patientId, cycleId:req.session.cycle_id },
      attributes:['volume']
    });
    let storage = await SemenSample.findOne({
      where: {id: req.body.id,patient_id: req.session.patientId, cycleId:req.session.cycle_id },
      attributes:['Storage']
    });

    if(!storage){
      storage = '';
    }

    if (!data) {
      return res.status(404).send("Sample not found");
    }

    console.log(data.volume);
    res.status(200).send({ volume: data.volume, storage: storage });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred while fetching the volume");
  }
};

const saveData = async (req, res) => {
  try {
    await CanisterData.create({...req.body,patient_id:req.session.patientId, cycleId: req.session.cycle_id });
    let str = `Tank: ${req.body.tank}, Canister: ${req.body.canister}, Color: ${req.body.color}, Vial Holder: ${req.body.vial_holder}, Vial Position: ${req.body.vial_position}`;
    await SemenSample.update(
      { status: "frozen" },
      { where: { id: req.body.sample_id,patient_id:req.session.patientId, cycleId: req.session.cycle_id } }
    );
    await SemenSample.update(
      { stage: "frozen" },
      { where: { id: req.body.sample_id,patient_id:req.session.patientId, cycleId: req.session.cycle_id  } }
    );
    await SemenSample.update(
      { Storage: str },
      { where: { id: req.body.sample_id,patient_id:req.session.patientId, cycleId: req.session.cycle_id  } }
    );
    res.status(200).send({ message: "form submitted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const issueData = async (req, res) => {
  try {
    let data = await SemenSample.findAll({
      where: {
        status: {
          [Op.ne]: "discarded",
          [Op.ne]: "issued", // Use Op.ne to specify "not equal"
        },
      },
    });
    console.log(data);
    res.status(200).send({ data: data });
  } catch (error) {
    console.log(error);
  }
};
const issuedData = async (req, res) => {
  try {
    let data = await SemenSample.findAll({ where: { status: "issued" } });
    console.log(data);
    res.status(200).send({ data: data });
  } catch (error) {
    console.log(error);
  }
};

const issueUpdate = async (req, res) => {
  try {
    let data = req.body.array;
    console.log(data);
    await data.forEach((element) => {
      console.log(element);
      SemenSample.update({ status: "issued" }, { where: { id: element, cycleId: req.session.cycle_id, patient_id: req.session.patientId } });
    });
  } catch (error) {
    console.log("error");
  }
};

const splitUpdate = async (req, res) => {
  let data = req.body;
  try {
    let semenData = await SemenSample.findOne({ where: { id: data.sampleId,patient_id:req.session.patientId,cycleId: req.session.cycle_id } });
    await SemenSample.update(
      { status: "split" },
      { where: { id: data.sampleId,patient_id:req.session.patientId,cycleId: req.session.cycle_id } }
    );
    let washData = await WashSemenSample.findOne({
      where: { sample_id: data.sampleId,patient_id:req.session.patientId,cycleId: req.session.cycle_id },
    });
    console.log(semenData);
    console.log(washData);
    for (let i = 1; i <= data.description; i++) {
      let tempVolume = data[i];
      let tempTotalSperm = data[i] * washData.concentration;
      let rapid = (tempTotalSperm * washData.rapid_progressive) / 100;
      let slow = (tempTotalSperm * washData.slow_progressive) / 100;
      let motile = slow + rapid;
      let normalMotile = (motile * washData.normal_in) / 100;
      // console.log(tempVolume,tempTotalSperm,motile,normalMotile);
      let newSample = await SemenSample.create({
        patient_id:req.session.patientId,
        cycleId: req.session.cycle_id,
        userId: semenData.userId,
        clinchId: semenData.clinchId,
        patient_id: semenData.patient_id,
        parent: data.sampleId,
        Storage: semenData.Storage,
        status: semenData.status,
        stage: semenData.stage,
        date_of_collect: semenData.date_of_collect,
        time_of_collect: semenData.time_of_collect,
        sexual_abstinence_days: semenData.sexual_abstinence_days,
        ph_value: semenData.ph_value,
        collected_method: semenData.collected_method,
        received_on: semenData.received_on,
        time_of_receiving: semenData.time_of_receiving,
        no_of_labels: semenData.no_of_labels,
        received_by: semenData.received_by,
      });
      console.log("sample id:", newSample.id);
      await WashSemenSample.create({
        patient_id:req.session.patientId,
        cycleId: req.session.cycle_id,
        userId: washData.userId,
        clinchId: washData.clinchId,
        sample_id: newSample.id,
        collected_on: washData.collected_on,
        patient_id: washData.patient_id,
        mrn: washData.mrn,
        fresh: washData.fresh,
        capacitated: washData.capacitated,
        capacitatedData: washData.capacitatedData,
        volume: tempVolume,
        concentration: washData.concentration,
        total_sperm: tempTotalSperm,
        rapid_progressive: washData.rapid_progressive,
        slow_progressive: washData.slow_progressive,
        non_progressive: washData.non_progressive,
        immobile: washData.immobile,
        total_motile_prog: motile,
        normal_in: washData.normal_in,
        abnormal_in: washData.abnormal_in,
        head_defects: washData.head_defects,
        mid_piece_defects: washData.mid_piece_defects,
        tail_defects: washData.tail_defects,
        excess_residual_cytoplasm: washData.excess_residual_cytoplasm,
        teratoz_index: washData.teratoz_index,
        normal_prog_motile: normalMotile,
        semen_appearance: washData.semen_appearance,
        homogenize: washData.homogenize,
        complete_sample: washData.complete_sample,
        diagnosis: washData.diagnosis,
        degree_of_diagnosis: washData.degree_of_diagnosis,
        vitality_test_method: washData.vitality_test_method,
        vitality_test_in: washData.vitality_test_in,
        viscosity: washData.viscosity,
        washing_technique: washData.washing_technique,
        washing_done_by: washData.washing_done_by,
        large_halo: washData.large_halo,
        medium_halo: washData.medium_halo,
        small_halo: washData.small_halo,
        no_halo: washData.no_halo,
        fragmented: washData.fragmented,
        non_fragmented: washData.non_fragmented,
        total: washData.total,
        dfi_percent: washData.dfi_percent,
        manual_calculation: washData.manual_calculation,
        macs_done: washData.macs_done,
        hba: washData.hba,
        dfi: washData.dfi,
        picsi: washData.picsi,
        general_remarks: washData.general_remarks,
        private_remarks: washData.private_remarks,
        bound_motile_sperm: washData.bound_motile_sperm,
        non_bound_motile_sperm: washData.non_bound_motile_sperm,
        total_hba: washData.total_hba,
        hba_positive_sperm_percent: washData.hba_positive_sperm_percent,
        hba_negative_sperm_percent: washData.hba_negative_sperm_percent,
        total_percent: washData.total_percent,
      });
    }
  } catch (error) {}
  console.log(req.body);
};

const newEmbroTransfor = async (req, res) => {
  try {
    const Id = req.body.id;
    if (Id) {
      await EmbryoTransfer.update(
        {
          where: {
            id: Id,
          },
        },
        req.body
      );
    } else {
      await EmbryoTransfer.create(req.body);
    }
    res.status(200).json({
      success: true,
      message: "Embryo Transfer created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// mine

// const patientCounsellingPost = async (req, res) => {
//   console.log(req.body);
//   console.log(`PostCounsellingData`);
//   console.log(`Req.Session Before Save`);
//   console.log(req.session);

//   try {
//     const patientCounselingData = req.body;
//     const newPatientCounseling = await PatientCounseling.create(
//       patientCounselingData
//     );
//     console.log(`Req.Session After Save`);
//     console.log(req.session);
//     res.status(201).json(newPatientCounseling);
//   } catch (error) {
//     console.error("Error saving patient counseling data:", error);
//     res.status(500).json({ message: "Error saving patient counseling data" });
//   }
// };

const patientCounsellingPost = async (req, res) => {
  console.log(req.body);
  console.log(`PostCounselingData`);
  console.log(`Req.Session Before Save`);
  console.log(req.session);

  try {
    // Ensure that patientId exists in the session
    if (!req.session.patientId) {
      return res
        .status(400)
        .json({ message: "Patient ID not found in session" });
    }
    console.log(req.session.patientId)
    const mrn_no = await PR_patientReg.findOne({where:{id:req.session.patientId},attributes:['mr_no']})
    console.log(mrn_no);
    const patientCounselingData = {
      ...req.body,
      cycle_id: req.session.cycle_id, // Spread the body data
      patientId: req.session.patientId,
      mrn: JSON.stringify(mrn_no) // Add patientId from session
    };

    

    // Create a new PatientCounseling record with the patientId
    const newPatientCounseling = await PatientCounseling.create(
      patientCounselingData,
      { ...req.body }
    );

    console.log(`Req.Session After Save`);
    console.log(req.session);
    res.status(201).json(newPatientCounseling);
  } catch (error) {
    console.error("Error saving patient counseling data:", error);
    res.status(500).json({ message: "Error saving patient counseling data" });
  }
};

// Route to get patient counseling data by MRN
const patientCounsellingGet = async (req, res) => {
  try {
    const { mrn } = req.params;
    const patientCounseling = await PatientCounseling.findOne({
      where: { mrn },
    });

    if (patientCounseling) {
      res.status(200).json(patientCounseling);
    } else {
      res.status(404).json({ message: "Patient counseling data not found" });
    }
  } catch (error) {
    console.error("Error fetching patient counseling data:", error);
    res.status(500).json({ message: "Error fetching patient counseling data" });
  }
};

// Controller function to get records with status "Ready for Transfer"
// const getReadyForTransferRecords = async (req, res) => {
//     try {
//         // Raw SQL query to fetch records where any item in reportData has status "Ready for Transfer"
//         const query = `
//             SELECT * FROM emb_day5record
//             WHERE JSON_CONTAINS(reportData, '{"status": "Ready for Transfer"}', '$')`;

//         // const query = `select * from emb_day5record`;
//         // Execute the query
//         const [rows, fields] = await sequelize.query(query);

//         // Send the filtered records as a response
//         res.status(200).json(rows);
//     } catch (error) {
//         console.error("Error fetching records:", error);
//         res
//             .status(500)
//             .json({ error: "An error occurred while fetching the records." });
//     }
// };

//

const saveEmbryoTransfer = async (req, res) => {
  try {
    const {
      date,
      time,
      embryosTransferred,
      catheter,
      difficulty,
      transferDFE,
      ecoguided,
      mucous,
      blood,
      repetition,
      bladder,
      allies,
      dilator,
      comments,
      doctor,
      embryologist,
      status,
      cycle_Id,
    } = req.body;

    console.log(req.body);
    const convertToBoolean = (value) => {
      if (typeof value === "string") {
        return value === "on" || value === "true";
      }
      return Boolean(value);
    };

    // Check if an embryo transfer with the same cycle_Id already exists
    const existingEmbryoTransfer = await EmbryoTransfer.findOne({
      where: { cycle_Id: 0 },
    });

    let savedEmbryoTransfer;

    if (existingEmbryoTransfer) {
      // Update the existing record
      savedEmbryoTransfer = await existingEmbryoTransfer.update({
        date,
        time,
        embryosTransferred: embryosTransferred, // Store JSON as string
        catheter,
        difficulty,
        transferDFE: convertToBoolean(transferDFE), // Default to false if not provided
        ecoguided: convertToBoolean(ecoguided) || false,
        mucous: convertToBoolean(mucous) || false,
        blood: convertToBoolean(blood) || false,
        repetition: convertToBoolean(repetition),
        bladder: convertToBoolean(bladder) || false,
        allies: convertToBoolean(allies) || false,
        dilator: convertToBoolean(dilator) || false,
        comments,
        doctor,
        embryologist,
        status: status || false,
      });
    } else {
      // Create a new record
      savedEmbryoTransfer = await EmbryoTransfer.create({
        date,
        time,
        embryosTransferred: embryosTransferred, // Store JSON as string
        catheter,
        difficulty,
        transferDFE: convertToBoolean(transferDFE), // Default to false if not provided
        ecoguided: convertToBoolean(ecoguided) || false,
        mucous: convertToBoolean(mucous) || false,
        blood: convertToBoolean(blood) || false,
        repetition: convertToBoolean(repetition),
        bladder: convertToBoolean(bladder) || false,
        allies: convertToBoolean(allies) || false,
        dilator: convertToBoolean(dilator) || false,
        comments,
        doctor,
        embryologist,
        status: status || false,
        cycle_Id,
      });
    }

    // Respond with the saved object
    res.status(200).json(savedEmbryoTransfer);
  } catch (error) {
    console.error("Error saving embryo transfer:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the embryo transfer." });
  }
};

const getEmbryoTransfers = async (req, res) => {
  try {
    // Fetch all records from the EmbryoTransfer table
    const embryoTransfers = await EmbryoTransfer.findAll();

    // Respond with the retrieved data
    res.status(200).json(embryoTransfers);
  } catch (error) {
    console.error("Error fetching embryo transfers:", error);
    res.status(500).json({
      error: "An error occurred while fetching the embryo transfers.",
    });
  }
};

// Controller function to get embryo transfers filtered by cycle_Id from session
const getEmbryoTransfersByCycleId = async (req, res) => {
  try {
    // Retrieve cycle_Id from session
    // const cycle_Id = req.session.cycle_Id;
    const cycle_Id2 = 0;

    // Validate that cycle_Id is present in the session

    // if (!cycle_Id2) {
    //   return res.status(400).json({ error: "cycle_Id is required in session" });
    // }

    // Fetch records filtered by cycle_Id
    const embryoTransfers = await EmbryoTransfer.findAll({
      where: {
        cycle_Id: cycle_Id2,
      },
    });

    // If no records found, return a 404
    if (embryoTransfers.length === 0) {
      return res
        .status(404)
        .json({ message: "No embryo transfers found for the given cycle_Id" });
    }

    // Respond with the filtered data
    res.status(200).json(embryoTransfers);
  } catch (error) {
    console.error("Error fetching embryo transfers by cycle_Id:", error);
    res.status(500).json({
      error: "An error occurred while fetching the embryo transfers.",
    });
  }
};

// mine

var { ovumSchedule, CurrentItemStock } = require("../models/embrology");

let postData = async (req, res) => {
  let data = req.body;
  console.log(data);

  try {
    // Assume 'id' is the unique identifier for each record
    // Check if the record exists
    let existingRecord = await ovumSchedule.findOne({
      where: { cycleId: data.cycleId },
    });

    if (existingRecord) {
      // Record exists, update it
      await ovumSchedule.update(
        {
          Option: data.Option,
          DenudationDoneBy: data.DenudationDoneBy,
          DenudationTime: data.DenudationTime,
          DenudationDate: data.DenudationDate,
          NoOfOocytes: data.NoOfOocytes,
          NoOfLeftFollicles: data.NoOfLeftFollicles,
          NoOfRightFollicles: data.NoOfRightFollicles,
          OPUNotes: data.OPUNotes,
          SecondaryEmbryologist: data.SecondaryEmbryologist,
          PrimaryEmbryologist: data.PrimaryEmbryologist,
          AnesthesiaType: data.AnesthesiaType,
          Anesthetist: data.Anesthetist,
          AssistantSurgeon: data.AssistantSurgeon,
          Surgeon: data.Surgeon,
          Time: data.Time,
          Date: data.Date,
        },
        {
          where: { cycleId: data.cycleId },
        }
      );
      console.log("updated");
    } else {
      // Record does not exist, create a new one
      await ovumSchedule.create({
        Option: data.Option,
        DenudationDoneBy: data.DenudationDoneBy,
        DenudationTime: data.DenudationTime,
        DenudationDate: data.DenudationDate,
        NoOfOocytes: data.NoOfOocytes,
        NoOfLeftFollicles: data.NoOfLeftFollicles,
        NoOfRightFollicles: data.NoOfRightFollicles,
        OPUNotes: data.OPUNotes,
        SecondaryEmbryologist: data.SecondaryEmbryologist,
        PrimaryEmbryologist: data.PrimaryEmbryologist,
        AnesthesiaType: data.AnesthesiaType,
        Anesthetist: data.Anesthetist,
        AssistantSurgeon: data.AssistantSurgeon,
        Surgeon: data.Surgeon,
        Time: data.Time,
        Date: data.Date,
        id: data.id, // ensure id is included when creating new records
      });
      console.log("inserted");
    }

    res.status(200).send("Operation successful");
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).send("Server error");
  }
};

let getDataOpu = async (req, res) => {
  console.log(req.query.id);
  let id = parseInt(req.query.id);
  try {
    let data = await ovumSchedule.findOne({ where: { cycleId: id } });
    console.log(data);
    res.status(200).send({ dataOpu: data });
  } catch (error) {
    res.status(200).send({ data: "no data" });
  }
};

const getOpu = async (req, res) => {
  let id = parseInt(req.query.id);
  try {
    let data = await ovumSchedule.findOne({ where: { cycleId: id } });
    console.log(data);
    res.status(200).send({ dataOpu: data });
  } catch (error) {
    res.status(200).send({ data: "no data" });
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

const getReadyForTransferRecords2 = async (req, res) => {
  try {
    const emb_day3_ready_forTransfer = await sequelize.query(
      `SELECT * FROM emb_day3record 
       WHERE JSON_CONTAINS(reportData, '{"status": "Ready for Transfer"}', '$') 
       AND cycleId = :cycleId`,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { cycleId: req.session.cycle_id } // Replace with your actual cycleId value
      }
    );
    

    const embday4_readyforTransfer = await sequelize.query(
      `SELECT * FROM emb_day4record 
           WHERE JSON_CONTAINS(reportData, '{"status": "Ready for Transfer"}', '$') AND cycleId = :cycleId`,
      { 
        type: sequelize.QueryTypes.SELECT,
        replacements: { cycleId: req.session.cycle_id}
       }
    );

    const embday5_readyforTransfer = await sequelize.query(
      `SELECT * FROM emb_day5record 
          WHERE JSON_CONTAINS(reportData, '{"status": "Ready for Transfer"}', '$') AND cycleId = :cycleId`,
      { 
        type: sequelize.QueryTypes.SELECT,
        replacements: { cycleId: req.session.cycle_id}
       }
    );

    const embday6_readyforTransfer = await sequelize.query(
      `SELECT * FROM emb_day6record 
          WHERE JSON_CONTAINS(reportData, '{"status": "Transfer"}', '$') AND cycleId = :cycleId`,
      { 
        type: sequelize.QueryTypes.SELECT,
        replacements: { cycleId: req.session.cycle_id}
       }
    );

    console.log(`Emb DAAAAAY 6666666`, embday6_readyforTransfer);
    console.log(`Emb DAAAAAY 6666666`, emb_day3_ready_forTransfer);
    console.log(`Emb DAAAAAY 6666666`, embday5_readyforTransfer);
    console.log(`Emb DAAAAAY 6666666`, emb_day3_ready_forTransfer);

    res.json({
      embday4_readyforTransfer,
      emb_day3_ready_forTransfer,
      embday5_readyforTransfer,
      embday6_readyforTransfer,
    });
  } catch (err) {
    console.log(err);
  }
};

// Function to fetch doctor notes by patientId and doctorId
const fetchDoctorNotes = async (req, res) => {
  // const { patientId, doctorId } = req.query; // Assuming both are passed as query parameters

  let patientId = 22;
  let doctorId = 122;
  try {
    // Fetch data from the database based on both patientId and doctorId
    const doctorNotesData = await doctorNotes.findAll({
      where: {
        [Op.and]: [{ patientId: patientId }, { doctorId: doctorId }],
      },
      attributes: [
        "id",
        "clinic_id",
        "patientId",
        "doctorId",
        "doctorNotes",
        "Date",
        "createdAt",
        "updatedAt",
        "cycleId",
      ],
    });

    if (doctorNotesData.length > 0) {
      res.status(200).json(doctorNotesData);
    } else {
      res
        .status(404)
        .json({ message: "No records found for this patient and doctor" });
    }
  } catch (error) {
    console.error("Error fetching doctor notes:", error);
    res.status(500).json({ message: "Server error while fetching data" });
  }
};

// Function to fetch follow-up data by patientId and doctorId
const getFollowUpByPatientAndDoctor = async (req, res) => {
  // const { patientId, doctorId } = req.query; // Assuming patientId and doctorId are passed as query parameters
  let patientId = 123;
  let doctorId = 0o11;
  try {
    const followUpData = await FollowUp.findAll({
      where: {
        patientId: patientId,
        doctorId: doctorId,
      },
      attributes: [
        "id",
        "clinic_id",
        "patientId",
        "doctorId",
        "followUp",
        "createdAt",
        "updatedAt",
        "cycleId",
      ],
    });

    if (followUpData.length > 0) {
      return res.status(200).json(followUpData);
    } else {
      return res
        .status(404)
        .json({ message: "No records found for the given patient and doctor" });
    }
  } catch (error) {
    console.error("Error fetching follow-up data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const chiefComJson = require("../public/myjson/chiefComplaints.json");

const chiefComplaints = async (req, res) => {
  try {
    res.json(chiefComJson);
  } catch (error) {
    console.error("Error fetching Chief Complaints:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// const chiefComplaints = async (req, res) => {
//   //   const filePath = path.join(__dirname, "data.json");
//   fs.readFile("../public/myjson/chiefComplaints.json", "utf8", (err, data) => {
//     if (err) {
//       res.status(500).send("Error reading data.");
//     } else {
//       res.send(JSON.parse(data));
//     }
//   });
// };

const getSemenInvData = async (req, res) => {
  try {
    const data = await SemenSample.findAll({
      attributes: ["status", "patient_id", "id", "date_of_collect", "Storage"],
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

const thawUpdate = async (req, res) => {
  try {
    console.log(req.body);
    await SemenSample.update(
      { status: "collected", stage: "Fresh" },
      { where: { id: req.body.id,patient_id:req.session.patientId,cycleId: req.session.cycle_id } }
    );
    res.status(200).send("successful");
  } catch (error) {}
};

const tableVitrifyData = async (req, res) => {
  try {
    // Fetch data where reportData.status is 'Vitrify'
    const dataDay2 = await Day2Record.findAll({
      where: sequelize.literal(
        `JSON_CONTAINS(reportData, '{"status": "Vitrify"}')`
      ),
    });
    const dataDay3 = await Day3Record.findAll({
      where: sequelize.literal(
        `JSON_CONTAINS(reportData, '{"status": "Vitrify"}')`
      ),
    });

    const dataDay4 = await Day4Record.findAll({
      where: sequelize.literal(
        `JSON_CONTAINS(reportData, '{"status": "Vitrify"}')`
      ),
    });

    // Respond with the fetched data
    res.json({
      day2: dataDay2,
      day3: dataDay3,
      day4: dataDay4,
    });
  } catch (error) {
    // Handle and log errors
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Error fetching data" });
  }
};

const vitrifyEmbryo = async (req, res) => {
  try {
    console.log(req.query);
    const DB = Day + req.query.str + Record;
    const dataDay2 = await DB.findOne({
      where: { id: req.query.id },
    });
    console.log(dataDay2);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newSemenSample,
  getSemenSample,
  WashSemenSampleStore,
  DiscardedSemenSample,
  newEmbroTransfor,
  getVolume,
  saveData,
  issueData,
  issuedData,
  issueUpdate,
  splitUpdate,
  Day0Submit,
  Day1Submit,
  Day2Submit,
  Day3Submit,
  Day4Submit,
  Day5Submit,
  Day6Submit,
  saveSpermAdvanceResult,
  stimulationSubmit,
  saveScheduleEt,
  submitOutcome,
  newEmbroTransfor,
  patientCounsellingGet,
  patientCounsellingPost,
  getReadyForTransferRecords2,
  saveEmbryoTransfer,
  getEmbryoTransfers,
  getEmbryoTransfersByCycleId,
  postData,
  getDataOpu,
  getOpu,
  serviceAdviceSubmit,
  doctorNotesSubmit,
  diagnosisDataSubmit,
  examinationSubmit,
  treatmentHistSubmit,
  HistSubmit,
  allergySubmit,
  complaintSubmit,
  treatmentSubmit,
  conditionsSubmit,
  procedureSubmit,
  followUpSubmit,
  savePrescription,
  drugsData,
  fetchDoctorNotes,
  getFollowUpByPatientAndDoctor,
  chiefComplaints,
  tableVitrifyData,
  vitrifyEmbryo,
  getSemenInvData,
  thawUpdate,
};
