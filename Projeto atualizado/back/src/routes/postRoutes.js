import express from "express";
import session from "express-session";
import { inserirNovoDado, principal, cadastrarNovoUsuario, consultaUsuarios, verificaAutenticacao, realizaLogin, deleteUser, verificaUltimoDado, deleteData} from "../controllers/Controllers.js";

const routes = (app) =>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))

    app.use(session({
      secret: 'turma-88419',
      resave: false,
      saveUninitialized:true,
      cookie: { secure: false}
  }))
  
    app.get('/consultar/dados', principal);

    app.post('/inserir/dado', inserirNovoDado);

    app.post('/cadastrar/usuario', cadastrarNovoUsuario);

    app.get('/consultar/usuarios', consultaUsuarios);

    app.get('/check-auth', verificaAutenticacao)

    app.post('/login', realizaLogin);

    app.get('/consultar/ultimodado', verificaUltimoDado);

    app.delete('/delete/user/:id', deleteUser);

    app.delete('/delete/log/:id', deleteData);
    


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

