async function loadRecordsFromDBToTable() {
    const response = await fetch("/register");
    if (response.ok) {
        // var recordsJson = await response.json();
        var recordsJson = {
            _id: "123",
            type: "add",
            summary: "saxophone was added",
        };
        console.log(recordsJson);
        var dataPug = {
            records: recordsJson,
            // bigInstruments: settings.bigInstruments,
        };

        console.log(document.querySelector("tbody"));
        // console.log(
        //     insertRecords({
        //         records: recordsJson,
        //     })
        // );
        document.querySelector("tbody").innerHTML = insertRecords({
            data: dataPug,
        });
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

loadRecordsFromDBToTable();
