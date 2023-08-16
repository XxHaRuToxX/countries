import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
    query countries {
        countries{
        name
        emoji
        continent {
            name
            }
        }
    }
`

export const GET_CONTINENTS = gql`
    query continent {
        continents {
            name
            countries{
                name
                emoji
                continent{
                    name
                }
            }
        }
    }
`

