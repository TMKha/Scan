import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import ScanDocumentScreen from "../screen/upcomming";
import ImagePreviewScreen from "../screen/ImagePreviewScreen ";
import Home from "../screen/HomeScreen/HomeScreen";
import { firebase } from "../../config";
import LoginScreen from "../screen/AuthScreen/LoginScreen";
import RegisterScreen from "../screen/AuthScreen/RegisterScreen";
import Test from "../screen/test";
import ProfileScreen from "../screen/UserScreen/ProfileScreen";
import EditProfileScreen from "../screen/UserScreen/EditProfileScreen";
import ForgotPasswordScreen from "../screen/AuthScreen/ForgotPasswordScreen";
import SaveScreen from "../screen/ScanScreen/SaveScreen";
import ScanScreen from "../screen/ScanScreen/ScanScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Main navigation
const MainScreen = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <AuthStack />;
  }
  return <BottomTabs />;
};
// bottom tabs
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={"Trang chủ"}
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="home"
              size={24}
              color={focused ? "#147efb" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Tập tin"}
        component={ScanDocumentStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="upload-file"
              size={24}
              color={focused ? "#147efb" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Canera"}
        component={ScanStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="camera-alt"
              size={24}
              color={focused ? "#147efb" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Công cụ"}
        component={Test}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="appstore1"
              size={24}
              color={focused ? "#147efb" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"HomeProfile"}
        component={ProfileStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="account-circle"
              size={24}
              color={focused ? "#147efb" : "#000"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// profile stack
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "SỬA THÔNG TIN",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
            shadowColor: "#fff",
            elevation: 0,
          },
        }}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};
// login stack
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            shadowColor: "#000",
            elevation: 50,
          },
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            shadowColor: "#000",
            elevation: 50,
          },
        }}
      />
         <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            shadowColor: "#000",
            elevation: 50,
          },
        }}
      />
    </Stack.Navigator>
  );
};
// scan document stack
const ScanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScanDocument" component={ScanScreen} />
      <Stack.Screen name="SaveScreen" component={SaveScreen} />
    </Stack.Navigator>
  );
};

const ScanDocumentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScanDocument" component={ScanDocumentScreen} />
      <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} />
    </Stack.Navigator>
  );
};
export default MainScreen;
