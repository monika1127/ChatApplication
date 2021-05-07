import React from "react";
import { useQuery, gql } from "@apollo/client";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import ProfileIcon from "../assets/profile.svg";

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

export default function Rooms({ navigation }) {
  const { loading, error, data } = useQuery(USER_ROOMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <View style={styles.container}>

        <ScrollView>
          {data.usersRooms.rooms.map((room) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat")}
              style={styles.roomItem}
              key={room.id}
            >
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
            </TouchableOpacity>
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
    borderRadius: 16,
  },
});
