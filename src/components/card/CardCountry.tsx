import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';


interface ICardCountry {
    emoji?: string;
    name?: string;
    continent?: string
    image?: string;
    onClick?: () => void;
}

export const CardCountry:React.FC<ICardCountry> = ({emoji, name, continent, image, onClick}) => {
    return (
        <Card onClick={onClick} sx={{ maxWidth: 345 }} style={{borderRadius: '50px', boxShadow: '-4px -4px 8px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(0, 0, 0, 0.1)'}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                                {emoji}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                            <Typography variant="h5" color="primary" fontWeight={600}>
                                {name}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                {continent}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}