import { styled, useTheme, Theme, CSSObject, alpha } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, InputBase, Paper, Grid } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Home as HomeIcon, LiveTv, ViewInAr, ChevronLeft, ChevronRight, Menu, Search as SearchIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Home } from '../../pages/home/Home';
import { ViewOne } from '../../pages/viewOne/ViewOne';
import { ViewTwo } from '../../pages/viewTwo/ViewTwo';
import { Continents } from '../continents/Continents';
import { GET_CONTINENTS } from '../../graphql/getCountries.graphql';
import { useQuery } from '@apollo/client';
import axios from 'axios';
import { continentImages } from '../../data/imageContinent';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const Sidebar = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [menuData, setMenuData] = useState("Home");
    const [search, setSearch] = useState("");

    const { error, loading } = useQuery(GET_CONTINENTS);

    const [showContinentSuggestions, setShowContinentSuggestions] = useState(false);
    const [continentDetails, setContinentDetails] = useState([]);
    const [selectedContinent, setSelectedContinent] = useState("");

    const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleContinentClick = (continent: any) => {
        setSelectedContinent(continent);
        setShowContinentSuggestions(false);
    };

    useEffect(() => {
        axios.post('https://countries.trevorblades.com/', {
            query: `
            query {
                continents{
                    name
                    countries {
                        name
                        emoji
                        continent {
                          name
                        }
                        languages{
                          name
                        }
                        capital
                        currency
                    }
                }
            }
          `
        })
            .then(response => {
                const countriesData = response.data.data.continents;
                // Obtener las imágenes de Unsplash y actualizar los detalles de los países
                const countryImagesArray = Object.entries(continentImages);
                const fetchCountryImages = async () => {
                    const updatedCountries: any = await Promise.all(
                        countriesData.map(async (country: any) => {
                            const imageUrl = countryImagesArray.find(([key]) => key === country.name)?.[1];
                            return { ...country, imageUrl };
                        })
                    );
                    setContinentDetails(updatedCountries);
                };
                fetchCountryImages();
            })
            .catch(error => {
                console.error('Error fetching country details:', error);
            });

    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>`Error... ${error.message}`</p>

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <Menu />
                    </IconButton>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={search}
                            type='text'
                            onChange={searcher}
                            onClick={() => setShowContinentSuggestions(true)}
                            onBlur={() => setShowContinentSuggestions(false)}
                        />
                    </Search>
                    {showContinentSuggestions && (
                        <Paper style={{
                            position: 'absolute',
                            width: '45%',
                            borderRadius: "5%",
                            backgroundColor: 'rgba(128, 128, 128, 0.9)',
                            zIndex: 1,
                            top: 'calc(100% + 0.5rem)',
                            left: '4rem',
                            padding: '1rem'
                        }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={12}>
                                    <Typography variant="h6" fontWeight={500} color="default">
                                        Filtrar por continentes
                                    </Typography>
                                </Grid>
                                {
                                    continentDetails.map((cont: any, index: any) => (
                                        <Grid key={index} item xs={12} sm={6} md={4}>
                                            <Continents onClick={()=> handleContinentClick(cont.name) } name={cont.name} imageUrl={cont.imageUrl} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Paper>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ESJNEXT
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Home', 'Vista 1', 'Vista 2'].map((text, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={() => setMenuData(text)}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {
                                        text === "Home" && <HomeIcon />
                                    }
                                    {
                                        text === "Vista 1" && <LiveTv />
                                    }
                                    {
                                        text === "Vista 2" && <ViewInAr />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {
                    menuData === "Home" && <Home searchTerm={search} selectedContinent={selectedContinent} />
                }
                {
                    menuData === "Vista 1" && <ViewOne />
                }
                {
                    menuData === "Vista 2" && <ViewTwo />
                }
            </Box>
        </Box>
    );
}