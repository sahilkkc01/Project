var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdf-lib')
const { error } = require('pdf-lib');
const { PR_patientReg } = require('../models/concentModel');
const { getAllConcents } = require('../controllers/packageConfig');
/* GET users listing. */

router.get('/32', (req, res) => {

    res.render('Concent/concent')
})

router.get('/concent', (req, res) => {
    console.log("Helloi");
    res.render('Concent/concent')
})

router.post('/print-concent', async (req, res) => {
    try {
        const { patientReg } = req.body;
        console.log(req.body);
        const findPatient = await PR_patientReg.findOne({ where: { mr_no: patientReg } })

        if (req.body.fileName == 'file1') {
            const pdfPath = path.join(__dirname, '../concent/pdf', 'form-6.pdf');
            let firstPage = await getPath(pdfPath)

            DrawText(firstPage.firstPage, findPatient.AgencyName, 275, 722, 8)
            DrawText(firstPage.firstPage, findPatient.address, 75, 710, 8)

            await respond(firstPage.pdfDoc)

        } else if (req.body.fileName == 'form-7') {
            const pdfPath = path.join(__dirname, '../concent/pdf', 'form-7.pdf');
            let firstPage = await getPath(pdfPath)
            DrawText(firstPage.firstPage, findPatient.AgencyName, 345, 756, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 120, 744, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 105, 619, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 80, 527, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 405, 527, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 80, 505, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 210, 310, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 318, 310, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 110, 77, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 125, 64, 9);
            await respond(firstPage.pdfDoc)


        } else if (req.body.fileName == 'form-1') {
            const pdfPath = path.join(__dirname, '../concent/pdf', 'form-1.pdf');
            let firstPage = await getPath(pdfPath)
            DrawText(firstPage.firstPage, findPatient.address, 175, 475, 8)
            DrawText(firstPage.firstPage, findPatient.address, 175, 458, 8)
            DrawText(firstPage.firstPage, findPatient.address, 85, 442, 8)
            DrawText(firstPage.firstPage, findPatient.address, 215, 442, 8)

            let code = findPatient.pin_code.toString()
            console.log(code);
            let x = 455;
            code.split('').forEach(pCd => {
                DrawText(firstPage.firstPage, pCd, x, 437, 13)
                x = x + 14
            });
            DrawText(firstPage.firstPage, findPatient.address, 215, 320, 8);


            let date = findPatient.pin_code.toString()
            console.log(date);
            let xx = 423;
            date.split('').forEach(pCd => {
                DrawText(firstPage.firstPage, pCd, xx, 296, 13);
                xx = xx + 15
            });
            DrawText(firstPage.firstPage, findPatient.address, 155, 188, 8);
            DrawText(firstPage.firstPage, findPatient.address, 168, 170, 8);
            DrawText(firstPage.firstPage, findPatient.address, 230, 153, 8);

            await respond(firstPage.pdfDoc)
        } else if (req.body.fileName == 'form-5') {
            const pdfPath = path.join(__dirname, '../concent/pdf', 'form-5.pdf');
            let firstPage = await getPath(pdfPath)
            DrawText(firstPage.firstPage, findPatient.AgencyName, 150, 668, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 135, 650, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 135, 632, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 90, 615, 9);
            DrawText(firstPage.firstPage, findPatient.pin_code, 335, 615, 9);
            DrawText(firstPage.firstPage, findPatient.mobile_1, 135, 597, 9);
            DrawText(firstPage.firstPage, findPatient.email, 315, 597, 9);
            DrawText(firstPage.firstPage, findPatient.spouse_dob, 200, 528, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 185, 493, 9);
            DrawText(firstPage.firstPage, findPatient.spouse_mobile_2, 210, 475, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 155, 457, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 130, 440, 9);

            DrawText(firstPage.firstPage, findPatient.AgencyName, 210, 352, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 135, 338, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 135, 318, 9);
            DrawText(firstPage.firstPage, findPatient.AgencyName, 90, 300, 9);
            DrawText(firstPage.firstPage, findPatient.pin_code, 365, 300, 9);
            DrawText(firstPage.firstPage, findPatient.mobile_1, 135, 283, 9);
            DrawText(firstPage.firstPage, findPatient.email, 345, 283, 9);

            await respond(firstPage.pdfDoc)
        } else if (req.body.fileName == 'form-12') {
            const pdfPath = path.join(__dirname, '../concent/pdf', 'form-12.pdf');
            let firstPage = await getPath(pdfPath)
            DrawText(firstPage.firstPage, findPatient.address, 210, 620, 8)
            DrawText(firstPage.firstPage, findPatient.address, 220, 390, 8)
            DrawText(firstPage.firstPage, findPatient.address, 315, 390, 8)


            await respond(firstPage.pdfDoc)
        }
        async function respond(pdfDoc) {
            const pdfBytes = await pdfDoc.save();
            fs.writeFileSync('./filled-consent-form.pdf', pdfBytes);
            res.status(200).json({
                success: true,
                message: 'PDF filled and saved successfully.'
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
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }

})


router.post('/form-6', async (req, res) => {
    const { clinicName, clinicAddress } = req.body;
    try {
        // Load the existing PDF
        const pdfPath = path.join(__dirname, '../concent/pdf', 'form-6.pdf');
        const existingPdfBytes = fs.readFileSync(pdfPath);
        // const existingPdfBytes = fs.readFileSync('../concent/consent-art-rules-2022-36.pdf');
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        // Get the form
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        firstPage.drawText(clinicName, {
            x: 275,
            y: 722,
            size: 8,
        });
        firstPage.drawText(clinicAddress, {
            x: 75,
            y: 710,
            size: 8,
        });
        // Save the PDF with the filled fields
        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync('./filled-consent-form.pdf', pdfBytes);

        res.send('PDF filled and saved successfully.');
    } catch (error) {
        console.error('Error filling PDF:', error);
        res.status(500).send('Error filling PDF.');
    }
});
router.post('/form-7', async (req, res) => {
    try {
        const { text1, text2, text3, text4, text5, text6, text7, text8, text9, text10 } = req.body;
        // Load the existing PDF
        const pdfPath = path.join(__dirname, '../concent/pdf', 'form-7.pdf')
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
        fs.writeFileSync('./filled-consent-form.pdf', pdfBytes);

        res.send('PDF filled and saved successfully.');
    } catch (error) {
        console.error('Error filling PDF:', error);
        res.status(500).send('Error filling PDF.');
    }
});


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;
