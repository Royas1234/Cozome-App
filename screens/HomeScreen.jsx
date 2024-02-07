import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchCard from "../components/SearchCard";
import OptionButtons from "../components/OptionButtons";
import HousesList from "../components/HousesList";

const HomeScreen = () => {
  const [activeOptionButtonPressed, setActiveOptionsButtonPressed] =
    useState("Popular");
  const handleButtonPress = (buttonTypePressed) => {
    setActiveOptionsButtonPressed(buttonTypePressed);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.menuIcon}>
          <Ionicons name="menu-outline" size={25} color="#323130" />
        </Pressable>

        <View style={styles.location}>
          <View>
            <Text style={styles.locationText}>Current Location</Text>
          </View>
          <View style={styles.currentLocation}>
            <Ionicons name="location-outline" size={16} color="#1c53ff" />
            <Text style={styles.currentLocationTxt}>Brandung, West Java</Text>
          </View>
        </View>
        <Pressable style={styles.menuIcon}>
          <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
        </Pressable>
      </View>
      <SearchCard />
      <View style={{ height: 80 }}>
        <OptionButtons
          currentActiveButton={activeOptionButtonPressed}
          onButtonPressedChange={handleButtonPress}
        />
      </View>
      <HousesList filteredOption={activeOptionButtonPressed} />
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    justifyContent: "space-between",
  },
  menuIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  location: {
    flexDirection: "column",
    gap: 4,
  },
  locationText: {
    color: "#9B9898",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "400",
  },
  currentLocation: {
    flexDirection: "row",
    gap: 8,
  },
  currentLocationTxt: {
    fontWeight: "500",
  },
});
