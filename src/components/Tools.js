import { View, Text,Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';

export default function Tools() {

    const types = [
        {
          id: "0",
          imageURL: require("../../assets/icons/folder.png"),
          title: "Import file",
        },
        {
          id: "1",
          imageURL: require("../../assets/icons/PDF.png"),
          title: "PDF",
        },
        {
          id: "2",
          imageURL: require("../../assets/icons/security.png"),
          title: "Bảo mật",
        },
        {
            id: "3",
            imageURL: require("../../assets/icons/signature.png"),
            title: "Chữ kí điện tử",
          },
      ];
    
  return (
    <View  style={styles.container}>
        {
            types.map((item)=>
                (
                <View key={item.id} style={styles.imageContainer}>
                    <View style={styles.circle}>
                      <Image source={item.imageURL} style={styles.image} />
                    </View>
                    <Text>{item.title}</Text>
                  </View>
                )

            )
        }
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    circle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#A5C9CA',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 40,
      height: 40,
    },
  });