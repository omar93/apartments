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
  let linkText = dom.window.document.querySelector('h1')  
  const attributesKeys = dom.window.document.querySelectorAll('.AttributeRow_attributeNames__nflW3')
  const attributesValues = dom.window.document.querySelectorAll('.AttributeRow_attributeValue__LUAyu')

  dataObject.price = price

  const exludedKeys = [
    'Premium', 
    ' ',
    '', 
    'Antal besök',
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
      dataObject[key.textContent.toString()] = value
    }

  })

  const googleSheetsData = calculatePrices(dataObject, link, linkText.textContent)
  return googleSheetsData

}

const calculatePrices = (data, link, linkText) => {
  console.log(data);
  
  let kontant = 2000000


  let price = parseInt(data.price.split('kr')[0].replaceAll("\u00A0", ""))
  let avgift = parseInt(data.Avgift.split('kr')[0].replaceAll("\u00A0", ""))

  if(data.Driftkostnad) {
    let driftKostnad = parseInt(data.Driftkostnad.split('kr')[0].replaceAll("\u00A0", ""))
    data.Driftkostnad = driftKostnad/12
  }

  data.Avgift = avgift
  data['Ränta'] = null
  data.rank = 0
  data.Driftkostnad = 0
  data.monthlyCost = null
  data.link =  `=HYPERLINK("${link}", "${linkText}")`
  data.price = price

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
    'hiss',
    'Byggår',
    'Balkong',
    'Våning',
    'Förening',
    'Energiklass'
  ];

  let dataInOrder = getOrderedValues(data, desiredOrder)
  
  return dataInOrder

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
    range: 'nodejs!A:N',
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [data]
    }
  })

  // googleSheets.spreadsheets.batchUpdate({
  //   auth,
  //   spreadsheetId:id,
    
  // })
}

