const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name : {type : String, required: true},
    price : {type : Number, required: true},
    userId : {type : String},
    username : {type : String},
    createdAt : {type : Date, default : Date.now()}
})


const productModel = mongoose.model('Product', productSchema)

module.exports = productModel