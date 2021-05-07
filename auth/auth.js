import React from "react";

import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjE1MDY5OTIsImlhdCI6MTYxOTA4Nzc5MiwiaXNzIjoiY2hhdGx5IiwianRpIjoiMzE0MWIyY2QtY2FiZC00NjM0LWE4OTktYjYwOGVlYTExYTQzIiwibmJmIjoxNjE5MDg3NzkxLCJzdWIiOiI4YTU3ZjVhNC0wZDI5LTRiMjctOWNmYS0xMDY0MjA2NzFlM2MiLCJ0eXAiOiJhY2Nlc3MifQ.WYcygeWYanbAzti_6rJT0JRLLj8ZpuRPXfBivqBwQko4Wu-Gpiiz29UbxCtevYTsTweMwkO6Fm0Mdboj9BhGTg"

const authLink = setContext((_, {headers})=> {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

const httpLink = createHttpLink({
  uri: 'https://chat.thewidlarzgroup.com/api/graphiql',
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});