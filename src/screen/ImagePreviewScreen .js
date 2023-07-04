import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import ImageCropTools from 'react-native-image-crop-tools';

const ImagePreviewScreen = ({ route }) => {
  const { capturedImage } = route.params;
  const [croppedImage, setCroppedImage] = useState(null);

  const cropImage = async () => {
    try {
      const image = await ImageCropTools.openCropper({
        path: capturedImage,
        cropperCircleOverlay: false,
        freeStyleCropEnabled: true,
      });
      setCroppedImage(image.path);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {croppedImage ? (
        <Image source={{ uri: croppedImage }} style={{ width: 300, height: 300 }} />
      ) : (
        <Text>Loading...</Text>
      )}

      <TouchableOpacity onPress={cropImage}>
        <Text>Crop Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePreviewScreen;
