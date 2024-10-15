const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; 
const cometh = require('./cometh'); 
const dashen = require('./dashen')
const awash = require('./awash')
const mongoose = require('mongoose')
const Bank = require('./Bank')
const abyssinia = require('./abyssinia')
const cron = require('node-cron');
const cors = require('cors')
app.use(cors())
mongoose.connect("mongodb+srv://mussieteklu1:30lLwwUogkhvgb60@cluster0.xhemv.mongodb.net/webscrapper")

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

let prevDD = yesterday.getDate();
let prevMM = yesterday.getMonth() + 1; // Months start at 0!
const prevYYYY = yesterday.getFullYear();

if (prevDD < 10) prevDD = '0' + prevDD;
if (prevMM < 10) prevMM = '0' + prevMM;

const formattedYesterday = prevDD + '/' + prevMM + '/' + prevYYYY;
//function to check if there is a data already registered for today


app.get('/getCom',async(req,res)=>{
    let comData = await Bank.find({bankName:"CBE",date:formattedToday })
    if (comData.length === 0) {
        comData = await Bank.find({ bankName: "CBE", date: formattedYesterday });
    }
    
    res.send(comData)
})
app.get('/getDashen',async(req,res)=>{
    let dashenData = await Bank.find({bankName:"Dashen",date:formattedToday })
    if (dashenData.length === 0) {
        dashenData = await Bank.find({ bankName: "Dashen", date: formattedYesterday });
    }
    res.send(dashenData)
})
app.get('/getAwash',async(req,res)=>{
    let awashData = await Bank.find({bankName:"Awash",date:formattedToday })
    if (awashData.length === 0) {
        awashData = await Bank.find({ bankName: "Awash", date: formattedYesterday });
    }
    res.send(awashData)
})
app.get('/getAbyss',async(req,res)=>{
    let abyssData = await Bank.find({bankName:"Abyssinia",date:formattedToday })
    if (abyssData.length === 0) {
        abyssData = await Bank.find({ bankName: "Abyssinia", date: formattedYesterday });
    }
    res.send(abyssData)
})

cron.schedule('30 8 * * *', async () => {
    console.log('Running the scraper...');
    await cometh();
    await awash();
    await abyssinia();
    await dashen();
}, {
    scheduled: true,
    timezone: "Africa/Nairobi" // Set to GMT+3
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
