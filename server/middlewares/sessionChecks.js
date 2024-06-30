const returnCodes = require("../assets/returnCodes.js");
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const checkForJwtToken = async (req, res, next) => {
    try{
        const jwtToken = req.cookies.jwtCookies;
        if(jwtToken){
            const decoded = jwt.verify(jwtToken, jwtSecret);
            req.username = decoded.username;
            next();
        }
        else{
            res.json({
                code: returnCodes.UNAUTHORIZED,
                message: "Unauthorized"
            });
        }
    }
    catch(err){
        console.log(err);
    }
}
module.exports = { 
    checkForJwtToken 
};