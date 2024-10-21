
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

export const extractDomData = (dom) => {
  
  let dataObject = {}
  
  const price = dom.window.document.querySelector('.ListingPrice_listingPrice__jg_CG').textContent
  const linkText = dom.window.document.querySelector('h1')
  const url = dom.window.document.querySelector('link[rel="canonical"]').href
  const attributesKeys = dom.window.document.querySelectorAll('.AttributeRow_attributeNames__nflW3')
  const attributesValues = dom.window.document.querySelectorAll('.AttributeRow_attributeValue__LUAyu')

  dataObject.price = price
  dataObject.address = linkText.textContent
  dataObject.url = url

  const keys = Array.from(attributesKeys)
  const values = Array.from(attributesValues)

  keys.forEach((key, i) => {
    dataObject[key.textContent.toString()] = values[i].textContent
  })

  const UnusedProperties = [
    'Premium', 
    ' ',
    '', 
    'Antal besök',
  ]

  let wantedData = removeUnusedProperties(UnusedProperties, dataObject)

  return wantedData

}

export const cleanupData = (data) => {
  
  const cleanPrice = parseInt(data.price.split('kr')[0].replaceAll("\u00A0", ""))

  data.price = cleanPrice
  data['Ränta'] = null
  data.rank = 0


  data.monthlyCost = null
  data.link = `=HYPERLINK("${data.url}", "${data.address}")`

  if(data.Avgift) {
    const cleanAvgift = parseInt(data.Avgift.split('kr')[0].replaceAll("\u00A0", ""))
    data.Avgift = cleanAvgift
  } else {
    data.Avgift = 0
  }
 
  if(data.Driftkostnad) {
    const cleanDriftKostnad = parseInt(data.Driftkostnad.split('kr')[0].replaceAll("\u00A0", ""))/12
    data.Driftkostnad = cleanDriftKostnad
  } else {
    data.Driftkostnad = 0
  }

  const unwantedProperties = ['url', 'address']
  data = removeUnusedProperties(unwantedProperties, data) 
  
  return data
}

export const sortData = (data) => {
  calculatePricePoints(data)
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
  ]

  
  return desiredOrder.map(key => data[key])
}

export const updateGoogleSpreadSheet = async (id, data) => {
  googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId:id,
    range: 'nodejs!A:N',
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [data]
    }
  })
}

const removeUnusedProperties = (unwantedKeys, dirtyData) => {


  unwantedKeys.forEach(key => {
    delete dirtyData[key]
  })

  return dirtyData
}

const calculatePricePoints = (data) => {
  
  let bestPrice = 2000000
  let worstPrice = 3500000
  let price = data.price
  let maxPoints = 80
  let minPoints = 60

  let rank = minPoints+((maxPoints-minPoints)/(worstPrice-bestPrice))*(worstPrice-price)
}


