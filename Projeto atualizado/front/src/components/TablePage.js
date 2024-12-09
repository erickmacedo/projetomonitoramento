import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const columns = [
  { field: "sensor", headerName: "Sensor", width: 250 },
  { field: "valor", headerName: "Valor Medido", width: 200 },
  { field: "datahora", headerName: "Data / Hora", width: 250 },
];

const paginationModel = { page: 0, pageSize: 100 };

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  // Função para buscar os dados
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
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para exportar os dados selecionados
  const exportToCSV = () => {
    if (selectedRows.length === 0) {
      alert("Por favor, selecione ao menos um item para exportar.");
      return;
    }

    const rowsToExport = data.filter((row) => selectedRows.includes(row.id));
    const csv = Papa.unparse(rowsToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `dados_selecionados_${Date.now()}.csv`);
  };

  useEffect(() => {
    fetchData(); // Primeira busca de dados
    const interval = setInterval(() => {
      fetchData(); // Busca de dados a cada 100 segundos
    }, 100000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <div>
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 3,
          padding: 3,
          borderRadius: 2,
          gap: 2,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress sx={{ color: "#2575fc" }} />
              <Typography
                sx={{
                  marginTop: 2,
                  fontWeight: "bold",
                  color: "#2575fc",
                }}
              >
                Carregando dados...
              </Typography>
            </Box>
          </Box>
        ) : (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#2575fc",
                  fontWeight: "bold",
                }}
              >
                Dados de Sensores
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={exportToCSV}
                startIcon={<Download />}
                disabled={selectedRows.length === 0}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#2575fc",
                  "&:hover": { backgroundColor: "#1a4fb4" },
                  "&:disabled": { backgroundColor: "#c5c5c5", color: "#ffffff" },
                }}
              >
                Exportar CSV
              </Button>
            </Stack>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[100, 200]}
              checkboxSelection
              components={{ Toolbar: GridToolbar }}
              onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
              sx={{
                border: 0,
                width: "100%",
                "& .MuiDataGrid-columnHeaders": {
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row:nth-of-type(odd)": {
                  backgroundColor: "#f5f5f5",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#e0f7fa",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: 14,
                  fontWeight: "medium",
                },
                "& .MuiCheckbox-root": {
                  color: "#2575fc",
                },
              }}
            />
          </>
        )}
      </Paper>
    </div>
  );
}
