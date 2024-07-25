const isLogin = async (req, res, next) => {
    try {
        if (req.session.userData) {

        } else {
            res.status(500).send({msg:"Please Login First"})
        }
        next();

    } catch (error) {
        console.log(error.message);
    }
}
const isLogout = async (req, res, next) => {
    try {
        if (req.session.userData)
            return res.status(500).json({msg:"please logout first"});
        next();
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isLogin,
    isLogout
}