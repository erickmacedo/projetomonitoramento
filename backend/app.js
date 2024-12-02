import express from "express";
import cors from "cors"
import routes from "./src/routes/postRoutes.js";
import connectionMQTT from "./src/config/mqtt.js";

const app = express ();
//const cors = require('cors');
const port = 3005;

app.use(cors());
routes(app);
connectionMQTT();

app.listen(port, ()=>{
    console.log(`Servidor Ativo na porta ${port}`)
})

