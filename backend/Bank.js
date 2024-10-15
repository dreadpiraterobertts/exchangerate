const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
    bankName:String,
    date:String,
    USD:{
        selling:String,
        buying:String
    },
    GBP:{
        selling:String,
        buying:String
    },
    EUR:{
        selling:String,
        buying:String
    },
    CAD:{
        selling:String,
        buying:String
    },
    AED:{
        selling:String,
        buying:String
    }
  })

module.exports = mongoose.model("Banks",bankSchema)