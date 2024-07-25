const session=require('express-session');

app.use(session({ secret: 'this is secret', cookie: { maxAge: 60000 }}))

const securePassword = async (password) => {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error) {
    }
  }
  
  const {user} = require('../models/Kyc')
  

 const insertUser = async (req, res) => {

    try {
      const reqBody = req.body;
      const { name, email, mobile, userStatus, password, role, clinicId } = reqBody
  
      if (!name || !email || !mobile || !userStatus || !password || !role || !clinicId)
        return send.status(400).json({ success: false, message: "All fileds are required" });
  
      const userData = await user.findOne({ where: { userEmail: email } });
      if (!userData) {
        const spassword = await securePassword(password);
        await Adnin.create({
          userName: name,
          userEmail: email,
          userMobile: mobile,
          userStatus: userStatus,
          userPassword: spassword,
          userRole: role,
          clinicId: clinicId
        }, {
          new: true
        });
        return res.status(200).json({ success: true, message: "User Added Successfully" })
      } else {
        return res.status(400).json({ success: false, message: "User Already Exist" })
      }
  
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  
  
 const verifyLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userVerifyData = await Adnin.findOne({ where: { userEmail: email } });
      if (userVerifyData) {
        const passwordMatch = await bcrypt.compare(password, userVerifyData.userPassword);
        if (passwordMatch) {
          const userData = {
            userId: userVerifyData.userId,
            userName: userVerifyData.userName,
            clinicId: userVerifyData.clinicId
          }
          req.session.userData = userData
          return res.status(200).json({ success: true, message: "Login Successfully" })
        } else {
          res.status(500).json({ message: "Email and Password is incorrect" });
        }
      } else {
        res.status(500).json({ message: "Email and Password is incorrect" });
      }
  
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  module.exports ={verifyLogin}
  