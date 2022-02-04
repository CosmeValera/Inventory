const db = require("./dbInstruments");

async function addProductToDB(evt) {
    db.connect();
    // let response = await require("./initialImport.json");
    // response = response.json();
    //TODO: Add response to mongo
    inst0 =   {
        "id" : 4,
        "type": "String",
        "subtype": null,
        "name": "Violin",
        "img": "violin.png",
        "sonority": 73,
        "price": 2200,
        "summary": "Beethoven's violin"
      };
    await db.saveInstrument(inst0);
    // inst1 = response[1];
    // inst2 = response[2];
    // inst3 = response[3];
    // console.log(inst1);
    db.disconnect();
}

// async function recoverDataToTbody(evt) {
//     //TODO: insert into tbody instruments from db
//     document.querySelector("tbody").innerHTML = insertInstruments({
//         instruments: response,
//     });
// }

async function addProduct(evt) {
    await addProductToDB(evt);
    await recoverDataToTbody(evt);
}

addProductToDB();
// document.querySelector("#add-product").addEventListener("click", addProduct);
