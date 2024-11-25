import { getDados, registraTemperatura, insertUsuario, getUsers } from "../models/Models.js";

export async function principal (req, res)
    {
        const dados = await getDados();
        res.status(200).json({dados})
        
    }
export async function inserirNovaTemperatura (req, res)
    {
        const newDadosTemperatura = req.body;
        try{
            const temperaturaRegistrada = await registraTemperatura(newDadosTemperatura);
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