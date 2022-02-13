var modal;
var settings = new Object();
settings.bigInstruments = false;

async function loadInstrumentsFromDBToTable() {
    const response = await fetch("/inventory");
    if (response.ok) {
        var instrumentsJson = await response.json();
        var dataPug = {
            instruments: instrumentsJson,
            bigInstruments: settings.bigInstruments,
        };

        document.querySelector("tbody").innerHTML = insertInstruments({
            data: dataPug,
        });
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

async function changeInstrumentsSize(evt) {
    //When clicking the checkbox
    if (evt.target.checked) {
        settings.bigInstruments = true;
    } else {
        settings.bigInstruments = false;
    }
    loadInstrumentsFromDBToTable();
}

async function deleteInstrument(evt, idParam) {
    await fetch(`/inventory/${idParam}`, {
        method: "DELETE",
    }).then((response) => {
        if (response.ok) {
            loadInstrumentsFromDBToTable(evt);
        } else {
            alert(
                `Server found an issue trying to delete instrument with id: ${idParam}, ` +
                    response.statusText
            );
        }
    });
}

async function updateInstrument(evt, instrument) {
    await fetch(`/inventory/${instrument._id}`, {
        method: "PUT",
        body: JSON.stringify(instrument),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.ok) {
            loadInstrumentsFromDBToTable(evt);
        } else {
            alert(
                `Server found an issue trying to delete instrument with id: ${idParam}, ` +
                    response.statusText
            );
        }
    });
}

async function obtainValuesAndUpdate(evt) {
    //obtain instrument data from modal-update
    var instrument = {
        //evt.target(acceptButton). Parent= ".modal-body", sibling="modal-invisible-id"
        _id: findSiblingIdUsingDom(
            evt.target,
            ".modal-body",
            ".modal-invisible-id"
        ),
        name: document.querySelector("#selectName").value,
        type: document.querySelector("#selectType").value,
        subtype: document.querySelector("#selectSubtype").value,
        price: document.querySelector("#inputPrice").value,
        sonority: document.querySelector("#inputSonority").value,
        summary: document.querySelector("#inputSummary").value,
    };

    updateInstrument(evt, instrument).then(() => {
        modal.style.display = "none";
    });
}

function fillModalUpdateWithInstrumentsData(instrument) {
    document.querySelector("#selectName").value = instrument.name;
    document.querySelector("#selectType").value = instrument.type;
    document.querySelector("#selectSubtype").value = instrument.subtype;
    document.querySelector("#inputPrice").value = instrument.price;
    document.querySelector("#inputSonority").value = instrument.sonority;
    document.querySelector("#inputSummary").value = instrument.summary;
}

function defineButtonsEffectOfModalUpdate() {
    document.querySelector(".close").onclick = function () {
        modal.style.display = "none";
    };
    // document.querySelector(".cancel-update-button").onclick = function () {
    //     modal.style.display = "none";
    // };
    document
        .querySelector(".accept-update-button")
        .addEventListener("click", obtainValuesAndUpdate);
}

async function showModalUpdate(evt, id) {
    const response = await fetch(`/inventory/${id}`);
    var instrumentJson = await response.json();
    //If instrument comes empty, it should tell you
    if (response.ok && instrumentJson) {
        modalContent = modal.querySelector(".modal-content");
        modalContent.innerHTML = insertUpdateInstrument({
            instrument: instrumentJson,
        });
        fillModalUpdateWithInstrumentsData(instrumentJson);
        defineButtonsEffectOfModalUpdate();
        modal.style.display = "block";
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

async function showModalDetails(id) {
    const response = await fetch(`/inventory/${id}`);
    if (response.ok) {
        var instrumentJson = await response.json();

        modalContent = modal.querySelector(".modal-content");
        modalContent.innerHTML = insertDetailsInstrument({
            instrument: instrumentJson,
        });
        document.querySelector(".close").onclick = function () {
            modal.style.display = "none";
        };
        modal.style.display = "block";
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

async function instrumentRowClicked(evt) {
    const instrumentRow = evt.target;
    if (evt.target.closest("#titles")) {
        return;
    }
    const id = findSiblingIdUsingDom(
        instrumentRow,
        ".this-is-a-table-row",
        ".secret-invisible-id"
    );
    if (instrumentRow.classList.contains("delete-button")) {
        deleteInstrument(evt, id);
        return;
    }
    if (instrumentRow.classList.contains("update-button")) {
        console.log(evt.target + " estamos en update");
        showModalUpdate(evt, id);
        return;
    }
    //If it is not delete nor update, we want to show details with modal page
    showModalDetails(id);
}

async function modalClicked(evt) {
    const buttonClicked = evt.target;
    const id = findSiblingIdUsingDom(
        buttonClicked,
        ".modal",
        ".modal-invisible-id"
    );
    //check we clicked delete button
    if (buttonClicked.classList.contains("delete-button")) {
        document.querySelector(".close").click(); //Close modal page
        deleteInstrument(evt, id);
        return;
    }
    //From here we open the other modal page, to edit the instrument
    if (buttonClicked.classList.contains("update-button")) {
        showModalUpdate(evt, id);
        return;
    }
}

function findSiblingIdUsingDom(actualElement, parentClass, siblingClass) {
    //parent: .modal-body, child: .modal-invisible-id
    const parentDiv = actualElement.closest(parentClass);
    const divWithId = parentDiv.querySelector(siblingClass);
    const id = divWithId.innerHTML.trim(); //Id without spaces
    return id;
}

//Modal inits
document
    .getElementById("switchBigImg")
    .addEventListener("change", changeInstrumentsSize);
document.querySelector("tbody").addEventListener("click", instrumentRowClicked);
modal = document.getElementById("myModal");
modal.addEventListener("click", modalClicked);
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

loadInstrumentsFromDBToTable();
