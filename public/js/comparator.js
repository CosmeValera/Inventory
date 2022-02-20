var modal;
var leftTbody;
var rightTbody;
var idLeftInstrument;
var idRightInstrument;
var instrumentsJson = new Object();
var settings = new Object();
settings.filterSonorityLeft = false;
settings.filterSonorityRight = false;

async function loadInstrumentsFromDBToArray() {
    const response = await fetch("/inventory");
    if (response.ok) {
        instrumentsJson = await response.json();
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

function applyFilterLeft(instrumentsJson) {
    switch (settings.filterSonorityLeft) {
        case "sonority-low-to-high":
            instrumentsJson = instrumentsJson.sort((a, b) => {
                return a.sonority - b.sonority;
            });
            break;
        case "sonority-high-to-low":
            instrumentsJson = instrumentsJson.sort((a, b) => {
                return a.sonority - b.sonority;
            });
            instrumentsJson = instrumentsJson.reverse();
            break;
    }
    return instrumentsJson;
}

function applyFilterRight(instrumentsJson) {
    switch (settings.filterSonorityRight) {
        case "sonority-low-to-high":
            instrumentsJson = instrumentsJson.sort((a, b) => {
                return a.sonority - b.sonority;
            });
            break;
        case "sonority-high-to-low":
            instrumentsJson = instrumentsJson.sort((a, b) => {
                return a.sonority - b.sonority;
            });
            instrumentsJson = instrumentsJson.reverse();
            break;
    }
    return instrumentsJson;
}

function decideWinnerInstrument(rightInstrumentJson, leftInstrumentJson) {
    // String always defeats Percussion.
    // Percussion always defeats Wind.
    // Wind always defeats String.
    // If both instruments have the same type, the one with more sonority wins.

    //Win leftInstrument
    if (
        (leftInstrumentJson.type == "String" &&
            rightInstrumentJson.type == "Percussion") ||
        (leftInstrumentJson.type == "Percussion" &&
            rightInstrumentJson.type == "Wind") ||
        (leftInstrumentJson.type == "Wind" &&
            rightInstrumentJson.type == "String")
    ) {
        return leftInstrumentJson;
    }
    //Wind rightInstrument
    if (
        (rightInstrumentJson.type == "String" &&
            leftInstrumentJson.type == "Percussion") ||
        (rightInstrumentJson.type == "Percussion" &&
            leftInstrumentJson.type == "Wind") ||
        (rightInstrumentJson.type == "Wind" &&
            leftInstrumentJson.type == "String")
    ) {
        return rightInstrumentJson;
    }

    if (rightInstrumentJson.sonority >= leftInstrumentJson.sonority) {
        return rightInstrumentJson;
    }
    if (leftInstrumentJson.sonority >= rightInstrumentJson.sonority) {
        return leftInstrumentJson;
    }
}

async function compareInstrumentsClicked(evt) {
    // console.log("left id is " + idLeftInstrument);
    // console.log("right id is " + idRightInstrument);
    let alertDiv = document.getElementById("alertDiv");
    if (
        !idLeftInstrument ||
        !idRightInstrument ||
        idLeftInstrument == idRightInstrument
    ) {
        let dataPug = {
            line: "0",
            lines: [
                "You must pick 2 instruments.",
                "And they must be different.",
            ],
            backgroundColor: "rgba(211, 45, 45, 0.78)",
            borderColor: "rgb(183, 38, 38)",
        };
        alertDiv.innerHTML = insertModalAlert({
            data: dataPug,
        });
        return;
    }
    alertDiv.innerHTML = "";

    //fetch both instruments
    const responseLeftInstrument = await fetch(
        `/inventory/${idLeftInstrument}`
    );
    let leftInstrumentJson = await responseLeftInstrument.json();
    const responseRightInstrument = await fetch(
        `/inventory/${idRightInstrument}`
    );
    let rightInstrumentJson = await responseRightInstrument.json();
    if (
        responseLeftInstrument.ok &&
        leftInstrumentJson &&
        responseRightInstrument.ok &&
        rightInstrumentJson
    ) {
        let winnerInstrumentJson = decideWinnerInstrument(
            leftInstrumentJson,
            rightInstrumentJson
        );
        let loserInstrumentJson =
            leftInstrumentJson._id == winnerInstrumentJson._id
                ? rightInstrumentJson
                : leftInstrumentJson;

        let instruments = {
            winnerInstrument: winnerInstrumentJson,
            loserInstrument: loserInstrumentJson,
        };

        modalContent = modal.querySelector(".modal-content");
        modalContent.innerHTML = insertModalComparison({
            instruments: instruments,
        });
        modalContent.classList.add("modal-content-comparison");
        document.querySelector(".close").onclick = function () {
            modal.style.display = "none";
        };
        modal.style.display = "block";
    } else {
        errMessage(response);
    }
}

function clickInLeftSonoritySwitch(clickedRow) {
    if (clickedRow.classList.contains("sonority-switch")) {
        if (
            settings.filterSonorityLeft == false ||
            settings.filterSonorityLeft == "sonority-high-to-low"
        ) {
            settings.filterSonorityLeft = "sonority-low-to-high";
        } else {
            settings.filterSonorityLeft = "sonority-high-to-low";
        }
        loadInstrumentsInLeftTbodyAndAddListener();
    }
}

function clickInRightSonoritySwitch(clickedRow) {
    if (clickedRow.classList.contains("sonority-switch")) {
        if (
            settings.filterSonorityRight == false ||
            settings.filterSonorityRight == "sonority-high-to-low"
        ) {settings.filterSonorityRight = "sonority-low-to-high";
        } else {settings.filterSonorityRight = "sonority-high-to-low";
        }
        loadInstrumentsInRightTbodyAndAddListener();
    }
}

function leftTbodyClicked(evt) {
    //Check titles and sonority
    const clickedRow = evt.target;
    if (clickedRow.closest("#titles")) {
        clickInLeftSonoritySwitch(clickedRow);
        return;
    }

    //Toggle click color
    let clickedleftTableRow = clickedRow.closest(".this-is-a-table-row");
    const leftInstruments = leftTbody.querySelectorAll(".this-is-a-table-row");
    let variableDeselectLeftId;
    for (let instrumentLeftRow of leftInstruments) {
        if (instrumentLeftRow != clickedleftTableRow) {
            instrumentLeftRow.classList.remove("instrument-row-picked");
        }
        if (
            instrumentLeftRow == clickedleftTableRow &&
            instrumentLeftRow.classList.contains("instrument-row-picked")
        ) {
            variableDeselectLeftId = true;
        }
    }
    clickedleftTableRow.classList.toggle("instrument-row-picked");

    if (variableDeselectLeftId) {
        idLeftInstrument = undefined;
        return;
    }
    //Save leftInstrument id
    idLeftInstrument = findChildIdUsingDom(
        clickedleftTableRow,
        ".secret-invisible-id"
    );
}
function rightTbodyClicked(evt) {
    //Check titles and sonority
    const clickedRow = evt.target;
    if (clickedRow.closest("#titles")) {
        clickInRightSonoritySwitch(clickedRow);
        return;
    }

    //Toggle click color
    let clickedRightTableRow = evt.target.closest(".this-is-a-table-row");
    const rightInstruments = rightTbody.querySelectorAll(
        ".this-is-a-table-row"
    );
    let variableDeselectRightId;
    for (let instrumentRightRow of rightInstruments) {
        if (instrumentRightRow != clickedRightTableRow)
            instrumentRightRow.classList.remove("instrument-row-picked");
        if (
            instrumentRightRow == clickedRightTableRow &&
            instrumentRightRow.classList.contains("instrument-row-picked")
        ) {
            variableDeselectRightId = true;
        }
    }
    clickedRightTableRow.classList.toggle("instrument-row-picked");

    if (variableDeselectRightId) {
        idRightInstrument = undefined;
        return;
    }
    //Save rightInstrument id
    idRightInstrument = findChildIdUsingDom(
        clickedRightTableRow,
        ".secret-invisible-id"
    );
}

function keepToggledLeftRow() {
    //1. obtain all rows
    let leftRowsHTML = leftTbody.querySelectorAll(".this-is-a-table-row");
    for (let leftRowHTML of leftRowsHTML) {
        //2. search for every row, the one that has same id and put class
        let idLeftRow = findChildIdUsingDom(leftRowHTML,".secret-invisible-id")
        if (idLeftInstrument == idLeftRow) {
            leftRowHTML.classList.add("instrument-row-picked");
            break;
        }
    }
}

function keepToggledRightRow() {
    //1. obtain all rows
    let rightRowsHTML = rightTbody.querySelectorAll(".this-is-a-table-row");
    for (let rightRowHTML of rightRowsHTML) {
        //2. search for every row, the one that has same id and put class
        let idRightRow = findChildIdUsingDom(rightRowHTML,".secret-invisible-id")
        if (idRightInstrument == idRightRow) {
            rightRowHTML.classList.add("instrument-row-picked");
            break;
        }
    }
}

async function loadInstrumentsInLeftTbodyAndAddListener() {
    instrumentsJson = applyFilterLeft(instrumentsJson);
    dataPug = {
        instruments: instrumentsJson,
        filterSonority: settings.filterSonorityLeft,
    };

    leftTbody.innerHTML = insertInstrumentsComparator({
        data: dataPug,
    });
    leftTbody.addEventListener("click", leftTbodyClicked);

    keepToggledLeftRow();
}

async function loadInstrumentsInRightTbodyAndAddListener() {
    instrumentsJson = applyFilterRight(instrumentsJson);
    dataPug = {
        instruments: instrumentsJson,
        filterSonority: settings.filterSonorityRight,
    };
    rightTbody.innerHTML = insertInstrumentsComparator({
        data: dataPug,
    });
    rightTbody.addEventListener("click", rightTbodyClicked);
    
    keepToggledRightRow();
}

function openRulesModal() {
    modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = insertModalRulesComparator();
    modalContent.classList.remove("modal-content-comparison");
    document.querySelectorAll(".close").onclick = function () {
        modal.style.display = "none";
    };
    modal.style.display = "block";
}

async function loadInitialDataAndAddListeners() {
    await loadInstrumentsFromDBToArray();
    await loadInstrumentsInLeftTbodyAndAddListener();
    await loadInstrumentsInRightTbodyAndAddListener();
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

function findChildIdUsingDom(actualElement, childClass) {
    //child: .modal-invisible-id
    const divWithId = actualElement.querySelector(childClass);
    const id = divWithId.innerHTML.trim(); //Id without spaces
    return id;
}

//Inits
modal = document.getElementById("myModal");
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
var leftTbody = document.querySelector("#left-tbody");
var rightTbody = document.querySelector("#right-tbody");
leftTbody.addEventListener("click", leftTbodyClicked);
rightTbody.addEventListener("click", rightTbodyClicked);
document.querySelector(".nav-rules").addEventListener("click", openRulesModal);
document
    .querySelector("#compareInstrumentsButton")
    .addEventListener("click", compareInstrumentsClicked);

//Load
loadInitialDataAndAddListeners();
