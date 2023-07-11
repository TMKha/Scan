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

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

    // forgot password
    const forgotPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Vui lòng kiểm tra email để đổi mật khẩu")
        }).catch((error) => {
            alert(error);
        })
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
            Quên mật khẩu
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Nhập email để lấy lại mật khẩu
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
       
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
      
          <Pressable
            onPress={() => forgotPassword(email)}
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
              Gửi yêu cầu
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
                Quay lại trang Đăng nhập
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
