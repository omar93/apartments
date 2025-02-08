const inputLink = document.querySelector('#inputField')

const submitButton = document.querySelector('#addApartment')
const newSpreadSheetButton = document.querySelector('#newSpreadSheetButton')

let spreadSheetSection = document.querySelector('#spreadSheetWrapper')
let newSpreadSheetWrapperSection = document.querySelector('#newSpreadSheetSection')

submitButton.addEventListener('click', async () => {    
    let request = fetch("http://localhost:3000", {
        method: "POST",
        body: JSON.stringify({link: inputLink.value}),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
})

newSpreadSheetButton.addEventListener('click', async () => {
  spreadSheetSection.classList.remove('hidden')
  newSpreadSheetWrapperSection.classList.add('hidden')
})

let localstorage = window.localStorage.getItem('spreadsheetid')
console.log(localstorage);


const setBrowserDefault = () => {

  spreadSheetSection.classList.add('hidden')


  newSpreadSheetWrapperSection.classList.remove('hidden')

}

if(!localstorage) {
  setBrowserDefault()
}