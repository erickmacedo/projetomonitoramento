import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState, useEffect} from "react";

const gradientColors = [
  "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Roxo-azul
  "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)", // Laranja-vermelho
  "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)", // Verde
  "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)", // Vermelho-azul
];


export default function DynamicCards() {
  const [sensorData, setSensorData] = useState([]);

  const dataSensor = async () => {
    try {
      const response = await axios.get("http://localhost:3005/consultar/ultimodado");

      const formattedData = (response.data.ultimodado || []).map((dado) => ({
        id: dado._id,
        label: dado.sensor,
        value: dado.ultimoDado.valor,
        datahora: dado.ultimoDado.datahora
      }));
      console.log("Dados:", formattedData);
      setSensorData(formattedData);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  // useEffect para carregar os dados ao montar o componente
  useEffect(() => {
    dataSensor();
  }, []); 

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          maxWidth: "100%",
          paddingX: 4,
        }}
      >
        {sensorData.map((sensor, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                backgroundImage: gradientColors[index],
                color: "white",
                boxShadow: 5,
                borderRadius: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 10,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {sensor.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "medium",
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  {sensor.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "medium",
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  Ultima Atualização: {sensor.datahora}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >

              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
