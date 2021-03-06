var button;
var selectName;
var selectType;
var selectSubtype;
var inputSonority;
var inputPrice;
var inputSummary;
var img;
var alertDiv;

async function createNewInstrument(evt) {
    if (evt.preventDefault) evt.preventDefault();
    var name = selectName.value;
    var type = selectType.value;
    var subtype = selectSubtype.value;
    var sonority = inputSonority.value;
    var price = inputPrice.value;
    var summary = inputSummary.value;
    if (
        !instrumentAccomplishRequirements(name, type, sonority, price, summary)
    ) {
        let lines = [
            price != "" && price < 9999 && price > 0
                ? "No instrument added, missing mandatory data."
                : price == ""
                ? "No instrument added, price is mandatory"
                : "No instrument added, price must be 0-99999",
        ];
        let dataPug = {
            line: "0",
            lines: lines,
            backgroundColor: "rgb(201, 76, 76)",
            borderColor: "rgb(220,45,65)",
        };
        alertDiv.innerHTML = insertModalAlert({
            data: dataPug,
        });
        return false;
    }

    var instrument = {
        type: type,
        subtype: subtype,
        name: name,
        sonority: sonority,
        price: price,
        summary: summary,
    };
    await fetch("/inventory", {
        //fetch with post so app.js creates a new instrument with that data
        method: "POST",
        body: JSON.stringify(instrument),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.ok) {
            let dataPug = {
                line: "0",
                lines: [
                    `Instrument created with name: ${name}, and price: $${price}`,
                ],
                backgroundColor: "#77D150",
                borderColor: "#44E42C",
            };
            alertDiv.innerHTML = insertModalAlert({
                data: dataPug,
            });
        } else {
            alert("Server found an issue, " + response.statusText);
        }
    });

    return false;
}

function instrumentAccomplishRequirements(
    name,
    type,
    sonority,
    price,
    summary
) {
    return (
        name &&
        type &&
        sonority &&
        price &&
        price <= 99999 &&
        price > 0 &&
        summary.length <= 256
    );
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
        selectSubtype.innerHTML = `<option></option>
        <option>Wood</option>
        <option>Brass</option>`;
        selectSubtype.value = "";
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

async function onSonorityOver(evt) {
    evt.target.title = evt.target.value;
}

async function priceReleased(evt) {
    let price = evt.target.value;
    if (!price || price > 99999 || price < 0) {
        let lines = [
            price != "" && price < 9999 && price > 0
                ? "Missing mandatory data."
                : price == ""
                ? "Price is mandatory"
                : "Price must be 0-99999",
        ];
        let dataPug = {
            line: "0",
            lines: lines,
            backgroundColor: "rgb(201, 76, 76)",
            borderColor: "rgb(220,45,65)",
        };
        alertDiv.innerHTML = insertModalAlert({
            data: dataPug,
        });
    } else {
        alertDiv.innerHTML = "";
    }
}
//Inits
alertDiv = document.getElementById("alertDiv");
button = document.querySelector("button");
selectName = document.querySelector("#selectName");
selectType = document.querySelector("#selectType");
selectSubtype = document.querySelector("#selectSubtype");
inputSonority = document.querySelector("#inputSonority");
inputPrice = document.querySelector("#inputPrice");
inputSummary = document.querySelector("#inputDescription");
img = document.querySelector("#imgInstrument");

document
    .querySelector("#my-form")
    .addEventListener("submit", createNewInstrument);
selectName.addEventListener("change", namePicked);
selectType.addEventListener("change", typePicked);
selectSubtype.addEventListener("change", subtypePicked);
inputSonority.addEventListener("mouseover", onSonorityOver);
inputPrice.addEventListener("blur", priceReleased);
