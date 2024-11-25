import React, { useState } from 'react';
import MiniDrawer from './components/Menu'; // Menu lateral
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GraphPage from './components/GraphPage';
import TablePage from './components/TablePage';
import Usuarios from './components/Usuarios';
import {Box} from '@mui/material';

function App() {

  const [open, setOpen] = useState(false);

  return (
    <Router>
      
      <MiniDrawer open={open} setOpen={setOpen}/>

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
          <Route path="/dashboard" element={<GraphPage />} />
          <Route path="/log" element={<TablePage />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </Box>

      {/* Rotas de conteúdo */}
      
    </Router>
  );
}

export default App;
