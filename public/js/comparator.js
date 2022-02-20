var modal;
var leftTbody;
var rightTbody;
var idLeftInstrument;
var idRightInstrument;
var instrumentsJson = new Object();
var settings = new Object();
settings.filterSonority = false;

async function loadInstrumentsFromDBToArray() {
    const response = await fetch("/inventory");
    if (response.ok) {
        instrumentsJson = await response.json();
    } else {
        alert("Server found an issue, " + response.statusText);
    }
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
    let divResultMessage = document.getElementById("resultMessage");
    if (
        !idLeftInstrument ||
        !idRightInstrument ||
        idLeftInstrument == idRightInstrument
    ) {
        //TODO 2: transform all alert modal to pugs
        divResultMessage.innerHTML = `<p class="text-center my-0">You must pick 2 instruments.</p>
            <p class="text-center mb-1">And they must be different.</p>`;
        divResultMessage.style.borderColor = "rgb(183, 38, 38)";
        divResultMessage.style.backgroundColor = "rgba(211, 45, 45, 0.78)";
        divResultMessage.style.display = "flex";
        divResultMessage.style.display = "justify-content: center";
        divResultMessage.classList.add("row");
        return;
    }
    divResultMessage.style.display = "none";

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

        //TODO 1
        modalContent = modal.querySelector(".modal-content");
        modalContent.innerHTML = insertModalComparison({
            instruments: instruments,
        });
        document.querySelector(".close").onclick = function () {
            modal.style.display = "none";
        };
        modal.style.display = "block";
    } else {
        errMessage(response);
    }
}

function leftTbodyClicked(evt) {
    //Toggle click color
    let clickedleftTableRow = evt.target.closest(".this-is-a-table-row");
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

async function loadInstrumentsInLeftTbodyAndAddListener() {
    dataPug = {
        instruments: instrumentsJson,
        filterSonority: settings.filterSonority,
    };
    leftTbody.innerHTML = insertInstrumentsComparator({
        data: dataPug,
    });
    leftTbody.addEventListener("click", leftTbodyClicked);
}

async function loadInstrumentsInRightTbodyAndAddListener() {
    dataPug = {
        instruments: instrumentsJson,
        filterSonority: settings.filterSonority,
    };
    rightTbody.innerHTML = insertInstrumentsComparator({
        data: dataPug,
    });
    rightTbody.addEventListener("click", rightTbodyClicked);
}

function openRulesModal() {
    modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = insertModalRulesComparator();
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
var leftTbody = document.querySelector("#left-tbody");
var rightTbody = document.querySelector("#right-tbody");
modal = document.getElementById("myModal");
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
document.querySelector(".nav-rules").addEventListener("click", openRulesModal);
document
    .querySelector("#compareInstrumentsButton")
    .addEventListener("click", compareInstrumentsClicked);

//Load
loadInitialDataAndAddListeners();
