import { Modal, Card, CardContent, Typography, CardMedia, Grid, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export const ModalCountry = ({ country, isOpen, onClose }: any) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
      <div style={{padding:'1.5rem'}}>
        {country && (
          <Card style={{ maxWidth: 400, padding:'1.5rem', margin:'0.5rem' }}>
            <CardMedia
              component="img"
              height="400"
              image={country.imageUrl}
              alt={country.name}
            />
            <IconButton
              style={{ position: 'absolute', top: '16rem', right: '1.5rem' }}
              onClick={onClose}
            >
              <Close />
            </IconButton>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {country.emoji}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                  <Typography variant="h5" color="primary" fontWeight={600}>
                    {country.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {country.continent.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h5" color="primary" fontWeight={600}>
                    Capital:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                  <Typography variant="h6" color="text.secondary">
                    {country.capital}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="h5" color="primary" fontWeight={600}>
                    Language:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <Typography variant="h6" color="text.secondary">
                    {country.languages.map((language:any) => language.name)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="h5" color="primary" fontWeight={600}>
                    Currency:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <Typography variant="h6" color="text.secondary">
                    {country.currency}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </div>
    </Modal>
  );
};
