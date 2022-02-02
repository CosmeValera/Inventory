//INSTRUCCIONES: Importamos los instrumentos que me he dejado en el instrumentsToImport.json
//los metemos en mongodb usando mongoose. (1° eliminamos los que hubiera)
//A partir de ahora cada vez que vayamos a anadird un instrumento lo
//insertamos a mongo. Cuando filtremos, filtramos en base a los que hay en mongo,
//como primer approach en vez de crear otra pagina para añadir instrumento,
//darle y que añada uno a piñon como hice en chirihomeweb
//En un futuro tendre que implementar un servidor con express que escuche al
//cliente parar madnarlo a otras pagainas tal vez (add instrumento, ver registro...)

//1. Mongoose
const db = require("./dbInstruments.js");
const connect = db.connect;
const disconnect = db.disconnect;
const Instrument = db.Instrument;
const saveInstrument = db.saveInstrument;
const deleteInstrument = db.deleteInstrument;
const findInstruments = db.findInstruments;

async function devolverSiguienteId() {
    const instruments = await findInstruments();

    const id = 0;
    instruments.forEach((inst) => {
        if (inst.id > id) {
            id = inst.id;
        }
    });
    return id + 1;
}
//  {
//     "id" : 1,
//     "type": "Wind",
//     "subtype": "Wood",
//     "name": "Saxophone",
//     "img": "saxo.png",
//     "sonority": 60,
//     "price": 2300,
//     "summary": "A professional saxophone"
//   }

async function main() {
    await connect();
    const saxophone = new Instrument({
        id: devolverSiguienteId(),
        type: "Wind",
        subtype: "Wood",
        name: "Saxophone",
        img: "saxo.png",
        sonority: 60,
        price: 2300,
        summary: "A professional saxophone",
    });
    await saveInstrument(saxophone);
    await disconnect();
}

main();
