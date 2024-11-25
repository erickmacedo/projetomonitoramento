import express from "express";
import { inserirNovaTemperatura, principal, cadastrarNovoUsuario, consultaUsuarios} from "../controllers/Controllers.js";

const routes = (app) =>{
    app.use(express.json());
    
    app.get('/consultar/dados', principal);

    app.post('/inserir/temperatura', inserirNovaTemperatura);

    app.post('/cadastrar/usuario', cadastrarNovoUsuario);

    app.get('/consultar/usuarios', consultaUsuarios);

    app.delete('/delete-all', async (req, res) => {
  try {
    await Usuario.deleteMany({}); // Deleta todos os documentos
    res.status(200).send('Todos os registros foram apagados');
  } catch (err) {
    res.status(500).send('Erro ao apagar registros');
  }
});

}

export default routes;

