import React from "react";
import { View, Text, StyleSheet } from "react-native";
import  PhoneIcon from '../../assets/phone.svg'
import  VideoIcon from '../../assets/videocall.svg'

export default function HeaderChat() {

  return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={styles.headerIcons}>
          <View style={styles.icon}>
            <PhoneIcon />
          </View>
          <View style={styles.icon}>
            <VideoIcon />
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#b6defd",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    color: "#5603ad",
    fontWeight: "bold",
    fontSize: 28,
  },

  headerIcons: {
    flexDirection: "row",
    },

  icon: {
    marginHorizontal: 4
  },

});
