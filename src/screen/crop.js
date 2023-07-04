import React, { useState } from "react";
import { Button, Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageEditor } from "expo-image-editor";

const Crop = () => {
  const [imageUri, setImageUri] = useState(undefined);
  const [imageData, setImageData] = useState({});
  const [editorVisible, setEditorVisible] = useState(false);

  const selectPhoto = async () => {
    // Get the permission to access the camera roll
    const response = await ImagePicker.requestCameraPermissionsAsync();
    // If they said yes then launch the image picker
    if (response.granted) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      // Check they didn't cancel the picking
      if (!pickerResult.canceled) {
        launchEditor(pickerResult.uri);
      }
    } else {
      // If not then alert the user they need to enable it
      Alert.alert(
        "Please enable camera roll permissions for this app in your settings."
      );
    }
  };

  const launchEditor = (uri) => {
    // Then set the image uri
    setImageUri(uri);
    // And set the image editor to be visible
    setEditorVisible(true);
  };

  return (
    <View>
      <Image
        style={{ height: 300, width: 300 }}
        source={{ uri: imageData.uri }}
      />
      <Button title="Select Photo" onPress={() => selectPhoto()} />
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
        }}
        mode="full"
      />
    </View>
  );
}

export default Crop;