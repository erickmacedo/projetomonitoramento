import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Box,
  Modal,
  TextField,
  Button,
  Typography,
} from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import MiniDrawer from "./Menu";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  background: "linear-gradient(90deg, #42a5f5, #1e88e5)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(90deg, #1e88e5, #1565c0)",
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "none",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

const paginationModel = { page: 0, pageSize: 20 };

export default function Usuarios({ open, setOpen }) {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    Nome: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [addingUser, setAddingUser] = useState(false);

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/consultar/usuarios");
      const formattedUsers = (response.data.users || []).map((user) => ({
        id: user._id,
        Nome: user.Nome,
        username: user.username,
      }));
      setUsers(formattedUsers);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setLoading(false);
    }
  };

  // Função para excluir um usuário
  const handleDeleteUser = async (id) => {
    console.log(`ID: ${id}`)
    try {
      await axios.delete(`http://localhost:3005/delete/user/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Remove o usuário localmente
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  // Função para cadastrar usuário
  const cadastrarusuario = async () => {
    setAddingUser(true);
    try {
      await axios.post("http://localhost:3005/cadastrar/usuario", newUser);
      fetchData(); // Atualiza a lista após cadastrar
      setNewUser({ Nome: "", username: "", password: "" });
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao inserir dados:", error);
    } finally {
      setAddingUser(false);
    }
  };

  useEffect(() => {
    fetchData(); // Primeira busca de dados
    const interval = setInterval(() => {
      fetchData(); // Busca de dados a cada 5 segundos
    }, 5000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Colunas definidas dentro do escopo do componente
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "Nome", headerName: "Nome", width: 150 },
    { field: "username", headerName: "Login", width: 150 },
    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => (
        <StyledButton
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteUser(params.row.id)}
        >
          Excluir
        </StyledButton>
      ),
    },
  ];

  return (

    <Box sx={{ padding: 2 }}>
       <MiniDrawer open={open} setOpen={setOpen} />
      {/* Botão de Adicionar Usuário */}
      <StyledButton
        variant="contained"
        startIcon={<AddCircleOutlinedIcon />}
        onClick={handleOpenModal}
        sx={{ marginBottom: 2 }}
      >
        Adicionar Usuário
      </StyledButton>

      {/* Tabela de Usuários */}
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : users.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Nenhum usuário encontrado.
          </Typography>
        ) : (
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{
              border: "none",
              "& .MuiDataGrid-cell:hover": {
                color: "#42a5f5",
              },
            }}
          />
        )}
      </Paper>

      {/* Modal de Cadastro */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Cadastrar Novo Usuário
          </Typography>
          <TextField
            required
            label="Nome do Usuário"
            value={newUser.Nome}
            onChange={(e) => setNewUser({ ...newUser, Nome: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Login"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Senha"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          <StyledButton
            onClick={cadastrarusuario}
            disabled={addingUser}
            sx={{ marginTop: 2 }}
          >
            {addingUser ? "Salvando..." : "Salvar"}
          </StyledButton>
        </Box>
      </Modal>
    </Box>
  );
}
