const express = require("express");
const path = require("path");
const db = require("./public/js/dbInstruments.js");
const app = express();
var bodyParser = require("body-parser");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

const PORT = process.env.PORT || process.env.MYPORT;

// --- MIDDLEWARE METHODS --- //

/* Inventory methods */
app.get("/inventory", async (req, res) => {
    try {
        let instruments = await db.findInstruments();
        res.send(JSON.stringify(instruments));
    } catch (err) {
        res.statusMessage = "Error: " + err;
        res.sendStatus(500);
    }
});

app.get("/inventory/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let instrument = await db.findInstrumentById(id);
        res.send(JSON.stringify(instrument));
    } catch (err) {
        res.statusMessage = "Error: " + err;
        res.sendStatus(500);
    }
});

app.post("/inventory", async (req, res) => {
    try {
        instrument = req.body;
        instrumentAcceptable = db.Instrument(instrument);
        await db.saveInstrument(instrumentAcceptable);

        await createAddRecord(instrumentAcceptable);

        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
    }
});
app.delete("/inventory/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let instrument = await db.findInstrumentById(id);

        await db.deleteInstrument(id);

        await createDeleteRecord(instrument);

        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
    }
});

app.put("/inventory/:id", async (req, res) => {
    //In put method we receive in body the new instrument
    var idUpdated = req.params.id; //Mongo id
    var newInstrument = req.body;
    try {
        oldInstrumentAcceptable = await db.findInstrumentById(idUpdated);
        await db.updateInstrument(idUpdated, newInstrument);
        newInstrumentAcceptable = await db.findInstrumentById(idUpdated);

        await createUpdateRecord(
            oldInstrumentAcceptable,
            newInstrumentAcceptable
        );

        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
    }
});
/* END: Inventory methods */

/* Register methods */
app.get("/register", async (req, res) => {
    try {
        let records = await db.findRecords();
        res.send(JSON.stringify(records));
    } catch (err) {
        res.statusMessage = "Error: " + err;
        res.sendStatus(500);
    }
});

app.get("/register/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let record = await db.findRecordById(id);
        res.send(JSON.stringify(record));
    } catch (err) {
        res.statusMessage = "Error: " + err;
        res.sendStatus(500);
    }
});

app.delete("/register", async (req, res) => {
    try {
        await db.deleteRecords();
        res.sendStatus(200);
    } catch (err) {
        res.statusMessage = "Error: " + err;
        res.sendStatus(500);
    }
});
/* END: Register methods */

// --- Other methods --- //
async function createAddRecord(instrument) {
    record = {
        type: "Add",
        summary: `A ${instrument.name} was added`,
        date: getToday(),
        summaryAdd: JSON.stringify(instrument),
    };
    recordAcceptable = db.Record(record);

    await db.saveRecord(recordAcceptable);
}

async function createDeleteRecord(instrument) {
    record = {
        type: "Delete",
        summary: `A ${instrument.name} was deleted`,
        date: getToday(),
        summaryDelete: JSON.stringify(instrument),
    };
    recordAcceptable = db.Record(record);

    await db.saveRecord(recordAcceptable);
}

async function createUpdateRecord(oldInstrument, newInstrument) {
    var instruments = {
        oldInstrument: oldInstrument,
        newInstrument: newInstrument,
    };
    record = {
        type: "Update",
        summary: `A ${oldInstrument.name} was updated to a ${newInstrument.name}`,
        date: getToday(),
        summaryUpdate: JSON.stringify(instruments),
    };
    recordAcceptable = db.Record(record);

    await db.saveRecord(recordAcceptable);
}

function getToday() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, "0");
    let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let year = today.getFullYear();
    return day + "/" + month + "/" + year;
}

async function connectDB() {
    await db.connect();
}

// --- Server beginning to listen --- //

app.listen(PORT, () => console.log(`Server listening in port: ${PORT}`));
connectDB();
