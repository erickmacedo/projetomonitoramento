import { getDados, registradado, insertUsuario, getUsers } from "../models/Models.js";
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