import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: import.meta.env.VITE_CLIENT_GRAPHQL_ENTPOINT,
    cache: new InMemoryCache()
})