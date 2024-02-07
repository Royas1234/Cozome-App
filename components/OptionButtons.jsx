import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, ScrollView, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const buttonData = [
  {
    name: "Popular",
    icon: <Ionicons name="star-outline" size={16} color="#6F6D6D" />,
  },
  { name: "Houses", icon: <Feather name="home" size={16} color="#6F6D6D" /> },
  {
    name: "Apartment",
    icon: <MaterialIcons name="apartment" size={16} color="#6F6D6D" />,
  },
  {
    name: "Village",
    icon: <FontAwesome5 name="home" size={16} color="#6F6D6D" />,
  },
];

const OptionButtons = ({ onButtonPressedChange, currentActiveButton }) => {
  const [activeButton, setActiveButton] = useState(currentActiveButton || "");

  useEffect(() => {
    setActiveButton(currentActiveButton);
  }, [currentActiveButton]);

  const handlePress = (buttonName) => {
    setActiveButton(buttonName);
    onButtonPressedChange(buttonName);
  };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.buttonsSection}
    >
      {buttonData.map(({ name, icon }) => (
        <Pressable
          key={name}
          style={[styles.button, activeButton === name && styles.activeButton]}
          onPress={() => handlePress(name)}
        >
          <View style={styles.buttonContent}>
            {icon}
            <Text
              style={[
                styles.buttonText,
                activeButton === name && styles.activeButtonText,
              ]}
            >
              {name}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default OptionButtons;
const styles = StyleSheet.create({
  buttonsSection: {
    marginVertical: 15,
  },
  button: {
    marginRight: 10,
    borderColor: "#eeeeee",
    borderWidth: 1,
    paddingHorizontal: 25,
    height: 35,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  buttonText: {
    fontSize: 12,
    color: "#6F6D6D",
  },
  activeButton: {
    backgroundColor: "black",
  },
  activeButtonText: {
    color: "white",
  },
});
