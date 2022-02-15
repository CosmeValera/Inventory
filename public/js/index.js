var modal;
var settings = new Object();
settings.bigInstruments = false;
settings.priceWithDecimals = false;
settings.filterType = false;
settings.filterPrice = false;

async function loadInstrumentsFromDBToTable() {
    const response = await fetch("/inventory");
    if (response.ok) {
        var instrumentsJson = await response.json();
        instrumentsJson = applyFilter(instrumentsJson);

        var dataPug = {
            instruments: instrumentsJson,
            bigInstruments: settings.bigInstruments,
            priceWithDecimals: settings.priceWithDecimals,
            filterType: settings.filterType,
            filterPrice: settings.filterPrice
        };
        document.querySelector("tbody").innerHTML = insertInstruments({
            data: dataPug,
        });
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

function applyFilter(instrumentsJson) {
    switch (settings.filterType) {
        case "type-string":
            instrumentsJson = instrumentsJson.filter((instrument) => {
                return instrument.type == "String";
            });
            break;
        case "type-percussion":
            instrumentsJson = instrumentsJson.filter((instrument) => {
                return instrument.type == "Percussion";
            });
            break;
        case "type-wind-all":
            instrumentsJson = instrumentsJson.filter((instrument) => {
                return instrument.type == "Wind";
            });
            break;
        case "type-wind-wood":
            instrumentsJson = instrumentsJson.filter((instrument) => {
                return (
                    instrument.type == "Wind" && instrument.subtype == "Wood"
                );
            });
            break;
        case "type-wind-brass":
            instrumentsJson = instrumentsJson.filter((instrument) => {
                return (
                    instrument.type == "Wind" && instrument.subtype == "Brass"
                );
            });
            break;
    }
    switch (settings.filterPrice) {
        case "price-low-to-high":
            instrumentsJson = instrumentsJson.sort((a, b) => {
                return a.price - b.price;
            });
            break;
        case "price-high-to-low":
            instrumentsJson = instrumentsJson.sort((a, b) => {
                return a.price - b.price;
            });
            instrumentsJson = instrumentsJson.reverse();
            break;
    }
    return instrumentsJson;
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

async function changeInstrumentsPriceDecimals(evt) {
    //When clicking the checkbox
    if (evt.target.checked) {
        settings.priceWithDecimals = true;
    } else {
        settings.priceWithDecimals = false;
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
            errMessage(response);
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
            loadInstrumentsFromDBToTable(settings.filter);
        } else {
            errMessage(response);
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
    //Check instrument is empty
    if (response.ok && instrumentJson) {
        modalContent = modal.querySelector(".modal-content");
        modalContent.innerHTML = insertUpdateInstrument({
            instrument: instrumentJson,
        });
        fillModalUpdateWithInstrumentsData(instrumentJson);
        defineButtonsEffectOfModalUpdate();
        modal.style.display = "block";
    } else {
        errMessage(response);
    }
}

async function showModalDetails(id) {
    const response = await fetch(`/inventory/${id}`);
    var instrumentJson = await response.json();
    if (response.ok && instrumentJson) {
        modalContent = modal.querySelector(".modal-content");
        modalContent.innerHTML = insertDetailsInstrument({
            instrument: instrumentJson,
        });
        document.querySelector(".close").onclick = function () {
            modal.style.display = "none";
        };
        modal.style.display = "block";
    } else {
        errMessage(response);
    }
}

async function instrumentRowClicked(evt) {
    const instrumentRow = evt.target;
    if (instrumentRow.closest("#titles")) {
        clickInPriceSwitch(instrumentRow);
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
        showModalUpdate(evt, id);
        return;
    }
    //If it is not delete nor update, we want to show details with modal page
    showModalDetails(id);
}

function clickInPriceSwitch(instrumentRow) {
    if (instrumentRow.classList.contains("price-switch")) {
        if (
            settings.filterPrice == false ||
            settings.filterPrice == "price-high-to-low"
        ) {
            settings.filterPrice = "price-low-to-high";
        } else {
            settings.filterPrice = "price-high-to-low";
        }
        loadInstrumentsFromDBToTable();
    }
}

async function modalClicked(evt) {
    const buttonClicked = evt.target;
    const id = findSiblingIdUsingDom(
        buttonClicked,
        ".modal",
        ".modal-invisible-id"
    );
    //Check click delete button
    if (buttonClicked.classList.contains("delete-button")) {
        document.querySelector(".close").click(); //Close modal page
        deleteInstrument(evt, id);
        return;
    }
    //Check click update button
    if (buttonClicked.classList.contains("update-button")) {
        showModalUpdate(evt, id);
        return;
    }
}

async function navbarFilterClicked(evt) {
    buttonFilterClicked = evt.target;

    //Check click in filter button
    if (buttonFilterClicked.classList.contains("type-string")) {
        settings.filterType = "type-string";
    }
    if (buttonFilterClicked.classList.contains("type-percussion")) {
        settings.filterType = "type-percussion";
    }
    if (buttonFilterClicked.classList.contains("type-wind-all")) {
        settings.filterType = "type-wind-all";
    }
    if (buttonFilterClicked.classList.contains("type-wind-wood")) {
        settings.filterType = "type-wind-wood";
    }
    if (buttonFilterClicked.classList.contains("type-wind-brass")) {
        settings.filterType = "type-wind-brass";
    }
    if (buttonFilterClicked.classList.contains("price-low-to-high")) {
        settings.filterPrice = "price-low-to-high";
    }
    if (buttonFilterClicked.classList.contains("price-high-to-low")) {
        settings.filterPrice = "price-high-to-low";
    }
    loadInstrumentsFromDBToTable();
}

//Utility methods
function errMessage(response) {
    //If 1 person deletes an instrument, and another one tries to see details after, fetch will return empty
    alert(
        "Server found an issue. " +
            (response.statusText != "OK"
                ? response.statusText
                : "Data has been altered, try again after refreshing the page")
    );
}

function findSiblingIdUsingDom(actualElement, parentClass, siblingClass) {
    //parent: .modal-body, child: .modal-invisible-id
    const parentDiv = actualElement.closest(parentClass);
    const divWithId = parentDiv.querySelector(siblingClass);
    const id = divWithId.innerHTML.trim(); //Id without spaces
    return id;
}

//Filter inits
document
    .querySelector(".navbar")
    .addEventListener("click", navbarFilterClicked);
document
    .getElementById("switchBigImg")
    .addEventListener("change", changeInstrumentsSize);
document
    .getElementById("switchPriceDecimals")
    .addEventListener("change", changeInstrumentsPriceDecimals);

//Modal inits
document.querySelector("tbody").addEventListener("click", instrumentRowClicked);
modal = document.getElementById("myModal");
modal.addEventListener("click", modalClicked);
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

loadInstrumentsFromDBToTable();
