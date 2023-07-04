import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'

export default function Gallery() {
  return (
    <View style={styles.container} >
      <Text>Gần đây</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.imageContainer}>
            <View style={styles.image}></View>
            <Text>Image 1</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A5C9CA',
        height: "100%",
        borderRadius: 10,
        marginVertical: 10,
    }
})