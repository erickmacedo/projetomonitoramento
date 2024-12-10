import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
            <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px', // Para evitar sobreposição com o AppBar
          marginLeft: open ? '240px' : '50px', // Quando o menu está aberto, desloca o conteúdo
          transition: 'margin-left 0.3s ease', // Transição suave para abrir/fechar
        }}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
            <GraphPage open={open} setOpen={setOpen} />
            </ProtectedRoute>} /> 
          <Route path="/log" element={
            <ProtectedRoute>
            <Logs open={open} setOpen={setOpen} />
            </ProtectedRoute>} />
         <Route path="/usuarios" element={
          <ProtectedRoute>
            <Usuarios open={open} setOpen={setOpen}/>
            </ProtectedRoute>} />
        </Routes>
      </Box>
    </Router>
  );
}


export default App;
