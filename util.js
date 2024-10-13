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

export const formatApartmentData = (dom) => {
  
  let dataObject = {}
  
  const price = dom.window.document.querySelector('.ListingPrice_listingPrice__jg_CG').textContent
  const attributesKeys = dom.window.document.querySelectorAll('.AttributeRow_attributeNames__nflW3')
  const attributesValues = dom.window.document.querySelectorAll('.AttributeRow_attributeValue__LUAyu')

  dataObject.price = price

  const exludedKeys = ['Premium', ' ','']

  let keys = Array.from(attributesKeys)
  let values = Array.from(attributesValues)

  keys.forEach((key,i) => {

    if(!exludedKeys.includes(key.textContent)) {
      dataObject[key.textContent.toString()] = values[i].textContent
    }

  })

  return dataObject

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
      values: [
        Object.values(data)
      ]
    }

  })
}
