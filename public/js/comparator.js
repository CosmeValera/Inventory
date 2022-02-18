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
    let leftTableRow = evt.target.closest(".this-is-a-table-row");
    const leftInstruments = leftTbody.querySelectorAll(".this-is-a-table-row");
    for (let instrumentLeftRow of leftInstruments) {
        if (instrumentLeftRow != leftTableRow)
            instrumentLeftRow.classList.remove("instrument-row-picked");
    }
    leftTableRow.classList.toggle("instrument-row-picked");

    //Save leftInstrument id
    idLeftInstrument = findChildIdUsingDom(
        leftTableRow,
        ".secret-invisible-id"
    );
}
function rightTbodyClicked(evt) {
    //Toggle click color
    let rightTableRow = evt.target.closest(".this-is-a-table-row");
    const rightInstruments = rightTbody.querySelectorAll(
        ".this-is-a-table-row"
    );
    for (let instrumentRightRow of rightInstruments) {
        if (instrumentRightRow != rightTableRow)
            instrumentRightRow.classList.remove("instrument-row-picked");
    }
    rightTableRow.classList.toggle("instrument-row-picked");

    //Save rightInstrument id
    idRightInstrument = findChildIdUsingDom(
        rightTableRow,
        ".secret-invisible-id"
    );
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

function openRulesModal() {
    modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = insertModalRulesComparator();
    document.querySelectorAll(".close").onclick = function () {
        modal.style.display = "none";
    };
    modal.style.display = "block";
}

async function loadInitialData() {
    await loadInstrumentsFromDBToArray();
    await loadInstrumentsInLeftTbody();
    await loadInstrumentsInRightTbody();
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
loadInitialData();
