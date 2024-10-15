const puppeteer = require('puppeteer')
const Bank = require('./Bank')

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

const awash = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.awashbank.com/exchange-historical/', {
            waitUntil: 'networkidle2',
            timeout: 0 // Disable timeout
        });
        
        const data = await page.evaluate(()=>{
            const rows = document.querySelectorAll('tbody > tr')

            return Array.from(rows).map(row=>{
                const currency = row.querySelector('td:nth-child(1)')?.textContent.trim() || ""
                const cashBuying = row.querySelector('td:nth-child(2)')?.textContent.trim() || ""
                const cashSelling = row.querySelector('td:nth-child(3)')?.textContent.trim() || ""

                return {
                    currency,
                    cashBuying,
                    cashSelling
                }
            })
        })
        await browser.close();
        return data
       
        
    } catch (err) {
        console.error("Error: ", err);
    }
    
};

const awashData = async () =>{
    try{
        const data = await awash()
        const fetched = [data[0],data[2],data[1],data[6],data[5]]
        //console.log(fetched)
        
        return fetched
      } catch(error){
        console.error('Error fetching awashBank' + error)
      }
}

const saveAwash = async () =>{
    try{
        const data = await awashData()
        console.log(data)

        const bank = new Bank({
            bankName:"Awash",
            date:formattedToday,
            USD:{
                selling:data[0].cashSelling,
                buying:data[0].cashBuying
            },
            GBP:{
                selling:data[1].cashSelling,
                buying:data[1].cashBuying
            },
            EUR:{
                selling:data[2].cashSelling,
                buying:data[2].cashBuying
            },
            CAD:{
                selling:data[3].cashSelling,
                buying:data[3].cashBuying
            },
            AED:{
                selling:data[4].cashSelling,
                buying:data[4].cashBuying
            },
        })

        bank.save()
        console.log("Awash saved")
    }catch(error){
        console.error('Error saving'+ error)
    }
}

module.exports = saveAwash