import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MiniDrawer from './components/Menu'; // Menu lateral
import LoginPage from './components/Login'; // Página de Login
import GraphPage from './components/GraphPage';
import Usuarios from './components/Usuarios';
import Logs from './components/Logs'
import ProtectedRoute from './components/ProtectedRoute';
import { Box } from '@mui/material';
//MARTA INCLUIU A LINHA ABAIXO:
//import Logs from './components/Logs';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <AuthenticatedContent open={open} setOpen={setOpen} />
    </Router>
  );
}

function AuthenticatedContent({ open, setOpen }) {
  const location = useLocation(); // Agora dentro do Router, useLocation funciona

  // Condição para não renderizar o MiniDrawer na página de login
  const isLoginPage = location.pathname === '/';

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px', // Para evitar sobreposição com o AppBar
          marginLeft: open && !isLoginPage ? '240px' : '50px', // Quando o menu está aberto, desloca o conteúdo
          transition: 'margin-left 0.3s ease', // Transição suave para abrir/fechar
        }}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
            <GraphPage />
            </ProtectedRoute>} /> 
          <Route path="/log" element={
            <ProtectedRoute>
            <Logs />
            </ProtectedRoute>} />
         <Route path="/usuarios" element={
          <ProtectedRoute>
            <Usuarios />
            </ProtectedRoute>} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
