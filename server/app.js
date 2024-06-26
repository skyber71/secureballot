const dotenv = require('dotenv');
const env = dotenv.config();
const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URL;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
const userRoute = require("./routes/userRoute.js");
app.use("/",userRoute);

mongoose.connect(mongodbUrl).then(() => {
    console.log('Connected to mongodb');
}).catch((err) => {
    console.log(err);
});

app.listen(port,() => {
    console.log(`server is running on port ${port}`);
});