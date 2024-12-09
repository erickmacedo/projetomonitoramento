import { getDados, registradado, insertUsuario, getUsers, excluirUsuario, consultaUltimoDado, excluirDado } from "../models/Models.js";
import axios from 'axios';



export function isAuthenticated(req,res,next){
    if(req.session.user){
        return next();
    }else{
        res.redirect('/')
    }
}

export function verificaAutenticacao(req, res){
    if(req.session.user){
        res.json({loggedIn: true})
    } else {
        res.json({loggedIn: false})
    }
}

export async function realizaLogin (req,res){
    const { username, password } = req.body
    console.log('username', username)
    console.log('senha', password)

    try {
        const response = await axios.get('http://localhost:3005/consultar/usuarios');
  
        const formattedUsers = (response.data.users || []).map((user) => ({
          id: user._id,
          Nome: user.Nome,
          username: user.username,
          password: user.password
        }));

        const user = response.data.users.find((user) => user.username === username && user.password === password);


        if(username === user.username && password === user.password){
            console.log("Login Realizado com sucesso!")
            req.session.user = {username}
            res.status(200).json({ success: true })
        }else{
            res.json({success:false, message: 'Credenciais inválidas'})
        }
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
}
    

export async function principal (req, res)
    {
        const dados = await getDados();
        res.status(200).json({dados})
        
    }
export async function inserirNovoDado (req, res)
    {
        const newDadosTemperatura = req.body;
        try{
            const temperaturaRegistrada = await registradado(newDadosTemperatura);
            res.status(200).json(temperaturaRegistrada);
        }catch(erro){
            console.error(erro.message);
            res.status(500).json({"Erro":"Falha na requisição"})
        }
        
    }


export async function cadastrarNovoUsuario(req, res) {
    const usuario = req.body;
    try {
        const usuariocadastrado = await insertUsuario(usuario)
        res.status(200).json(usuariocadastrado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
    
}

export async function consultaUsuarios(req, res) {
    const users = await getUsers();
        res.status(200).json({users})
    
}

export async function verificaUltimoDado(req, res) {

    try {
        const ultimodado = await consultaUltimoDado();
        res.status(200).json({ultimodado})
    } catch (error) {

        res.status(500).json({ error: 'Erro ao consultar o ultimo dado', details: err });
        
    }
    
} 

//MARTA: Função para excluir um usuario
export async function deleteUser(req, res) {
    const _id = req.params.id;  // Acessa o ID passado na URL
    console.log(`ID recebido na URL: ${_id}`);

    if (!_id) {
        return res.status(400).json({ error: 'ID não fornecido.' });
    }

    try {
        const resultado = await excluirUsuario(_id);  // Chama a função para excluir o usuário

        if (resultado) {
            res.status(200).json({ message: 'Usuário excluído com sucesso.' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (err) {
        console.error("Erro na função deleteUser:", err);
        res.status(500).json({ error: 'Erro ao excluir o usuário.', details: err.message });
    }
}

export async function deleteData(req, res) {
    const _id = req.params.id;  // Acessa o ID passado na URL
    console.log(`ID recebido na URL: ${_id}`);

    if (!_id) {
        return res.status(400).json({ error: 'ID não fornecido.' });
    }

    try {
        const resultado = await excluirDado(_id);  // Chama a função para excluir o usuário

        if (resultado) {
            res.status(200).json({ message: 'Log excluído com sucesso.' });
        } else {
            res.status(404).json({ message: 'Log não encontrado.' });
        }
    } catch (err) {
        console.error("Erro na função deleteUser:", err);
        res.status(500).json({ error: 'Erro ao excluir o Log.', details: err.message });
    }
}

