import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ScanDocumentScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setCapturedImage(uri);
      navigation.navigate('ImagePreview', { capturedImage: uri });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setCapturedImage(result.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity style={{ margin: 16 }} onPress={takePicture}>
        <Text style={{ fontSize: 20, marginBottom: 10, color: 'black' }}>Take Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ margin: 16 }} onPress={pickImage}>
        <Text style={{ fontSize: 20, marginBottom: 10, color: 'black' }}>Pick Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScanDocumentScreen;
