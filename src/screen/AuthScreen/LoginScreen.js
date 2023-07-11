import {TextInput, KeyboardAvoidingView,Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../config";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
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
            Đăng nhập
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Đăng nhập vào tài khoản của bạn.
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
                marginVertical: 10,
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
            onPress={() => handleLogin(email, password)}
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
              Đăng nhập
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("RegisterScreen")}
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                textAlign: "center",
                fontWeight: "600",
                color:"gray"
              }}
            >
              Bạn chưa có tài khoản? Đăng ký
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                textAlign: "center",
                fontWeight: "600",
                color:"gray"
              }}
            >
              Quên mật khẩu?
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
