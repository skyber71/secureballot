const User = require("../models/userModel.js");
const bcrypt = require('bcrypt');
const returnCodes = require("../assests/returnCodes.js");


const home = async (req, res, next) =>{
    res.json({
        code: returnCodes.SUCCESS,
        message: "Home page"
    });
}


const register = async (req, res, next) => {
    try{
        const email = "admin@gmail.com";
        const password = "123";
        const username = "admertykhin";

        const hashedPassword  = await bcrypt.hash(password, 10);
        const existingEmail = await User.findOne({email});

        if (existingEmail) {
            res.json({
                code: returnCodes.EMAIL_ALREADY_EXISTS,
                message: "Email already exists"
            });
        }
        else{
            const existingUsername = await User.findOne({username});
            if (existingUsername){
                res.json({
                    code: returnCodes.USERNAME_ALREADY_EXISTS,
                    message: "Username already exists"
                });
            }
            else{
                const user =  new User({
                    username: username,
                    email: email,
                    password: hashedPassword
                });
                await user.save();
                res.json({
                    code: returnCodes.SUCCESS,
                    message: "User created successfully"
                });
            }
        }
    }
    catch(err){
        console.log(err);
    } 
}


const login = async (req, res, next) => {
    try{
        const email = "admin@gmail.com";
        const password = "123";
        const username = "admertykhin";

        const userData = await User.findOne({username: username});

        if(userData){
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if(passwordMatch){
                res.json({
                    code: returnCodes.SUCCESS,
                    message: "User logged in successfully"
                });
                console.log(`User ${userData.username} logged in successfully`);
            }
            else{
                res.json({
                    code: returnCodes.INVALID_PASSWORD,
                    message: "Invalid password"
                });
            }
        }
        else{
            res.json({
                code: returnCodes.USER_NOT_FOUND,
                message: "User not found"
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

const dashboard = async (req, res, next) => {
    try{

        



        

    }
    catch(err){
        console.log(err);
    }

}


module.exports = {
    register,
    login,
    home,
    dashboard
}