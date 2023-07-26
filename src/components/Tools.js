import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Tools() {
  const navigation = useNavigation();
  const types = [
    {
      id: "0",
      imageURL: require("../../assets/icons/folder.png"),
      title: "Import file",
    },
    {
      id: "1",
      imageURL: require("../../assets/icons/PDF.png"),
      title: "IMG to PDF",
    },
    {
      id: "2",
      imageURL: require("../../assets/icons/security.png"),
      title: "Bảo mật",
    },
    {
      id: "3",
      imageURL: require("../../assets/icons/signature.png"),
      title: "Chữ kí điện tử",
    },
  ];
  const handleImagePress = (title) => {
    if (title === "IMG to PDF") {
      navigation.navigate("ImageToPDF"); // Chuyển tới màn hình "File" khi người dùng nhấn vào "IMG to PDF"
    }
  };

  return (
    <View style={styles.container}>
      {types.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.imageContainer}
          onPress={() => handleImagePress(item.title)}
        >
          <View style={styles.circle}>
            <Image source={item.imageURL} style={styles.image} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    color: "#1769ec",
    fontWeight: "bold",
    marginTop: 5,
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#1039CB",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
  },
});
