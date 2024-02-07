import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { HousesMockData } from "../Data/ListData";

const SavedScreen = () => {
  const navigation = useNavigation();

  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);

  useEffect(() => {
    fetchSavedProperties();
  }, [bookmarkedProperties]);

  const fetchSavedProperties = async () => {
    try {
      const savedPropertiesInStrings = await AsyncStorage.getItem(
        "savedProperties"
      );
      const savedProperties = savedPropertiesInStrings
        ? JSON.parse(savedPropertiesInStrings)
        : [];

      const showSavedProperties = HousesMockData.filter((propertyId) =>
        savedProperties.includes(propertyId.id)
      );

      setBookmarkedProperties(showSavedProperties);
    } catch (error) {
      console.error("Error fetching saved properties:", error);
    }
  };
  const handlePropertyPress = (property) => {
    navigation.navigate("HouseDetails", { houseDetails: property });
  };

  return (
    <ScrollView style={styles.savedScreenContainer}>
      {bookmarkedProperties.map((eachHouse, index) => {
        return (
          <Pressable
            style={styles.savedHousesContainer}
            key={index}
            onPress={() => handlePropertyPress(eachHouse)}
          >
            <View>
              <Image source={eachHouse.image} style={styles.savedhouseImage} />
            </View>
            <View style={styles.savedHouseTitleWrapper}>
              <Text style={styles.savedHouseTitle}>{eachHouse.name}</Text>
              <Text style={styles.savedHousePrice}>{eachHouse.price}</Text>
            </View>
            <View style={styles.savedHouseRatePeriodWrapper}>
              <View style={styles.savedHouseRateWrapper}>
                <FontAwesome name="star" size={17} color="#ffbb00" />
                <Text style={styles.savedHouseRate}>{eachHouse.rating}</Text>
                <Text style={styles.savedHouseLocationColor}>
                  ({eachHouse.review} Reviews)
                </Text>
              </View>
              <View>
                <Text style={styles.savedHouseLocationColor}>
                  {eachHouse.period}
                </Text>
              </View>
            </View>
            <View style={styles.savedHouselocationSection}>
              <View style={styles.savedHouselocationName}>
                <Ionicons
                  style={styles.savedHousesearchSectionIcon}
                  name="location-outline"
                  size={18}
                  color="#6F6D6D"
                />
                <Text style={styles.savedHouseLocationColor}>
                  {eachHouse.address}
                </Text>
              </View>
              <View style={styles.savedHousehouseLocationFlex}>
                <Text style={styles.savedHouseLocationColor}>|</Text>
                <Ionicons name="ios-bed-outline" size={18} color="#6F6D6D" />
                <Text style={styles.savedHouseLocationColor}>
                  {eachHouse.bedTotal}
                </Text>
              </View>
              <View style={styles.savedHousehouseLocationFlex}>
                <Text style={styles.savedHouseLocationColor}>|</Text>
                <MaterialCommunityIcons
                  name="bathtub-outline"
                  size={18}
                  color="#6F6D6D"
                />
                <Text style={styles.savedHouseLocationColor}>
                  {eachHouse.bathTotal}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default SavedScreen;
const styles = StyleSheet.create({
  savedScreenContainer: {
    flex: 1,

    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  savedHousesContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  // savedhouseImageWrapper: {},
  savedhouseImage: {
    width: "100%",
    height: 220,
    borderRadius: 9,
  },
  savedHouseTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingTop: 10,
  },
  savedHouseTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  savedHousePrice: {
    color: "#1c53ff",
    fontWeight: "bold",
    fontSize: 22,
  },
  savedHouseRatePeriodWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  savedHouseRateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  savedHouseRate: {
    fontWeight: "600",
  },
  savedHouseReview: {
    color: "#6F6D6D",
    fontWeight: "500",
  },
  savedHouselocationSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 20,
  },
  savedHouselocationName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  savedHousehouseLocation: {
    color: "#6F6D6D",
  },
  savedHousehouseLocationFlex: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },
  savedHouseLocationColor: {
    color: "#6F6D6D",
  },
});
