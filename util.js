import {arrayMoveImmutable} from 'array-move'
import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

const client = await auth.getClient()

const googleSheets = google.sheets({
  version: 'v4',
  auth: client
})

export const formatApartmentData = (dom, link) => {
  
  let dataObject = {}
  
  const price = dom.window.document.querySelector('.ListingPrice_listingPrice__jg_CG').textContent
  const attributesKeys = dom.window.document.querySelectorAll('.AttributeRow_attributeNames__nflW3')
  const attributesValues = dom.window.document.querySelectorAll('.AttributeRow_attributeValue__LUAyu')

  dataObject.price = price

  const exludedKeys = [
    'Premium', 
    ' ',
    '', 
    'Antal besök', 
    'Pris/m²',
  ]

  let keys = Array.from(attributesKeys)
  let values = Array.from(attributesValues)

  keys.forEach((key,i) => {
    let value = values[i].textContent

    if(!exludedKeys.includes(key.textContent)) {
      if(key.textContent === 'Våning') {
        value = value.split(',')
        dataObject.hiss = value[1].trim()
        dataObject.Våning = value[0].trim()
        return
      }
      if(key.textContent === 'Driftkostnad') {
        value = value.split('kr')
        dataObject.Driftkostnad = parseInt(value[0])
        return
      }
      dataObject[key.textContent.toString()] = value
    }

  })


  const googleSheetsData = calculatePrices(dataObject, link)
  return googleSheetsData

}

const calculatePrices = (data, link) => {
  let kontant = 2000000
  let price = parseInt(data.price.split('kr')[0].replaceAll("\u00A0", ""))  
  let avgift = parseInt(data.Avgift.split('kr')[0].replaceAll("\u00A0", ""))

  data.Avgift = avgift
  data['Ränta'] = Math.round((price-kontant)*(2.25/12)/100)
  data.rank = 0
  
  data.monthlyCost = data.Avgift + data.Ränta + data.Driftkostnad

  data.link = link

  const desiredOrder = [
    'rank',
    'link',
    'price',
    'Avgift',
    'Ränta',
    'Driftkostnad',
    'monthlyCost',
    'Boarea',
    'Antal rum',
    'Bostadstyp',
    'Upplåtelseform',
    'Balkong',
    'hiss',
    'Våning',
    'Byggår',
    'Förening',
    'Energiklass'
  ];

  let swag = getOrderedValues(data, desiredOrder)
  
  return swag

}

function getOrderedValues(obj, keyOrder) {
  return keyOrder.map(key => obj[key]);
}

export const getGoogleSpreadSheet = async (id) => {
  const data = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId: id
  })
  return data
}

export const getGoogleSpreadSheetRows = async (id) => {
  const data = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: id,
    range: "Mall"
  })
  return data
}

export const updateGoogleSpreadSheet = async (id, data) => {
  console.log(data);
  
  googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId:id,
    range: 'test!A:N',
    valueInputOption: "RAW",
    resource: {
      values: [data]
    }

  })
}

