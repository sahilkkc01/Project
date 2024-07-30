const { SourceL1, SourceL2, PatientSourceCharges, PatientRelation, ReferalName, SpecialRegistration, PrefixMaster, NationalityMaster, LanguageMaster, TreatmentReq, EducationDetails, CampMaster, VisitMaster, PatientConcent, AgentInfo } = require("../models/patientConfig");
const {sequelize} = require('../sequelize');

var UserData = {
    clinic_id: "123",
    userId: "123",
    userName: "Lifelinker"
  }



  async function fetchDataFromTable(tableName,field) {
    try {
        const query = `SELECT id, ${field} FROM ${tableName};`;
        const [results, metadata] = await sequelize.query(query);
        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;  // Ensure this thrown error is caught somewhere else
    }
}

async function fetchNameFromTable(field,tableName,id) {
  try {
      const query = `SELECT  ${field} FROM ${tableName} WHERE id=${id};`; // Fetches only id and serviceName
      const [results, metadata] = await sequelize.query(query);
      return results;  // Contains the rows from the services table
  } catch (error) {
      console.error('Error executing query:', error);
      throw error;
  }
}



  const SourcceL1Submit = async (req, res) => {
    try {
      console.log("Received request body:", req.body);
      // Check if the 'query' field is present and handle accordingly
      const queryValue = req.body?.query;
      if (queryValue === '0') {
          // Handling creation of a new test category
          const isExist = await SourceL1.findOne({ where: { code: req.body.code } });
          if (isExist) {
              return res.status(400).json({ msg: 'Code already exists.' });
          }
          const newTestCateg = await SourceL1.create({
              UserId: UserData.userId, // Assume UserId is being sent correctly from the client
              code: req.body.code,
              description: req.body.description
          });
          res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
      } else {
          // Handling update of an existing test category
          const existing = await SourceL1.findOne({ where: { code: req.body.code } });
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

    const getSourceL1 = async (req, res) => {
        try {

          const details = await SourceL1.findAll();
          // console.log(details)
          res.status(200).json(details);
        } catch (error) {
          console.error('Error fetching classification details:', error);
          res.status(500).json({ error: 'An error occurred while fetching classification details.' });
        }
      };  


      const SourcceL2Submit = async (req, res) => {
        try {
          console.log("Received request body:", req.body);
          // Check if the 'query' field is present and handle accordingly
          const queryValue = req.body?.query;
          if (queryValue === '0') {
              // Handling creation of a new test category
              const isExist = await SourceL2.findOne({ where: { code: req.body.code } });
              if (isExist) {
                  return res.status(400).json({ msg: 'Code already exists.' });
              }
              const newTestCateg = await SourceL2.create({...req.body,
                  UserId: UserData.userId
              });
              res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
          } else {
              // Handling update of an existing test category
              const existing = await SourceL2.findOne({ where: { code: req.body.code } });
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
  
      const getSourceL2 = async (req, res) => {
        try {
          const details = await SourceL2.findAll();
          // console.log(details)
          res.status(200).json(details);
        } catch (error) {
          console.error('Error fetching classification details:', error);
          res.status(500).json({ error: 'An error occurred while fetching classification details.' });
        }
      };  
  
      const PatientChargesSubmit = async (req, res) => {
        try {
          console.log("Received request body:", req.body);
          // Check if the 'query' field is present and handle accordingly
          const queryValue = req.body?.query;
          if (queryValue === '0') {
              // Handling creation of a new test category
              const isExist = await PatientSourceCharges.findOne({ where: { patientType: req.body.patientType } });
              if (isExist) {
                  return res.status(400).json({ msg: 'Code already exists.' });
              }
              const newTestCateg = await PatientSourceCharges.create({...req.body,
                  UserId: UserData.userId
              });
              res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
          } else {
              // Handling update of an existing test category
              const existing = await PatientSourceCharges.findOne({ where: { patientType: req.body.patientType } });
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

        const getPatientCharges = async (req, res) => {
          try {
            const details = await PatientSourceCharges.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };  


        const PatientRelationSubmit = async (req, res) => {
          try {
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await PatientRelation.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await PatientRelation.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await PatientRelation.findOne({ where: { code: req.body.code } });
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
    
        const getPatientRelation = async (req, res) => {
          try {
            const details = await PatientRelation.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };  

        
        const ReferalNameSubmit = async (req, res) => {
          try {
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await ReferalName.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await ReferalName.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await ReferalName.findOne({ where: { code: req.body.code } });
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
    
        const getReferalName = async (req, res) => {
          try {
            const details = await ReferalName.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };  

        const SpecialRegSubmit = async (req, res) => {
          try {
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await SpecialRegistration.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await SpecialRegistration.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await SpecialRegistration.findOne({ where: { code: req.body.code } });
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
    
        const getSpecialReg = async (req, res) => {
          try {
            const details = await SpecialRegistration.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };  
        const PrefixSubmit = async (req, res) => {
          try {
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await PrefixMaster.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await PrefixMaster.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await PrefixMaster.findOne({ where: { code: req.body.code } });
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
    
        const getPrefix = async (req, res) => {
          try {
            const details = await PrefixMaster.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };  
        const NationalityMasterSubmit = async (req, res) => {
          try {
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await NationalityMaster.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await NationalityMaster.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await NationalityMaster.findOne({ where: { code: req.body.code } });
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
    
        const getNationalityMaster = async (req, res) => {
          try {
            const details = await NationalityMaster.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };  

        const LanguageMasterSubmit = async (req, res) => {
          try {
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await LanguageMaster.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await LanguageMaster.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await LanguageMaster.findOne({ where: { code: req.body.code } });
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
    
        const getLanguageMaster = async (req, res) => {
          try {
            const details = await LanguageMaster.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };  

        const TreatmentReqSubmit = async (req, res) => {
          try {
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await TreatmentReq.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await TreatmentReq.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await TreatmentReq.findOne({ where: { code: req.body.code } });
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
    
        const getTreatmentReq = async (req, res) => {
          try {
            const details = await TreatmentReq.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };  
        const EducationDetailsSubmit = async (req, res) => {
          try {
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await EducationDetails.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await EducationDetails.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await EducationDetails.findOne({ where: { code: req.body.code } });
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
    
        const getEducationDetails = async (req, res) => {
          try {
            const details = await EducationDetails.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };

        const CampMasterSubmit = async (req, res) => {
          try {
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await CampMaster.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await CampMaster.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await CampMaster.findOne({ where: { code: req.body.code } });
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
    
        const getCampMaster = async (req, res) => {
          try {
            const details = await CampMaster.findAll();
            // console.log(details)
            res.status(200).json(details);
          } catch (error) {
            console.error('Error fetching classification details:', error);
            res.status(500).json({ error: 'An error occurred while fetching classification details.' });
          }
        };

        const VisitMasterSubmit = async (req, res) => {
          try {
            console.log(9);
            
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await VisitMaster.findOne({ where: { code: req.body.code } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await VisitMaster.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await VisitMaster.findOne({ where: { code: req.body.code } });
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
  
          const getVisitMaster= async (req, res) => {
            try {
              const details = await VisitMaster.findAll();
              // console.log(details)
              res.status(200).json(details);
            } catch (error) {
              console.error('Error fetching classification details:', error);
              res.status(500).json({ error: 'An error occurred while fetching classification details.' });
            }
          };  
          
        const AgentMasterSubmit = async (req, res) => {
          try {
            console.log(9);
            
            console.log("Received request body:", req.body);
            // Check if the 'query' field is present and handle accordingly
            const queryValue = req.body?.query;
            
            if (queryValue === '0') {
                // Handling creation of a new test category
                const isExist = await AgentInfo.findOne({ where: { artRegNo: req.body.artRegNo } });
                if (isExist) {
                    return res.status(400).json({ msg: 'Code already exists.' });
                }
                const newTestCateg = await AgentInfo.create({...req.body,
                    UserId: UserData.userId
                });
                res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
            } else {
                // Handling update of an existing test category
                const existing = await AgentInfo.findOne({ where: { artRegNo: req.body.artRegNo } });
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
  
          const getAgentMaster= async (req, res) => {
            try {
              const details = await AgentInfo.findAll();
              // console.log(details)
              res.status(200).json(details);
            } catch (error) {
              console.error('Error fetching classification details:', error);
              res.status(500).json({ error: 'An error occurred while fetching classification details.' });
            }
          };  

          const PatientConcentSubmit = async (req, res) => {
            try {
                console.log("Received request body:", req.body);
                const queryValue = req.body.query;
        
                if (queryValue === '0') {
                    const isExist = await PatientConcent.findOne({ where: { code: req.body.code } });
                    if (isExist) {
                        return res.status(400).json({ msg: 'Code already exists.' });
                    }
                    const newTestCateg = await PatientConcent.create({
                        ...req.body,
                        UserId: UserData.userId
                    });
                    
                    res.status(200).json({ msg: 'Form saved successfully!', data: newTestCateg });
                } else {
                    const existing = await PatientConcent.findOne({ where: { code: req.body.code } });
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
        };
        
          
          const getPatientConcent = async (req, res) => {
            try {
              const details = await PatientConcent.findAll();
              res.status(200).json(details);
            } catch (error) {
              console.error('Error fetching classification details:', error);
              res.status(500).json({ error: 'An error occurred while fetching classification details.' });
            }
          };
          
      
module.exports={SourcceL1Submit,getSourceL1,getSourceL2,SourcceL2Submit,PatientChargesSubmit,getPatientCharges,fetchDataFromTable,fetchNameFromTable,getPatientRelation,PatientRelationSubmit,getReferalName,ReferalNameSubmit,getSpecialReg,SpecialRegSubmit,PrefixSubmit,getPrefix,getNationalityMaster,NationalityMasterSubmit,LanguageMasterSubmit,getLanguageMaster,TreatmentReqSubmit,getTreatmentReq,EducationDetailsSubmit,getEducationDetails,CampMasterSubmit,getCampMaster,getVisitMaster,VisitMasterSubmit,getPatientConcent,PatientConcentSubmit,getAgentMaster,AgentMasterSubmit}    