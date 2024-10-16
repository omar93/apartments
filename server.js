import express from 'express'
import axios from 'axios'
import jsdom from 'jsdom'
import cors from 'cors'


import { 
  formatApartmentData, 
  getGoogleSpreadSheet,
  getGoogleSpreadSheetRows,
  updateGoogleSpreadSheet
 } from './util.js'

const { JSDOM } = jsdom

const spreadsheetId = '1B358lUbcOCVg_rF2Xr1ZTI205BZUWdhdErZK9VYtRtU'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(cors())
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const spreadSheet = await getGoogleSpreadSheet(spreadsheetId)
    const getRows = await getGoogleSpreadSheetRows(spreadsheetId)
    res.send(getRows.data)
  } catch (e) {
    console.log(e);
    
  }

})

app.post('/', async (req, res) => {

  const link = req.body.link
  
  try {
    let page = await axios.get(link)  
    const dom = new JSDOM(page.data)
    let data = formatApartmentData(dom, link)
    updateGoogleSpreadSheet(spreadsheetId, data)
  } catch (err) {
    console.log(err);
    
  }
  res.status(200).json("Added apartment")
})


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})