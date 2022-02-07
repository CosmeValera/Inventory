var button;
var selectName;
var selectType;
var selectSubtype;
var inputSonority;
var inputPrice;
var inputSummary;
var img;

async function createNewInstrument(evt) {
    if (evt.preventDefault) evt.preventDefault();
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
            price != "" && price < 9999
                ? "<p>Missing mandatory data.</p>"
                : price == ""
                ? "<p>Price is mandatory</p>"
                : "<p>No instrument added, price must be lower than 99999</p>";
        divResultMessage.style.backgroundColor = "rgba(201, 76, 76, 1)";
        divResultMessage.style.borderColor = "rgb(220,45,65)";
        divResultMessage.style.display = "flex";
        return false;
    }
    //TODO: probar a hacerlo sin id, mongoose ya les mete un id de por si, es _id
    var instrument = {
        // id: 99,
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
    var response = await fetch("/inventory", {
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

    return false;
}

async function namePicked(evt) {
    let instrumentName = evt.target.value;
    img.src = `img/${instrumentName}.png`;

    if (instrumentName == "") {
        img.src = "img/noInstrument.png";
    }

    switch (instrumentName) {
        case "":
            selectName.innerHTML = `<option></option>
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
            selectSubtype.value = "";
            break;
        case "Snare Drum":
        case "Conga":
        case "Battery":
            selectType.innerHTML = `<option></option>
          <option>Percussion</option>`;
            selectType.value = "Percussion";
            selectSubtype.parentElement.style.display = "none";
            selectSubtype.value = "";
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
            selectName.innerHTML = `<option></option>
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
            selectSubtype.parentElement.style.display = "block";
            selectSubtype.innerHTML = `<option></option>
            <option>Wood</option>
            <option>Brass</option>`;
            selectSubtype.value = "";
            break;
        case "String":
            selectName.innerHTML = `<option></option>
            <option>Violin</option>
            <option>Guitar</option>
            <option>Piano</option>}`;
            selectSubtype.parentElement.style.display = "none";
            break;
        case "Percussion":
            selectName.innerHTML = `<option></option>
            <option>Snare Drum</option>
            <option>Conga</option>
            <option>Battery</option>`;
            selectSubtype.parentElement.style.display = "none";
            break;
        case "Wind":
            selectName.innerHTML = `<option></option>
            <option>Flute</option>
            <option>Clarinet</option>
            <option>Saxophone</option>
            <option>Horn</option>
            <option>Trumpet</option>
            <option>Tuba</option>`;
            selectSubtype.parentElement.style.display = "block";
            selectSubtype.innerHTML = `<option></option>
            <option>Wood</option>
            <option>Brass</option>`;
            break;
    }
}

async function subtypePicked(evt) {
    let instrumentSubtype = evt.target.value;
    switch (instrumentSubtype) {
        case "":
            selectName.innerHTML = `<option></option>
        <option>Flute</option>
        <option>Clarinet</option>
        <option>Saxophone</option>
        <option>Horn</option>
        <option>Trumpet</option>
        <option>Tuba</option>`;
            selectType.innerHTML = `<option></option>
        <option>Wind</option>
        <option>String</option>
        <option>Percussion</option>`;
            selectType.value = "Wind";
            break;
        case "Wood":
            selectName.innerHTML = `<option></option>
        <option>Flute</option>
        <option>Clarinet</option>
        <option>Saxophone</option>`;
            selectType.innerHTML = `<option></option>
        <option>Wind</option>`;
            selectType.value = "Wind";
            break;
        case "Brass":
            selectName.innerHTML = `<option></option>
        <option>Horn</option>
        <option>Trumpet</option>
        <option>Tuba</option>`;
            selectType.innerHTML = `<option></option>
        <option>Wind</option>`;
            selectType.value = "Wind";
            break;
    }
}

// async function updatetitle(evt) {
//     // evt.target.title = evt.target.value;
//     // $(element)
//     //     .attr("title", evt.target.value)
//     //     .tooltip("fixTitle")
//     //     .tooltip("show");
//     $(this)
//         .tooltip("data-toggle")
//         .attr("title", evt.target.value)
//         .tooltip("show");
// }

async function onSonorityOver(evt) {
    evt.target.title = evt.target.value;
    // evt.target.addEventListener("keyup", updatetitle, false);

    // // evt.target.tooltip();
}

async function priceReleased(evt) {
    let divResultMessage = document.getElementById("resultMessage");
    if (evt.target.value > 99999) {
        divResultMessage.innerHTML = "<p>Price must be lower than $99999</p>";
        divResultMessage.style.backgroundColor = "rgba(201, 76, 76, 1)";
        divResultMessage.style.borderColor = "rgb(220,45,65)";
        divResultMessage.style.display = "flex";
    } else if (evt.target.value == "") {
        divResultMessage.innerHTML = "<p>Price is mandatory</p>";
        divResultMessage.style.backgroundColor = "rgba(201, 76, 76, 1)";
        divResultMessage.style.borderColor = "rgb(220,45,65)";
        divResultMessage.style.display = "flex";
    } else {
        divResultMessage.style.display = "none";
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

// button.addEventListener("click", createNewInstrument);
document
    .querySelector("#my-form")
    .addEventListener("submit", createNewInstrument);
selectName.addEventListener("change", namePicked);
selectType.addEventListener("change", typePicked);
selectSubtype.addEventListener("change", subtypePicked);
inputSonority.addEventListener("mouseover", onSonorityOver);
inputPrice.addEventListener("blur", priceReleased);

//TODO calcular id automatico, al elegir un instrumento, que se ponga la imagen y se limiten las opcionese de type y subtype(quiza desaparecerlo?)
// $(document).ready(function () {
//     $('[data-toggle="tooltip"]').tooltip();
// });
console.log("charging create.js...");
