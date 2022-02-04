var button;
var selectName;
var selectType;
var selectSubtype;
var inputSonority;
var inputPrice;
var inputSummary;
var img;

async function createNewInstrument(evt) {
  evt.preventDefault();
  var name = selectName.value;
  var type = selectType.value;
  var subtype = selectSubtype.value;
  var sonority = inputSonority.value;
  var price = inputPrice.value;
  var summary = inputSummary.value;
  if (
    !name ||
    !type ||
    !sonority ||
    !price ||
    price > 99999 ||
    summary.length > 256
  ) {
    let divResultMessage = document.getElementById("resultMessage");
    divResultMessage.innerHTML = "<p>Missing mandatory data and/or price > 99999</p>";
    divResultMessage.style.backgroundColor = "rgba(201, 76, 76, 1)";
    divResultMessage.style.borderColor = "rgb(220,45,65)";
    divResultMessage.style.display = "flex";
    return;
  }
  var instrument = {
    id: 99,
    type: type,
    subtype: subtype,
    name: name,
    img: name + ".PNG",
    sonority: sonority,
    price: price,
    summary: summary,
  };
  var instrumentStringified = JSON.stringify(instrument);

  //Hacemos fetch para que app.js cree un instrumento con esos datos
  var response = await fetch("./inventory", {
    method: "POST",
    body: instrumentStringified,
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded"
    },
  }).then(response => {
      if (response.ok) {
        let divResultMessage = document.getElementById("resultMessage");
        divResultMessage.innerHTML = `<p>Instrument created with name: ${name}, and price: $${price}</p>`;
        divResultMessage.style.backgroundColor = "#77D150";
        divResultMessage.style.borderColor = "#44E42C";
        divResultMessage.style.display = "flex";
      } else {
          alert("Server found an issue, " + response.statusText)
      }
  });
}

async function namePicked(evt) {
    let instrumentName = evt.target.value;
    img.src = `img/${instrumentName}.png`;

    if (instrumentName == "Snare Drum") {
        img.src = "img/snareDrum.png";
    }
    if (instrumentName == "") {
        img.src = "img/noInstrument.png"
    }

    switch (instrumentName) {
        case "Violin":
            console.log("We got a violin");
            // selectType.value
            // img.src = "img/violin.png";
            break;
        case "Guitar":
            console.log("We got a guitar");
            break;
        case "Flute":
            console.log("We got a flute");
            break;
                
    }

}

button = document.querySelector("button");
selectName = document.querySelector("#selectName");
selectType = document.querySelector("#selectType");
selectSubtype = document.querySelector("#selectSubtype");
inputSonority = document.querySelector("#inputSonority");
inputPrice = document.querySelector("#inputPrice");
inputSummary = document.querySelector("#inputDescription");
img = document.querySelector("#imgInstrument");

button.addEventListener("click", createNewInstrument);
selectName.addEventListener("change", namePicked)


//TODO calcular id automatico, al elegir un instrumento, que se ponga la imagen y se limiten las opcionese de type y subtype(quiza desaparecerlo?)
