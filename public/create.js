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
    divResultMessage.innerHTML =
      "<p>Missing mandatory data and/or price > 99999</p>";
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
    // img: name + ".png",
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
  }).then((response) => {
    if (response.ok) {
      let divResultMessage = document.getElementById("resultMessage");
      divResultMessage.innerHTML = `<p>Instrument created with name: ${name}, and price: $${price}</p>`;
      divResultMessage.style.backgroundColor = "#77D150";
      divResultMessage.style.borderColor = "#44E42C";
      divResultMessage.style.display = "flex";
    } else {
      alert("Server found an issue, " + response.statusText);
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
    img.src = "img/noInstrument.png";
  }

  switch (instrumentName) {
    case "":
        selectName.innerHTML=`<option></option>
        <option>Violin</option>
        <option>Guitar</option>
        <option>Piano</option>
        <option>Flute</option>
        <option>Clarinet</option>
        <option>Saxophone</option>
        <option>Horn</option>
        <option>Trumpet</option>
        <option>Tuba</option>
        <option>Snare Drum</option>
        <option>Conga</option>
        <option>Battery</option>`;
      selectType.innerHTML = `<option></option>
        <option>Wind</option>
        <option>String</option>
        <option>Percussion</option>`;
      selectType.value = "";
      selectSubtype.parentElement.style.display = "block";
      selectSubtype.innerHTML = `<option></option>
      <option>Wood</option>
      <option>Brass</option>`;
      selectSubtype.value = "";
      break;
    case "Violin":
    case "Guitar":
    case "Piano":
      selectType.innerHTML = `<option></option>
        <option>String</option>`;
      selectType.value = "String";
      selectSubtype.parentElement.style.display = "none";
      break;
    case "Snare Drum":
    case "Conga":
    case "Battery":
      selectType.innerHTML = `<option></option>
          <option>Percussion</option>`;
      selectType.value = "Percussion";
      selectSubtype.parentElement.style.display = "none";
      break;
    case "Flute":
    case "Clarinet":
    case "Saxophone":
      selectType.innerHTML = `<option></option>
          <option>Wind</option>`;
      selectType.value = "Wind";
      selectSubtype.parentElement.style.display = "block";
      selectSubtype.innerHTML = `<option></option>
        <option>Wood</option>`;
      selectSubtype.value = "Wood";
      break;
    case "Horn":
    case "Trumpet":
    case "Tuba":
      selectType.innerHTML = `<option></option>
          <option>Wind</option>`;
      selectType.value = "Wind";
      selectSubtype.parentElement.style.display = "block";
      selectSubtype.innerHTML = `<option></option>
        <option>Brass</option>`;
      selectSubtype.value = "Brass";
      break;
  }
}

async function typePicked(evt) {
    let instrumentType = evt.target.value;
    switch (instrumentType) {
        case "":
            img.src = "img/noInstrument.png";
            selectName.innerHTML=`<option></option>
            <option>Violin</option>
            <option>Guitar</option>
            <option>Piano</option>
            <option>Flute</option>
            <option>Clarinet</option>
            <option>Saxophone</option>
            <option>Horn</option>
            <option>Trumpet</option>
            <option>Tuba</option>
            <option>Snare Drum</option>
            <option>Conga</option>
            <option>Battery</option>`
            selectType.innerHTML = `<option></option>
              <option>Wind</option>
              <option>String</option>
              <option>Percussion</option>`;
            selectSubtype.parentElement.style.display = "block";
            selectSubtype.innerHTML = `<option></option>
            <option>Wood</option>
            <option>Brass</option>`;
            selectSubtype.value = "";
            break;
        case "String":
            selectName.innerHTML=`<option></option>
            <option>Violin</option>
            <option>Guitar</option>
            <option>Piano</option>}`
            selectSubtype.parentElement.style.display = "none";
            break;
        case "Percussion":
            selectName.innerHTML=`<option></option>
            <option>Snare Drum</option>
            <option>Conga</option>
            <option>Battery</option>`
            selectSubtype.parentElement.style.display = "none";
            break;
        case "Wind":
            selectName.innerHTML=`<option></option>
            <option>Flute</option>
            <option>Clarinet</option>
            <option>Saxophone</option>
            <option>Horn</option>
            <option>Trumpet</option>
            <option>Tuba</option>`
            selectSubtype.parentElement.style.display = "block";
            selectSubtype.innerHTML = `<option></option>
            <option>Wood</option>
            <option>Brass</option>`;
            selectSubtype.value = "";
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
selectName.addEventListener("change", namePicked);
selectType.addEventListener("change", typePicked);

//TODO calcular id automatico, al elegir un instrumento, que se ponga la imagen y se limiten las opcionese de type y subtype(quiza desaparecerlo?)
