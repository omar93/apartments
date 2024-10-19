const submitButton = document.querySelector('#addButton')
const inputLink = document.querySelector('#inputField')

submitButton.addEventListener('click', async () => {    
    let request = fetch("http://localhost:3000", {
        method: "POST",
        body: JSON.stringify({link: inputLink.value}),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
})