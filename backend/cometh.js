const puppeteer = require('puppeteer');
const Bank = require('./Bank')


const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

const combanketh = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.combanketh.et/en/exchange-rate/', {
    waitUntil: 'networkidle2',
    timeout: 0 // Disable timeout
});

  const data = await page.evaluate(() => {
    const rows = document.querySelectorAll('tbody > tr');

    return Array.from(rows).map(row => {
      const currency = row.querySelector('td:nth-child(1) .text-sm.font-medium.text-gray-900')?.textContent.trim() || '';
      const cashBuying = row.querySelector('td:nth-child(2) .text-sm.text-gray-900.text-center')?.textContent.trim() || '';
      const cashSelling = row.querySelector('td:nth-child(3) .text-sm.font-medium.text-gray-900.text-center')?.textContent.trim() || '';
      //const transactionalBuying = row.querySelector('td:nth-child(4) .text-sm.text-gray-900.text-center')?.textContent.trim() || '';
      //const transactionalSelling = row.querySelector('td:nth-child(5) .text-sm.font-medium.text-gray-900.text-center')?.textContent.trim() || '';

      return {
        currency,
        cashBuying,
        cashSelling,
        //transactionalBuying,
        //transactionalSelling,
      };
    });
  });

  await browser.close();
  return data;
};

async function comBankData() {
  try {
    const data = await combanketh(); 
    const fetched = [data[0],data[1],data[2],data[9],data[11]]
    //console.log(fetched);
    return fetched
   
  } catch (error) {
    console.error('Error fetching CBE:', error);
  }

  
}
async function saveComEth (){
  const data = await comBankData()
  console.log(data)

  const bank1 = new Bank({
    bankName:"CBE",
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

  bank1.save()
  console.log("CBE info saved")
}

module.exports = saveComEth
// Schedule the scraper to run every day at midnight in GMT+3 (Africa/Nairobi)
/* cron.schedule('0 0 * * *', async () => {
  console.log('Running the scraper...');
  const data = await combanketh();
  console.log(data);
}, {
  scheduled: true,
  timezone: "Africa/Nairobi" // Set to GMT+3
}); */

// Initial run if you want it to start immediately
//combanketh();
