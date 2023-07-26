import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import { firebase } from "../../../config";

const SaveScreen = () => {
  const route = useRoute();
  const { imageData } = route.params;
  const [caption,setCaption] = useState('');
  //khai báo navigation
  const navigation = useNavigation();


  const uploadImage = async () => {
    const response = await fetch(imageData.uri);
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
    const blob = await response.blob();
    const task = firebase
      .storage()
      .ref()
      .child(childPath)
      .put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePossData(snapshot);

        console.log(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  const savePossData = (downloadURL) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}${String(currentDate.getHours()).padStart(2, '0')}${String(currentDate.getMinutes()).padStart(2, '0')}${String(currentDate.getSeconds()).padStart(2, '0')}`;

    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption: `Scan-${formattedDate}`,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((function () {
        navigation.navigate("ScanScreen");
      }))
      .catch((error) => {
        console.log("Error saving data:", error);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          height: "80%",
          width: "100%",
        }}
        source={{ uri: imageData.uri }}
      />
      <Button title="Lưu" onPress={() => uploadImage()} />
    </View>
  );
};

export default SaveScreen;

const styles = StyleSheet.create({});
