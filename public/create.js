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
        // alert("Missing mandatory data");
        let notify = document.getElementById("resultMessage");
        notify.innerHTML = "<p>Missing mandatory data and/or price > 99.999</p>";
        notify.style.backgroundColor="rgba(201, 76, 76, 1)";
        notify.style.display = "flex";
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
    var instrumentStringified = JSON.stringify(instrument);

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

    //TODO que si la responses es afirmativa muestre este mensaje, poner un if
    let notify = document.getElementById("resultMessage");
    notify.innerHTML = `<p>Instrument created with name: ${name}, and price: $${price}</p>`;
    notify.style.backgroundColor="#77D150";
    notify.style.display = "flex";


    return response.json();
}

document
    .querySelector("button")
    .addEventListener("click", createNewInstrumentWithFetch);

//TODO calcular id automatico, al elegir un instrumento, que se ponga la imagen y se limiten las opcionese de type y subtype(quiza desaparecerlo?) 