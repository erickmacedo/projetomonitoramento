import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {CircularProgress, Box, Modal, TextField, Button} from '@mui/material/';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'Nome', headerName: 'Nome', width: 130 },
  { field: 'username', headerName: 'Login', width: 130 },
];

const paginationModel = { page: 0, pageSize: 20 };

export default function DataTable() {
    const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    Nome: '',
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/consultar/usuarios');

      const formattedUsers = (response.data.users || []).map((user) => ({
        id: user._id,
        Nome: user.Nome,
        username: user.username,
      }));

      setUsers(formattedUsers);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
      setLoading(false);
    }
  };


 useEffect(() => {
    fetchData(); // Primeira busca de dados
    const interval = setInterval(() => {
      fetchData(); // Busca de dados a cada 5 segundos
    }, 5000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

const cadastrarusuario = async () => {
     try{
        await axios.post('http://localhost:3005/cadastrar/usuario', newUser)

     }catch(error){
        console.error('Erro ao inserir dados:', error);

     }
     handleCloseModal();
}

    
const handleOpenModal = () => setOpenModal(true);
const handleCloseModal = () => setOpenModal(false);

  

  return (
    <div>
    <Button 
        variant="outlined" 
        startIcon={<AddCircleOutlinedIcon />}
        onClick={handleOpenModal}
    >
        Adiconar usuário
    </Button>
    <Paper sx={{ 
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px'
        }}>
    
        {loading ? (
            <CircularProgress />
        ):      
        <DataGrid
        rows={users}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />}

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box sx={style}>
        <TextField
          required
          id="nomedousuario"
          placeholder="Nome do Usuário"
          label="Nome do Usuário"
          value={newUser.Nome}
          onChange={(e) => setNewUser({...newUser, Nome: e.target.value })}
        />
        <TextField
          required
          id="username"
          placeholder="Login"
          label="Login"
          value={newUser.username}
          onChange={(e) => setNewUser({...newUser,  username: e.target.value })}
        />
          <TextField
          required
          id="password"
          label="Senha"
          type="password"
          autoComplete="current-password"
          variant="filled"
          value={newUser.password}
          onChange={(e) => setNewUser({...newUser, password: e.target.value })}
        />
        <Button
            sx={{
                marginTop: '5px'
            }}
            onClick={cadastrarusuario}
        >
            Salvar
        </Button>
        
        </Box>
        
      </Modal>
    </Paper>
    </div>
  );
  
}
