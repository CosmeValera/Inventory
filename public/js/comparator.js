var modal;
var leftTbody;
var rightTbody;
var instrumentsJson = new Object();
var settings = new Object();
settings.filterSonority = false;

async function loadInstrumentsFromDBToArray() {
    const response = await fetch("/inventory");
    if (response.ok) {
        instrumentsJson = await response.json();

        //TODO: another pug, that shows sonority instead of price
        // document.querySelector("tbody").innerHTML = insertInstruments({
        //     data: dataPug,
        // });
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

function leftTbodyClicked(evt) {
    const leftInstruments = leftTbody.querySelectorAll(".this-is-a-table-row");
    let leftTableRow = evt.target.closest(".this-is-a-table-row");

    for (let instrumentLeftRow of leftInstruments) {
        if (instrumentLeftRow != leftTableRow)
            instrumentLeftRow.classList.remove("instrument-row-picked");
    }
    leftTableRow.classList.toggle("instrument-row-picked");
}
function rightTbodyClicked(evt) {
    const rightInstruments = rightTbody.querySelectorAll(
        ".this-is-a-table-row"
    );
    let rightTableRow = evt.target.closest(".this-is-a-table-row");

    for (let instrumentRightRow of rightInstruments) {
        if (instrumentRightRow != rightTableRow)
            instrumentRightRow.classList.remove("instrument-row-picked");
    }
    rightTableRow.classList.toggle("instrument-row-picked");
}

async function loadInstrumentsInLeftTbody() {
    dataPug = {
        instruments: instrumentsJson,
        filterSonority: settings.filterSonority,
    };
    leftTbody.innerHTML = insertInstrumentsComparator({
        data: dataPug,
    });
    leftTbody.addEventListener("click", leftTbodyClicked);
}

async function loadInstrumentsInRightTbody() {
    dataPug = {
        instruments: instrumentsJson,
        filterSonority: settings.filterSonority,
    };
    rightTbody.innerHTML = insertInstrumentsComparator({
        data: dataPug,
    });
    rightTbody.addEventListener("click", rightTbodyClicked);
}

async function loadInitialData() {
    await loadInstrumentsFromDBToArray();
    await loadInstrumentsInLeftTbody();
    await loadInstrumentsInRightTbody();
}

//Inits
var leftTbody = document.querySelector("#left-tbody");
var rightTbody = document.querySelector("#right-tbody");

//Load
loadInitialData();
