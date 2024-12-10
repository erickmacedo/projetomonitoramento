import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, CircularProgress, Avatar } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3005/login', { username, password });

      // Verificar se o token foi retornado
      if (response?.data?.token) {
        console.log('Login realizado com sucesso:', response.data);

        // Armazenar o token no sessionStorage (ou localStorage, conforme sua necessidade)
        sessionStorage.setItem('token', response.data.token);

        // Redirecionar para o dashboard
        navigate('/dashboard');
      } else {
        setError('Usuário ou senha inválidos. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro na requisição:', err.response || err.message);
      setError('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 8,
            padding: 4,
            boxShadow: 4,
            borderRadius: 2,
            backgroundColor: '#fff',
            animation: 'fade-in 1s ease-in-out',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlined />
          </Avatar>

          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography color="error" variant="body2" sx={{ marginBottom: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            </motion.div>
          )}

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <TextField
              label="Nome de Usuário"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.light',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />

            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.light',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 3,
                height: 45,
                fontWeight: 'bold',
                boxShadow: 3,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Entrar'}
            </Button>
          </form>
        </Box>
      </motion.div>
    </Container>
  );
};

export default LoginPage;
