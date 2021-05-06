import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Rooms() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rooms</Text>
        <View style={styles.headerIcons}>
          <View style={styles.icon}>
            <Text>ic1</Text>
          </View>
          <View style={styles.icon}>
            <Text>ic2</Text>
          </View>
        </View>
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
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4
  }
});
