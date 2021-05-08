import React, { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import ProfileIcon from "../assets/profile.svg";
import { MESSAGE_ADDED, ROOM_MESSAGES } from "../queries/queries";

export default function RoomItem(props) {
  const { id, roomPic, name } = props;
  const navigation = useNavigation();
  const [lastMessage, setLastMessage] = useState();
  const [unreadedMsg, setUnreadedMsg] = useState(false);
  const isFocused = useIsFocused()
  // loding messages when component render
  const { loading, data } = useQuery(ROOM_MESSAGES, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (data) {
      setLastMessage(data.room.messages[data.room.messages.length - 1].body);
    }
  }, [data]);

  // subscription and state update when new message
  const { data: subData } = useSubscription(MESSAGE_ADDED, {
    variables: { roomId: id },
  });

  useEffect(() => {
    if (subData) {
      setLastMessage(subData.messageAdded.body);
      isFocused && setUnreadedMsg(true);
    }
  }, [subData]);

  const handleClick = () => {
    navigation.navigate("Chat", { roomId: id });
    setUnreadedMsg(false);
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={[
        styles.roomItem,
        unreadedMsg ? styles.roomItemActive : styles.roomItemInactive,
      ]}
      key={id}
    >
      {roomPic ? (
        <Image style={styles.roomPicture} source={{ uri: roomPic }} />
      ) : (
        <ProfileIcon />
      )}
      <View style={styles.roomDecription}>
        <Text
          numberOfLines={1}
          style={[styles.roomTitle, unreadedMsg ? styles.textWhite : styles.textBlack]}
        >
          {name}
        </Text>
        {loading ? (
          <Text style={[unreadedMsg ? styles.textWhite : styles.textBlack]}>Loading...</Text>
        ) : (
          <Text numberOfLines={1} style={[unreadedMsg ? styles.textWhite : styles.textBlack]}>
            {lastMessage}
          </Text>
        )}
      </View>
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
    marginVertical: 4,
    flexDirection: "row",
    padding: 8,
    borderRadius: 16,
    alignItems: "center",
  },
  roomItemActive: {
    backgroundColor: "#5603ad",
  },

  roomItemInactive: {
    backgroundColor: "white",
  },
  roomDecription: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 24,
  },
  roomTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textWhite: {
    color: "white",
  },
  textBlack: {
    color: "black",
  },
});
