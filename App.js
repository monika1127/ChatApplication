import React from "react";

import {client} from './auth/auth'
import { ApolloProvider } from "@apollo/client/react";

import { StyleSheet, View } from "react-native";


import Chat from './Components/Chat'
import Room from "./Components/Rooms";


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
