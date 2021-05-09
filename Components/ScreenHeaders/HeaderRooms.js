import React from "react";
import { StyleSheet, Text, View} from "react-native";
import  SearchIcon from '../../assets/search.svg'
import  RoomsIcon from '../../assets/rooms.svg'

export default function Header() {
  return (
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
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 72,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: "#b6defd",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    color: "#5603ad",
    fontSize: 36,
    fontFamily: 'Poppins_700Bold',
    lineHeight: 40
  },

  headerIcons: {
    flexDirection: "row",
    },

  icon: {
    marginHorizontal: 4
  },

});
