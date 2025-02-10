import express from 'express'
import axios from 'axios'
import jsdom from 'jsdom'
import cors from 'cors'

import { 
  updateGoogleSpreadSheet,
  extractDomData,
  cleanupData,
  sortData
 } from './util.js'

const { JSDOM } = jsdom

const app = express()
const port = 3000


app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.post('/apartment/:id', async (req, res) => {

  const spreadSheetId = req.params.id
  const link = req.body.apartmentLink

  try {    
    const page = await axios.get(link)
    const dom = new JSDOM(page.data)
    const scrapedData = extractDomData(dom)
    const cleanData = cleanupData(scrapedData)
    const sortedData = sortData(cleanData)    
    updateGoogleSpreadSheet(spreadSheetId, sortedData)
  } catch (err) {
    console.log(err);
  }
  res.status(200).json("Added apartment")
})


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})