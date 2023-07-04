import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from "../../config";

const UserScreen = () => {
    const [fullName,setFullName]=useState('')

    useEffect(() => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then((snapshot)=>{
            if(snapshot.exists){
                setFullName(snapshot.data().fullName)
            }
            else {
                console.log('User does not exist')
            }
        })
    }, [])
    return (
        <View>
            <Text>{fullName}</Text>
            <TouchableOpacity style={{marginTop:20}} onPress={() => firebase.auth().signOut()}>
                <Text>Đăng xuất</Text>
            </TouchableOpacity>


        </View>
    )

}

export default UserScreen

const styles = StyleSheet.create({})