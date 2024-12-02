import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Filler } from 'chart.js';
import { Box, Typography, CircularProgress, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import BasicCard from './Cards';


// Registrando todos os elementos necessários para o gráfico de linha, incluindo o Filler
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Filler);




const GraphPage = () => {
  const [age, setAge] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sensors, setSensors] = useState([]);

  function handleChange(event) {
    setAge(event.target.value);
  }
  

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/consultar/dados');
      console.log(response.data); // Veja o formato da resposta

      const formattedData = (response.data.dados || []).map((dado) => ({
        id: dado._id,
        sensor: dado.sensor,
        valor: dado.valor,
        datahora: dado.datahora,
      }))

      setData(formattedData);

      const uniqueSensors = [...new Set(formattedData.map((item) => item.sensor))];
      setSensors(uniqueSensors);

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
      fetchData(); // Busca de dados a cada 5 segunsdos
    }, 5000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  const filteredData = setAge
  ? data.filter(item => item.sensor === age)
  : data;

  console.log(`Filtro ${filteredData}`)


  // Configuração do gráfico
  const chartData = {
    labels: data.map((item) => new Date(item.datahora).toLocaleTimeString()),
    datasets: [
      {
        label: 'Valor do Sensor',
        data: filteredData.map((item) => item.valor),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Box>
      <BasicCard/>
      <Typography variant="h4" gutterBottom sx={{
        textAlign: 'center',
        marginTop: '15px'
      }}>Gráfico de Dados dos Sensores</Typography>

<Box sx={{ minWidth: 120
       
 }}>
      <FormControl fullWidth
        sx={{
          marginTop: '10px'
        }}
      >
        <InputLabel id="demo-simple-select-label">Sensor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Sensor"
          onChange={handleChange}
        >
          <MenuItem>
            Selecione Uma Opção
          </MenuItem>
          {sensors.map((sensor)=> {
            console.log(`Sensor ${sensor}`);
            
            if (sensor)
            return <MenuItem key={sensor} value={sensor}> {sensor}</MenuItem>

          })}
        </Select>
      </FormControl>
    </Box>
 
      {loading ? (
        <CircularProgress />
      ) : (
        <Line data={chartData} />
      )}
    </Box>
  );
};

export default GraphPage;
