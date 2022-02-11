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
        method: "DELETE",
    }).then((response) => {
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

document
    .querySelector("#removeRecordsButton")
    .addEventListener("click", deleteRecords);

loadRecordsFromDBToTable();

//TODO: when you click a card in the table, a modal should appear, and it will call a pug modal,
//and it will show you the instrument/s that is in that record. Maybe create and delete use same
//modal(maybe one green and the other red for instance), and delete orther.
