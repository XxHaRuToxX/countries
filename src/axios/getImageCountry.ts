import axios from 'axios';
const countries = [
    "United States",
    "Alemenia",
    "Peru"
];

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

// Dentro del componente que necesitas
async function getCountryImages(countryName:any) {
    const response = await axios.get(`https://api.unsplash.com/photos/random/?query=${countryName}&client_id=${ACCESS_KEY}`);
    const imageUrl = response.data.urls.regular;
    return imageUrl;
}
  
export const  generateCountryImageJSON = async()=> {
    const countryImages:any = {};

    for (const country of countries) {
        const imageUrl = await getCountryImages(country);
        countryImages[country] = imageUrl;
    }

    console.log(JSON.stringify(countryImages, null, 2));
}
  
// export const fetchImagesFromUnsplash = async (countryName: string) => {
//     const unsplashAccessKey = import.meta.env.VITE_ACCESS_KEY;
//     const searchQuery = `${countryName}`;

//     try {
//         const response = await axios.get(`${import.meta.env.VITE_UNSPLASH_API}/photos/random/`, {
//             params: {
//                 query: searchQuery,
//             },
//             headers: {
//                 Authorization: `Client-ID ${unsplashAccessKey}`,
//             },
//         });
//         console.log(response.data.urls.regular)
//         return response.data.urls.regular; // Otra propiedad puede contener la URL de la imagen
//     } catch (error) {
//         console.error('Error fetching image from Unsplash:', error);
//         return null;
//     }
// };