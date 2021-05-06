import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import ProfileIcon from "../assets/profile.svg";
import { useQuery, gql } from "@apollo/client";

const USER_ROOMS = gql`
  query GetRoom {
    usersRooms {
      rooms {
        id
        name
        roomPic
      }
    }
  }
`;

export default function RoomItem() {
  const { loading, error, data } = useQuery(USER_ROOMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error(</Text>;

  return data.usersRooms.rooms.map((room) => (
    <View  style={styles.roomItem} key={room.id}>
      {room.roomPic ? (
        <Image
          style={styles.roomPicture}
          source={{
            uri: room.roomPic,
          }}
        />
      ) : (
        <ProfileIcon />
      )}
      <Text>{room.name}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  roomPicture: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  roomItem: {
    backgroundColor: "white",
    marginVertical: 4,
    flexDirection: "row",
    padding: 8,
    borderRadius: 16
  }
});
