import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Filler } from 'chart.js';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

// Registrando todos os elementos necessários para o gráfico de linha, incluindo o Filler
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Filler);

const GraphPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/sensor-data');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setLoading(false);
    }
  };

  // Usando o useEffect para buscar os dados inicialmente e depois a cada 5 segundos
  useEffect(() => {
    fetchData(); // Primeira busca de dados
    const interval = setInterval(() => {
      fetchData(); // Busca de dados a cada 5 segundos
    }, 5000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  // Configuração do gráfico
  const chartData = {
    labels: data.map((item) => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Valor do Sensor',
        data: data.map((item) => item.value),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Gráfico de Dados do Sensor</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Line data={chartData} />
      )}
    </Box>
  );
};

export default GraphPage;
