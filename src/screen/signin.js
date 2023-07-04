import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from "react-native";
import { GoogleSignin, GoogleSigninButton} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { Image } from 'react-native';
GoogleSignin.configure({
  webClientId: "1098790470046-vnndhm6thgh89rpcatpcoaqcpsuvsjjo.apps.googleusercontent.com", // Thay YOUR_WEB_CLIENT_ID bằng ID web client của bạn
});

const Signin = () => {

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
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // signin
  const signInWithGoogle = async () => {
    try {
      // Xác minh rằng Google Play Services đã được cài đặt
      await GoogleSignin.hasPlayServices();

      // Đăng nhập bằng Google
      const { idToken } = await GoogleSignin.signIn();

      // Tạo một dấu hiệu xác thực từ mã thông tin đăng nhập Google
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Đăng nhập vào Firebase sử dụng dấu hiệu xác thực từ Google
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };
  // signout
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      auth().signOut();
    } catch (error) {
      console.log(error);
    }
  }
  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
        style={{width:300,height:65,marginTop:300}}
        onPress={signInWithGoogle}/>
      </View>
    );
  }

  return (
    <View View style={styles.container}>
      <Text style={styles.text}>Welcome {user.displayName}</Text>
      <Image source={{uri:user.photoURL}}
        style={{height:150,width:150, borderRadius:150,margin:50}}
      />
      <Button onPress={signOut} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
  },
  text:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:100,
  }
})
export default Signin;