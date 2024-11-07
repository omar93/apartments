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

app.post('/', async (req, res) => {

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

app.get('/db', (req, res) => {
  console.log("tja");
  
  res.send('tja')
})

app.get('/db/tables', (req, res) => {
  const query = `SELECT name FROM sqlite_master WHERE type='table'`
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message)
      res.status(500).send(err.message)
    } else {
      res.json(rows.map(row => row.name))
    }
  })
})

app.post('/db/table/:name/create', (req, res) => {
  const tableName = req.params.name
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(id, INTEGER PRIMARY KEY, first_name, last_name)`
  try {
    db.run(query)
  } catch (err) {
    console.error(err.message)
  } finally {
    // db.close()
  }
  res.sendStatus(201)
})

app.post('/db/table/:name/delete', (req, res) => {
  const tableName = req.params.name
  const query = `DROP TABLE ${tableName}`
  try {
    db.run(query)
  } catch (err) {
    console.error(err.message)
  }
  res.sendStatus(201)
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})