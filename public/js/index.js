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

async function linkOrImageClicked(evt) {
  //parent: .this-is-a-table-row, child: .secret-invisible-id
  const linkOrImage = evt.target;
  const parentDiv = linkOrImage.closest(".this-is-a-table-row");
  if (!parentDiv) return;
  const divWithId = parentDiv.querySelector(".secret-invisible-id");
  const id = divWithId.innerHTML.trim(); //Number without spaces
  const response = await fetch(`/inventory/${id}`);
  if (response.ok) {
    var instrumentJson = await response.json().then((arrayOfOne) => {
      return arrayOfOne[0];
    });

    //Modal inits
    modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
    <div class="modal-header" id= "container-fill-height">
      <h2 class="my-0"><strong>${instrumentJson.name}</strong></h2>
      <span class="close item-upper-right px-4 py-3">&times;</span>
    </div>
    <div class = "modal-body">
      <p class="d-flex justify-content-center my-0"><strong class="me-2">Type:</strong> ${instrumentJson.type}</p>`
      +((instrumentJson.subtype)
        ?`<p class="d-flex justify-content-center my-0"><strong class="me-2">Subtype:</strong> ${instrumentJson.subtype} </p>`
        :``)
      +`<p class="d-flex justify-content-center my-0"><strong class="me-2">Price:</strong> $${instrumentJson.price} </p>
      <p class="d-flex justify-content-center my-0"><strong class="me-2">Sonority:</strong> ${instrumentJson.sonority} </p>`
      +((instrumentJson.summary)
        ?`<p class="d-flex justify-content-center mt-0 mx-5"><strong class="me-2">Summary:</strong> ${instrumentJson.summary}</p>`
        :`<p class="d-flex justify-content-center mt-0 mb-3"><strong class="me-2">No Summary</strong></p>`)
      +`<a class="d-flex justify-content-center" href="#">
        <img
          class="img-fluid"
          src="img/`
          +((instrumentJson.name!="Snare Drum")
          ?`${instrumentJson.name}`
          :`snareDrum`)
          +`.png"
          alt="img"/>
      </a>
    </div>`;
    document.querySelector(".close") .onclick = function() {
      modal.style.display = "none";
    }
    modal.style.display = "block";
  } else {
    alert("Server found an issue, " + response.statusText);
  }
}

document
  .getElementById("switchBigImg")
  .addEventListener("change", loadInstrumentsFromDB);

loadInstrumentsFromDB();

document.querySelector("tbody").addEventListener("click", linkOrImageClicked);

//Modal inits
modal = document.getElementById("myModal");
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//Modal inits
