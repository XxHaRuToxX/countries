import { Button, ButtonGroup, Grid } from "@mui/material";
import { useQuery } from "@apollo/client";

import { CardCountry } from "../../components/card/CardCountry";

import { GET_COUNTRIES } from '../../graphql/getCountries.graphql';
import { useEffect, useState } from "react";
import axios from "axios";
import { countryImages } from "../../data/imageCountry";
import { ModalCountry } from "../../components/modal/ModalCountry";

export const Home = ({ searchTerm, selectedContinent }: any) => {

  const [page, setPage] = useState(1);
  const perPage = 10;
  const { error, loading } = useQuery(GET_COUNTRIES, {
    variables: {
      page,
      perPage,
    },
  });

  const [countryDetails, setCountryDetails] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCountries = countryDetails.filter((country: any) => {
    if (selectedContinent) {
      return country.continent.name === selectedContinent;
    } else {
      return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const handleOpenModal = (country: any) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };
  console.log(selectedContinent);

  useEffect(() => {
    axios.post('https://countries.trevorblades.com/', {
      query: `
        query {
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
      `
    })
      .then(response => {
        const countriesData = response.data.data.countries;
        const countryImagesArray = Object.entries(countryImages);
        const fetchCountryImages = async () => {
          const updatedCountries: any = await Promise.all(
            countriesData.map(async (country: any) => {
              const imageUrl = countryImagesArray.find(([key]) => key === country.name)?.[1];
              return { ...country, imageUrl };
            })
          );
          setCountryDetails(updatedCountries);
        };
        fetchCountryImages();
      })
      .catch(error => {
        console.error('Error fetching country details:', error);
      });

  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>`Error... ${error.message}`</p>

  // const countries = data.countries;
  const countries = filteredCountries;
  const totalCountries = countries.length;
  const totalPages = Math.ceil(totalCountries / perPage);

  // Calcula el índice inicial y final de los países a mostrar en la página actual
  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalCountries);

  const countriesToRender = countries.slice(startIndex, endIndex);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <Grid container spacing={2}>
        {
          countriesToRender.map((country: any, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <CardCountry onClick={() => handleOpenModal(country)} emoji={country.emoji} name={country.name} continent={country.continent.name} image={country.imageUrl} />
            </Grid>
          ))
        }
        <ModalCountry
          country={selectedCountry}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Grid>
      <PaginationButtons page={page} setPage={setPage} totalPages={totalPages} pageNumbers={pageNumbers} />
    </>
  )
}

const PaginationButtons = ({ page, setPage, totalPages, pageNumbers }: any) => {
  const MAX_DISPLAY_PAGES = 5;

  let visiblePages = [...pageNumbers];

  if (totalPages > MAX_DISPLAY_PAGES) {
    const startIdx = Math.max(page - Math.floor(MAX_DISPLAY_PAGES / 2), 0);
    const endIdx = Math.min(startIdx + MAX_DISPLAY_PAGES, totalPages);

    visiblePages = pageNumbers.slice(startIdx, endIdx);
  }
  return (
    <ButtonGroup sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', margin: '1rem' }}>
      <Button onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1}>
        Prev
      </Button>
      {visiblePages.map((pageNumber: any) => (
        <Button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          variant={pageNumber === page ? 'contained' : 'outlined'}
        >
          {pageNumber}
        </Button>
      ))}
      <Button onClick={() => setPage(Math.min(page + 1, totalPages))} disabled={page === totalPages}>
        Next
      </Button>
    </ButtonGroup>
  );
};
