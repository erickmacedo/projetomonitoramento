import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function BasicCard(sensors) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2, // Espaçamento entre bordas e conteúdo
      }}
    >
      <Grid
        container
        spacing={2} // Espaçamento entre os cards
        sx={{
          maxWidth: '100%', // Permite que os cards ocupem toda a largura
          paddingX: 4, // Espaçamento interno das laterais
        }}
      >
        
        <Grid item xs={12} sm={6} md={3} sx={{ marginLeft: 0 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Tensão
              </Typography>
              <Typography variant="body2">
                <br />
                {'2,5V'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Log</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Presença
              </Typography>
              <Typography variant="body2">
                <br />
                {'Detectada'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Log</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Distância
              </Typography>
              <Typography variant="body2">
                <br />
                {'2 mts'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Log</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            marginRight: 0, // Alinha o último card à borda direita
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Temperatura
              </Typography>
              <Typography variant="body2">
                <br />
                {'23º'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Log</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
