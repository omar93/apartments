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