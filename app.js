const express = require("express");
const path = require("path");
const db = require("./public/dbInstruments");
const app = express();
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// --- FUNCIONES DE MIDDLEWARE

// //curl -i -X GET http://localhost:3000/inventory
// //Y tambien debe funcionar si buscas http://localhost:3000/curl -i -X GET http://localhost:3000/inventory en google.
//  app.get("/inventory", (req, res) => {
//       console.log(`app.get("/inventory", (req, res)`);
//       res.sendFile(__dirname + "/public/index.html");
//  });
// //Obtener objeto con ese id, mandarlo al html de detalles para que muestre ese
// //Abrir detalles con un modal, en vez de html
// app.get("/inventory/:id", async (req, res) => {
//     console.log(`app.get("/inventory/:id", (req, res)`);
//     console.log(`El id del instrumento es: ${req.params.id}`);

//     await db.connect();
//     var id = req.params.id;
//     var instrument = await db.findInstrumentById(id);
//     // await db.disconnect();
//     // res.sendFile(__dirname + "/public/details.html");
//     // window.location = "/public/details.html";
// });

//curl -i -X POST http://localhost:3000/inventory
app.post("/inventory", async (req, res) => {
  console.log(`app.post("/inventory", (req, res)`);
  instrument = req.body;
  instrumentAcceptable = db.Instrument(instrument);
  let ok = await db.saveInstrument(instrumentAcceptable);
  // console.log(req.body.instrument);
  if (ok) {
    //Aqui creamos un instrumento nuevo con lo que nos llega al body
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});
// app.put("/inventory", (req, res) => {
//     console.log(`app.put("/inventory", (req, res)`);
//     // res.sendFile(__dirname + "/public/create.html");
// });
// app.delete("/inventory", (req, res) => {
//     console.log(`app.delete("/inventory", (req, res)`);
//     // res.sendFile(__dirname + "/public/create.html");
// });

// Other functions
async function connectDB() {
    await db.connect();
}

// --- ARRANQUE DE SERVICIO

app.listen(PORT, () => console.log(`Server listening in port: ${PORT}`));
connectDB();
