const express = require("express");
const router = express.Router();
const session = require("express-session");
const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");
const QRCode = require("qrcode");
const multer = require("multer");
const { PR_BillFindPatient, PR_patientReg } = require("../models/plshBill");
const { upload2, uploadConcent } = require("../controllers/concentUploads.js");
const { getConcent } = require("../controllers/concent.js");
const { error, PDFDocument } = require("pdf-lib");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const customSuffix = req.body.customSuffix || "oocyte";
    console.log(customSuffix);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, customSuffix + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const { sequelize } = require("../sequelize");
const { Sequelize, where } = require("sequelize");
router.use(express.json());
const { QueryTypes } = require("sequelize");
const Op = Sequelize.Op;

router.post("/userConcent", upload2.single("file"), uploadConcent);

const CryptoJS = require("crypto-js");
const {
  Day0Record,
  WashSemenSample,
  stimulation,
  Package,
  Day2Record,
  Day3Record,
  ovumSchedule,
  Day4Record,
  Day1Record,
  Day5Record,
  Day6Record,
  attachments,
  PatientCounseling,
  StimulationSubmit,
  SemenSample
} = require("../models/embrology");
const {
  Day0Submit,
  getFollowUpByPatientAndDoctor,
  fetchDoctorNotes,
  tableVitrifyData,
  vitrifyEmbryo,
  getSemenInvData,
  thawUpdate,
  Day1Submit,
  drugsData,
  Day3Submit,
  Day2Submit,
  Day4Submit,
  Day5Submit,
  Day6Submit,
  saveSpermAdvanceResult,
  stimulationSubmit,
  saveScheduleEt,
  submitOutcome,
  chiefComplaints,
} = require("../controllers/embrology");

