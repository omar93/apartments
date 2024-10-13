export const formatApartmentData = (dom) => {

  let dataObject = {}
  
  const attributesKeys = dom.window.document.querySelectorAll('.AttributeRow_attributeNames__nflW3')
  const attributesValues = dom.window.document.querySelectorAll('.AttributeRow_attributeValue__LUAyu')

  let keys = Array.from(attributesKeys).slice(0, attributesKeys.length-1)
  let values = Array.from(attributesValues)

  keys.forEach((key,i) => {
    if(key.textContent.length != 0) {
        dataObject[key.textContent.toString()] = values[i].textContent
    }
  })

  
}