

const { Testcateg, ParameterMastercateg, TubeMaster, TemplateMaster, SampleMaster, MachineMaster, MachineParameterMaster, MachineParameterLinking, Test } = require('../models/pathology');


var UserData = {
  clinic_id: "123",
  userId: "123",
  userName: "Lifelinker"
}

const TestcategSubmit = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    // Check if the 'query' field is present and handle accordingly
    const queryValue = req.body?.query;
    if (queryValue === '0') {
        // Handling creation of a new test category
        const isExist = await Testcateg.findOne({ where: { code: req.body.code } });
        if (isExist) {
            return res.status(400).json({ msg: 'Code already exists.' });
        }
        const newTestCateg = await Testcateg.create({
            UserId: req.body.UserId, // Assume UserId is being sent correctly from the client
            code: req.body.code,
            description: req.body.description
        });
        res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
    } else {
        // Handling update of an existing test category
        const existing = await Testcateg.findOne({ where: { code: req.body.code } });
        if (!existing) {
            return res.status(404).json({ msg: 'Test category not found for the provided code.' });
        }
        await existing.update(req.body);
        res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
    }
} catch (error) {
    console.error('Error in TestCategSubmit:', error);
    res.status(500).json({ msg: 'An error occurred while processing your request.' });
}
  }

  const getTestCateg = async (req, res) => {
    try {
      const details = await Testcateg.findAll();
      // console.log(details)
      res.status(200).json(details);
    } catch (error) {
      console.error('Error fetching classification details:', error);
      res.status(500).json({ error: 'An error occurred while fetching classification details.' });
    }
  };

  const ParameterCategSubmit = async (req, res) => {
    try {
      console.log("Received request body:", req.body);

      // Accessing the 'query' parameter directly from req.body
      const queryValue = req.body.query;
      if (queryValue === '0') {
          // Check if the parameter category code already exists before creating
          const isExist = await ParameterMastercateg.findOne({ where: { code: req.body.code } });
          if (isExist) {
              return res.status(400).json({ msg: 'Code already exists.' });
          }
          // Create a new parameter category
          const newParameter = await ParameterMastercateg.create({
              UserId: req.body.UserId,  // Assume UserId is being sent correctly from the client
              code: req.body.code,
              description: req.body.description
          });
          res.status(200).json({ msg: 'Parameter category saved successfully!', data: newParameter });
      } else {
          // Update existing parameter category
          const existing = await ParameterMastercateg.findOne({ where: { code: req.body.code } });
          if (!existing) {
              return res.status(404).json({ msg: 'Parameter category not found.' });
          }
          await existing.update(req.body);
          res.status(200).json({ msg: 'Parameter category updated successfully!', data: existing });
      }
  } catch (error) {
      console.error('Error in ParameterCategSubmit:', error);
      res.status(500).json({ msg: 'An error occurred while saving the parameter category.' });
  }
  }

  const getParameterCateg = async (req, res) => {
    try {
      const details = await ParameterMastercateg.findAll();
      // console.log(details)
      res.status(200).json(details);
    } catch (error) {
      console.error('Error fetching classification details:', error);
      res.status(500).json({ error: 'An error occurred while fetching classification details.' });
    }
  };
  const TubeMasterSubmit = async (req, res) => {
    try {
      const queryValue = req.body.query;
      if(queryValue==='0'){
      const isExist = await TubeMaster.findOne({ where: {code: req.body.code } });
      if (isExist) return res.status(400).send({ msg: 'Code already exists.' });
      await TubeMaster.create({
        UserId:UserData.userId,
       code:req.body.code,
       description:req.body.description
      });
      res.status(200).json({ msg: 'Form saved successfully!' });
    }
    else{
      const existing = await TubeMaster.findOne({ where: {code: req.body.code } });
      if (!existing) {
        return res.status(404).json({ msg: 'Parameter category not found.' });
    }
      await existing.update(req.body);
      return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
    }
    } catch (error) {
      res.status(500).json({ msg: 'An error occurred while saving Form' });
    }
  }

  const getTubeMaster = async (req, res) => {
    try {
      const details = await TubeMaster.findAll();
      // console.log(details)
      res.status(200).json(details);
    } catch (error) {
      console.error('Error fetching classification details:', error);
      res.status(500).json({ error: 'An error occurred while fetching classification details.' });
    }
  };
  const TemplateMasterSubmit = async (req, res) => {
    try {
      if (req.body.query === '0') {

      const isExist = await TemplateMaster.findOne({ where: {code: req.body.code } });
      if (isExist) {
        return res.status(400).json({ msg: 'Code already exists.' });
      }
      await TemplateMaster.create({...req.body,UserId:UserData.userId});
      res.status(200).json({ msg: 'Form saved successfully!' });
    }
    else{
      const existing = await TemplateMaster.findOne({ where: {code: req.body.code } });
      await existing.update(req.body);
      return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
    }
    } catch (error) {
      console.error('Error in TemplateMasterSubmit:', error);
      res.status(500).json({ msg: 'An error occurred while saving the form.' });
    }
  }
  

  const getTemplateMaster = async (req, res) => {
    try {
      const details = await TemplateMaster.findAll();
      // console.log(details)
      res.status(200).json(details);
    } catch (error) {
      console.error('Error fetching classification details:', error);
      res.status(500).json({ error: 'An error occurred while fetching classification details.' });
    }
  };

  const SampleMasterSubmit = async (req, res) => {
    try {
      if (req.body.query === '0') {
      const isExist = await SampleMaster.findOne({ where: {code: req.body.code } });
      if (isExist) {
        return res.status(400).json({ msg: 'Code already exists.' });
      }
      await SampleMaster.create({...req.body,UserId:UserData.userId});
      res.status(200).json({ msg: 'Form saved successfully!' });
    }
    else{
      const existing = await SampleMaster.findOne({ where: {code: req.body.code } });
      await existing.update(req.body);
      return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
    }
    } catch (error) {
      console.error('Error in TemplateMasterSubmit:', error);
      res.status(500).json({ msg: 'An error occurred while saving the form.' });
    }
  }
  

  const getSampleMaster = async (req, res) => {
    try {
      const details = await SampleMaster.findAll();
      // console.log(details)
      res.status(200).json(details);
    } catch (error) {
      console.error('Error fetching classification details:', error);
      res.status(500).json({ error: 'An error occurred while fetching classification details.' });
    }
  };

  
  const MachineMasterSubmit = async (req, res) => {
    try {
      if(req.body.query==="0"){
      const isExist = await MachineMaster.findOne({ where: {code: req.body.code } });
      if (isExist) {
        return res.status(400).json({ msg: 'Code already exists.' });
      }
      await MachineMaster.create({...req.body,UserId:UserData.userId});
      res.status(200).json({ msg: 'Form saved successfully!' });
    }
    else{
      const existing = await MachineMaster.findOne({ where: {code: req.body.code } });
      await existing.update(req.body);
      return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
    }
    } catch (error) {
      console.error('Error in TemplateMasterSubmit:', error);
      res.status(500).json({ msg: 'An error occurred while saving the form.' });
    }
  }
  

  const getMachineMaster = async (req, res) => {
    try {
      const details = await MachineMaster.findAll();
      // console.log(details)
      res.status(200).json(details);
    } catch (error) {
      console.error('Error fetching classification details:', error);
      res.status(500).json({ error: 'An error occurred while fetching classification details.' });
    }
  };

    
  const MachineParameterMasterSubmit = async (req, res) => {
    try {
      if(req.body.query==='0'){
      console.log(req.body)
      const isExist = await MachineParameterMaster.findOne({ where: {code: req.body.code } });
      if (isExist) {
        return res.status(400).json({ msg: 'Code already exists.' });
      }
      await MachineParameterMaster.create({...req.body,UserId:UserData.userId});
      res.status(200).json({ msg: 'Form saved successfully!' });
    }
      else{
        const existing = await MachineParameterMaster.findOne({ where: {code: req.body.code } });
        await existing.update(req.body);
        return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
      }
    } catch (error) {
      console.error('Error in TemplateMasterSubmit:', error);
      res.status(500).json({ msg: 'An error occurred while saving the form.' });
    }
  }
  

  const getMachineParameterMaster = async (req, res) => {
    try {
      const details = await MachineParameterMaster.findAll();
      // console.log(details)
      res.status(200).json(details);
    } catch (error) {
      console.error('Error fetching classification details:', error);
      res.status(500).json({ error: 'An error occurred while fetching classification details.' });
    }
  };

  const MachineParameterLinkingSubmit = async (req, res) => {
    try {
      if(req.body.query==='0'){
      console.log(req.body)
      await MachineParameterLinking.create({...req.body,UserId:UserData.userId});
      res.status(200).json({ msg: 'Form saved successfully!' });
      }
      else{
        const existing = await MachineParameterLinking.findOne({ where: {id: req.body.itemId } });
        await existing.update(req.body);
        return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
      }

    } catch (error) {
      console.error('Error in TemplateMasterSubmit:', error);
      res.status(500).json({ msg: 'An error occurred while saving the form.' });
    }
  }
  

  const getMachineParameterLinking = async (req, res) => {
    try {

      const details = await MachineParameterLinking.findAll();
      res.status(200).json(details);
    } catch (error) {
      console.error('Error fetching classification details:', error);
      res.status(500).json({ error: 'An error occurred while fetching classification details.' });
    }
  };

  const createTest = async (req, res) => {
    try {
      const { tests } = req.body;

      if(req.body.query==="0"){
        console.log("Request to create test:", req.body);
        // Extract `tests` array from the request body
       

        // Check if tests data is provided and not empty
        if (!tests || tests.length === 0) {
            return res.status(400).json({ msg: 'No tests data provided' });
        }

        // Process each test entry and create records in the database
        const results = await Promise.all(tests.map(test => {
            const { name, status } = test;
            return Test.create({
                name: name,
                status: status,
                UserId: UserData.userId // Corrected to use session data
            });
        }));

        res.status(200).json({ msg: 'All tests created successfully!', data: results });
      }
      else{
        const existing = await Test.findOne({ where: {id: req.body.itemId } });
        await existing.update(req.body);
        return res.status(200).json({ msg: 'Department details updated successfully!', data: existing });
      }
    } catch (error) {
        console.error('Error in createTest:', error);
        res.status(500).json({ msg: 'An error occurred while creating the tests.' });
    }
};

const getAllTests = async (req, res) => {
    try {
        const tests = await Test.findAll();
        res.status(200).json(tests);
    } catch (error) {
        console.error('Error fetching tests:', error);
        res.status(500).json({ error: 'An error occurred while fetching tests.' });
    }
};


module.exports={TestcategSubmit,getTestCateg,ParameterCategSubmit,getParameterCateg,TubeMasterSubmit,getTubeMaster,TemplateMasterSubmit,getTemplateMaster,getSampleMaster,SampleMasterSubmit,getMachineMaster,MachineMasterSubmit,MachineParameterMasterSubmit,getMachineParameterMaster,MachineParameterLinkingSubmit,getMachineParameterLinking,createTest,getAllTests}