//decryption and encryption fxn
function decryptData(encryptedData, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function decryptDataFromUrl(encryptedData) {
  // URL-decode the encrypted data
  const decodedEncrypted = decodeURIComponent(encryptedData);

  // Define the secret key used for encryption
  const secretKey = "ll"; // Ensure this matches the key used for encryption

  // Decrypt the data using CryptoJS
  const bytes = CryptoJS.AES.decrypt(decodedEncrypted, secretKey);

  // Convert the bytes to a UTF-8 string
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  return decrypted;
}

function encryptDataForUrl(data) {
  console.log(data);
  const secretKey = "ll"; // Replace with your actual secret key
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  const encodedEncrypted = encodeURIComponent(encrypted);
  return encodedEncrypted;
}

async function getNoOfOocytes(id) {
  try {
    const result = await ovumSchedule.findOne({ where: { cycleId: id } });
    let count = 0;
    result.Option.forEach((element) => {
      if (element.stage == "MII" || element.stage == "MI") {
        count++;
      }
    });
    return count ? count : null;
  } catch (error) {
    console.log("error");
  }
}

// Routes
// router.get('/0', async (req, res) => {
//   const noOfOocytes = await getNoOfOocytes(1); // Replace 1 with the actual ID you need
//   res.render('embrology/12-0-active-cycle-sperm-culture-monitor-embroys-day-ICSI', { noOfOocytes });
// });

router.get("/1", async (req, res) => {
  const noOfOocytes = await getNoOfOocytes(1); // Replace 1 with the actual ID you need
  res.render(
    "embrology/12-1-active-cycle-sperm-culture-monitor-embroys-day-ICSI",
    { noOfOocytes }
  );
});

router.get("/2", async (req, res) => {
  const noOfOocytes = await getNoOfOocytes(1); // Replace 1 with the actual ID you need
  res.render(
    "embrology/12-2-active-cycle-sperm-culture-monitor-embroys-day-ICSI",
    { noOfOocytes }
  );
});

router.get("/3", async (req, res) => {
  try {
    const noOfOocytes = await getNoOfOocytes(1); // Replace 1 with the actual ID you need

    // Fetch the Day2Record from the database
    const day2Record = await Day2Record.findOne({
      where: { cycleId: 0 }, // Replace 1 with the actual cycle ID you need
      attributes: ["reportData"],
    });

    let observedOocytes = [];
    let oocyteData = [];

    if (day2Record && day2Record.reportData) {
      const reportData = day2Record.reportData;

      // Populate oocyteData with all oocytes and their statuses
      oocyteData = reportData.map((record) => ({
        oocyteNo: record.oocyteNo,
        status: record.status,
      }));

      // Extract only the oocytes with status "Observe"
      observedOocytes = oocyteData
        .filter((record) => record.status === "Observe")
        .map((record) => record.oocyteNo);
    }

    res.render(
      "embrology/12-3-active-cycle-sperm-culture-monitor-embroys-day-ICSI",
      {
        noOfOocytes,
        oocyteData: JSON.stringify(oocyteData), // Stringify the JSON data here
        observedOocytes, // Send only the oocytes with status "Observe"
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/4", async (req, res) => {
  try {
    const noOfOocytes = await getNoOfOocytes(1); // Replace 1 with the actual ID you need

    // Fetch the Day2Record from the database
    const day3Record = await Day3Record.findOne({
      where: { cycleId: 0 }, // Replace 0 with the actual cycle ID you need
      attributes: ["reportData"],
    });

    let observedOocytes = [];
    let oocyteData = [];

    if (day3Record && day3Record.reportData) {
      const reportData = day3Record.reportData;

      // Populate oocyteData with all oocytes and their statuses
      oocyteData = reportData.map((record) => ({
        oocyteNo: record.oocyteNo,
        status: record.status,
      }));

      // Extract only the oocytes with status "Observe"
      observedOocytes = oocyteData
        .filter((record) => record.status === "Observe")
        .map((record) => record.oocyteNo);
    }

    res.render(
      "embrology/12-4-active-cycle-sperm-culture-monitor-embroys-day-ICSI",
      {
        noOfOocytes,
        oocyteData: JSON.stringify(oocyteData), // Stringify the JSON data here
        observedOocytes, // Send only the oocytes with status "Observe"
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/5", async (req, res) => {
  try {
    const noOfOocytes = await getNoOfOocytes(1); // Replace 1 with the actual ID you need

    // Fetch the Day5Record (adjust the model name as needed) from the database
    const day4Record = await Day4Record.findOne({
      where: { cycleId: 0 }, // Replace 1 with the actual cycle ID you need
      attributes: ["reportData"],
    });

    let oocyteData = [];

    if (day4Record && day4Record.reportData) {
      const reportData = day4Record.reportData;

      // Populate oocyteData with all oocytes and their statuses
      oocyteData = reportData.map((record) => ({
        oocyteNo: record.oocyteNo,
        status: record.status,
      }));
    }

    res.render(
      "embrology/12-5-active-cycle-sperm-culture-monitor-embroys-day-ICSI",
      {
        noOfOocytes,
        oocyteData: JSON.stringify(oocyteData), // Pass oocyteData as a JSON string
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/6", (req, res) => {
  const tempDir = path.join(__dirname, "..", "uploads");
  if(!req.session.rowId){
    res.redirect('/embrology/200')
  }
  req.session.patientId = req.session.rowId;
  // //comment this
  // req.session.cycle_id = 1;
  console.log(req.session)
  //
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  // cycleID

  res.render("embrology/GeetaPage");
});
router.get("/7", (req, res) => {
  res.render("embrology/4-create-sperm-advance-result[8-22]");
});
router.get("/8", async (req, res) => {
  try {
    const cycleId = req.session.cycle_id; // Get cycleId from query or use default value
    // Fetch data from each day's record
    const day0Data = await Day0Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day1Data = await Day1Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day2Data = await Day2Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day3Data = await Day3Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day4Data = await Day4Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day5Data = await Day5Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day6Data = await Day6Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    console.log(day5Data);
    console.log(day6Data);
    // Combine data by matching oocyteNo
    const combinedData = {};

    const addDataToCombined = (dayData, dayKey) => {
      if (dayData && dayData.reportData) {
        console.log(dayData.reportData);
        dayData.reportData.forEach((record) => {
          const oocyteNo = record.oocyteNo || `undefined-${dayKey}`; // Handle undefined oocyteNo by using a placeholder key

          if (!combinedData[oocyteNo]) {
            combinedData[oocyteNo] = {};
          }
          combinedData[oocyteNo][dayKey] = record;
        });
      }
    };

    // Add data for each day
    addDataToCombined(day0Data, "day0");
    addDataToCombined(day1Data, "day1");
    addDataToCombined(day2Data, "day2");
    addDataToCombined(day3Data, "day3");
    addDataToCombined(day4Data, "day4");
    addDataToCombined(day5Data, "day5");
    addDataToCombined(day6Data, "day6");

    const noOfOocytes = await getNoOfOocytes(1);

    const day2Record = await Day2Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });

    let oocyteData3 = [];

    if (day2Record && day2Record.reportData) {
      const reportData = day2Record.reportData;
      oocyteData3 = reportData.map((record) => ({
        oocyteNo: record.oocyteNo,
        status: record.status,
      }));
    }

    const day4Record = await Day4Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });

    let oocyteData5 = [];

    if (day4Record && day4Record.reportData) {
      const reportData = day4Record.reportData;
      oocyteData5 = reportData.map((record) => ({
        oocyteNo: record.oocyteNo,
        status: record.status,
      }));
    }
    const day5Record = await Day5Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });

    let oocyteData6 = [];

    if (day4Record && day4Record.reportData) {
      const reportData = day4Record.reportData;
      oocyteData6 = reportData.map((record) => ({
        oocyteNo: record.oocyteNo,
        status: record.status,
      }));
    }

    const day3Record = await Day3Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });

    let observedOocytes = [];
    let oocyteData4 = [];

    if (day3Record && day3Record.reportData) {
      const reportData = day3Record.reportData;
      oocyteData4 = reportData.map((record) => ({
        oocyteNo: record.oocyteNo,
        status: record.status,
      }));

      observedOocytes = oocyteData4
        .filter((record) => record.status === "Observe")
        .map((record) => record.oocyteNo);
    }

    // Fetch DenudationDate from the embryo_ovumschedule table
    const [ivfOvumScheduleRecord] = await sequelize.query(
      "SELECT `DenudationDate` FROM `embryo_ovumschedule` WHERE `id` = :id",
      {
        replacements: { id: 1 },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const DenudationDate = ivfOvumScheduleRecord
      ? ivfOvumScheduleRecord.DenudationDate
      : null;
    console.log("combined Data", combinedData.day6);

    res.render("embrology/active-cycle-culture", {
      noOfOocytes,
      oocyteData4: JSON.stringify(oocyteData4),
      oocyteData5: JSON.stringify(oocyteData5),
      oocyteData6: JSON.stringify(oocyteData6),
      oocyteData3: JSON.stringify(oocyteData3),
      combinedData: JSON.stringify(combinedData),
      DenudationDate,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/9", (req, res) => {
  res.render("embrology/stimulationListing");
});

//sperm inventory
router.get("/10", async (req, res) => {
  res.render("embrology/1-semen-sample-inventory-search-criteria");
});

router.get("/11", async (req, res) => {
  res.render("embrology/embryo-vitrification-list.ejs");
});
router.post("/thaw-update", thawUpdate);

router.get("/getSemenInvData", getSemenInvData);
router.get("/tableVitrify", tableVitrifyData);
router.get("/vitrifyEmbryo", vitrifyEmbryo);

router.get("/7", (req, res) => {
  res.render("embrology/4-create-sperm-advance-result[8-22]");
});

//end

router.get("/14", (req, res) => {
  res.render("embrology/tem1");
});
router.get("/15", (req, res) => {
  res.render("embrology/tem2");
});
router.get("/16", (req, res) => {
  res.render("embrology/tem3");
});
router.get("/17", (req, res) => {
  res.render("embrology/tem4");
});
router.get("/18", (req, res) => {
  res.render("embrology/tem5");
});
router.get("/19", (req, res) => {
  res.render("embrology/copy-and-past-you-code-here");
});

router.get("/20", (req, res) => {
  res.render("embrology/tem7");
});
router.get("/21", (req, res) => {
  res.render("embrology/tem8");
});

router.get("/24", (req, res) => {
  res.render("embrology/1-active-cycle-et");
});
router.get("/25", (req, res) => {
  res.render("embrology/3-active-cycle-et-edit");
});
router.get("/26", (req, res) => {
  res.render("embrology/2-active-cycle-outcome");
});

router.get("/28", (req, res) => {
  res.render("embrology/16-past-cycle-outcome");
});
router.get("/29", (req, res) => {
  res.render("embrology/17-past-cycle-outcome-edit");
});
router.get("/30", (req, res) => {
  res.render("embrology/20-active-cycle-outcome-stop-cycle");
});
router.get("/31", (req, res) => {
  res.render("embrology/05-active-cycle-outcome-record-outcome");
});

//stimulation

router.get("/stimulation-data", async (req, res) => {
  try {
    // Fetch the data based on cycleId and dayId if provided in the query
    const dayId  = req.query.dayId;
    console.log('ansh',req.query)
    const cycleId = req.session.cycle_id;

    let whereClause = {};

    if (cycleId && dayId) {
      whereClause = { cycleId, dayId };
    }

    // Fetch all or specific StimulationRows based on cycleId and dayId
    if(dayId != ''){
      const stimulationData = await stimulation.findAll({
        where: whereClause,
        attributes: ["cycleId", "dayId", "StimulationRows"],
      });
  
      // Log each StimulationRows entry
      stimulationData.forEach((entry) => console.log(entry.StimulationRows));
  
      // Send back the StimulationRows data
      res.json(stimulationData.map((entry) => entry.StimulationRows));
      console.log(req.session.cycle_id,req.query.dayId);
    }
    else{
      res.status(200).send();
    }
  } catch (error) {
    console.error("Error fetching stimulation data:", error);
    res.status(500).send("Server error");
  }

  
});

router.post("/save-stimulation-data", async (req, res) => {
  
  try {
    // Check if cycleId and dayId already exist in the database
    let { StimulationRows, dayId } = req.body;
  const cycleId = req.session.cycle_id;
  dayId = parseInt(dayId);
  console.log('ansh',dayId)
    const existingData = await stimulation.findOne({
      where: { cycleId, dayId },
    });
    if (existingData) {
      // If data exists, update the existing entry
      await stimulation.update(
        { StimulationRows },
        { where: { cycleId,dayId  } }
      );
      res.json({ success: true, message: "Data updated successfully" });
    } else {
      // If no data exists, create a new entry
      await stimulation.create({ cycleId, dayId, StimulationRows });
      res.json({ success: true, message: "Data saved successfully" });
    }
  } catch (error) {
    console.error("Error saving or updating data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving or updating data" });
  }
});

router.get("/oocyte-report", async (req, res) => {
  const cycleId = 0; // Replace with the actual cycle ID you want to use

  try {
    // Fetch data from each day's record
    const day0Data = await Day0Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day1Data = await Day1Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day2Data = await Day2Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day3Data = await Day3Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day4Data = await Day4Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });
    const day5Data = await Day5Record.findOne({
      where: { cycleId },
      attributes: ["reportData"],
    });

    // Combine data by matching oocyteNo
    const combinedData = {};

    const addDataToCombined = (dayData, dayKey) => {
      if (dayData && dayData.reportData) {
        dayData.reportData.forEach((record) => {
          console.log(record.oocyteNo);
          const oocyteNo = record.oocyteNo || `undefined-${dayKey}`; // Handle undefined oocyteNo by using a placeholder key

          if (!combinedData[oocyteNo]) {
            combinedData[oocyteNo] = {};
          }
          combinedData[oocyteNo][dayKey] = record;
        });
      }
    };

    // Add data for each day
    addDataToCombined(day0Data, "day0");
    addDataToCombined(day1Data, "day1");
    addDataToCombined(day2Data, "day2");
    addDataToCombined(day3Data, "day3");
    addDataToCombined(day4Data, "day4");
    addDataToCombined(day5Data, "day5");

    // Pass the combined data to the view as a JSON string
    res.render("embrology/oocyte-report", {
      combinedData: JSON.stringify(combinedData),
    });
  } catch (error) {
    console.error("Error fetching oocyte data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/overview", (req, res) => {
  console.log(req.body);
});

router.post("/saveday0form", upload.any(), Day0Submit);
router.post("/saveday1form", upload.any(), Day1Submit);
router.post("/saveday2form", upload.any(), Day2Submit);
router.post("/saveday3form", upload.any(), Day3Submit);
router.post("/saveday4form", upload.any(), Day4Submit);
router.post("/saveday5form", upload.any(), Day5Submit);
router.post("/saveday6form", upload.any(), Day6Submit);
router.post("/saveStimulationSubmit", stimulationSubmit);
router.post("/schedule-et/save", saveScheduleEt);
router.post("/saveSpermAdvanceResult", saveSpermAdvanceResult);


router.post("/submitOutcome", submitOutcome);

// sperm file
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/33", (req, res) => {
  res.render("Embrology/Cycle-summary");
});

router.get("/34", (req, res) => {
  res.render("Embrology/active-cycle-sperm");
});

router.get("/35", (req, res) => {
  res.render("Embrology/active-cycle-counselling");
});

router.get("/36", (req, res) => {
  res.render("Embrology/active-cycle-outcome");
});

router.get("/37", async (req, res) => {
  let Id = req.query.id;
  let result = "";
  if (Id) {
    const EmbroTransfor = await EmbryoTransfer.findOne({
      where: {
        id: Id,
      },
    });
    result = EmbroTransfor;
    res.render("Embrology/active-cycle-et-edit", { result });
  } else {
    res.render("Embrology/active-cycle-et-edit", { result });
  }
});

router.get("/38", (req, res) => {
  res.render("Embrology/active-cycle-stimulation");
});

router.get("/39", (req, res) => {
  res.render("Embrology/active-cycle-outcome-edit");
});

router.get("/40", (req, res) => {
  res.render("Embrology/active-cycle-opu");
});

router.get("/41", (req, res) => {
  res.render("Embrology/active-cycle-overview");
});

router.get("/42", (req, res) => {
  res.render("Embrology/active-cycle-sperm-collect-issue-semen-sample");
});

router.get("/43", async (req, res) => {
  const patient_Id = 1;
  let result = "";
  if (patient_Id) {
    const EmbroTransfor = await EmbryoTransfer.findOne({
      where: {
        patient_id: patient_Id,
      },
    });
    console.log(EmbroTransfor);
    result = EmbroTransfor;
    res.render("Embrology/active-cycle-et", { result });
  } else {
    res.render("Embrology/active-cycle-et", { result });
  }
});

const {
  newSemenSample,
  getVolume,
  splitUpdate,
  saveData,
  issuedData,
  issueData,
  issueUpdate,
  getSemenSample,
  WashSemenSampleStore,
  DiscardedSemenSample,
  newEmbroTransfor,
} = require("../controllers/embrology");

//saving form data in db
router.post("/new-semen-sample", newSemenSample);
router.post("/wash-semen-sample", WashSemenSampleStore);

router.post("/discard-semen-sample", DiscardedSemenSample);
router.post("/new-embro-transfor", newEmbroTransfor);

//getting a data from db
router.get("/get-semen-sample", getSemenSample);
router.post("/volume", getVolume);
router.post("/save", saveData);
router.get("/get-issue-data", issueData);
router.get("/get-issued-data", issuedData);
router.post("/updateIssue", issueUpdate);
router.post("/split-update", splitUpdate);

router.get("/199", async (req, res) => {
  if(!req.session.patientId){
    res.redirect('/embrology/200')
  }
  const check = await PatientCounseling.findOne({where:{patientId : req.session.patientId}});
  if(check){
    req.session.cycle_id = check.cycle_id; 
  }else{
    req.session.cycle_id= req.session.patientId + Math.ceil(Math.random()*10);
  }
  console.log(req.session.patientId);


  res.render("Embrology/patients-for-counselling-counselling", {
    patientId: req.session.patientId,
  });
});
router.get("/200", (req, res) => {
  res.render("Embrology/patientList"  );
});

router.get("/91", (req, res) => {
  res.render("Embrology/1-active-cycle-et");
});

const {
  EmbryoTransfer,
  patientCounsellingGet,
  patientCounsellingPost,
  getReadyForTransferRecords2,
  saveEmbryoTransfer,
  getEmbryoTransfers,
  getEmbryoTransfersByCycleId,
} = require("../controllers/embrology");
// mine

// Route to get "Ready for Transfer" records
router.get("/ready-for-transfer", getReadyForTransferRecords2);

router.post("/post-patientCounselling", patientCounsellingPost);
router.get("/get-patientCounselling/:mrn", patientCounsellingGet);

router.post("/embryo-transfer", saveEmbryoTransfer);

// Route to get all embryo transfers
router.get("/embryo-transfers", getEmbryoTransfers);
// mine

// overview
router.get("/44", async (req, res) => {
  try {
    // Fetch data from embryo_ovumschedule using sequelize.query

    req.session.patientId = encryptDataForUrl("1");
    const [ovumSchedule, metadata] = await sequelize.query(
      "SELECT * FROM embryo_ovumschedule"
    );

    // If no ovum schedule data is found, return null
    const ovumScheduleData = ovumSchedule.length > 0 ? ovumSchedule[0] : null;

    // Fetch data from emb_treatmentadvice
    const [emb_treatmentadvic, metadata3] = await sequelize.query(
      "SELECT treatment FROM emb_treatmentadvice WHERE id=2"
    );

    // If no treatment advice data is found, return null
    const embTreatmentAdviceData =
      emb_treatmentadvic.length > 0 ? emb_treatmentadvic[0] : null;

    // Fetch data from embro_wash_semen_sample
    const [embro_wash_semen_sampl, metadata4] = await sequelize.query(
      "SELECT * FROM embro_wash_semen_sample WHERE id=1"
    );

    // If no semen sample data is found, return null
    const embroWashSemenSampleData =
      embro_wash_semen_sampl.length > 0 ? embro_wash_semen_sampl[0] : null;

    // Fetch data from emb_day5record
    const [emb_day5recor, metadata5] = await sequelize.query(
      "SELECT * FROM emb_day5record WHERE id=1"
    );

    // If no Day 5 record data is found, return null
    const embDay5RecordData =
      emb_day5recor.length > 0 ? emb_day5recor[0] : null;

    // Extract reportData from emb_day5record or use an empty array if missing
    const reportData = embDay5RecordData
      ? embDay5RecordData.reportData || []
      : [];

    // Render the page with fetched data, or null/empty values where applicable
    res.render("embrology/active-cycle-overview", {
      ovumSchedules: ovumScheduleData, // Ensure correct index for rendering
      emb_day5record: embDay5RecordData,
      reportData: reportData,
      embro_wash_semen_sample: embroWashSemenSampleData,
      emb_treatmentadvice: embTreatmentAdviceData,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("An error occurred while fetching data.");
  }
});

var {
  postData,
  getDataOpu,
  getOpu,
  getPatientHeader,
} = require("../controllers/embrology");

router.get("/50", function (req, res) {
  res.render("embrology/4-active-cycle-opu");
});

router.post("/post", postData);
router.get("/get-data", getDataOpu);
router.get("/getOpuData", getOpu);

router.get("/followUPS", async (req, res) => {
  res.status(200).json([
    {
      date: "01/08/2024",
      doctor: "DR. NISHA BHATNAGAR",
      appointment_type: "Follow-up",
      notes: "IMPORTANT",
      status: "To be scheduled",
    },
    {
      date: "15/09/2024",
      doctor: "DR. ANIL SHARMA",
      appointment_type: "Initial Consultation",
      notes: "Bring previous medical records",
      status: "Scheduled",
    },
    {
      date: "23/07/2024",
      doctor: "DR. PRIYA KUMAR",
      appointment_type: "Routine Checkup",
      notes: "Fasting required",
      status: "Completed",
    },
    {
      date: "05/10/2024",
      doctor: "DR. RAJIV MEHTA",
      appointment_type: "Follow-up",
      notes: "Review lab results",
      status: "To be scheduled",
    },
    {
      date: "12/08/2024",
      doctor: "DR. SUNITA GUPTA",
      appointment_type: "Vaccination",
      notes: "Bring immunization card",
      status: "Completed",
    },
  ]);
});

// geeta-page attachments

const {
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
} = require("../controllers/embrology");
const { log } = require("util");

router.get("/generate-qr", async (req, res) => {
  try {
    console.log("ansh");
    const sectionId = req.query.id;
    console.log("file", __filename);
    const tempDir = path.join(__dirname, "..", "public", "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    const qrCodeText = `http://localhost:3000/qr/upload-image?sectionId=${sectionId}`;
    const qrCodeFilePath = path.join(tempDir, `${sectionId}.png`);

    // Generate QR Code and save to file
    await QRCode.toFile(qrCodeFilePath, qrCodeText, { type: "png" });
    console.log(`QR Code saved to ${qrCodeFilePath}`);
    // Save QR code details in the database
    await QRCodeModel.create({
      qrimg: qrCodeFilePath,
      qrsecid: sectionId,
      qrstatus: "I",
    });
    console.log("ansh malhotra");

    res.send(
      `<h1>QR Code Generated</h1><img src="/temp/${sectionId}.png" alt="QR Code" />`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while generating the QR code");
  }
});

router.post("/delete", async (req, res) => {
  console.log("Inside delete request");

  const filename = decryptDataFromUrl(req.body.fileName);
  console.log("filename", filename);
  const filePath = path.join(__dirname, "..", "uploads", filename);

  try {
    // Check if the path exists and if it is a file or directory
    const stats = await fsPromise.stat(filePath);

    if (stats.isFile()) {
      // Delete the file if it is a file
      await fsPromise.rm(filePath);
      console.log(`File ${filename} removed successfully.`);
      res.status(200).send({ message: "File deleted successfully." });
    } else if (stats.isDirectory()) {
      // Handle directories separately if needed
      console.error(`Path ${filePath} is a directory.`);
      res.status(400).send({ message: "Path is a directory, not a file." });
    } else {
      console.error(`Path ${filePath} is neither a file nor a directory.`);
      res.status(400).send({ message: "Invalid path." });
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      // File or directory does not exist
      console.error(`File ${filename} does not exist.`);
      res.status(404).send({ message: "File not found." });
    } else {
      // Other errors (e.g., permissions issues)
      console.error(`Error removing file ${filename}:`, err);
      res.status(500).send({ message: "Failed to delete file." });
    }
  }
});

router.post(
  "/upload-img",
  function (req, res, next) {
    // Middleware to handle custom fields
    console.log(req.body.customSuffix);
    req.customSuffix = req.body.customSuffix; // Capture customSuffix before file handling
    next();
  },
  upload.single("image"),
  (req, res) => {
    console.log(`inside upload-image-ansh1209 embrologyfile`);
    console.log(req.body);
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const encryfilename = encryptDataForUrl(req.file.filename);

    // Respond with success
    res.status(200).send(encryfilename);
  }
);

router.post("/doctorNotesSubmit", doctorNotesSubmit);
router.post("/serviceAdvice", serviceAdviceSubmit);
router.post("/prescription/save", savePrescription);
router.post("/followUpSubmit", followUpSubmit);
router.post("/procedureSubmit", procedureSubmit);
router.post("/conditionsSubmit", conditionsSubmit);
router.post("/treatmentSubmit", treatmentSubmit);
router.post("/complaintSubmit", complaintSubmit);
router.post("/allergySubmit", allergySubmit);
router.post("/HistSubmit", HistSubmit);
router.post("/treatmentHistSubmit", treatmentHistSubmit);
router.post("/examinationSubmit", examinationSubmit);
router.post("/diagnosisDataSubmit", diagnosisDataSubmit);

// day 6
router.get("/51", async (req, res) => {
  try {
    const noOfOocytes = await getNoOfOocytes(1); // Replace 1 with the actual ID you need

    // Fetch the Day5Record (adjust the model name as needed) from the database
    const day4Record = await Day4Record.findOne({
      where: { cycleId: 0 }, // Replace 1 with the actual cycle ID you need
      attributes: ["reportData"],
    });

    let oocyteData = [];

    if (day4Record && day4Record.reportData) {
      const reportData = day4Record.reportData;

      // Populate oocyteData with all oocytes and their statuses
      oocyteData = reportData.map((record) => ({
        oocyteNo: record.oocyteNo,
        status: record.status,
      }));
    }

    res.render(
      "embrology/12-6-active-cycle-sperm-culture-monitor-embroys-day-ICSI",
      {
        noOfOocytes,
        oocyteData: JSON.stringify(oocyteData), // Pass oocyteData as a JSON string
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/get-package", async (req, res) => {
  try {
    let data = await Package.findAll();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/washData", async (req, res) => {
  try {
    let data = await WashSemenSample.findOne({ where: { sample_id: req.query.id,cycleId: req.session.cycle_id,patient_id: req.session.patientId } });
    console.log(data)
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/semenData',async (req,res)=>{
  try {
    let data = await SemenSample.findOne({where:{id:req.query.id,cycleId: req.session.cycle_id, patient_id: req.session.patientId},attributes:['date_of_collect']});
    res.status(200).send(data);
  } catch (error) {
    
  }
})

router.get("/drugs", drugsData);
router.get("/doctor-notes", fetchDoctorNotes);

router.get("/follow-up", getFollowUpByPatientAndDoctor);
router.get("/embryo-transfers-cycleID", getEmbryoTransfersByCycleId);
router.get("/ready-for-transfer2", getReadyForTransferRecords2);

router.get("/chiefComplaints", chiefComplaints);

router.get("/readyForOpuStatus", async (req, res) => {
  // const sqlQuery = "SELECT readyForOpu FROM emb_stimulationsubmit"; // Replace your_table_name with the actual table name

  try {
    const results = await sequelize.query(
      "SELECT readyForOpu FROM emb_stimulationsubmit",
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Send only the readyForOpu values in the response
    res.json(results.map((row) => row.readyForOpu));
  } catch (error) {
    console.log(error, error.message);
  }
});

// concent

router.get("/get-concent", getConcent);

router.get("/concent", (req, res) => {
  console.log("Helloi");
  res.render("../views/Concent/concent.ejs");
});

router.post("/print-concent", async (req, res) => {
  try {
    const { patientReg } = req.body;
    console.log(req.body);
    const findPatient = await PR_patientReg.findOne({
      where: { mr_no: patientReg },
    });
    console.log(findPatient);

    if (req.body.fileName == "file1") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-6.pdf"
      );
      let firstPage = await getPath(pdfPath);

      DrawText(
        firstPage.firstPage,
        findPatient.clinic_id.toString(),
        280,
        672,
        8
      );
      DrawText(firstPage.firstPage, findPatient.address, 75, 661, 8);

      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file2") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-7.pdf"
      );
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, findPatient.firstName, 100, 646, 9);
      DrawText(firstPage.firstPage, findPatient.spouse_firstName, 350, 646, 9);
      DrawText(firstPage.firstPage, "Doctor", 110, 618.5, 9);
      DrawText(firstPage.firstPage, findPatient.firstName, 127, 403, 9);
      DrawText(firstPage.firstPage, findPatient.spouse_firstName, 145, 424, 9);

      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file3") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-8.pdf"
      );
      let firstPage = await getPath(pdfPath);
      // Name (at the top)
      DrawText(firstPage.firstPage, findPatient.firstName, 140, 625, 9);

      // Doctor's Name
      DrawText(firstPage.firstPage, "DOCTOR", 120, 611.5, 9);

      // ART Bank's No.
      DrawText(firstPage.firstPage, "artBankNo", 97.6, 586, 8);

      // ART Bank's Registration No.
      DrawText(firstPage.firstPage, "artBankRegNo", 108.6, 571.8, 8);

      // Obtained from (ART Bank)
      DrawText(firstPage.firstPage, "artBankObtainedFrom", 243.6, 585, 8);

      // ART Clinic Name
      DrawText(firstPage.firstPage, "clinicName", 351, 598, 8);

      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file4") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-9.pdf"
      );
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, "Husband", 125, 648.6, 8);
      DrawText(firstPage.firstPage, "Wife", 102, 635, 8);
      DrawText(firstPage.firstPage, "sperm", 241, 621, 8);
      DrawText(firstPage.firstPage, "octyte", 352, 621, 8);
      DrawText(firstPage.firstPage, "1year", 279, 607, 8);
      DrawText(firstPage.firstPage, "Husband Sign", 131, 382, 8);
      DrawText(firstPage.firstPage, "10/08/2004", 364, 382, 8);
      DrawText(firstPage.firstPage, "Wife Sign", 130, 213, 8);
      DrawText(firstPage.firstPage, "10/08/2004", 363, 213, 8);

      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file5") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-10.pdf"
      );
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, "Husband", 123, 648.6, 8);
      DrawText(firstPage.firstPage, "Wife", 271, 648.6, 8);
      DrawText(firstPage.firstPage, "sperm/octyte", 98, 635, 8);
      DrawText(firstPage.firstPage, "(Name&address", 140, 607, 8);
      DrawText(firstPage.firstPage, "sperm/octyte quality", 100, 566.6, 8);
      DrawText(firstPage.firstPage, "Husband Sign", 131, 425, 8);
      DrawText(firstPage.firstPage, "10/08/2004", 364, 425, 8);
      DrawText(firstPage.firstPage, "Wife Sign", 130, 277, 8);
      DrawText(firstPage.firstPage, "10/08/2004", 363, 277, 8);
      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file6") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-11.pdf"
      );
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, "Minor", 106, 580.6, 8);
      DrawText(firstPage.firstPage, "sperm", 396, 580.6, 8);
      DrawText(firstPage.firstPage, "(Name&address)", 150, 540, 8);
      DrawText(firstPage.firstPage, "sperm/octyte", 480, 513, 8);
      DrawText(firstPage.firstPage, "Minor Sign", 128, 420.5, 8);
      DrawText(firstPage.firstPage, "10/08/2004", 396, 420.5, 8);
      DrawText(firstPage.firstPage, "Parent Sign", 128, 251, 8);
      DrawText(firstPage.firstPage, "10/08/2004", 396, 251, 8);
      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file7") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-12.pdf"
      );
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, "Patient Name,", 250, 623.5, 8);
      DrawText(firstPage.firstPage, "Patient address", 350, 623.5, 8);
      DrawText(firstPage.firstPage, "Clinic Name,", 233, 602.5, 8);
      DrawText(firstPage.firstPage, "Clinic address", 300, 602.5, 8);
      DrawText(firstPage.firstPage, "Doctor xyz", 231, 506.5, 8);
      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file8") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-13.pdf"
      );
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, "Women Name,", 122, 625, 8);
      DrawText(firstPage.firstPage, "Women address", 100, 612, 8);
      DrawText(firstPage.firstPage, "Adhaar number", 290, 612, 8);
      DrawText(firstPage.firstPage, "Mobile Number,", 291, 625.5, 8);
      DrawText(firstPage.firstPage, "Doctor xyz", 244, 564, 8);
      DrawText(firstPage.firstPage, "10-08-2004", 113.5, 550, 8);

      DrawText(firstPage.firstPage, "Counceller", 209, 529.5, 8);
      DrawText(firstPage.firstPage, "10-08-2004", 163, 515.5, 8);
      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file9") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-14B.pdf"
      );
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, "Patient Name,", 107, 596, 8);
      DrawText(firstPage.firstPage, "Pateint Id", 75, 573, 8);
      DrawText(firstPage.firstPage, "Embryoo Detail", 382, 151, 8);
      DrawText(firstPage.firstPage, "Tank", 307, 131, 8);
      DrawText(firstPage.firstPage, "Canister", 323, 110, 8);
      DrawText(firstPage.firstPage, "Goblet-loop", 342, 88, 8);
      DrawText(firstPage.firstPage, "Arrangement", 343, 67, 8);

      DrawText(firstPage.firstPage, "Col-1", 37, 419, 8);
      DrawText(firstPage.firstPage, "Col-1a", 66, 419, 8);
      DrawText(firstPage.firstPage, "Col-1b", 85, 419, 8);
      DrawText(firstPage.firstPage, "Col-1c", 104, 419, 8);
      DrawText(firstPage.firstPage, "Col-1d", 138, 419, 8);
      DrawText(firstPage.firstPage, "Col-1e", 164, 419, 8);
      DrawText(firstPage.firstPage, "Col-1f", 186, 419, 8);
      DrawText(firstPage.firstPage, "Col-1g", 210, 419, 8);
      DrawText(firstPage.firstPage, "Col-1h", 235, 419, 8);
      DrawText(firstPage.firstPage, "Col-1i", 259, 419, 8);
      DrawText(firstPage.firstPage, "Col-1j", 288, 419, 8);
      DrawText(firstPage.firstPage, "Col-1k", 318, 419, 8);
      DrawText(firstPage.firstPage, "Col-1l", 349, 419, 8);
      DrawText(firstPage.firstPage, "Col-1m", 377, 419, 8);
      DrawText(firstPage.firstPage, "Col-1n", 406, 419, 8);

      DrawText(firstPage.firstPage, "Col-2", 37, 406, 8);
      DrawText(firstPage.firstPage, "Col-2a", 66, 406, 8);
      DrawText(firstPage.firstPage, "Col-2b", 85, 406, 8);
      DrawText(firstPage.firstPage, "Col-2c", 104, 406, 8);
      DrawText(firstPage.firstPage, "Col-2d", 138, 406, 8);
      DrawText(firstPage.firstPage, "Col-2e", 164, 406, 8);
      DrawText(firstPage.firstPage, "Col-2f", 186, 406, 8);
      DrawText(firstPage.firstPage, "Col-2g", 210, 406, 8);
      DrawText(firstPage.firstPage, "Col-2h", 235, 406, 8);
      DrawText(firstPage.firstPage, "Col-2i", 259, 406, 8);
      DrawText(firstPage.firstPage, "Col-2j", 288, 406, 8);
      DrawText(firstPage.firstPage, "Col-2k", 318, 406, 8);
      DrawText(firstPage.firstPage, "Col-2l", 349, 406, 8);
      DrawText(firstPage.firstPage, "Col-2m", 377, 406, 8);
      DrawText(firstPage.firstPage, "Col-2n", 406, 406, 8);

      DrawText(firstPage.firstPage, "Col-3", 37, 393, 8);
      DrawText(firstPage.firstPage, "Col-3a", 66, 393, 8);
      DrawText(firstPage.firstPage, "Col-3b", 85, 393, 8);
      DrawText(firstPage.firstPage, "Col-3c", 104, 393, 8);
      DrawText(firstPage.firstPage, "Col-3d", 138, 393, 8);
      DrawText(firstPage.firstPage, "Col-3e", 164, 393, 8);
      DrawText(firstPage.firstPage, "Col-3f", 186, 393, 8);
      DrawText(firstPage.firstPage, "Col-3g", 210, 393, 8);
      DrawText(firstPage.firstPage, "Col-3h", 235, 393, 8);
      DrawText(firstPage.firstPage, "Col-3i", 259, 393, 8);
      DrawText(firstPage.firstPage, "Col-3j", 288, 393, 8);
      DrawText(firstPage.firstPage, "Col-3k", 318, 393, 8);
      DrawText(firstPage.firstPage, "Col-3l", 349, 393, 8);
      DrawText(firstPage.firstPage, "Col-3m", 377, 393, 8);
      DrawText(firstPage.firstPage, "Col-3n", 406, 393, 8);

      DrawText(firstPage.firstPage, "Col-4", 37, 378, 8);
      DrawText(firstPage.firstPage, "Col-4a", 66, 378, 8);
      DrawText(firstPage.firstPage, "Col-4b", 85, 378, 8);
      DrawText(firstPage.firstPage, "Col-4c", 104, 378, 8);
      DrawText(firstPage.firstPage, "Col-4d", 138, 378, 8);
      DrawText(firstPage.firstPage, "Col-4e", 164, 378, 8);
      DrawText(firstPage.firstPage, "Col-4f", 186, 378, 8);
      DrawText(firstPage.firstPage, "Col-4g", 210, 378, 8);
      DrawText(firstPage.firstPage, "Col-4h", 235, 378, 8);
      DrawText(firstPage.firstPage, "Col-4i", 259, 378, 8);
      DrawText(firstPage.firstPage, "Col-4j", 288, 378, 8);
      DrawText(firstPage.firstPage, "Col-4k", 318, 378, 8);
      DrawText(firstPage.firstPage, "Col-4l", 349, 378, 8);
      DrawText(firstPage.firstPage, "Col-4m", 377, 378, 8);
      DrawText(firstPage.firstPage, "Col-4n", 406, 378, 8);

      DrawText(firstPage.firstPage, "Col-5", 37, 363, 8);
      DrawText(firstPage.firstPage, "Col-5a", 66, 363, 8);
      DrawText(firstPage.firstPage, "Col-5b", 85, 363, 8);
      DrawText(firstPage.firstPage, "Col-5c", 104, 363, 8);
      DrawText(firstPage.firstPage, "Col-5d", 138, 363, 8);
      DrawText(firstPage.firstPage, "Col-5e", 164, 363, 8);
      DrawText(firstPage.firstPage, "Col-5f", 186, 363, 8);
      DrawText(firstPage.firstPage, "Col-5g", 210, 363, 8);
      DrawText(firstPage.firstPage, "Col-5h", 235, 363, 8);
      DrawText(firstPage.firstPage, "Col-5i", 259, 363, 8);
      DrawText(firstPage.firstPage, "Col-5j", 288, 363, 8);
      DrawText(firstPage.firstPage, "Col-5k", 318, 363, 8);
      DrawText(firstPage.firstPage, "Col-5l", 349, 363, 8);
      DrawText(firstPage.firstPage, "Col-5m", 377, 363, 8);
      DrawText(firstPage.firstPage, "Col-5n", 406, 363, 8);

      DrawText(firstPage.firstPage, "Col-6", 37, 350, 8);
      DrawText(firstPage.firstPage, "Col-6a", 66, 350, 8);
      DrawText(firstPage.firstPage, "Col-6b", 85, 350, 8);
      DrawText(firstPage.firstPage, "Col-6c", 104, 350, 8);
      DrawText(firstPage.firstPage, "Col-6d", 138, 350, 8);
      DrawText(firstPage.firstPage, "Col-6e", 164, 350, 8);
      DrawText(firstPage.firstPage, "Col-6f", 186, 350, 8);
      DrawText(firstPage.firstPage, "Col-6g", 210, 350, 8);
      DrawText(firstPage.firstPage, "Col-6h", 235, 350, 8);
      DrawText(firstPage.firstPage, "Col-6i", 259, 350, 8);
      DrawText(firstPage.firstPage, "Col-6j", 288, 350, 8);
      DrawText(firstPage.firstPage, "Col-6k", 318, 350, 8);
      DrawText(firstPage.firstPage, "Col-6l", 349, 350, 8);
      DrawText(firstPage.firstPage, "Col-6m", 377, 350, 8);
      DrawText(firstPage.firstPage, "Col-6n", 406, 350, 8);

      DrawText(firstPage.firstPage, "Col-7", 37, 336, 8);
      DrawText(firstPage.firstPage, "Col-7a", 66, 336, 8);
      DrawText(firstPage.firstPage, "Col-7b", 85, 336, 8);
      DrawText(firstPage.firstPage, "Col-7c", 104, 336, 8);
      DrawText(firstPage.firstPage, "Col-7d", 138, 336, 8);
      DrawText(firstPage.firstPage, "Col-7e", 164, 336, 8);
      DrawText(firstPage.firstPage, "Col-7f", 186, 336, 8);
      DrawText(firstPage.firstPage, "Col-7g", 210, 336, 8);
      DrawText(firstPage.firstPage, "Col-7h", 235, 336, 8);
      DrawText(firstPage.firstPage, "Col-7i", 259, 336, 8);
      DrawText(firstPage.firstPage, "Col-7j", 288, 336, 8);
      DrawText(firstPage.firstPage, "Col-7k", 318, 336, 8);
      DrawText(firstPage.firstPage, "Col-7l", 349, 336, 8);
      DrawText(firstPage.firstPage, "Col-7m", 377, 336, 8);
      DrawText(firstPage.firstPage, "Col-7n", 406, 336, 8);

      DrawText(firstPage.firstPage, "Col-8", 37, 320, 8);
      DrawText(firstPage.firstPage, "Col-8a", 66, 320, 8);
      DrawText(firstPage.firstPage, "Col-8b", 85, 320, 8);
      DrawText(firstPage.firstPage, "Col-8c", 104, 320, 8);
      DrawText(firstPage.firstPage, "Col-8d", 138, 320, 8);
      DrawText(firstPage.firstPage, "Col-8e", 164, 320, 8);
      DrawText(firstPage.firstPage, "Col-8f", 186, 320, 8);
      DrawText(firstPage.firstPage, "Col-8g", 210, 320, 8);
      DrawText(firstPage.firstPage, "Col-8h", 235, 320, 8);
      DrawText(firstPage.firstPage, "Col-8i", 259, 320, 8);
      DrawText(firstPage.firstPage, "Col-8j", 288, 320, 8);
      DrawText(firstPage.firstPage, "Col-8k", 318, 320, 8);
      DrawText(firstPage.firstPage, "Col-8l", 349, 320, 8);
      DrawText(firstPage.firstPage, "Col-8m", 377, 320, 8);
      DrawText(firstPage.firstPage, "Col-8n", 406, 320, 8);

      DrawText(firstPage.firstPage, "Col-9", 37, 308, 8);
      DrawText(firstPage.firstPage, "Col-9a", 66, 308, 8);
      DrawText(firstPage.firstPage, "Col-9b", 85, 308, 8);
      DrawText(firstPage.firstPage, "Col-9c", 104, 308, 8);
      DrawText(firstPage.firstPage, "Col-9d", 138, 308, 8);
      DrawText(firstPage.firstPage, "Col-9e", 164, 308, 8);
      DrawText(firstPage.firstPage, "Col-9f", 186, 308, 8);
      DrawText(firstPage.firstPage, "Col-9g", 210, 308, 8);
      DrawText(firstPage.firstPage, "Col-9h", 235, 308, 8);
      DrawText(firstPage.firstPage, "Col-9i", 259, 308, 8);
      DrawText(firstPage.firstPage, "Col-9j", 288, 308, 8);
      DrawText(firstPage.firstPage, "Col-9k", 318, 308, 8);
      DrawText(firstPage.firstPage, "Col-9l", 349, 308, 8);
      DrawText(firstPage.firstPage, "Col-9m", 377, 308, 8);
      DrawText(firstPage.firstPage, "Col-9n", 406, 308, 8);

      DrawText(firstPage.firstPage, "Col-10", 37, 294, 8);
      DrawText(firstPage.firstPage, "Col-10a", 66, 294, 8);
      DrawText(firstPage.firstPage, "Col-10b", 85, 294, 8);
      DrawText(firstPage.firstPage, "Col-10c", 104, 294, 8);
      DrawText(firstPage.firstPage, "Col-10d", 138, 294, 8);
      DrawText(firstPage.firstPage, "Col-10e", 164, 294, 8);
      DrawText(firstPage.firstPage, "Col-10f", 186, 294, 8);
      DrawText(firstPage.firstPage, "Col-10g", 210, 294, 8);
      DrawText(firstPage.firstPage, "Col-10h", 235, 294, 8);
      DrawText(firstPage.firstPage, "Col-10i", 259, 294, 8);
      DrawText(firstPage.firstPage, "Col-10j", 288, 294, 8);
      DrawText(firstPage.firstPage, "Col-10k", 318, 294, 8);
      DrawText(firstPage.firstPage, "Col-10l", 349, 294, 8);
      DrawText(firstPage.firstPage, "Col-10m", 377, 294, 8);
      DrawText(firstPage.firstPage, "Col-10n", 406, 294, 8);

      DrawText(firstPage.firstPage, "Col-11", 37, 280, 8);
      DrawText(firstPage.firstPage, "Col-11a", 66, 280, 8);
      DrawText(firstPage.firstPage, "Col-11b", 85, 280, 8);
      DrawText(firstPage.firstPage, "Col-11c", 104, 280, 8);
      DrawText(firstPage.firstPage, "Col-11d", 138, 280, 8);
      DrawText(firstPage.firstPage, "Col-11e", 164, 280, 8);
      DrawText(firstPage.firstPage, "Col-11f", 186, 280, 8);
      DrawText(firstPage.firstPage, "Col-11g", 210, 280, 8);
      DrawText(firstPage.firstPage, "Col-11h", 235, 280, 8);
      DrawText(firstPage.firstPage, "Col-11i", 259, 280, 8);
      DrawText(firstPage.firstPage, "Col-11j", 288, 280, 8);
      DrawText(firstPage.firstPage, "Col-11k", 318, 280, 8);
      DrawText(firstPage.firstPage, "Col-11l", 349, 280, 8);
      DrawText(firstPage.firstPage, "Col-11m", 377, 280, 8);
      DrawText(firstPage.firstPage, "Col-11n", 406, 280, 8);

      DrawText(firstPage.firstPage, "Col-12", 37, 265, 8);
      DrawText(firstPage.firstPage, "Col-12a", 66, 265, 8);
      DrawText(firstPage.firstPage, "Col-12b", 85, 265, 8);
      DrawText(firstPage.firstPage, "Col-12c", 104, 265, 8);
      DrawText(firstPage.firstPage, "Col-12d", 138, 265, 8);
      DrawText(firstPage.firstPage, "Col-12e", 164, 265, 8);
      DrawText(firstPage.firstPage, "Col-12f", 186, 265, 8);
      DrawText(firstPage.firstPage, "Col-12g", 210, 265, 8);
      DrawText(firstPage.firstPage, "Col-12h", 235, 265, 8);
      DrawText(firstPage.firstPage, "Col-12i", 259, 265, 8);
      DrawText(firstPage.firstPage, "Col-12j", 288, 265, 8);
      DrawText(firstPage.firstPage, "Col-12k", 318, 265, 8);
      DrawText(firstPage.firstPage, "Col-12l", 349, 265, 8);
      DrawText(firstPage.firstPage, "Col-12m", 377, 265, 8);
      DrawText(firstPage.firstPage, "Col-12n", 406, 265, 8);

      DrawText(firstPage.firstPage, "Col-13", 37, 250, 8);
      DrawText(firstPage.firstPage, "Col-13a", 66, 250, 8);
      DrawText(firstPage.firstPage, "Col-13b", 85, 250, 8);
      DrawText(firstPage.firstPage, "Col-13c", 104, 250, 8);
      DrawText(firstPage.firstPage, "Col-13d", 138, 250, 8);
      DrawText(firstPage.firstPage, "Col-13e", 164, 250, 8);
      DrawText(firstPage.firstPage, "Col-13f", 186, 250, 8);
      DrawText(firstPage.firstPage, "Col-13g", 210, 250, 8);
      DrawText(firstPage.firstPage, "Col-13h", 235, 250, 8);
      DrawText(firstPage.firstPage, "Col-13i", 259, 250, 8);
      DrawText(firstPage.firstPage, "Col-13j", 288, 250, 8);
      DrawText(firstPage.firstPage, "Col-13k", 318, 250, 8);
      DrawText(firstPage.firstPage, "Col-13l", 349, 250, 8);
      DrawText(firstPage.firstPage, "Col-13m", 377, 250, 8);
      DrawText(firstPage.firstPage, "Col-13n", 406, 250, 8);

      DrawText(firstPage.firstPage, "Col-14", 37, 238, 8);
      DrawText(firstPage.firstPage, "Col-14a", 66, 238, 8);
      DrawText(firstPage.firstPage, "Col-14b", 85, 238, 8);
      DrawText(firstPage.firstPage, "Col-14c", 104, 238, 8);
      DrawText(firstPage.firstPage, "Col-14d", 138, 238, 8);
      DrawText(firstPage.firstPage, "Col-14e", 164, 238, 8);
      DrawText(firstPage.firstPage, "Col-14f", 186, 238, 8);
      DrawText(firstPage.firstPage, "Col-14g", 210, 238, 8);
      DrawText(firstPage.firstPage, "Col-14h", 235, 238, 8);
      DrawText(firstPage.firstPage, "Col-14i", 259, 238, 8);
      DrawText(firstPage.firstPage, "Col-14j", 288, 238, 8);
      DrawText(firstPage.firstPage, "Col-14k", 318, 238, 8);
      DrawText(firstPage.firstPage, "Col-14l", 349, 238, 8);
      DrawText(firstPage.firstPage, "Col-14m", 377, 238, 8);
      DrawText(firstPage.firstPage, "Col-14n", 406, 238, 8);

      DrawText(firstPage.firstPage, "Col-15", 37, 223, 8);
      DrawText(firstPage.firstPage, "Col-15a", 66, 223, 8);
      DrawText(firstPage.firstPage, "Col-15b", 85, 223, 8);
      DrawText(firstPage.firstPage, "Col-15c", 104, 223, 8);
      DrawText(firstPage.firstPage, "Col-15d", 138, 223, 8);
      DrawText(firstPage.firstPage, "Col-15e", 164, 223, 8);
      DrawText(firstPage.firstPage, "Col-15f", 186, 223, 8);
      DrawText(firstPage.firstPage, "Col-15g", 210, 223, 8);
      DrawText(firstPage.firstPage, "Col-15h", 235, 223, 8);
      DrawText(firstPage.firstPage, "Col-15i", 259, 223, 8);
      DrawText(firstPage.firstPage, "Col-15j", 288, 223, 8);
      DrawText(firstPage.firstPage, "Col-15k", 318, 223, 8);
      DrawText(firstPage.firstPage, "Col-15l", 349, 223, 8);
      DrawText(firstPage.firstPage, "Col-15m", 377, 223, 8);
      DrawText(firstPage.firstPage, "Col-15n", 406, 223, 8);
      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file10") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-15.pdf"
      );
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, "Husband name,", 123, 648, 8);
      DrawText(firstPage.firstPage, "Women name", 267, 648, 8);
      DrawText(firstPage.firstPage, "Sperm/octyte", 98, 635, 8);
      DrawText(firstPage.firstPage, "Name&address,", 141, 607, 8);
      DrawText(firstPage.firstPage, "Sperm/octyte", 101, 565, 8);

      DrawText(firstPage.firstPage, "Wife", 259, 468, 8);
      DrawText(firstPage.firstPage, "Husband sign", 129, 424, 8);
      DrawText(firstPage.firstPage, "10-08-2004", 364, 424, 8);

      DrawText(firstPage.firstPage, "Husband", 280, 320, 8);
      DrawText(firstPage.firstPage, "Wife sign", 129, 255, 8);
      DrawText(firstPage.firstPage, "10-08-2004", 364, 255, 8);
      await respond(firstPage.pdfDoc);
    } else if (req.body.fileName == "file11") {
      const pdfPath = path.join(
        __dirname,
        "../views/Concent/pdf",
        "form-16.pdf"
      );
      let firstPage = await getPath(pdfPath);
      DrawText(firstPage.firstPage, "Minor name,", 104, 580, 8);
      DrawText(firstPage.firstPage, "Sperm/octyte", 396, 580, 8);
      DrawText(firstPage.firstPage, "Name&address", 148, 540, 8);
      DrawText(firstPage.firstPage, "Sperm", 481, 513, 8);

      DrawText(firstPage.firstPage, "Minor sign", 128, 420, 8);
      DrawText(firstPage.firstPage, "10-08-2004", 363, 420, 8);

      DrawText(firstPage.firstPage, "Parent sign", 128, 272, 8);
      DrawText(firstPage.firstPage, "10-08-2004", 363, 272, 8);
      await respond(firstPage.pdfDoc);
    }

    async function respond(pdfDoc) {
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync("./filled-consent-form.pdf", pdfBytes);
      // const file = path.join(__dirname, "./filled-consent-form.pdf");
      // res.status(200).json({
      //   success: true,
      //   message: "PDF filled and saved successfully.",
      //   data: file,
      // });
      // return;
      // const filePath = path.join(__dirname, "./filled-consent-form.pdf"); // Path to the PDF file

      // Read the file and encode it in Base64
      const data = fs.readFileSync("./filled-consent-form.pdf");
      const base64Data = data.toString("base64");
      res.status(200).json({
        success: true,
        message: "PDF filled and saved successfully.",
        // filename: "sample.pdf",
        data: base64Data,
        // fileType: "application/pdf",
      });
    }

    async function getPath(pdfPath) {
      const existingPdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      return { firstPage, pdfDoc };
    }
    // const existingPdfBytes = fs.readFileSync('../concent/consent-art-rules-2022-36.pdf');

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

