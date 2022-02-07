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
        document.querySelector("tbody").innerHTML = insertBigInstruments({
          instruments: instrumentsJson,
        });
      } else {
        document.querySelector("tbody").innerHTML = insertInstruments({
          instruments: instrumentsJson,
        });
      }
    } else {
      //Load screen first time
      document.querySelector("tbody").innerHTML = insertInstruments({
        instruments: instrumentsJson,
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
        window.location = "http://localhost:3000"
      } else {
          alert(`Server found an issue trying to delete instrument with id: ${idParam}, ` + response.statusText);
      }
  });
}

async function showDetails(id) {
  const response = await fetch(`/inventory/${id}`);
  if (response.ok) {
    var instrumentJson = await response.json().then((arrayOfOne) => {
      return arrayOfOne[0];
    });

    //Modal inits
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
  //parent: .this-is-a-table-row, child: .secret-invisible-id
  const linkOrImage = evt.target;
  console.log(linkOrImage)
  const parentDiv = linkOrImage.closest(".this-is-a-table-row");
  console.log(parentDiv)
  if (!parentDiv) return;
  const divWithId = parentDiv.querySelector(".secret-invisible-id");
  console.log(divWithId)
  const id = divWithId.innerHTML.trim(); //Number without spaces
  console.log(id)

  if (linkOrImage.classList.contains("delete-button")) {
    deleteInstrument(id);
    return;
  }

  showDetails(id);
}

document
  .getElementById("switchBigImg")
  .addEventListener("change", loadInstrumentsFromDB);

document.querySelector("tbody").addEventListener("click", linkOrImageClicked);

//Modal inits
modal = document.getElementById("myModal");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
//Modal inits

loadInstrumentsFromDB();
//TODO, que tambien muestre un boton de eliminar la pagina modal que redirija al mismo
//metodo(deleteInstrument) pasandole el id, aunque sin pasar por linkOrImageClicked
//permitir que se pueda eliminar un instrumento y seguir estando en la pagina de instrumentos grandes