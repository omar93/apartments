import express from 'express'
import axios from 'axios'
import jsdom from 'jsdom'
import cors from 'cors'
import sqlite3 from 'sqlite3'

import { 
  updateGoogleSpreadSheet,
  extractDomData,
  cleanupData,
  sortData
 } from './util.js'

const { JSDOM } = jsdom

const app = express()
const port = 3000
const db = new sqlite3.Database('./dev.db', sqlite3.OPEN_READWRITE, err => {
  if (err) {
    throw new TypeError('Could not connect to database')
  }
})

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.post('/apartment/:id', async (req, res) => {

  const link = req.body.link

  try {    
    const page = await axios.get(link)
    const dom = new JSDOM(page.data)
    const scrapedData = extractDomData(dom)
    const cleanData = cleanupData(scrapedData)
    const sortedData = sortData(cleanData)    
    updateGoogleSpreadSheet(process.env.SPREADSHEETID, sortedData)
  } catch (err) {
    console.log(err);
  }
  res.status(200).json("Added apartment")
})


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})