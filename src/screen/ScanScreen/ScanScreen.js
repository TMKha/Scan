import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    setImageUri(null);
  }, []);
  console.log('imageData', imageData)
  console.log('imageUri', imageUri)

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
 // Reset imageData to null whenever the component is mounted or focused

  return (
    <View style={styles.container} >
      {imageUri ? (
        <View >
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
              navigate.navigate("SaveScreen", { imageData: result }); // Navigate to SaveDocument
            }}
            mode="full"
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
              <Button title="Chọn ảnh" style={styles.buttonScan} onPress={() => selectPhoto()} />
              <Button title="Chụp ảnh" style={styles.buttonScan} onPress={() => scanPhoto()} />
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
  },
  buttonContainer: {
    height:100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonScan: {
    padding:20,
    alignItems: "center",
    justifyContent: "center",
  },
 
});

export default ScanScreen ;
