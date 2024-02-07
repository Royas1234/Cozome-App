import React, { useState } from "react";
import { Card } from "react-native-paper";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const selectLabelIconMap = {
  Houses: <Feather name="home" size={20} color="#6F6D6D" />,
  Apartment: <MaterialIcons name="apartment" size={20} color="#6F6D6D" />,
  Village: <FontAwesome5 name="home" size={20} color="#6F6D6D" />,
};
const data = [
  { label: "Houses", value: "Houses" },
  { label: "Apartment", value: "Apartment" },
  { label: "Village", value: "Village" },
];
const SearchCard = () => {
  const [selectedValue, setSelectedValue] = useState(data[0]);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  return (
    <Card style={styles.card} mode="contained">
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchSectionIcon}
          name="location-outline"
          size={20}
          color="#6F6D6D"
        />
        <TextInput
          placeholder="Location"
          style={styles.searchField}
          value={location}
          onChangeText={(locationText) => setLocation(locationText)}
        />
      </View>
      <View style={styles.searchSection}>
        <FontAwesome5
          style={styles.searchSectionIcon}
          name="coins"
          size={20}
          color="#6F6D6D"
        />
        <TextInput
          placeholder="Price"
          style={styles.searchField}
          value={price}
          onChangeText={(priceText) => setPrice(priceText)}
        />
      </View>
      <View style={styles.searchSection}>
        <Dropdown
          style={styles.dropdownContainer}
          data={data}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          maxHeight={300}
          onChange={(item) => {
            setSelectedValue(item);
          }}
          value={selectedValue}
          renderLeftIcon={() => selectLabelIconMap[selectedValue.value]}
          renderItem={(item) => {
            return (
              <View style={styles.labelIconContainer}>
                <View style={styles.labelIcon}>
                  {selectLabelIconMap[item.value]}
                  <Text>{item.label}</Text>
                </View>
              </View>
            );
          }}
          labelField="label"
          valueField="value"
        />
      </View>
      <Button
        mode="contained"
        buttonColor="#232120"
        ac
        style={styles.findButton}
      >
        Find Now
      </Button>
    </Card>
  );
};

export default SearchCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eeeeee",

    marginTop: 15,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#eeeeee",
    marginTop: 10,
  },
  searchField: {
    flex: 1,
    padding: 15,
    color: "#6F6D6D",
  },
  searchSectionIcon: {
    paddingVertical: 15,
    paddingLeft: 15,
  },

  dropdownContainer: {
    flex: 1,
    padding: 15,
    height: 50,
  },

  selectedTextStyle: {
    paddingLeft: 15,
    fontSize: 14,
    color: "#6F6D6D",
  },
  labelIconContainer: {
    flexDirection: "row",
    padding: 10,
  },
  labelIcon: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    color: "#6F6D6D",
  },
  findButton: {
    marginTop: 10,
  },
});
