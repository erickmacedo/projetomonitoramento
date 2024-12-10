import { getDados, registradado, insertUsuario, getUsers, excluirUsuario, consultaUltimoDado, excluirDado } from "../models/Models.js";
import jwt from 'jsonwebtoken';

const SECRET_KEY = '_h4?Gk2B*9&@ZxY3!'

export async function realizaLogin(req, res){
    const { username, password } = req.body;
    
    try {
        const users = await getUsers();   
        const user = users.find(user => user.username === username);

        if (username === user.username && password === user.password) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ token });
        }else{
            res.status(404).json({ error: 'Credenciais inválidas' });
        }        
    } catch (error) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        
    }    
}

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Token ausente
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token inválido
        }
        req.user = user;
        next();
    });
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
    res.status(200).json({users});
    
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




