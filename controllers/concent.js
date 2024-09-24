const { concent } = require("../models/plshBill");

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

module.exports = { getConcent };
