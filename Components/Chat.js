import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { SEND_MESSAGE, ROOM_MESSAGES, MESSAGE_ADDED } from "../queries/queries";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { formatMessage } from "./helpers/formatters";
import { useCurrentUser } from "../contexts/userContext";

export default function Chat({ route }) {
  const { roomId } = route.params;
  const [messages, setMessages] = useState([]);
  const user = useCurrentUser();

  const { loading, data } = useQuery(ROOM_MESSAGES, {
    variables: { id: roomId },
    fetchPolicy: "cache-and-network",
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (loading) return;
    const messagesList = data.room.messages.map(formatMessage).reverse();
    setMessages(messagesList);
  }, [data]);

  const onSend = useCallback(async (messages = []) => {
    if (!messages.length) return;

    const { text } = messages[0];
    await sendMessage({ variables: { body: text, roomId } });
  }, []);


// subscription and state update when new message
  const { data: subData } = useSubscription(MESSAGE_ADDED, {
    variables: { roomId },
  });

  useEffect(() => {
    if (subData) {
      const newMessage = [formatMessage(subData.messageAdded)]
      setMessages((prev) => GiftedChat.append(prev, newMessage));
    }
  }, [subData, setMessages]);

  if (!user) return null;
  return (
    <View style={styles.container}>
      <GiftedChat messages={messages} onSend={onSend} user={{ _id: user.id }} />
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
