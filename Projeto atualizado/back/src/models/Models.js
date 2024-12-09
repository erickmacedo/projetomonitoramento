import conectarAoBanco from "../config/database.js";
const connection = await conectarAoBanco('mongodb+srv://erick98macedo:EBkq166El7GeJ5We@cluster0.wyqzi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = connection.db("projeto-monitoramento");
import {ObjectId} from 'mongodb';

export async function getDados(){    
    const coltemp = db.collection("temperatura");
    return coltemp.find().toArray();
}
export async function consultaUltimoDado() {
    const coltemp = db.collection("ultimoestado");
    return coltemp.find().toArray();
    
}

export async function registradado(dadosTemperatura) {
    const colecaoHistorico = db.collection("temperatura");
    const colecaoUltimoEstado = db.collection("ultimoestado");

    await colecaoHistorico.insertOne(dadosTemperatura);
    await colecaoUltimoEstado.updateOne(
        { sensor: dadosTemperatura.sensor }, // Condição para encontrar o sensor
        { $set: { ultimoDado: dadosTemperatura } }, // Atualiza com o último dado
        { upsert: true } // Insere um novo registro caso o sensor não exista
    );

    return { sucesso: true, mensagem: "Dado registrado e último estado atualizado" };
}

export async function insertUsuario(usuario) {
    const colecao = db.collection("users");
    return colecao.insertOne(usuario);
    
}

export async function excluirUsuario(id){
    const colecao = db.collection("users");
    const objectId = new ObjectId(id);
    // Realiza a exclusão com o ObjectId
    const resultado = await colecao.deleteOne({ _id: objectId });
    return resultado.deletedCount === 1; // Reto
}

export async function excluirDado(id){
    const colecao = db.collection("temperatura");
    const objectId = new ObjectId(id);
    // Realiza a exclusão com o ObjectId
    const resultado = await colecao.deleteOne({ _id: objectId });
    return resultado.deletedCount === 1; // Retorna 1 caso a exclusão ocrra normalmente
}

export async function getUsers(){    
    const colusers = db.collection("users");
    return colusers.find().toArray();
}