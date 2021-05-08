import React from "react";
import { useQuery } from "@apollo/client";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { USER_ROOMS } from "../queries/queries";
import RoomItem from "./RoomItem";

export default function Rooms() {
  const { loading, error, data } = useQuery(USER_ROOMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.usersRooms.rooms.map((room) => (
          <RoomItem key={room.id} {...room} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    justifyContent: "flex-start",
    width: "100%",
  },
});
