import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PhotoEditor from 'react-native-photo-editor';

const Test = () => {
  const [scannedImage, setScannedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleScan = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        setScannedImage(result.uri);
      }
    }
  };

  const handleEdit = () => {
    PhotoEditor.Edit({
      path: scannedImage,
      hiddenControls: ['clear', 'crop', 'draw', 'save'], // Ẩn các nút chỉnh sửa không cần thiết
      onDone: (result) => {
        setScannedImage(result.path);
      },
      onCancel: () => {
        // Xử lý hủy chỉnh sửa
      },
    });
  };

  const handleCrop = async () => {
    try {
      const image = await RNCropper.crop({
        uri: scannedImage,
        cropWidth: 200,
        cropHeight: 200,
        freeStyleCropEnabled: true,
      });

      setCroppedImage(image.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setScannedImage(null);
    setCroppedImage(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {croppedImage ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Scanned Image:</Text>
          <Image source={{ uri: croppedImage }} style={{ width: 200, height: 200 }} />
          <Button title="Reset" onPress={handleReset} />
        </View>
      ) : scannedImage ? (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: scannedImage }} style={{ flex: 1 }} resizeMode="contain" />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              alignSelf: 'center',
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'white',
            }}
            onPress={handleCrop}
          >
            <Text>Crop Document</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'white',
            }}
            onPress={handleEdit}
          >
            <Text>Edit Image</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Scan Document" onPress={handleScan} />
        </View>
      )}
    </View>
  );
};

export default Test;
