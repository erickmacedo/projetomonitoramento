import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const paginationModel = { page: 0, pageSize: 100 };

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os logs
  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:3005/consultar/dados');
      const formattedLogs = response.data.dados.map((log) => ({
        id: log._id,
        sensor: log.sensor,
        valor: log.valor,
        dataHora: log.dataHora,
      }));
      setLogs(formattedLogs);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      setLoading(false);
    }
  };

  // Função para excluir um log
  const handleDeleteLog = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/delete/log/${id}`);
      setLogs(logs.filter((log) => log.id !== id)); // Remove o log localmente
    } catch (error) {
      console.error('Erro ao excluir log:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Colunas definidas dentro do componente para acessar o handleDeleteLog
  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'sensor', headerName: 'Sensor', width: 130 },
    { field: 'valor', headerName: 'Valor', width: 130 },
    { field: 'dataHora', headerName: 'Data e Hora', width: 200 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteLog(params.row.id)} // Acessa handleDeleteLog corretamente
        >
          Excluir
        </Button>
      ),
    },
  ];

  return (
    <Paper sx={{ height: '100%', width: '100%', marginTop: '10px' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={logs}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[100, 200]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}