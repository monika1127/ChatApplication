import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useCurrentUser } from "../../contexts/userContext";

export default function UserIfo() {
  const user = useCurrentUser();

  if (!user) return;

  return (
    <View style={styles.userPanel}>
      {user.profilePic ? (
        <Image style={styles.userPicture} source={{ uri: user.profilePic }} />
      ) : (
        <ProfileIcon />
      )}
      <View style={styles.userData}>
        <Text numberOfLines={1} style={styles.userName}>
          {user.firstName}
        </Text>
        <Text numberOfLines={1} style={styles.userStatus}>
          Active Now
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userPanel: {
    flexDirection: "row",
    maxWidth: "70%",
    alignItems: "flex-end"
  },
  userPicture: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  userData: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 16,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: "#5603ad",
    lineHeight: 20
  },
  userStatus: {
    fontFamily: 'Poppins_300Light',
    fontSize: 12,
    color: "white",
    lineHeight: 14
  },
});
