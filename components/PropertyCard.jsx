import { StyleSheet, Text, View, Image } from "react-native";
import { HousesMockData } from "../Data/ListData";
import { FontAwesome } from "@expo/vector-icons";

import React from "react";

const PropertyCard = () => {
  return (
    <View>
      {HousesMockData.map((item) => (
        <View key={item.id} style={styles.cardContainer}>
          <Image source={item.cardImage} style={styles.propertyImage} />
          <View style={styles.rightContent}>
            <View style={styles.reviewSection}>
              <FontAwesome name="star" size={17} color="#ffbb00" />
              <Text style={styles.rate}>{item.rating}</Text>
              <Text style={styles.review}>({item.review} Reviews)</Text>
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.houseName}>{item.name}</Text>
            </View>

            <View style={styles.priceSection}>
              <Text style={styles.cardPrice}>{item.price}</Text>
              <Text style={styles.cardPeriod}>{item.period}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: 20,
  },
  cardImage: {
    width: 100,
    height: 120,
  },
});
