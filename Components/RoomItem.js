import React from "react";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import ProfileIcon from "../assets/profile.svg";
import { ROOM_MESSAGES } from "../queries/queries";

export default function RoomItem(props) {
  const { id, roomPic, name } = props;
  const navigation = useNavigation();

  const { loading, data } = useQuery(ROOM_MESSAGES, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });


  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chat", { roomId: id })}
      style={styles.roomItem}
      key={id}
    >
      {roomPic ? (
        <Image style={styles.roomPicture} source={{ uri: roomPic }} />
      ) : (
        <ProfileIcon />
      )}
      <Text>{name}</Text>

      {loading ? <Text>Loading...</Text> : <Text>{data.room.messages[0].body}</Text>}
    </TouchableOpacity>
  );
}

RoomItem.propTypes = {
  id: PropTypes.string.isRequired,
  roomPic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

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
    borderRadius: 16,
  },
});
