import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native";
import { Text, View } from "react-native";
import Tools from "../components/Tools";
import Gallery from "../components/Gallery";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
      />
      {/* Tools */}
      <Tools />
      {/* View Gallery */}
      <Gallery/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
});
