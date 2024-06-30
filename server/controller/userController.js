const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js");
const returnCodes = require("../assets/returnCodes.js");
const jwtSecret = process.env.JWT_SECRET;
 
const home = async (req, res) => {
    res.json({
        code: returnCodes.SUCCESS, 
        message: "Home page"
    });
}

const register = async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

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

const login = async (req, res) => {
    try{ 
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        const userData = await User.findOne({
            username: username
        });

        if(userData){
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if(passwordMatch){
                const token = jwt.sign({ 
                    username: userData.username,
                    email: userData.email 
                }, 
                jwtSecret, { 
                    expiresIn: '24h' 
                });
                res.cookie('jwtCookies', token, { 
                    maxAge: 86400, 
                    httpOnly: true 
                });
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

const dashboard = async (req, res) => {
    try{
        const userData = await User.findOne({
            username: req.username
        });
        const user = {
            username: userData.username,
            email: userData.email
        }
        res.json({
            code: returnCodes.SUCCESS,
            message: `Current user is: ${req.username}`,
            data: user
        });
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