import React, { useState } from "react";
import { Button, Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageEditor } from "expo-image-editor";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ScanScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageData, setImageData] = useState({});
  const [editorVisible, setEditorVisible] = useState(false);
  const navigate = useNavigation();

  const selectPhoto = async () => {
    // Get the permission to access the camera roll
    const response = await ImagePicker.requestCameraPermissionsAsync();
    // If they said yes then launch the image picker
    if (response.granted) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      // Check they didn't cancel the picking
      if (!pickerResult.canceled) {
        launchEditor(pickerResult.assets[0].uri);
      }
    } else {
      // If not then alert the user they need to enable it
      Alert.alert(
        "Please enable camera roll permissions for this app in your settings."
      );
    }
  };
  const scanPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        launchEditor(result.assets[0].uri);
      }
    }
  };

  const launchEditor = (uri) => {
    // Then set the image uri
    setImageUri(uri);
    // And set the image editor to be visible
    setEditorVisible(true);
  };

  return (
    <View >
      {imageUri ? (
        <View>
          <Image
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignSelf: "center",
            }}
            source={{ uri: imageData.uri }}
          />
          <ImageEditor
            visible={editorVisible}
            onCloseEditor={() => setEditorVisible(false)}
            imageUri={imageUri}
            fixedCropAspectRatio={16 / 9}
            minimumCropDimensions={{
              width: 100,
              height: 100,
            }}
            onEditingComplete={(result) => {
              setImageData(result);
              console.log(result);
              navigate.navigate("SaveScreen", { imageData: result });
            }}
            mode="full"
          />
        </View>
      ) : (
        <View>
          <Button title="Chọn ảnh" onPress={() => selectPhoto()} />
          <Button title="Chụp ảnh" onPress={() => scanPhoto()} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default ScanScreen ;
