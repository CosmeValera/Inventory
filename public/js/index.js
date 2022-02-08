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

async function showDetails(id) {
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

//WE need to create another method between this one and those who right now call it, to show the modal page with a form to fill the data
async function updateInstrument(evt, idParam) {
    instrumentExample = {
        name: "Clarinet",
        type: "Wind",
        subtype: "Wood",
        price: 6553,
        sonority: 27,
        summary: "",
    };
    await fetch(`/inventory/${idParam}`, {
        method: "PUT",
        body: JSON.stringify(instrumentExample),
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

async function instrumentRowClicked(evt) {
    const instrumentRow = evt.target;
    if (evt.target.closest("#titles")) {
        return;
    }
    const id = findSiblingUsingDom(
        instrumentRow,
        ".this-is-a-table-row",
        ".secret-invisible-id"
    );
    if (instrumentRow.classList.contains("delete-button")) {
        deleteInstrument(evt, id);
        return;
    }
    if (instrumentRow.classList.contains("update-button")) {
        //TODO: update
        console.log(evt.target + " estamos en update");
        updateInstrument(evt, id);
        return;
    }
    //If it is not delete nor update, we want to show details with modal page
    showDetails(id);
}

async function modalClicked(evt) {
    const buttonClicked = evt.target;
    const id = findSiblingUsingDom(
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
    if (buttonClicked.classList.contains("update-button")) {
        //TODO esto es para darle update una vez clickada a la pagina de detalles, que cambie el contenido a la misma pagina modal
        updateInstrument(id);
        return;
    }
}

function findSiblingUsingDom(actualElement, parentClass, siblingClass) {
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
//Modal inits

loadInstrumentsFromDBToTable();
