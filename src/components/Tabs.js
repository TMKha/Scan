import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MaterialIcons,AntDesign  } from '@expo/vector-icons'; 
import ScanDocumentScreen from "../screen/upcomming";
import ImagePreviewScreen from "../screen/ImagePreviewScreen ";
import Home from "../screen/HomeScreen";
import {firebase} from '../../config';
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import Test from "../screen/test";
import Crop from "../screen/crop";
import UserScreen from "../screen/UserScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const ScanDocumentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScanDocument" component={ScanDocumentScreen} />
      <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} />
    </Stack.Navigator>
  );
};
// bottom tabs
const Tabs = () => {
  return (
      <Tab.Navigator
      screenOptions={{
        headerShown:false,
      }}
      >
        <Tab.Screen  name={'Trang chủ'} component={Home} 
        options={
          { tabBarShowLabel:false,
            tabBarIcon: ({focused}) => <MaterialIcons name="home" size={24} color={
            focused ? '#147efb' : '#000'
           } /> 
        }}
        />
        <Tab.Screen name={'Tập tin'} component={ScanDocumentStack} 
           options={
            { tabBarShowLabel:false,
              tabBarIcon: ({focused}) => <MaterialIcons name="upload-file" size={24} color={
              focused ? '#147efb' : '#000'
             } /> 
          }}/>
        <Tab.Screen name={' '} component={Test}
             options={
              {  tabBarShowLabel:false,
                tabBarIcon: ({focused}) => <MaterialIcons name="camera-alt" size={24} color={
                focused ? '#147efb' : '#000'
               } /> 
            }}
        />
        <Tab.Screen name={'Công cụ'} component={Test}
          options={
            {tabBarShowLabel:false,
              tabBarIcon: ({focused}) => <AntDesign name="appstore1" size={24} color={
              focused ? '#147efb' : '#000'
             } /> 
          }}
        />
        <Tab.Screen name={"User"} component={UserScreen}
          options={
            {tabBarShowLabel:false,
              tabBarIcon: ({focused}) => <MaterialIcons name="account-circle" size={24} color={
              focused ? '#147efb' : '#000'
             } /> 
          }} />

      </Tab.Navigator>
  );
};
// stack login
const StackScreen = () => {
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
      return (
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} 
          options={{
            headerShown:false,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              shadowColor: '#000',
              elevation: 50,
            }

          }}
          />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} 
          options={{
            headerShown:false,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              shadowColor: '#000',
              elevation: 50,
            }
          }}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Tabs/>
    );
    
};    

export default StackScreen;                  
