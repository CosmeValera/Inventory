const db = require("./dbInstruments.js");

async function addProductToDB(evt) {
    let response = await fetch("./initialImport.json").then((res) =>
        res.json()
    );
    //TODO: Add response to mongo
    inst0 = response[0];
    inst1 = response[1];
    inst2 = response[2];
    inst3 = response[3];
    console.log(inst1);
}

async function recoverDataToTbody(evt) {
    //TODO: insert into tbody instruments from db
    document.querySelector("tbody").innerHTML = insertInstruments({
        instruments: response,
    });
}

async function addProduct(evt) {
    await addProductToDB(evt);
    await recoverDataToTbody(evt);
}

document.querySelector("#add-product").addEventListener("click", addProduct);
