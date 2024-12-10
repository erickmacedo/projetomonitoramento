import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  LineElement, 
  PointElement, 
  CategoryScale, 
  LinearScale, 
  Title, 
  Filler, 
  Tooltip, 
  Legend 
} from "chart.js";
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Select, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Paper 
} from "@mui/material";
import axios from "axios";
import BasicCard from "./Cards";
import MiniDrawer from "./Menu";

// Registrando elementos necessários para o gráfico
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Filler, Tooltip, Legend);

const GraphPage = ({ open, setOpen }) => {
  const [selectedSensor, setSelectedSensor] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sensors, setSensors] = useState([]);
 /* const [open, setOpen] = useState(false);*/

  // Atualiza o sensor selecionado
  const handleChange = (event) => {
    setSelectedSensor(event.target.value);
  };

  // Busca os dados do backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3005/consultar/dados");

      const formattedData = (response.data.dados || []).map((dado) => ({
        id: dado._id,
        sensor: dado.sensor,
        valor: dado.valor,
        datahora: dado.datahora,
      }));

      setData(formattedData);

      // Gera uma lista única de sensores
      const uniqueSensors = [...new Set(formattedData.map((item) => item.sensor))];
      setSensors(uniqueSensors.filter((sensor) => sensor !== "Presença"));

      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Primeira busca de dados
    const interval = setInterval(() => {
      fetchData(); // Atualiza os dados a cada 5 segundos
    }, 5000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  // Filtra os dados de acordo com o sensor selecionado
  const filteredData = selectedSensor
  ? data.filter((item) => item.sensor === selectedSensor && item.sensor !== "Presença")
  : data

  // Configuração do gráfico
  const chartData = {
    labels: filteredData.map((item) => new Date(item.datahora).toLocaleTimeString()),
    datasets: [
      {
        label: `Dados do Sensor ${selectedSensor || "Todos"}`,
        data: filteredData.map((item) => item.valor),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.3)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        tension: 0.4, // Deixa as linhas mais suaves
        fill: true,
      },
    ],
  };

  return (

    <Box sx={{ padding: 2 }}>
      <MiniDrawer open={open} setOpen={setOpen} />
      {/* Cards Resumo */}
      <BasicCard />

      {/* Título */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "bold",
          color: "#3f51b5",
        }}
      >
        Gráfico de Dados dos Sensores
      </Typography>

      {/* Filtro de Sensor */}
      <Box sx={{ minWidth: 120, marginTop: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="sensor-select-label">Sensor</InputLabel>
          <Select
            labelId="sensor-select-label"
            id="sensor-select"
            value={selectedSensor}
            label="Sensor"
            onChange={handleChange}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              boxShadow: 1,
              "& .MuiSelect-select": {
                transition: "0.3s",
              },
            }}
          >
            <MenuItem value="">
              <em>Todos os Sensores</em>
            </MenuItem>
            {sensors.map((sensor) => (
              <MenuItem key={sensor} value={sensor}>
                {sensor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Gráfico ou carregamento */}
      <Paper
        elevation={3}
        sx={{
          marginTop: 4,
          padding: 3,
          borderRadius: 3,
          background: "linear-gradient(to bottom, #f3f4f6, #ffffff)",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress sx={{ color: "#3f51b5" }} />
          </Box>
        ) : filteredData.length > 0 ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    stepSize: 10,
                  },
                },
              },
            }}
          />
        ) : (
          <Typography
            sx={{ textAlign: "center", marginTop: 2, fontWeight: "bold", color: "#f44336" }}
          >
            Nenhum dado disponível para o sensor selecionado.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default GraphPage;
