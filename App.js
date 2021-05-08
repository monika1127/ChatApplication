import React from "react";

import { client } from "./auth/auth";
import { ApolloProvider } from "@apollo/client/react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Chat from "./Components/Chat";
import Rooms from "./Components/Rooms";
import HeaderChat from "./Components/ScreenHeaders/HeaderChat";
import HeaderRooms from "./Components/ScreenHeaders/HeaderRooms";
import { ContextProvider } from "./contexts/userContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Rooms"
              component={Rooms}
              options={{ header: () => <HeaderRooms /> }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ header: () => <HeaderChat /> }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </ApolloProvider>
  );
}
