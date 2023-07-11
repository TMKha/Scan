import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../config";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfileScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const userSnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();

      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        setEmail(userData.email);
        setFullName(userData.fullName);
        setAvatar(userData.avatar);
      } else {
        console.log("User does not exist");
      }
    };

    fetchUserData();
  }, []);
  // pick image from gallery
  const pickImage = async () => {
    try {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        console.log("Permission to access camera roll is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };


  const handleUpdate = async () => { 
    const response = await fetch(avatar);
    const blob = await response.blob();

    const storageRef = firebase.storage().ref();
    const imageName = firebase.auth().currentUser.uid + ".jpg";
    const imageRef = storageRef.child(imageName);

    await imageRef.put(blob);

    const downloadUrl = await imageRef.getDownloadURL();
    console.log("avatar", downloadUrl);
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        fullName: fullName,
        avatar: downloadUrl,
      });
    alert("Cập nhật thông tin thành công");

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pickImage()}>
        <ImageBackground
          source={{
            uri: avatar,
          }}
          style={{ height: 150, width: 150 }}
          imageStyle={{ borderRadius: 100 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="camera"
              size={35}
              color="#000"
              style={{
                opacity: 0.6,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 10,
              }}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <Text style={styles.fullname}>{fullName}</Text>
      <Text>{email}</Text>

      <View style={styles.userInfoWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="user" size={24} color="black" />
          <TextInput
            placeholder="Họ và tên"
            autoCapitalize="none"
            onChangeText={(fullName) => setFullName(fullName)}
            value={fullName}
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginLeft: 10,
              flex:1,
              marginVertical: 10,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleUpdate()}
        >
          <Text style={styles.userBtnTxt}>Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullname: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  selectAvatarButton: {
    marginTop: 20,
    backgroundColor: "lightgray",
    padding: 10,
    alignItems: "center",
  },
 
  button: {
    marginLeft:"auto",
    marginRight:"auto",
    width: "70%",
    marginTop: 15,
    alignItems: "center",
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 2,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    width: "100%",
    marginVertical: 20,
  },
});

export default EditProfileScreen;
