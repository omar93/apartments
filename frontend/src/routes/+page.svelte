<script>
    let link = ''
    const handleClick = async() => {
        fetch("http://localhost:3000", {
            method: "POST",
            body: JSON.stringify({link}),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
    }
</script>

<div id="wrapper">
    <div id="input-wrapper">
        <label for="link">Hemnet länk:</label>
        <input type="text" name="link" id="link" bind:value={link}>
        <input type="submit" value="Add" onclick={handleClick}>
    </div>
    <div id="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>pris</th>
                    <th>Avgift</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1500000</td>
                    <td>5000</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<style>
    :root {
        font-family: sans-serif;
    }

    #wrapper {
        padding: 0;
        margin-right: 0;
        display: grid;
        place-items: center;
    }

    #input-wrapper {
        display: flex;
        flex-direction: column;
    }

    #table-wrapper {
        margin-top: 100px;
    }
    
    /* Basic table styling */
    table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 20px 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    /* Header row styling */
    table th {
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
        padding: 12px 15px;
        text-align: left;
    }

    /* Body cell styling */
    table td {
        padding: 10px 15px;
        border-bottom: 1px solid #dddddd;
    }

    /* Alternating row color */
    table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    /* Hover effect for rows */
    table tr:hover {
        background-color: #d1e7dd;
    }

    @media screen and (max-width: 768px) {
    table, tbody, th, td, tr {
        display: block;
        width: 100%;
    }

    table tr {
        margin-bottom: 10px;
    }

    table td, table th {
        padding: 12px 10px;
        text-align: right;
    }

    /* Adding a "before" pseudo-element to label columns on small screens */
    table td::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        color: #333;
    }
}

</style>