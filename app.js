const express = require("express");
var path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

const PUERTO = process.env.PORT || 3000;

// --- FUNCIONES DE MIDDLEWARE

//curl -i -X GET http://localhost:3000/inventario
//Y tambien debe funcionar si buscas http://localhost:3000/inventario en google.
app.get("/inventario", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// --- ARRANQUE DE SERVICIO

app.listen(PUERTO, () =>
    console.log(`Servicio escuchando en el puerto ${PUERTO}`)
);
