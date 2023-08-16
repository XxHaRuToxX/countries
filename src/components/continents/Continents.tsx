import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

interface ICountry {
    emoji?: string;
    name?: string;
    continent?: string
    image?: string;
    onClick?: () => void;
}

interface IContinent {
    name?: string;
    imageUrl?: string;
    countries?: ICountry;
    onClick?: ()=>void;
}

export const Continents:React.FC<IContinent> = ({name, imageUrl, onClick}) => {
    return (
        <Card onClick={onClick} sx={{ maxWidth: 200 }} style={{ borderRadius: '10px', boxShadow: '-4px -4px 8px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(0, 0, 0, 0.1)' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100"
                    image={imageUrl}
                    alt="green iguana"
                />
                <CardContent >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={12}>
                            <Typography variant="h6" color="text.secondary">
                                {name}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
