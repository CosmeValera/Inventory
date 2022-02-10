async function loadRecordsFromDBToTable() {
    const response = await fetch("/register");
    if (response.ok) {
        var recordsJson = await response.json();
        var dataPug = {
            records: recordsJson,
            // bigInstruments: settings.bigInstruments,
        };

        console.log(dataPug);
        document.querySelector("tbody").innerHTML = insertRecords({
            data: dataPug,
        });
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

async function deleteRecords() {
    await fetch("/register", {
        method: "DELETE"
    }).then((response)=>{
        if (response.ok) {
            loadRecordsFromDBToTable();
            res.send(200);
        } else {
            alert(
                `Server found an issue trying to delete all records, ` +
                    response.statusText
            );
        }
    });
}

document.querySelector("#removeRecordsButton").addEventListener("click", deleteRecords);


loadRecordsFromDBToTable();