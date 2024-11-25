import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Box } from '@mui/material/';

const columns = [
  { field: 'sensor', headerName: 'Sensor', width: 250 },
  { field: 'valor', headerName: 'Valor Medido', width: 200 },
  { field: 'datahora', headerName: 'Data / Hora', width: 250},
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      setLoading(true); // Ativa o carregamento enquanto busca
      const response = await axios.get('http://localhost:3005/consultar/dados');
      console.log(response.data); // Veja o formato da resposta

      const formattedData = (response.data.dados || []).map((dado) => ({
        id: dado._id,
        sensor: dado.sensor,
        valor: dado.valor,
        datahora: dado.datahora,
      }));

      setData(formattedData);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    } finally {
      setLoading(false); // Desativa o carregamento após o término da busca
    }
  };

  useEffect(() => {
    fetchData(); // Primeira busca de dados
    const interval = setInterval(() => {
      fetchData(); // Busca de dados a cada 5 segundos
    }, 100000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  return (
    <div>
      <Paper
        sx={{
          height: 400,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        )}
      </Paper>
    </div>
  );
}
