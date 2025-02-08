<script>

    let { data } = $props()
    let options = $derived(data.data)

    let createTableName = $state('new table name')
    let deleteTableName = $state('omar')
    

    const createTable = () => {
        fetch(`http://localhost:3000/db/table/${createTableName}/create`, {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    const DeleteTable = (e) => {
        let currentOption = e
        console.log(currentOption.parent);
             
        fetch(`http://localhost:3000/db/table/${deleteTableName}/delete`, {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }
</script>

<h1>DB managment</h1>

<label for="table-name" >Table name</label>
<input type="text" name="table-name" id="table-name" bind:value={createTableName}>
<button onclick={createTable}>Create table</button>

<br>

<label for="table-name" >Table name</label>
<select name="tables" id="tables" bind:value={deleteTableName}>
    {#each options as tableName}
        <option bind:this={currentOption}> {tableName} </option>
    {/each}
</select>
<button onclick={DeleteTable}>Delete table</button>