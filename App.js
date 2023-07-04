import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScanDocumentScreen from "./src/screen/upcomming";
import ImagePreviewScreen from "./src/screen/ImagePreviewScreen ";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "./src/screen/test";
import Home from "./src/screen/HomeScreen";
import Crop from "./src/screen/crop";
import { MaterialIcons,AntDesign  } from '@expo/vector-icons'; 
// import Tabs from "./src/components/Tabs";
import StackScreen from "./src/components/Tabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  );
};

export default App;
