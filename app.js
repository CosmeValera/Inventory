const express = require("express");
var path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

const PUERTO = process.env.PORT || 3000;

// --- FUNCIONES DE MIDDLEWARE

//curl -i -X GET http://localhost:3000/inventory
//Y tambien debe funcionar si buscas http://localhost:3000/curl -i -X GET http://localhost:3000/inventory en google.
app.get("/inventory", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/inventory/:id", (req, res) => {
    // res.sendFile(__dirname + "/public/instrument.html");
});

//curl -i -X POST http://localhost:3000/inventory
app.post("/inventory", (req, res) => {
    res.sendFile(__dirname + "/public/create.html");
});
app.put("/inventory", (req, res) => {
    // res.sendFile(__dirname + "/public/create.html");
});
app.delete("/inventory", (req, res) => {
    // res.sendFile(__dirname + "/public/create.html");
});

// --- ARRANQUE DE SERVICIO

app.listen(PUERTO, () =>
    console.log(`Servicio escuchando en el puerto ${PUERTO}`)
);
