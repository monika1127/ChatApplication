import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {ROOM_MESSAGES}from '../queries/queries'
import { useQuery} from "@apollo/client";


export default function Chat({route}) {

  const {roomId} = route.params
  const [messages, setMessages] = useState([]);

  const { loading, data } = useQuery(ROOM_MESSAGES, {variables: {id: roomId}});

  const dateConverter = (UTCdate) => {
    const year = UTCdate.slice(0,4)
    const month = UTCdate.slice(5,7)
    const day = UTCdate.slice(8,10)
    const hour = UTCdate.slice(11,13)
    const minute = UTCdate.slice(14,16)
    const second = UTCdate.slice(17,19)

    return new Date(Date.UTC(year, month, day, hour, minute, second))
  }

  useEffect(()=>{
      if(loading) return
      const messagesList = data.room.messages.map(msg=>msg={
        _id: msg.id,
        text: msg.body,
        createdAt: dateConverter(msg.insertedAt),
        user: {
          _id: msg.user.id,
          name: msg.user.firstName,
          avatar: msg.user.profilePic,
        },})
        setMessages(messagesList)
  },[data])



  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />

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
