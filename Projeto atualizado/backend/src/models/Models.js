import conectarAoBanco from "../config/database.js";
const connection = await conectarAoBanco('mongodb+srv://erick98macedo:EBkq166El7GeJ5We@cluster0.wyqzi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = connection.db("projeto-monitoramento");

export async function getDados(){    
    const coltemp = db.collection("temperatura");
    return coltemp.find().toArray();
}

export async function registradado(dadosTemperatura) {
    const colecao = db.collection("temperatura");
    return colecao.insertOne(dadosTemperatura);
    
}

export async function insertUsuario(usuario) {
    const colecao = db.collection("users");
    return colecao.insertOne(usuario);
    
}

export async function getUsers(){    
    const colusers = db.collection("users");
    return colusers.find().toArray();
}