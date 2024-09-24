const CryptoJS = require("crypto-js");
const {Op,Sequelize, DATE}= require('sequelize');

const {
  expensedetails,
  Advance,
  CompanyRefund,
  concent,
  PR_patientReg,
  ServiceMasterSchema,
  PatientRefund,
  PR_BillFindPatient,
  CompanyAdvance,
  BillServiceApproval,
  PatientAssignPackage,
} = require("../models/plshBill");
const { BillServices } = require("../models/PatientReg");

let dataId = {};
const setId = async (req, res) => {
  try {
    const id = req.body.id;
    dataId = id;
    res.status(200).json({ message: "id set" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

function encryptDataForUrl(data) {
  console.log("Satya");
  const secretKey = "ll"; // Replace with your actual secret key
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  const encodedEncrypted = encodeURIComponent(encrypted);
  return encodedEncrypted;
}

function decryptData(encryptedData, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const saveStatusData = async (req, res) => {
  try {
    console.log(req.body);
    const { id, isChecked, schema: encryptedSchema, field } = req.body;
    const secretKey = "ll"; // Replace with your actual secret key
    // isChecked
    // Decrypt id and schema
    const Schema = decryptData(decodeURIComponent(encryptedSchema), secretKey); // URL decode

    console.log("Decrypted id:", id);
    console.log("Decrypted schema:", Schema);
    console.log("isChecked", "fields", field);

    // Use decrypted id and schema to fetch data from the model
    const Model = require("../model/plshBill")[Schema];

    const data = await Model.findByPk(id);

    if (data) {
      if (field == "status") {
        console.log("SAtya");
        data.staus = isChecked;
        console.log(data.staus);
      } else {
        console.log(isChecked);
        data.isFreezeExpenses = isChecked;
      }
      // Update status and save
      const response = await data.save();
      console.log(response);
      res.sendStatus(200);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error("Error updating status:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const newExpenses = async (req, res) => {
  try {
    const voucherNo = req.body.voucherNo;
    const isExist = await expensedetails.findOne({
      where: { voucherNo: voucherNo },
    });
    if (isExist) {
      res.status(500).json({
        message: "Voucher No already exist",
        status: false,
      });
    } else {
      await expensedetails.create(req.body);
      res.status(200).json({
        status: true,
        message: "Expense Added Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loadExpenses = async (req, res) => {
  const ExpId = req.query.id;
  console.log(ExpId);
  let result = "";
  if (ExpId) {
    try {
      result = await expensedetails.findOne({ where: { id: ExpId } });
      console.log(result);
      const currentDate = new Date().toISOString().split("T")[0];
      res.render("plshBilling/expenses-new", { currentDate, result });
    } catch (error) {
      console.error("Error fetching department data:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.render("plshBilling/expenses-new", { result: result });
  }
};

const getExpenses = async (req, res) => {
  try {
    const result = await expensedetails.findAll();
    const schema = "expensedetails";
    const Encschema = encryptDataForUrl(schema.toString());
    console.log("hdshfjvfsffjsh", Encschema);
    res.status(200).json({ result, Encschema });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const result = await Advance.findAll();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const newCompanyAdvance = async (req, res) => {
  try {
    console.log(req.body);
    const Id = req.session.rowId;

    // Concatenate the bankName fields
    const bankNames = [req.body.bankName1, req.body.bankName2, req.body.bankName3, req.body.bankName4, req.body.bankName5]
      .filter(Boolean) // Remove undefined or empty values
      .join(', '); // Combine them into a single string with commas

    // Concatenate the bankDetails fields
    const bankDetails = [req.body.bankDetails1, req.body.bankDetails2, req.body.bankDetails3, req.body.bankDetails4]
      .filter(Boolean) // Remove undefined or empty values
      .join(', '); // Combine them into a single string with commas

    // Concatenate the defaultBankAccount fields
    const defaultBankAccounts = [req.body.defaultBankAccount1, req.body.defaultBankAccount2, req.body.defaultBankAccount3, req.body.defaultBankAccount4, req.body.defaultBankAccount5, req.body.defaultBankAccount6]
      .filter(Boolean) // Remove undefined or empty values
      .join(', '); // Combine them into a single string with commas

    // Concatenate the referenceNo fields
    const referenceNos = [req.body.referenceNo1, req.body.referenceNo2, req.body.referenceNo3]
      .filter(Boolean) // Remove undefined or empty values
      .join(', '); // Combine them into a single string with commas

    // Concatenate the referenceDate fields
    const referenceDates = [req.body.referenceDate1, req.body.referenceDate2]
      .filter(Boolean) // Remove undefined or empty values
      .map(date => new Date(date).toISOString().split('T')[0]) // Normalize dates
      .join(', '); // Combine them into a single string with commas

    // Create the company advance entry 
    const advanceEntry = await CompanyAdvance.create({
      ...req.body, // Spread other properties from req.body
      date: new Date().toISOString().split('T')[0], // Use today's date as the advance date
      patient_id: Id, // Use the patient_id from the session
      bankName: bankNames,
      bankDetails: bankDetails,
      defaultBankAccount: defaultBankAccounts,
      referenceNo: referenceNos,
      referenceDate: referenceDates,
      balance_amount: req.body.amount, // Ensure balance_amount is set to the provided amount
    });

    // Update the rec_no field with the generated id and prefix
    const recNo = `COMP_REC${advanceEntry.id}`;
    await advanceEntry.update({
      rec_no: recNo,
    });

    res.status(200).json({
      success: true,
      message: "Company Advance Added Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getCompanyAdvance = async (req, res) => {
  try {
    const patientId = req.session.rowId;
    console.log("Fetching Advances for Patient ID:", patientId);

    const Advances = await CompanyAdvance.findAll({
      where: {
        patient_id: patientId,
      },
    });

    res.status(200).json({
      Advances
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching patient advances: " + error.message,
    });
  }
};


const getAdvance = async (req, res) => {
  try {
    console.log(req.session);
    const Id = req.session.rowId;
    console.log(Id);
    const result = await Advance.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const newCompRefund = async (req, res) => {
  try {
    const Id = req.session.rowId;
    console.log(req.session.rowId);
    console.log(req.body)

    // Create a new refund entry in the CompanyRefund model
    const refund = await CompanyRefund.create({
      patient_id: Id,
      refund_date: new Date().toISOString().split('T')[0],  // Extract only the date part
      Adv_recipt_no: req.body.adv_rec_no,
      remarks: req.body.remarks,
      advanceAvailable: req.body.advanceAvailable,
      totalRefund: req.body.totalRefund,
      advanceConsumed: req.body.advanceConsumed,
      totalAdvance: req.body.totalAdvance,
      refundAmount: req.body.refundAmount,
    });

    // Generate and update the rec_no field with the generated id and prefix
    const recNo = `COMP_REF${refund.id}`;
    await refund.update({
      rec_no: recNo,
    });

    res.status(200).json({
      success: true,
      message: "Company Refund Added Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




async function storeDataInDb() {
  const dummyPatients = [
    {
      mr_no: "MR001",
      AgencyName: "Agency A",
      Agent: "Agent A",
      ReferralDetails: "Referral A",
      RegistrationType: "Type A",
      SorOfRef: "Source A",
      address: "Address A",
      age_days: "10",
      age_months: "2",
      age_years: "30",
      altMobileNo: "1234567890",
      area: "Area A",
      bloodGroup: "A+",
      camp: "Camp A",
      city: "City A",
      clinic_status: "Active",
      company_name: "Company A",
      country: "Country A",
      date: "2023-01-01",
      dob: "1993-01-01",
      education: "Education A",
      email: "email@example.com",
      familyName: "Family A",
      fatherName: "Father A",
      firstName: "First A",
      id_proof_number: "ID12345",
      id_proof_type: "Passport",
      inHouseDoctor: "Doctor A",
      is_vip: "No",
      is_employee: "Yes",
      is_insured: "Yes",
      is_international: "No",
      externalDoctor: "External Doctor A",
      landlineNo: "0987654321",
      lastName: "Last A",
      marital_status: "Single",
      marriage_anniversary: "2015-01-01",
      middleName: "Middle A",
      mobileNo: "1234567890",
      mobile_1: "0987654321",
      mobile_2: "1122334455",
      occupation: "Occupation A",
      phone1: "5566778899",
      phone2: "6677889900",
      pin_code: "123456",
      prefix: "Mr.",
      religion: "Religion A",
      residence_phone_1: "3344556677",
      residence_phone_2: "4455667788",
      residence_phone_3: "5566778899",
      special_registration: "Special A",
      state: "State A",
      spouse_address: "Spouse Address A",
      spouse_age_day: "5",
      spouse_age_month: "1",
      spouse_age_year: "28",
      spouse_area: "Spouse Area A",
      spouse_blood_group: "B+",
      spouse_city: "Spouse City A",
      spouse_company_name: "Spouse Company A",
      spouse_country: "Spouse Country A",
      spouse_dob: "1994-01-01",
      spouse_education: "Spouse Education A",
      spouse_email: "spouse_email@example.com",
      spouse_familyName: "Spouse Family A",
      spouse_firstName: "Spouse First A",
      spouse_gender: "Female",
      spouse_id_proof: "Spouse ID12345",
      spouse_id_proof_number: "SPID12345",
      spouse_is_international: "No",
      spouse_lastName: "Spouse Last A",
      spouse_marital_status: "Married",
      spouse_marriage_anniversary: "2015-01-01",
      spouse_middleName: "Spouse Middle A",
      spouse_mobile_1: "9988776655",
      spouse_mobile_2: "8877665544",
      spouse_motherName: "Spouse Mother A",
      spouse_nationality: "Spouse Nationality A",
      spouse_occupation: "Spouse Occupation A",
      spouse_pin_code: "654321",
      spouse_preferred_language: "Spouse Language A",
      spouse_prefix: "Mrs.",
      spouse_religion: "Spouse Religion A",
      spouse_residence_phone_1: "6677889900",
      spouse_residence_phone_2: "7788990011",
      spouse_residence_phone_3: "8899001122",
      spouse_special_registration: "Spouse Special A",
      spouse_state: "Spouse State A",
      sponsor_associated_company: "Sponsor Company A",
      sponsor_company: "Sponsor A",
      sponsor_investigation_no: "INV12345",
      sponsor_member_relation: "Sponsor Relation A",
      sponsor_patient_category: "Category A",
      sponsor_patient_source: "Source A",
      sponsor_remark: "Remark A",
      sponsor_tariff: "Tariff A",
      ifsc_code: "IFSC001",
      branch: "Branch A",
      bank_name: "Bank A",
      account_type: "Savings",
      account_no: "ACC12345",
      account_holder: "Account Holder A",
    },
    {
      mr_no: "MR002",
      AgencyName: "Agency A",
      Agent: "Agent A",
      ReferralDetails: "Referral A",
      RegistrationType: "Type A",
      SorOfRef: "Source A",
      address: "Address A",
      age_days: "10",
      age_months: "2",
      age_years: "30",
      altMobileNo: "1234567890",
      area: "Area A",
      bloodGroup: "A+",
      camp: "Camp A",
      city: "City A",
      clinic_status: "Active",
      company_name: "Company A",
      country: "Country A",
      date: "2023-01-01",
      dob: "1993-01-01",
      education: "Education A",
      email: "email@example.com",
      familyName: "Family A",
      fatherName: "Father A",
      firstName: "First A",
      id_proof_number: "ID12345",
      id_proof_type: "Passport",
      inHouseDoctor: "Doctor A",
      is_vip: "No",
      is_employee: "Yes",
      is_insured: "Yes",
      is_international: "No",
      externalDoctor: "External Doctor A",
      landlineNo: "0987654321",
      lastName: "Last A",
      marital_status: "Single",
      marriage_anniversary: "2015-01-01",
      middleName: "Middle A",
      mobileNo: "1234567890",
      mobile_1: "0987654321",
      mobile_2: "1122334455",
      occupation: "Occupation A",
      phone1: "5566778899",
      phone2: "6677889900",
      pin_code: "123456",
      prefix: "Mr.",
      religion: "Religion A",
      residence_phone_1: "3344556677",
      residence_phone_2: "4455667788",
      residence_phone_3: "5566778899",
      special_registration: "Special A",
      state: "State A",
      spouse_address: "Spouse Address A",
      spouse_age_day: "5",
      spouse_age_month: "1",
      spouse_age_year: "28",
      spouse_area: "Spouse Area A",
      spouse_blood_group: "B+",
      spouse_city: "Spouse City A",
      spouse_company_name: "Spouse Company A",
      spouse_country: "Spouse Country A",
      spouse_dob: "1994-01-01",
      spouse_education: "Spouse Education A",
      spouse_email: "spouse_email@example.com",
      spouse_familyName: "Spouse Family A",
      spouse_firstName: "Spouse First A",
      spouse_gender: "Female",
      spouse_id_proof: "Spouse ID12345",
      spouse_id_proof_number: "SPID12345",
      spouse_is_international: "No",
      spouse_lastName: "Spouse Last A",
      spouse_marital_status: "Married",
      spouse_marriage_anniversary: "2015-01-01",
      spouse_middleName: "Spouse Middle A",
      spouse_mobile_1: "9988776655",
      spouse_mobile_2: "8877665544",
      spouse_motherName: "Spouse Mother A",
      spouse_nationality: "Spouse Nationality A",
      spouse_occupation: "Spouse Occupation A",
      spouse_pin_code: "654321",
      spouse_preferred_language: "Spouse Language A",
      spouse_prefix: "Mrs.",
      spouse_religion: "Spouse Religion A",
      spouse_residence_phone_1: "6677889900",
      spouse_residence_phone_2: "7788990011",
      spouse_residence_phone_3: "8899001122",
      spouse_special_registration: "Spouse Special A",
      spouse_state: "Spouse State A",
      sponsor_associated_company: "Sponsor Company A",
      sponsor_company: "Sponsor A",
      sponsor_investigation_no: "INV12345",
      sponsor_member_relation: "Sponsor Relation A",
      sponsor_patient_category: "Category A",
      sponsor_patient_source: "Source A",
      sponsor_remark: "Remark A",
      sponsor_tariff: "Tariff A",
      ifsc_code: "IFSC001",
      branch: "Branch A",
      bank_name: "Bank A",
      account_type: "Savings",
      account_no: "ACC12345",
      account_holder: "Account Holder A",
    },
    {
      mr_no: "MR003",
      AgencyName: "Agency A",
      Agent: "Agent A",
      ReferralDetails: "Referral A",
      RegistrationType: "Type A",
      SorOfRef: "Source A",
      address: "Address A",
      age_days: "10",
      age_months: "2",
      age_years: "30",
      altMobileNo: "1234567890",
      area: "Area A",
      bloodGroup: "A+",
      camp: "Camp A",
      city: "City A",
      clinic_status: "Active",
      company_name: "Company A",
      country: "Country A",
      date: "2023-01-01",
      dob: "1993-01-01",
      education: "Education A",
      email: "email@example.com",
      familyName: "Family A",
      fatherName: "Father A",
      firstName: "First A",
      id_proof_number: "ID12345",
      id_proof_type: "Passport",
      inHouseDoctor: "Doctor A",
      is_vip: "No",
      is_employee: "Yes",
      is_insured: "Yes",
      is_international: "No",
      externalDoctor: "External Doctor A",
      landlineNo: "0987654321",
      lastName: "Last A",
      marital_status: "Single",
      marriage_anniversary: "2015-01-01",
      middleName: "Middle A",
      mobileNo: "1234567890",
      mobile_1: "0987654321",
      mobile_2: "1122334455",
      occupation: "Occupation A",
      phone1: "5566778899",
      phone2: "6677889900",
      pin_code: "123456",
      prefix: "Mr.",
      religion: "Religion A",
      residence_phone_1: "3344556677",
      residence_phone_2: "4455667788",
      residence_phone_3: "5566778899",
      special_registration: "Special A",
      state: "State A",
      spouse_address: "Spouse Address A",
      spouse_age_day: "5",
      spouse_age_month: "1",
      spouse_age_year: "28",
      spouse_area: "Spouse Area A",
      spouse_blood_group: "B+",
      spouse_city: "Spouse City A",
      spouse_company_name: "Spouse Company A",
      spouse_country: "Spouse Country A",
      spouse_dob: "1994-01-01",
      spouse_education: "Spouse Education A",
      spouse_email: "spouse_email@example.com",
      spouse_familyName: "Spouse Family A",
      spouse_firstName: "Spouse First A",
      spouse_gender: "Female",
      spouse_id_proof: "Spouse ID12345",
      spouse_id_proof_number: "SPID12345",
      spouse_is_international: "No",
      spouse_lastName: "Spouse Last A",
      spouse_marital_status: "Married",
      spouse_marriage_anniversary: "2015-01-01",
      spouse_middleName: "Spouse Middle A",
      spouse_mobile_1: "9988776655",
      spouse_mobile_2: "8877665544",
      spouse_motherName: "Spouse Mother A",
      spouse_nationality: "Spouse Nationality A",
      spouse_occupation: "Spouse Occupation A",
      spouse_pin_code: "654321",
      spouse_preferred_language: "Spouse Language A",
      spouse_prefix: "Mrs.",
      spouse_religion: "Spouse Religion A",
      spouse_residence_phone_1: "6677889900",
      spouse_residence_phone_2: "7788990011",
      spouse_residence_phone_3: "8899001122",
      spouse_special_registration: "Spouse Special A",
      spouse_state: "Spouse State A",
      sponsor_associated_company: "Sponsor Company A",
      sponsor_company: "Sponsor A",
      sponsor_investigation_no: "INV12345",
      sponsor_member_relation: "Sponsor Relation A",
      sponsor_patient_category: "Category A",
      sponsor_patient_source: "Source A",
      sponsor_remark: "Remark A",
      sponsor_tariff: "Tariff A",
      ifsc_code: "IFSC001",
      branch: "Branch A",
      bank_name: "Bank A",
      account_type: "Savings",
      account_no: "ACC12345",
      account_holder: "Account Holder A",
    },
    // Add more dummy data objects as needed
  ];

  // Insert dummy data
  await PR_patientReg.bulkCreate(dummyPatients);
}

const getConcent = async (req, res) => {
  try {
    const result = await concent.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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

const getServish = async (req, res) => {
  try {
    const servicesData = await ServiceMasterSchema.findAll();
    res.status(200).json(servicesData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const newBill = async (req, res) => {
  try {
    const newBill = await PR_BillFindPatient.create(req.body);
    res.status(200).json(newBill);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApprove = async (req, res) => {
  try {
    const Id = dataId;
    const approvelBill = await PR_BillFindPatient.findOne({
      where: {
        id: Id,
      },
    });
    dataId = {};
    let data = [];
    data.push(approvelBill);
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const newPatientAdvance = async (req, res) => {
  try {
    console.log(req.body);
    const Id = req.session.rowId;

    // Concatenate the bankName fields
    const bankNames = [req.body.bankName1, req.body.bankName2, req.body.bankName3, req.body.bankName4, req.body.bankName5]
      .filter(Boolean) // Remove undefined or empty values
      .join(', '); // Combine them into a single string with commas

    // Concatenate the bankDetails fields
    const bankDetails = [req.body.bankDetails1, req.body.bankDetails2, req.body.bankDetails3, req.body.bankDetails4]
      .filter(Boolean) // Remove undefined or empty values
      .join(', '); // Combine them into a single string with commas

    // Concatenate the defaultBankAccount fields
    const defaultBankAccounts = [req.body.defaultBankAccount1, req.body.defaultBankAccount2, req.body.defaultBankAccount3, req.body.defaultBankAccount4, req.body.defaultBankAccount5, req.body.defaultBankAccount6]
      .filter(Boolean) // Remove undefined or empty values
      .join(', '); // Combine them into a single string with commas

    // Concatenate the referenceNo fields
    const referenceNos = [req.body.referenceNo1, req.body.referenceNo2,req.body.referenceNo3]
      .filter(Boolean) // Remove undefined or empty values
      .join(', '); // Combine them into a single string with commas

    // Concatenate the referenceDate fields
    const referenceDates = [req.body.referenceDate1, req.body.referenceDate2]
      .filter(Boolean) // Remove undefined or empty values
      .map(date => new Date(date).toISOString().split('T')[0]) // Normalize dates
      .join(', '); // Combine them into a single string with commas

    // Create the advance entry
    const advanceEntry = await Advance.create({
      ...req.body, // Spread other req.body fields
      bankName: bankNames, // Set the concatenated bankName values
      bankDetails: bankDetails, // Set the concatenated bankDetails values
      defaultBankAccount: defaultBankAccounts, // Set the concatenated defaultBankAccount values
      referenceNo: referenceNos, // Set the concatenated referenceNo values
      referenceDate: referenceDates, // Set the concatenated referenceDate values
      balance_amount: req.body.amount, 
    });

    // Update the rec_no field with the generated id and prefix
    const recNo = `REC${advanceEntry.id}`;
    await advanceEntry.update({
      rec_no: recNo,
      date: new Date().toISOString().split('T')[0], // Extract only the date part
      patient_id: Id,
    });

    res.status(200).json({
      success: true,
      message: "Patient Advance Added Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const getPatientAdv = async (req, res) => {
  try {
    // console.log(req.session);
    const Id = req.session.rowId;

    if (Id) {
      const newBill = await Advance.findAll({
        where: {
          patient_id: Id,
        },
      });
      console.log("Session Data", Id);
      res.status(200).json(newBill);
    } else {
      res.redirect("/plshBill/1");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const newRefund = async (req, res) => {
  try {
    const Id = req.session.rowId;
    console.log(req.session.rowId);
 
   const refund= await PatientRefund.create({
      patient_id: req.session.rowId,
      date: new Date().toISOString().split('T')[0], 
      Advance_receipt_no:req.body.adv_rec_no,
      remarks: req.body.remarks,
      advanceAvailable: req.body.AdvanceAvailable,
      totalRefund: req.body.totalRefund,
      advanceConsumed: req.body.AdvanceConsumed,
      totalAdvance: req.body.totalAdvance,
      refundAmount: req.body.refundAmount,
    });

    const recNo = `REC${refund.id}`;
    await refund.update({
      rec_no: recNo,
    });

    res.status(200).json({
      success: true,
      message: "Refund Added Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPatientAdvance = async (req, res) => {
  try {
    const patientId = req.session.rowId;
    console.log("Fetching Advances for Patient ID:", patientId);

    const patientAdvances = await Advance.findAll({
      where: {
        patient_id: patientId,
      },
    });

    res.status(200).json({
      patientAdvances
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching patient advances: " + error.message,
    });
  }
};

const getPatientRefund = async (req, res) => {
  try {
    const patientId = req.session.rowId;
    const recNo = req.query.rec_no; // Access rec_no from the query parameters

    console.log("Fetching Refunds for Patient ID:", patientId);
    console.log("Receipt Number:", recNo);

    const whereClause = {
      patient_id: patientId
    };

    // If recNo is provided, add it to the where clause
    if (recNo) {
      whereClause.Advance_receipt_no = recNo;
    }

    const patientRefunds = await PatientRefund.findAll({
      where: whereClause
    });

    res.status(200).json({
      patientRefunds
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching patient refunds: " + error.message,
    });
  }
};

const getCompanyRefund = async (req, res) => {
  try {
    const patientId = req.session.rowId;
    const recNo = req.query.rec_no; // Access rec_no from the query parameters

    console.log("Fetching Refunds for Patient ID:", patientId);
    console.log("Receipt Number:", recNo);

    const whereClause = {
      patient_id: patientId
    };

    // If recNo is provided, add it to the where clause
    if (recNo) {
      whereClause.Adv_recipt_no = recNo;
    }

    const patientRefunds = await CompanyRefund.findAll({
      where: whereClause
    });

    res.status(200).json({
      patientRefunds
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching patient refunds: " + error.message,
    });
  }
};



const getAllApproveReq = async (req, res) => {
  try {
    let data = [];
    const forApproveData = await PR_BillFindPatient.findAll();
    forApproveData.forEach((item) => {
      if (item.totalConcessionAmount == "") {
        data.push(item);
      }
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const getCompanyAvdance = async (req, res) => {
//   try {
//     console.log(req.session);
//     const Id = req.session.rowId;
//     let data = [];
//     if (Id) {
//       const newBill = await CompanyAdvance.findAll({
//         where: {
//           patient_id: Id,
//         },
//       });
//       newBill.forEach((item) => {
//         if (!(item.company == "")) {
//           data.push(item);
//         }
//       });
//       console.log("Session Data", Id);
//       res.status(200).json(data);
//     } else {
//       res.redirect("/plshBill/1");
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const getPatientServicesDaitle = async (req, res) => {
  try {
    console.log(req.session);
    const Id = req.session.rowId;
    const patient = await PR_patientReg.findOne({
      where: {
        id: Id,
      },
    });
    const patient2 = await PR_BillFindPatient.findAll({
      where: {
        mrNo: patient.mr_no,
      },
    });
    res.status(200).send(patient2);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPaymentModeChange = async (req, res) => {
  try {
    const allPaymentData = await PR_BillFindPatient.findAll();
    res.status(200).send(allPaymentData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await sequelize.query(
      "SELECT * FROM emb_prescription",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    console.log(`prescription:- `, prescriptions);

    res.json(prescriptions); // Send data as JSON
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).send("Internal Server Error");
  }
};

const approvePatientRefundByRecNo = async (req, res) => {
  const { rec_no } = req.body;  // Assuming the rec_no is passed in the request body
  console.log(req.body)

  try {
      // Fetch the refund entry from the database based on rec_no
      const refund = await PatientRefund.findOne({
          where: { rec_no: rec_no }
      });
      console.log(refund)

      if (!refund) {
          return res.status(404).json({
              success: false,
              message: 'Refund not found'
          });
      }

      // Check if the refund is already approved
      if (refund.isApprove) {
          return res.status(400).json({
              success: false,
              message: 'Refund is already approved'
          });
      }

      // Approve the refund
      refund.isApprove = true;
      await refund.save();

      // Optional: Add any additional logic here, such as sending notifications

      res.status(200).json({
          success: true,
          message: 'Refund approved successfully'
      });
  } catch (error) {
      console.error('Error approving the refund:', error);
      res.status(500).json({
          success: false,
          message: 'Error approving the refund: ' + error.message
      });
  }
};

const approveSeriveRefund = async (req, res) => {
  const { approvalId, remark, freeze } = req.body;
  console.log(req.body);

  try {
      // Fetch the refund entry from the database based on billNo and make sure to include the primary key
      const refund = await BillServiceApproval.findOne({
          where: { id: approvalId },
          attributes: ['id', 'serviceId', 'Approve', 'freeze','billNo'] // Ensure the primary key ('id') is included
      });

      console.log(refund);

      if (!refund) {
          return res.status(404).json({
              success: false,
              message: 'Refund not found'
          });
      }

      // Check if the request is for freezing the refund
      if (freeze === '1') {
          refund.freeze = true;
          await refund.save(); // Now that the primary key is included, this should work

          // Fetch all the services associated with the refund using the serviceId array
          const serviceIds = refund.serviceId; // Assuming this is an array
          
          if (!serviceIds || serviceIds.length === 0) {
              return res.status(404).json({
                  success: false,
                  message: 'No services found for this refund'
              });
          }

          // Fetch all services using the serviceIds
          const services = await BillServices.findAll({
              where: {
                  id: {
                      [Op.in]: serviceIds // Use the array of serviceIds
                  }
              }
          });

          if (!services || services.length === 0) {
              return res.status(404).json({
                  success: false,
                  message: 'No services found for this refund'
              });
          }

          // Calculate the total net amount for the services
          const totalNetAmount = services.reduce((total, service) => total + (service.netAmount || 0), 0);
          const totalConcessionAmount = services.reduce((total, service) => total + (service.concession_amount || 0), 0);
          // Create a new bill for the frozen services
          const existingBill = await PR_BillFindPatient.findOne({
            where: { bill_no: refund.billNo }
        });
          const newBill = await PR_BillFindPatient.create({
            bill_no: `${refund.billNo}REF`,
            date:new DATE(),// Use the same billNo as the refund
            totalBillAmount: totalNetAmount, 
            totalNetBillAmount:totalNetAmount ,
            totalConcessionAmount:totalConcessionAmount,
            mrNo:existingBill.mrNo
        
          });

          return res.status(200).json({
              success: true,
              message: 'Refund frozen successfully, and a new bill created.',
              newBill
          });
      }

      // Check if the refund is already approved
      if (refund.Approve) {
          return res.status(400).json({
              success: false,
              message: 'Refund is already approved'
          });
      }

      // Approve the refund and save the remark
      refund.Approve = true;
      refund.approveRemark = remark;
      await refund.save(); // This will work since the primary key is now included

      res.status(200).json({
          success: true,
          message: 'Refund approved successfully'
      });

  } catch (error) {
      console.error('Error processing the refund:', error);
      res.status(500).json({
          success: false,
          message: 'Error processing the refund: ' + error.message
      });
  }
};



const approveCompanyRefundByRecNo = async (req, res) => {
  const { rec_no } = req.body;  // Assuming the rec_no is passed in the request body
  console.log(req.body)

  try {
      // Fetch the refund entry from the database based on rec_no
      const refund = await CompanyRefund.findOne({
          where: { rec_no: rec_no }
      });
      console.log(refund)

      if (!refund) {
          return res.status(404).json({
              success: false,
              message: 'Refund not found'
          });
      }

      // Check if the refund is already approved
      if (refund.isApprove) {
          return res.status(400).json({
              success: false,
              message: 'Refund is already approved'
          });
      }

      // Approve the refund
      refund.isApprove = true;
      await refund.save();

      // Optional: Add any additional logic here, such as sending notifications

      res.status(200).json({
          success: true,
          message: 'Refund approved successfully'
      });
  } catch (error) {
      console.error('Error approving the refund:', error);
      res.status(500).json({
          success: false,
          message: 'Error approving the refund: ' + error.message
      });
  }
};

getServiceDataById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request params

    // Find the data based on the ID from the 'ServiceModel' table
    const serviceData = await BillServices.findAll({
      where: {
        billId: id, // Ensure the 'id' matches the ID in the request
      },
    });

    // If no data found, return 404
    if (!serviceData) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Return the found data as a JSON response
    return res.status(200).json(serviceData);
  } catch (error) {
    console.error('Error fetching service data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const sendForServiceApproval = async (req, res) => {
  try {
    const { billId, billNo, selectedServices, remark, currentDate } = req.body;

    // Extract service IDs and codes into arrays
    const serviceIds = selectedServices.map(service => service.serviceId);
    const serviceCodes = selectedServices.map(service => service.serviceCode);

    // Save one entry with serviceId and serviceCode as arrays
    await BillServiceApproval.create({
      billId,
      billNo,
      serviceId: serviceIds,
      serviceCode: serviceCodes,
      remark: remark || null,
      approvalDate: currentDate
    });

    res.status(200).send("Data sent for approval successfully.");
  } catch (error) {
    console.error("Failed to send data for approval:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getRefundServices = async (req, res) => {
  try {
    // Define the search criteria for BillServiceApproval
    const approvalCriteria = {};

    // Build the search criteria from query parameters for BillServiceApproval
    if (req.query.from_date && req.query.to_date) {
      approvalCriteria.approvalDate = {
        [Op.between]: [req.query.from_date, req.query.to_date]
      };
    }
    if (req.query.bill_no) approvalCriteria.billNo = req.query.bill_no;
    if (req.query.mrNo) approvalCriteria.mrNo = req.query.mrNo;
    if (req.query.clinic) approvalCriteria.clinic = req.query.clinic;

    // Fetch all BillServiceApproval records matching the criteria
    const approvedBills = await BillServiceApproval.findAll({
      where: approvalCriteria,
      attributes: ['id', 'billId', 'freeze', 'Approve', 'approvalDate'] // Include 'id' in the result
    });

    // Extract all billIds (allowing duplicates)
    const billIds = approvedBills.map(approval => approval.billId);
    
    if (billIds.length === 0) {
      return res.status(404).json({ message: "No approved bills found for the given criteria." });
    }

    // Fetch all relevant PR_BillFindPatient based on the billIds
    const billDetails = await PR_BillFindPatient.findAll({
      where: {
        id: { [Op.in]: billIds }
      }
    });

    // Create a map of billId to billDetails for faster lookup
    const billDetailsMap = new Map(billDetails.map(bill => [bill.id, bill]));

    // Format the result with both BillDetails and attach freeze, approve, and approvalDate from BillServiceApproval
    const results = approvedBills.map(approval => {
      // Find the matching bill from PR_BillFindPatient for each approval
      const bill = billDetailsMap.get(approval.billId);

      if (bill) {
        // Map the approval data with the bill data
        return {
          ...bill.toJSON(),
          approvalId: approval.id, // Add the id from BillServiceApproval
          freezeRefund: approval.freeze,
          approveRefund: approval.Approve,
          approvalDate: approval.approvalDate
        };
      }
      return null;
    }).filter(result => result !== null); // Filter out any null values if no bill found

    // Send the response with the fetched BillServices data along with freeze and approve
    res.status(200).json(results);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getServiceDataByBillId = async (req, res) => {
  try {
    // Get the billId from request parameters
    console.log(req.params)
    const approvalId = req.params.approvalId;
    console.log('1')
    

    // Fetch all serviceIds associated with the billId from BillServiceApproval
    const billApproval = await BillServiceApproval.findOne({
      where: { id: approvalId }, // Use an object for the where clause
      attributes: ['serviceId']  // Fetch only the serviceId attribute
    });
    
    if (!billApproval || !billApproval.serviceId || billApproval.serviceId.length === 0) {
      return res.status(404).json({ message: 'No services found for the given bill.' });
    }

    // Assuming serviceId is an array, we will use the array of service IDs to fetch data from BillServices
    const serviceIds = billApproval.serviceId;

    // Fetch data from BillServices based on the serviceIds
    const services = await BillServices.findAll({
      where: {
        id: {
          [Op.in]: serviceIds, // Using the array of serviceIds to match multiple services
        },
      },
    });

    // Send the fetched services as response
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


getPatientPackages = async (req, res) => {
  try {
    console.log(req.session);
    const Id = req.session.rowId;
    const patient = await PR_patientReg.findOne({
      where: {
        id: Id,
      },
    });
    const mrNo= patient.mr_no;

    const data = await PatientAssignPackage.findOne({
      where: {
        id: Id,
      },
    });

    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = {
  getPrescriptions,
  loadExpenses,
  newExpenses,
  getExpenses,
  saveStatusData,
  getAllDoctor,
  newCompanyAdvance,
  getAdvance,
  newCompRefund,
  getCompanyRefund,
  storeDataInDb,
  getConcent,
  getpatientBills,
  getServish,
  newBill,
  getApprove,
  newPatientAdvance,
  getPatientAdv,
  newRefund,
  setId,
  getAllApproveReq,
  getPatientServicesDaitle,
  getPaymentModeChange,
  getPatientAdvance,
  getPatientRefund ,
  approvePatientRefundByRecNo,
  getCompanyAdvance,
  approveCompanyRefundByRecNo,
  getServiceDataById,
  sendForServiceApproval,
  getRefundServices,
  getServiceDataByBillId,
  approveSeriveRefund,
  getPatientPackages
};
