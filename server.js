import express from 'express'
import axios from 'axios'
import jsdom from 'jsdom'
import cors from 'cors'

import { 
  updateGoogleSpreadSheet,
  extractDomData,
  cleanupData,
  formatData
 } from './util.js'

const { JSDOM } = jsdom

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {

  const link = req.body.link

  try {
    const page = await axios.get(link)
    const dom = new JSDOM(page.data)
    const scrapedData = extractDomData(dom)    
    const cleanData = cleanupData(scrapedData)
    const formattedData = formatData(cleanData)
    updateGoogleSpreadSheet(process.env.SPREADSHEETID, formattedData)
  } catch (err) {
    console.log(err);
  }
  res.status(200).json("Added apartment")
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})