import { Pressable, Text, View, StyleSheet, TextInput  } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  return (
    <View style={styles.contentBox}>
      <Text style={styles.text}>EzAcademy</Text>
      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.text}>Ingresar</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  contentBox: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    alignItems: "center",
    padding: 20,
    textAlign: "center",
  },
});