router.put("/updateSemenSample", async (req, res) => {
  try {
    console.log(`API called`);
    const { id, Storage } = req.query; // Extract 'id' and 'Storage' from the query params

    console.log(`ID:`, id);
    console.log(`New Storage:`, Storage);

    // Check if both 'id' and 'Storage' are provided
    if (!id || !Storage) {
      return res
        .status(400)
        .json({ message: "'id' and 'Storage' are required" });
    }

    // Find the record by ID
    const record = await SemenSample.findByPk(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Get the current 'Storage' value
    let currentStorage = record.Storage || "";

    console.log(`Current Storage:`, currentStorage);

    // Remove existing Tank and Canister values using regex
    const updatedStorage = currentStorage
      .replace(/Tank:\s*[^,]+,?\s*/i, "") // Remove old "Tank" value
      .replace(/Canister:\s*[^,]+,?\s*/i, "") // Remove old "Canister" value
      .trim();

    // Append the new "Tank" and "Canister" values
    const finalStorage = `${
      updatedStorage ? updatedStorage + ", " : ""
    }${Storage}`;

    // Update the 'Storage' field with the new Tank and Canister
    await record.update({ Storage: finalStorage });

    return res
      .status(200)
      .json({ message: "Storage field updated successfully", data: record });
  } catch (error) {
    console.error("Error updating record:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// API to fetch patient and spouse details using ID from query parameters
router.get("/patientAllDetails", async (req, res) => {
  try {
    console.log(`PatientAllDetails API`, req.query);

    // Get patientId from session
    const id = req.session.patientId;
    console.log('inside patient details', id);

    // Check if id is present in session
    if (!id) {
      console.log('Patient ID not found in session, redirecting...');
      // res.redirect("/200");
    }

    // Fetch the required fields from the database using the ID
    const patient = await PR_patientReg.findOne({
      attributes: [
        "mr_no",
        "height",
        "weight",
        "bmi",
        "coupleId",
        "ReferralDetails",
        "age_days",
        "age_months",
        "age_years",
        "bloodGroup",
        "firstName",
        "Gender",
        "lastName",
        "middleName",
        "mobileNo",
        "spouse_age_day",
        "spouse_age_month",
        "spouse_age_year",
        "spouse_firstName",
        "spouse_gender",
        "spouse_lastName",
        "spouse_middleName",
        "spouse_mobile_1",
      ],
      where: { id },
    });

    // If no patient found with the given ID, redirect
    if (!patient) {
      console.log('Patient not found, redirecting...');
      return res.redirect('http://localhost:5000/findpatient/6'); // Redirect if patient is not found
    }

    // If patient is found, return patient data
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    
    res.status(500).json({ error: "An error occurred while fetching patient data" });
  }
});


router.get('/check',async (req,res)=>{
  try {
    // const patientId = req.session.patientID;
    const data = await PatientCounseling.findOne({where:{patientId:req.session.patientId}});
    if(data){
      res.send({'check':true})
    } else{
      res.send({'check':false});
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/getTriggerData',async (req,res)=>{
  try {
    console.log('start');
    console.log(req.session.cycleId)
    const data = await StimulationSubmit.findOne({where:{cycleId: req.session.cycle_id},attributes:['firstTrigger']});
    console.log(data); 
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({'error':error})
  }
})

// Route to fetch all records from PR_patientReg

module.exports = router;

// overview route 44
