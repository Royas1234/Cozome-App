import { StyleSheet, TouchableOpacity, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import AppMapView from "../components/AppMapView";
import { HousesMockData } from "../Data/ListData";

export default function MapScreen({ route }) {
  const params = route.params;

  const [filteredProperty, setFilteredProperty] = useState(HousesMockData);

  useEffect(() => {
    if (params && params.selectedHouse) {
      setFilteredProperty([params.selectedHouse]);
    } else {
      setFilteredProperty(HousesMockData);
    }
  }, [params]);

  const [location, setLocation] = useState({
    latitude: 51.1657,
    longitude: 10.4515,
    latitudeDelta: 6.5,
    longitudeDelta: 6.5,
  });

  const handleFilter = (item) => {
    const selectedProperty = selectedHouse.filter((property) => {
      return property.location.toLowerCase().includes(item.toLowerCase());
    });

    setFilteredProperty(selectedProperty);
  };
  const handleZoomIn = () => {
    const newRegion = {
      ...location,
      latitudeDelta: location.latitudeDelta / 2,
      longitudeDelta: location.longitudeDelta / 2,
    };
    setLocation(newRegion);
  };

  const handleZoomOut = () => {
    const newRegion = {
      ...location,
      latitudeDelta: location.latitudeDelta * 2,
      longitudeDelta: location.longitudeDelta * 2,
    };
    setLocation(newRegion);
  };

  const handleStackIconPress = () => {
    console.log("Stack Icon Pressed");
  };

  const handleNavigationIconPress = () => {
    console.log("Navigation Icon Pressed");
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search Location"
        fetchDetails={true}
        onTextInput={(text) => handleFilter(text)}
        onPress={(data, details = null) => {
          const point = details.geometry.location;
          if (!point) {
            return;
          } else {
            setLocation({
              ...location,
              latitude: point.lat,
              longitude: point.lng,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <View style={styles.iconContainerLeft}>
            <Ionicons name="location-outline" size={24} color="black" />
          </View>
        )}
        renderRightButton={() => (
          <View style={styles.iconContainerRight}>
            <Ionicons name="filter-outline" size={24} color="black" />
          </View>
        )}
        styles={{
          container: {
            position: "absolute",
            top: 30,
            zIndex: 40,
            width: "100%",
          },

          textInput: {
            width: "100%",
            flex: 1,
            backgroundColor: "#fff",
            height: 55,
            borderRadius: 30,
            paddingHorizontal: 50,
            fontSize: 15,
          },
          textInputContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 15,
          },
          poweredContainer: {
            display: "none",
          },
        }}
      />

      {filteredProperty.length > 0 && (
        <AppMapView
          location={location}
          isFullMap={true}
          properties={filteredProperty}
        />
      )}
      <View style={styles.zoomIconsContainer}>
        <Pressable onPress={handleZoomIn} style={styles.zoomInIcon}>
          <Ionicons name="add-outline" size={30} color="black" />
        </Pressable>
        <Pressable onPress={handleZoomOut} style={styles.zoomOutIcon}>
          <Ionicons name="remove-outline" size={30} color="black" />
        </Pressable>
      </View>

      <View style={styles.mapIconsContainer}>
        <TouchableOpacity
          onPress={handleStackIconPress}
          style={styles.stackIcon}
        >
          <Octicons name="stack" color="black" size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigationIconPress}
          style={styles.myLocationIcon}
        >
          <MaterialIcons name="my-location" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },

  iconContainerLeft: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",

    left: 10,
    zIndex: 1,
    paddingLeft: 10,
  },
  iconContainerRight: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    zIndex: 1,
    padding: 7,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 50,
  },
  zoomIconsContainer: {
    position: "absolute",
    top: 130,
    left: 15,
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 30,
    alignItems: "center",

    gap: 10,
  },
  zoomInIcon: {
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 50,
  },
  zoomOutIcon: {
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 50,
  },
  mapIconsContainer: {
    position: "absolute",
    top: 130,
    right: 20,
    flexDirection: "column",

    borderRadius: 30,
    alignItems: "center",

    gap: 10,
  },
  stackIcon: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 50,
  },
  myLocationIcon: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 50,
  },
});
