const mongoose = require('mongoose')
require("dotenv").config();


const connectDb = mongoose.connect(process.env.MONGODB_URL)

module.exports = connectDb