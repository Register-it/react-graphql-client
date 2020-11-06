import { ApolloClient } from "apollo-boost"

import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

// Create an http link:
const httpLink = new HttpLink({
  uri: "https://java-graphql-server.herokuapp.com/"
  // uri: "http://localhost:8080/graphql"
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default apolloClient
