const {SuperAdmin}  =require('../models/Admin');
const md5 = require('md5');

const AdminSubmit = async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        // Parse rightsData if it exists
        const rightsData = req.body.rightsData ? JSON.parse(req.body.rightsData) : {};

        // Explicitly handle the Freeze checkbox
        req.body.Freeze = req.body.Freeze === 'on'; // This will be true if Freeze is checked, false otherwise

        // Hash the password using md5 before saving to database
        req.body.Password = md5(req.body.Password);

        const queryValue = req.body?.query;
        if (queryValue === '0') {
            const isExist = await SuperAdmin.findOne({ where: { username: req.body.username } });
            if (isExist) {
                return res.status(400).json({ msg: 'Username already exists.' });
            }
            const newTestCateg = await SuperAdmin.create({
                ...req.body,
                rights: rightsData
            });
            res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
        } else {
            const existing = await SuperAdmin.findOne({ where: { username: req.body.username } });
            if (!existing) {
                return res.status(404).json({ msg: 'Test category not found for the provided code.' });
            }
            await existing.update({
                ...req.body,
                rights: rightsData
            });
            res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
        }
    } catch (error) {
        console.error('Error in TestCategSubmit:', error);
        res.status(500).json({ msg: 'An error occurred while processing your request.' });
    }
}



    const getAdmin = async (req, res) => {
        console.log('sad')
        try {

          const details = await SuperAdmin.findAll();
          console.log(details)
          res.status(200).json(details);
        } catch (error) {
          console.error('Error fetching classification details:', error);
          res.status(500).json({ error: 'An error occurred while fetching classification details.' });
        }
      }; 

      module.exports={getAdmin,AdminSubmit}