import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegação programática

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(`Username ${username}`)
    console.log(`Password ${password}`)

    try {
        const response = await axios.post('http://localhost:3005/login', {username, password});
        console.log(`success: ${response}`)
        if(response.data.success){
            console.log('Login Realizado')
            sessionStorage.setItem('user', username);
            navigate('/dashboard')
        }
        
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
    // Exemplo de autenticação simples, você pode substituir isso com sua lógica de back-end
 
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 5,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        
        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Nome de Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
