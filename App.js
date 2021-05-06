import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Room from "./Components/Rooms";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Graphql from './Components/RoomItem'
import { setContext } from '@apollo/client/link/context';

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
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Room />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
