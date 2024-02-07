import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HousesMockData } from "../Data/ListData";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HousesList = ({ filteredOption }) => {
  const navigation = useNavigation();
  const [houselist, setHouseList] = useState(HousesMockData);
  const [bookmarkedHouses, setIsBookmarked] = useState([]);

  useEffect(() => {
    let houseData = HousesMockData;
    if (filteredOption === "Popular") {
      houseData = HousesMockData.sort((a, b) => b.review - a.review);
    } else {
      houseData = HousesMockData.filter((option) => {
        return option.type.toLowerCase() === filteredOption.toLowerCase();
      });
    }
    setHouseList(houseData);
  }, [filteredOption]);

  useEffect(() => {
    getAllBookmarkedHouses();
  }, []);

  const getAllBookmarkedHouses = async () => {
    try {
      const savedPropertiesInString = await AsyncStorage.getItem(
        "savedProperties"
      );
      const savedProperties = savedPropertiesInString
        ? JSON.parse(savedPropertiesInString)
        : [];

      setIsBookmarked(savedProperties);
    } catch (error) {}
  };

  const handleBookMark = async (selectedHouseId) => {
    try {
      const savedPropertiesInString = await AsyncStorage.getItem(
        "savedProperties"
      );
      const savedProperties = savedPropertiesInString
        ? JSON.parse(savedPropertiesInString)
        : [];

      const isPropertyBookmarked =
        savedProperties.filter((eachHouseId) => eachHouseId === selectedHouseId)
          .length > 0;

      if (isPropertyBookmarked) {
        const updatedBookmarks = savedProperties.filter(
          (eachHouseId) => eachHouseId !== selectedHouseId
        );
        await AsyncStorage.setItem(
          "savedProperties",
          JSON.stringify(updatedBookmarks)
        );
        setIsBookmarked(updatedBookmarks);
      } else {
        savedProperties.push(selectedHouseId);
        await AsyncStorage.setItem(
          "savedProperties",
          JSON.stringify(savedProperties)
        );
        setIsBookmarked(savedProperties);
      }
    } catch (e) {
      console.error("Error handling bookmark:", error);
    }
  };
  return (
    <View>
      {houselist.map((item, index) => {
        const isHouseBookmarked = bookmarkedHouses.includes(item.id);

        return (
          <Pressable
            style={styles.houseListCont}
            key={index}
            onPress={() =>
              navigation.navigate("HouseDetails", { houseDetails: item })
            }
          >
            <View style={styles.houseImageWrapper}>
              <Image source={item.image} style={styles.houseImage} />
              <Pressable
                onPress={() => handleBookMark(item.id)}
                style={styles.bookmarkIconWrapper}
              >
                <View style={styles.bookmarkIcon}>
                  <FontAwesome
                    name={isHouseBookmarked ? "bookmark" : "bookmark-o"}
                    size={20}
                    color={isHouseBookmarked ? "whitesmoke" : "#fff"}
                  />
                </View>
              </Pressable>
            </View>
            <View style={styles.houseTitleWrapper}>
              <Text style={styles.houseTitle}>{item.name}</Text>
              <Text style={styles.housePrice}>{item.price}</Text>
            </View>
            <View style={styles.houseRatePeriodWrapper}>
              <View style={styles.houseRateWrapper}>
                <FontAwesome name="star" size={17} color="#ffbb00" />
                <Text style={styles.houseRate}>{item.rating}</Text>
                <Text style={styles.houseLocationColor}>
                  ({item.review} Reviews)
                </Text>
              </View>
              <View>
                <Text style={styles.houseLocationColor}>{item.period}</Text>
              </View>
            </View>
            <View style={styles.locationSection}>
              <View style={styles.locationName}>
                <Ionicons
                  style={styles.searchSectionIcon}
                  name="location-outline"
                  size={18}
                  color="#6F6D6D"
                />
                <Text style={styles.houseLocationColor}>{item.address}</Text>
              </View>
              <View style={styles.houseLocationFlex}>
                <Text style={styles.houseLocationColor}>|</Text>
                <Ionicons name="ios-bed-outline" size={18} color="#6F6D6D" />
                <Text style={styles.houseLocationColor}>{item.bedTotal}</Text>
              </View>
              <View style={styles.houseLocationFlex}>
                <Text style={styles.houseLocationColor}>|</Text>
                <MaterialCommunityIcons
                  name="bathtub-outline"
                  size={18}
                  color="#6F6D6D"
                />
                <Text style={styles.houseLocationColor}>{item.bathTotal}</Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default HousesList;

const styles = StyleSheet.create({
  houseListCont: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  houseImage: {
    width: "100%",
    height: 200,
    borderRadius: 9,
  },
  houseImageWrapper: {
    position: "relative",
  },
  bookmarkIconWrapper: {
    position: "absolute",
    top: 15,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 8,
    paddingHorizontal: 10,

    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },
  bookmarkIcon: {},
  houseTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingTop: 10,
  },
  houseTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  housePrice: {
    color: "#1c53ff",
    fontWeight: "bold",
    fontSize: 22,
  },
  houseRatePeriodWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  houseRateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  houseRate: {
    fontWeight: "600",
  },
  houseReview: {
    color: "#6F6D6D",
    fontWeight: "500",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 20,
  },
  locationName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  houseLocation: {
    color: "#6F6D6D",
  },
  houseLocationFlex: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },
  houseLocationColor: {
    color: "#6F6D6D",
  },
});
