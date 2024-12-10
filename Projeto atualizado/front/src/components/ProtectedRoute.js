import React from 'react';
import { Navigate} from 'react-router-dom';

// Componente de Rota Protegida
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');

  // Verifica se o token está presente no sessionStorage
  if (!token) {
    // Se não houver token, redireciona para a página de login
    return <Navigate to="/" replace />;
  }

  // Se houver token, exibe o conteúdo da rota protegida
  return children;
};

export default ProtectedRoute;
