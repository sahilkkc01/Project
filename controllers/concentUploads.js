const { ConcentPateintUser } = require("../models/table_concent_User.js");
const multer = require("multer");
const path = require("path");
const { dirname } = require("path");

// Define the absolute path to the uploads folder
const uploadsDir = path.join(__dirname,'..', "Concent");
const fs = require("fs");

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log(`Created directory: ${uploadsDir}`);
    }
    cb(null, uploadsDir); // Use the absolute path
    console.log("hello file:",uploadsDir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Unique filename
  },
});

// Initialize multer with the storage engine
const upload2 = multer({ storage: storage });

const uploadConcent = async (req, res) => {
  // console.log("hellow worlod jai hind");

  try {
    // `req.file` contains information about the uploaded file
    console.log("File uploaded:", req.file);
    // res.status(200).json({
    //   message: "File uploaded successfully!",
    //   file: req.file,
    // });
    const file = req.file;
    const patientID = req.body.patientId;
    const userconcent = await ConcentPateintUser.create({
      patientID: patientID,
      form_name: file.filename,
      status: true,
    });
    res.status(200).json({
      message: "File uploaded successfully!",
      userconcent,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "An error occurred during file upload." });
  }
};

module.exports = { uploadConcent, upload2 };
