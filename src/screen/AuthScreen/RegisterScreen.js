import {
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../config";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleRegister = async (email, password, fullName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://scan-27d1f.firebaseapp.com",
          })
          .then(() => {
            alert("Đăng ký thành công, vui lòng xác nhận email để đăng nhập");
          })
          .catch((error) => {
            alert(error);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                email: email,
                fullName: fullName,
                avatar: null,
                uid: firebase.auth().currentUser.uid,
              });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#2C3333", fontWeight: "bold" }}>
            Đăng ký
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Đăng ký tài khoản mới.
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
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
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
              value={email}
              style={{
                fontSize: 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 10,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              placeholder="Mật khẩu"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              value={password}
              style={{
                fontSize: 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 10,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>
          <Pressable
            onPress={() => handleRegister(email, password, fullName)}
            style={{
              width: 200,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "white",
                fontWeight: "600",
              }}
            >
              Đăng ký
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                textAlign: "center",
                fontWeight: "600",
                color: "gray",
              }}
            >
              Bạn đã có tài khoản? Đăng nhập
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
