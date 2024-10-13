import express from 'express'
import axios from 'axios'
import jsdom from 'jsdom'
import cors from 'cors'

import { formatApartmentData } from './util.js'

const { JSDOM } = jsdom

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(cors())
app.use(express.json());

app.post('/', async (req, res) => {
  const link = req.body.link
  
  try {
    let page = await axios.get(link)  
    const dom = new JSDOM(page.data)
    let data = formatApartmentData(dom)

    // Use 'data' to update sheet
  } catch (err) {
    console.log(err);
    
  }

  res.status(200).json("Added apartment")
})


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})