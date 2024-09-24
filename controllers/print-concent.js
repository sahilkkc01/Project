const { error, PDFDocument } = require("pdf-lib");
const path = require("path");
const fs = require("fs");
const { PR_patientReg, PR_BillFindPatient } = require("../models/plshBill");



const printConcent = async (req,res)=>{
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
            "ID",
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
    }
    
module.exports = {printConcent}