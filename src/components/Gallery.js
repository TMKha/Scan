import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../config";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function Gallery() {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((documentSnapshot) => {
          const postData = documentSnapshot.data();
          posts.push(postData);
        });
        setUserPosts(posts);
      })
      .catch((error) => {
        console.log("Lỗi khi lấy bài đăng của người dùng:", error);
      });
  };

  const handleImagePress = (downloadURL) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = { ...prevSelectedItems };
      if (newSelectedItems[downloadURL]) {
        delete newSelectedItems[downloadURL];
        setSelectedImage(null);
      } else {
        newSelectedItems[downloadURL] = true;
        setSelectedImage(downloadURL);
      }

      setShowOverlay(Object.keys(newSelectedItems).length > 0);
      return newSelectedItems;
    });
  };

  const handleSharePDF = async () => {
    const selectedItemsURLs = Object.keys(selectedItems);

    if (selectedItemsURLs.length === 0) {
      alert("Vui lòng chọn ít nhất một ảnh để chia sẻ.");
      return;
    }

    try {
      let htmlData = "<html><body >";
      for (let i = 0; i < selectedItemsURLs.length; i++) {
        const selectedURL = selectedItemsURLs[i];
        htmlData += `<div style="text-align: center; padding: 5px; margin: 0 auto"><img src="${selectedURL}" style="max-width: 100%; height: 955px;" /></div><br />`;
      }
      htmlData += "</body></html>";

      const { uri } = await Print.printToFileAsync({ html: htmlData });
      await Sharing.shareAsync(uri);

      alert("Đã chia sẻ PDF thành công!");
    } catch (error) {
      console.log("Lỗi khi chia sẻ file PDF:", error);
      alert("Có lỗi xảy ra khi chia sẻ file PDF.");
    }
  };

  const handleCancel = () => {
    setSelectedItems({});
    setSelectedImage(null);
    setShowOverlay(false);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontWeight:"bold", fontSize:16}}>Gần đây</Text>
      <FlatList
        data={userPosts}
        renderItem={({ item }) => (
          <View style={styles.flatContainer}>
            <Image
              source={{ uri: item.downloadURL }}
              style={styles.imageContainer}
            />
            <View style={styles.contentContainer}>
              <Text style={{fontSize:14,fontWeight:500}}>{item.caption}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => handleImagePress(item.downloadURL)}
            >
              {selectedItems[item.downloadURL] ? (
                <Text style={styles.selectedOption}>...</Text>
              ) : (
                <Text style={styles.unselectedOption}>...</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      />

      {showOverlay && (
        <View style={styles.overlayContainer}>
          <View style={styles.actionButtonsContainer}>
            <Button title="Chia sẻ PDF" onPress={handleSharePDF} />
            <Button title="Hủy bỏ" onPress={handleCancel} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDF1F8",
    height: "100%",
    borderRadius: 10,
    marginVertical: 10,
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
  },
  selectedOption: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  unselectedOption: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
  },
  flatContainer: {
    marginVertical: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  imageContainer: {
    flex: 0.7,
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
    resizeMode: "cover",
  },
  actionButtonsContainer: {
    height: 100,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
