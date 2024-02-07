import { StyleSheet, View, Image, Text } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function AppMapView({ properties, isFullMap, location }) {
  const [focusedMarker, setFocusedMarker] = useState(null);
  const handleMarkerPress = (marker) => {
    setFocusedMarker(marker);
  };
  return (
    <>
      <MapView
        style={styles.map}
        region={location}
        mapType={"standard"}
        provider={PROVIDER_GOOGLE}
        pitchEnabled
        showsUserLocation={true}
      >
        {properties.length > 0 &&
          properties.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.location}
              title={marker.name}
              onPress={() => isFullMap && handleMarkerPress(marker)}
            >
              <View
                style={{
                  backgroundColor:
                    focusedMarker === marker ? "blue" : "rgb(247, 247, 247)",
                  padding: 8,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: "rgb(255, 255, 255)",
                }}
              >
                <MaterialIcons
                  name={marker.icon}
                  size={30}
                  color={focusedMarker === marker ? "#fff" : "#a0a0a0"}
                />
              </View>
            </Marker>
          ))}
      </MapView>
      {!!focusedMarker && (
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <Image source={focusedMarker.image} style={styles.propertyImage} />
          </View>

          <View style={styles.rightContent}>
            <View style={styles.reviewSection}>
              <FontAwesome name="star" size={17} color="#ffbb00" />
              <Text style={styles.rate}>{focusedMarker.rating}</Text>
              <Text style={styles.review}>
                ({focusedMarker.review} Reviews)
              </Text>
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.houseName}>{focusedMarker.name}</Text>
            </View>
            <View style={styles.priceSection}>
              <Text style={styles.cardPrice}>{focusedMarker.price}</Text>
              <Text style={styles.cardPeriod}>{focusedMarker.period}</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  cardContainer: {
    height: 150,
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: "white",
    marginHorizontal: 15,
    paddingLeft: 10,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    gap: 25,
  },
  propertyImage: {
    width: 140,
    height: 120,
    borderRadius: 10,
  },

  cardPrice: {
    fontSize: 20,
  },

  rightContent: {
    height: 120,
    width: 170,
    flexDirection: "column",
    gap: 5,
    justifyContent: "flex-start",
  },
  reviewSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  rate: {
    fontWeight: "600",
  },
  review: {
    color: "#6F6D6D",
    fontWeight: "500",
  },

  houseName: {
    fontWeight: "600",
    fontSize: 22,
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
  },
  cardPrice: {
    color: "#1c53ff",
    fontWeight: "bold",
    fontSize: 22,
  },
  cardPeriod: {
    color: "#6F6D6D",
    lineHeight: 20,
    fontWeight: "500",
  },
});
