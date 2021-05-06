import React from "react";
import { StyleSheet, Text, View } from "react-native";
import  SearchIcon from '../assets/search.svg'
import  RoomsIcon from '../assets/rooms.svg'

export default function Rooms() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rooms</Text>
        <View style={styles.headerIcons}>
          <View style={styles.icon}>
            <SearchIcon />
          </View>
          <View style={styles.icon}>
            <RoomsIcon />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <Text>room 1</Text>
      </View>
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
  header: {
    // flex:1,
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

  body: {
    flex: 1,
  }
});
