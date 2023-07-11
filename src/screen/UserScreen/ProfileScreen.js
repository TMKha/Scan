import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../config";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
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
        console.log(userData);
      } else {
        console.log("User does not exist");
      }
    };

    fetchUserData();
    navigate.addListener("focus", () => fetchUserData())
  }, [navigate]);
  // change the password
  const changePassword = () => {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Vui lòng kiểm tra email để đổi mật khẩu")
    }).catch((error) => {
      alert(error);
    })
  };
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.fullname}>{fullName}</Text>
      <Text>{email}</Text>
      <View style={styles.userInfoWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate.navigate("EditProfileScreen")}
        >
          <Text style={styles.userBtnTxt}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changePassword()}
        >
          <Text style={styles.userBtnTxt}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => firebase.auth().signOut()}
        >
          <Text style={styles.userBtnTxt}>Đăng xuất</Text>
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
    marginTop: 10,
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
    width: "80%",
    marginVertical: 20,
  },
});

export default ProfileScreen;
