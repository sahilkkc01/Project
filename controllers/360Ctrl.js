const { CrmConv_record, KYC, CrmApt_record } = require("../models/Kyc");

getPatientByUHID = async (req, res) => {
    const { uhid } = req.params; // Extract the UHID from the request parameters

    try {
        // Find the KYC record in the CrmConv_record collection based on the UHID
        const crmRecord = await CrmConv_record.findOne({ uhid });

        if (crmRecord) {
            const kycId = crmRecord.kyc_id;

            // Now use the fetched kyc_id to find the corresponding KYC details
            const kycDetails = await KYC.findOne({ _id: kycId });
            const AptDetails = await CrmApt_record.findAll({ _id: kycId });

            if (kycDetails) {
                // If KYC details are found, send them as a JSON response
                res.status(200).json({kycDetails,crmRecord,AptDetails});
            } else {
                // If no KYC details are found, send a 404 response with a message
                res.status(404).json({ message: 'KYC details not found' });
            }
        } else {
            // If no CRM record is found, send a 404 response with a message
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        // If there is an error during the query, send a 500 response with the error message
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports={getPatientByUHID}