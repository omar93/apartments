<script>
    import { onMount } from "svelte";

    let apartmentLink = ''
    let sheetLink = ''
    let sheetPostLink = ''

    onMount(() => {
        let sheet = localStorage.getItem('sheet')
        if(sheet) {
            sheetPostLink = sheet
            updateIframe(sheetPostLink)
        }
    })

    const handleNewApartment = async() => {
        fetch(`http://localhost:3000/apartment/${sheetPostLink}`, {
            method: "POST",
            body: JSON.stringify({apartmentLink}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        apartmentLink = ''
    }

    const handleNewSheet = () => {
        localStorage.setItem('sheet', sheetLink)
        updateIframe(sheetLink)
        sheetPostLink = sheetLink.split('.com/')[1].split('/edit')[0].split('d/')[1]        
        sheetLink = ''
    }

    const updateIframe = (link) => {
        document.querySelector('#iframe').src = link
    }
    
</script>

<div id="wrapper">

    <div id="iframe-container">
        <iframe title="spreadsheet" id="iframe" src="" frameborder="0"></iframe>
    </div>

    <div id="bottom-section-wrapper">

        <div class="input-wrapper box-style">
            <div id="sheet-label">
                <label for="spreadSheetInput">new spreadsheet link:</label>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label>Current spreadsheet: 
                    {#if sheetPostLink != ''}
                        <a href="{sheetPostLink}">Spreadsheet Link</a>
                    {/if}
                </label>
            </div>
            <div class="inputs">
                <input type="text" name="spreadSheetInput" id="spreadSheetInput" bind:value={sheetLink}>
                <input type="submit" value="Use" onclick={handleNewSheet}>
            </div>
        </div>
        
        {#if sheetPostLink != ''}
            <div class="input-wrapper box-style">
                <label for="link">Hemnet länk:</label>
                <div class="inputs">
                    <input type="text" name="link" id="link" bind:value={apartmentLink}>
                    <input type="submit" value="Add" onclick={handleNewApartment}>
                </div>
            </div>
        {/if}

        <div id="instructions-wrapper" class="box-style">
            <p id="instructions">Instructions: <br>
                <br>
                Create a new spreadsheet or use an existing one, click on "share" then add: <br> <br> <b>apartments@apartments-438418.iam.gserviceaccount.com</b> <br><br> as an editor
            </p>
        </div>
    
    </div>

</div>


<style>
    #wrapper {
        font-family: sans-serif;
        height: 98dvh;
        display: flex;
        flex-direction: column;
        width: 98dvw;
    }
    #iframe-container {
        width: 100%;
        height: 100%;
    }
    #bottom-section-wrapper {
        font-family: sans-serif;
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
        gap: 1rem;
        padding: 1rem;
    }
    #sheet-label {
        display: flex;
        justify-content: space-between;
    }
    .input-wrapper {
        display: flex;
        flex-direction: column;
    }
    .inputs {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    input[type=text] {
        height: 25px;
    }
    input[type=submit] {
        height: 30px;
        font-size: 1rem;
    }
    #instructions-wrapper {
        font-size: 1rem;
        font-family: sans-serif;
    }
    .box-style {
        border: 2px solid rgba(0, 0, 0, 0.342);
        background-color: bisque;
        border-radius: .5rem;
        margin-top: 10px;
        padding: 1rem;
        gap: 15px;
    }
    iframe {
        width: 100%;
        height: 100%;
        border-bottom: 10px solid black;
    }
</style>