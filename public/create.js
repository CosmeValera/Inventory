// no dejamos al form que haga el envio en su lugar, cogemos el click del boton con js, y hacemos nosotros mismos el fetch
async function createNewInstrumentWithFetch(evt) {
    evt.preventDefault();
    var name = document.querySelector("#selectName").value;
    var type = document.querySelector("#selectType").value;
    var subtype = document.querySelector("#selectSubtype").value;
    var sonority = document.querySelector("#inputSonority").value;
    var price = document.querySelector("#inputPrice").value;
    var summary = document.querySelector("#inputDescription").value;
    if (!name || !type || !sonority || !price || price>99999 || summary.length>256) {
        alert("Missing mandatory data");
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
    }

    console.log(name, type, subtype, sonority, price, summary);

    var instrumentStringified = JSON.stringify(instrument);
    console.log(instrument);
    // console.log(instrumentStringified);


    //Hacemos fetch para que app.js cree un instrumento con esos datos
    //TODO: COMPROBAR QUE NO TENGA VALORES NULL poner en app.js el POST que reciba el instrumento en el body, y lo de de alta en app.js
    var response = await fetch("./inventory", {
        method: "POST",
        body: instrumentStringified,
        headers: {
            "Content-Type": "application/json"
            // "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return response.json();
    // console.log(fetchValue);
}

document
    .querySelector("button")
    .addEventListener("click", createNewInstrumentWithFetch);
