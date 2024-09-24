const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const ConcentPateintUser = sequelize.define("ConcentPatientUserTable", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  patientID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  form_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

ConcentPateintUser.sync({ alter: true })
  .then(() => {
    console.log("ConcentPatientUserTable table created successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { ConcentPateintUser };
