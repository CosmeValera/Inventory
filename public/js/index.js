var modal;

async function loadInstrumentsFromDB(evt) {
    console.log(evt);
    // console.log(evt.target);
    // console.log(evt.target.value);
    const response = await fetch("/inventory");

    if (response.ok) {
        var instrumentsJson = await response.json();
        if (evt) {
            //When clicking the checkbox
            if (evt.target.checked) {
                var dataPug = {
                    instruments: instrumentsJson,
                    bigInstruments: true,
                };
                console.log(dataPug);
                document.querySelector("tbody").innerHTML = insertInstruments({
                    data: dataPug,
                });
            } else {
                var dataPug = {
                    instruments: instrumentsJson,
                    bigInstruments: false,
                };
                document.querySelector("tbody").innerHTML = insertInstruments({
                    data: dataPug,
                });
            }
        } else {
            //Load screen first time
            var dataPug = {
                instruments: instrumentsJson,
                bigInstruments: false,
            };
            document.querySelector("tbody").innerHTML = insertInstruments({
                data: dataPug,
            });
        }
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

async function deleteInstrument(idParam) {
    await fetch(`/inventory/ ${idParam}`, {
        method: "DELETE",
    }).then((response) => {
        if (response.ok) {
            window.location = "http://localhost:3000";
        } else {
            alert(
                `Server found an issue trying to delete instrument with id: ${idParam}, ` +
                    response.statusText
            );
        }
    });
}

async function showDetails(id) {
    const response = await fetch(`/inventory/${id}`);
    if (response.ok) {
        var instrumentJson = await response.json().then((arrayOfOne) => {
            return arrayOfOne[0];
        });

        modalContent = modal.querySelector(".modal-content");
        modalContent.innerHTML = insertModalInstrument({
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

async function linkOrImageClicked(evt) {
    const buttonClicked = evt.target;
    if (evt.target.closest("#titles")) {
        return;
    }
    const id = findSiblingUsingDom(
        buttonClicked,
        ".this-is-a-table-row",
        ".secret-invisible-id"
    );
    if (buttonClicked.classList.contains("delete-button")) {
        deleteInstrument(id);
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
        deleteInstrument(id);
        return;
    }
    if (buttonClicked.classList.contains("update-button")) {
        //TODO
        // updateInstrument(id);
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
    .addEventListener("change", loadInstrumentsFromDB);

document.querySelector("tbody").addEventListener("click", linkOrImageClicked);

modal = document.getElementById("myModal");
modal.addEventListener("click", modalClicked);
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
//Modal inits

loadInstrumentsFromDB();
//TODO 1. que tambien muestre un boton de eliminar la pagina modal que redirija al mismo
//metodo(deleteInstrument) pasandole el id, aunque sin pasar por linkOrImageClicked
//TODO 2. permitir que se pueda eliminar un instrumento y seguir estando en la pagina de instrumentos grandes
