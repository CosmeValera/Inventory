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

function compareInstrumentsClicked(evt) {
    console.log("left id is " + idLeftInstrument);
    console.log("right id is " + idRightInstrument);

    let divResultMessage = document.getElementById("resultMessage");
    if (
        !idLeftInstrument ||
        !idRightInstrument ||
        idLeftInstrument == idRightInstrument
    ) {
        //alert saying, you must pick 2 instruemnts, and they must be different instruments
        console.log(
            "alert saying, you must pick 2 instruemnts, and they must be different instruments"
        );
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
