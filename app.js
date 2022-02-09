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
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
    }
});
app.delete("/inventory/:id", async (req, res) => {
    try {
        await db.deleteInstrument(req.params.id.trim());
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
    }
});

app.put("/inventory/:id", async (req, res) => {
    //In put method we receive in body the new instrument
    var idUpdated = req.params.id; //Mongo id
    var instrument = req.body;
    try {
        await db.updateInstrument(idUpdated, instrument);
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
/* END: Register methods */

// --- Other functions --- //
async function connectDB() {
    await db.connect();
}

// --- Server beginning to listen --- //

app.listen(PORT, () => console.log(`Server listening in port: ${PORT}`));
connectDB();
