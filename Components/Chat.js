import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { SEND_MESSAGE, ROOM_MESSAGES } from "../queries/queries";
import { useMutation, useQuery } from "@apollo/client";
import { formatMessage } from "./helpers/formatters";

export default function Chat({ route }) {
  const { roomId } = route.params;
  const [messages, setMessages] = useState([]);

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
    setMessages((prev) => GiftedChat.append(prev, messages));
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: "8a57f5a4-0d29-4b27-9cfa-106420671e3c",
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
