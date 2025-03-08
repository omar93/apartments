import 'dotenv/config'
import { Client } from '@elastic/elasticsearch'
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import express from 'express'
import jsdom from 'jsdom'
import cors from 'cors'
puppeteer.use(StealthPlugin());

import { 
  updateGoogleSpreadSheet,
  extractDomData,
  cleanupData,
  sortData
 } from './util.js'
import { content } from 'googleapis/build/src/apis/content/index.js'

//  const client = new Client({
//   node: 'https://127.0.0.1:9200/',
//   auth: {
//     apiKey: "emNqNUE1VUJ0Y2pCTzN3UjVCd1M6SjFhSXQtQ3RUOU9EalNkSS0ycy0xQQ=="
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// })

// const resp = await client.info();

const { JSDOM } = jsdom

const app = express()
const port = 3000


app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.post('/apartment/:id', async (req, res) => {

  const spreadSheetId = req.params.id
  const link = req.body.apartmentLink

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  };

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(link, { waitUntil: 'networkidle2' });

    const content = await page.content();
    await browser.close();

    console.log(content)
  //   const url = "http://localhost:8191/v1";
  //   const headers = { "Content-Type": "application/json" };
  //   const data = {
  //       cmd: "request.get",
  //       url: "http://www.google.com/",
  //       maxTimeout: 60000
  //   };
    
  //   axios.get(url, data, { headers })
  //       .then(response => {
  //           console.log(response.data);
  //       })
  //       .catch(error => {
  //           console.error("Error:", error);
  //       });
    
    const dom = new JSDOM(page.data)
    const scrapedData = extractDomData(dom)
    const cleanData = cleanupData(scrapedData)
    const sortedData = sortData(cleanData)
    updateGoogleSpreadSheet(spreadSheetId, sortedData)
    console.log(sortData);
    
    // saveToLog(spreadSheetId, sortedData)
  } catch (err) {
    console.log(err)
    // await client.helpers.bulk({
    //   datasource: err,
    //   onDocument: () => ({ index: { _index: 'error' }}),
    // })
  }
  res.status(200).json("Added apartment")
})

const saveToLog = async (sheetID, data) => {
  await client.helpers.bulk({
    datasource: [data],
    onDocument: () => ({ index: { _index: `${sheetID}` }}),
  })
}


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})