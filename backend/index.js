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
require('dotenv').config()
app.use(cors())

mongoose.connect(process.env.CONNECTIONSTRG)

const time = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date());


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
    let status ="first"
    if ( comData.length === 0  && time > "08:30:00") {
        await cometh()
        comData = await Bank.find({bankName:"CBE",date:formattedToday })
        status = "second"
    }else{
        comData = await Bank.find({ bankName: "CBE", date: formattedYesterday });
        status = "third"
    }
    
    res.send({comData,status})
})
app.get('/getDashen',async(req,res)=>{
    let dashenData = await Bank.find({bankName:"Dashen",date:formattedToday })
    if (dashenData.length === 0 && time > "08:30:00") {
        await dashen()
        dashenData = await Bank.find({bankName:"Dashen",date:formattedToday })
    }else{
        dashenData = await Bank.find({ bankName: "Dashen", date: formattedYesterday });
    }
    res.send(dashenData)
})
app.get('/getAwash',async(req,res)=>{
    let awashData = await Bank.find({bankName:"Awash",date:formattedToday })
    if (awashData.length === 0  && time > "08:30:00") {
        await awash()
        awashData = await Bank.find({bankName:"Awash",date:formattedToday })
    }else{
        awashData = await Bank.find({ bankName: "Awash", date: formattedYesterday });
    }
    res.send(awashData)
})
app.get('/getAbyss',async(req,res)=>{
    let abyssData = await Bank.find({bankName:"Abyssinia",date:formattedToday })
    if (abyssData.length === 0  && time > "08:30:00") {
        await abyss()
        abyssData = await Bank.find({bankName:"Abyssinia",date:formattedToday })
    }else{
        abyssData = await Bank.find({ bankName: "Abyssinia", date: formattedYesterday });
    }
    res.send(abyssData)
})
//cometh()
//awash()
//dashen()
//abyssinia()


/* cron.schedule('30 8 * * *', async () => {
    console.log('Running the scraper...');
    await cometh();
    await awash();
    await abyssinia();
    await dashen();
}, {
    scheduled: true,
    timezone: "Africa/Nairobi" // Set to GMT+3
}); */
console.log(time)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
