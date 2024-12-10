import express from "express";
import { inserirNovoDado, principal, cadastrarNovoUsuario, consultaUsuarios, realizaLogin, deleteUser, verificaUltimoDado, deleteData} from "../controllers/Controllers.js";

const routes = (app) =>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))
  
    app.get('/consultar/dados', principal);

    app.get('/consultar/usuarios', consultaUsuarios);

    app.get('/consultar/ultimodado', verificaUltimoDado);

    app.post('/inserir/dado', inserirNovoDado);

    app.post('/login', realizaLogin);

    app.post('/cadastrar/usuario', cadastrarNovoUsuario);    

    app.delete('/delete/user/:id', deleteUser);

    app.delete('/delete/log/:id', deleteData);
  



}



export default routes;

