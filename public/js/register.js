var modal;
async function loadRecordsFromDBToTable() {
    const response = await fetch("/register");
    if (response.ok) {
        var recordsJson = await response.json();
        var dataPug = {
            records: recordsJson,
            // bigInstruments: settings.bigInstruments,
        };

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

async function recordRowClicked(evt) {
    const recordRow = evt.target;
    if (evt.target.closest("#titles")) {
        return;
    }
    const id = findSiblingIdUsingDom(
        recordRow,
        ".this-is-a-table-row",
        ".secret-invisible-id"
    );

    const response = await fetch(`/register/${id}`);

    if (response.ok) {
        record = await response.json();
        switch (record.type) {
            case "Add":
                instrument = record.summaryAdd;
                instrumentJson = JSON.parse(instrument);
                console.log(instrumentJson);

                modalContent = modal.querySelector(".modal-content");
                modalContent.innerHTML = insertModalAddRecord({
                    instrument: instrumentJson,
                });
                document.querySelector(".close").onclick = function () {
                    modal.style.display = "none";
                };
                modal.style.display = "block";
                break;
            case "Delete":
                instrument = record.summaryDelete;
                instrumentJson = JSON.parse(instrument);
                console.log(instrumentJson);
                break;
            case "Update":
                instrumentsJSON = JSON.parse(record.summaryUpdate);
                oldInstrument = instrumentsJSON.oldInstrument;
                newInstrument = instrumentsJSON.newInstrument;
                console.log(oldInstrument.name);
                console.log(newInstrument.name);
                break;
        }
    } else {
    }
}

function findSiblingIdUsingDom(actualElement, parentClass, siblingClass) {
    //parent: .modal-body, child: .modal-invisible-id
    const parentDiv = actualElement.closest(parentClass);
    const divWithId = parentDiv.querySelector(siblingClass);
    const id = divWithId.innerHTML.trim(); //Id without spaces
    return id;
}

//Inits
document
    .querySelector("#removeRecordsButton")
    .addEventListener("click", deleteRecords);
document.querySelector("tbody").addEventListener("click", recordRowClicked);
modal = document.getElementById("myModal");
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
loadRecordsFromDBToTable();

//TODO: when you click a card in the table, a modal should appear, and it will call a pug modal,
//and it will show you the instrument/s that is in that record. Maybe create and delete use same
//modal(maybe one green and the other red for instance), and delete orther.
