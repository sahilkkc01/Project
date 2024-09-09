
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('mydb','root','Lifelinkr@123',{
  host :'localhost',
  port: 3306,
  dialect: 'mysql'
})


const con = async()=>{
  try{
    await sequelize.authenticate();
    const msg='ok';
    return msg;
    console.log('Db Connected');
  }catch(error){
    console.log('Unable to connect to db',error)
  }
};

module.exports = {con,sequelize};