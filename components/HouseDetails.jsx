import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppMapView from "./AppMapView";

const HouseDetails = ({ route, navigation }) => {
  const { houseDetails } = route.params;

  const handleViewDetails = () => {
    navigation.navigate("Map", { selectedHouse: houseDetails });
  };

  return (
    <ScrollView style={styles.detailsScreenContainer}>
      <View style={styles.imageIconContainer}>
        <View style={styles.rateLocationCont}></View>
        <View>
          <Image source={houseDetails.image} style={styles.houseImage} />
          <Pressable
            style={[styles.detailIcon, styles.backIcon]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={22} color="whitesmoke" />
          </Pressable>
          <Pressable style={[styles.detailIcon, styles.shareIcon]}>
            <Ionicons name="share-social-outline" size={22} color="#fff" />
          </Pressable>
          <Pressable style={[styles.detailIcon, styles.bkmarkIcon]}>
            <Feather name="bookmark" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>
      <View style={styles.textContentContainer}>
        <View style={styles.houseRateWrapper}>
          <View style={styles.detailRateWrapper}>
            <FontAwesome name="star" size={17} color="#ffbb00" />
            <Text style={styles.detailRating}>{houseDetails.rating}</Text>
            <Text style={styles.detailReview}>
              ({houseDetails.review} Reviews)
            </Text>
          </View>
          <View style={styles.detaillocationName}>
            <Ionicons
              style={styles.searchSectionIcon}
              name="location-outline"
              size={18}
              color="#6F6D6D"
            />
            <Text style={styles.detailocationColor}>
              {houseDetails.address}
            </Text>
          </View>
        </View>
        <View style={styles.houseDetailTitle}>
          <Text style={styles.houseDetailTitleText}>{houseDetails.name}</Text>
        </View>
        <View style={styles.detailLocationFlex}>
          <View style={styles.detailLocationFlex}>
            <Ionicons name="ios-bed-outline" size={18} color="#6F6D6D" />
            <Text style={styles.detailLocationColor}>
              {houseDetails.bedTotal}
            </Text>
          </View>
          <View style={styles.detailLocationFlex}>
            <Text style={styles.detailLocationColor}>|</Text>
            <MaterialCommunityIcons
              name="bathtub-outline"
              size={18}
              color="#6F6D6D"
            />
            <Text style={styles.detailLocationColor}>
              {houseDetails.bathTotal}
            </Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionHeading}>Description</Text>
          <Text style={styles.descriptionText}>{houseDetails.description}</Text>
        </View>
        <View style={styles.locationMap}>
          <Text style={styles.descriptionHeading}>Location</Text>
          <Pressable style={styles.viewDetail} onPress={handleViewDetails}>
            <Text style={styles.viewDetail}>View Details</Text>
          </Pressable>
        </View>
        <Pressable style={styles.mapImageWrapper}>
          <AppMapView
            properties={[houseDetails]}
            isFullMap={false}
            location={{
              latitude: 51.1657,
              longitude: 10.4515,
              latitudeDelta: 6.5,
              longitudeDelta: 6.5,
            }}
          />
        </Pressable>
        <View style={styles.priceButtonSection}>
          <View style={styles.priceSection}>
            <Text style={styles.totalPrice}>Total Price</Text>
            <View style={styles.pricePeriod}>
              <Text style={styles.detailPrice}>{houseDetails.price}</Text>
              <Text style={styles.totalPrice}>{houseDetails.period}</Text>
            </View>
          </View>
          <View>
            <Pressable style={styles.rentButton}>
              <Text style={styles.rentButtonText}>Rent now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HouseDetails;

const styles = StyleSheet.create({
  detailsScreenContainer: {
    position: "relative",
  },
  imageIconContainer: {
    position: "relative",
  },
  houseImage: {
    width: "100%",
    height: 300,
  },
  detailIcon: {
    position: "absolute",

    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    top: 50,
  },
  backIcon: { left: 15 },
  shareIcon: {
    right: 65,
  },
  bkmarkIcon: {
    right: 15,
  },
  textContentContainer: {
    width: "100%",
    height: 570,
    marginTop: -20,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
  },
  houseRateWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailRateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailRating: {
    fontWeight: "600",
  },
  detailReview: {
    color: "#6F6D6D",
    fontWeight: "500",
  },

  detaillocationName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  detailocationColor: {
    color: "#6F6D6D",
  },
  houseDetailTitle: {
    paddingVertical: 10,
  },
  houseDetailTitleText: {
    fontWeight: "600",
    fontSize: 22,
  },
  detailLocationFlex: {
    flexDirection: "row",
    alignItems: "center",

    gap: 7,
  },
  detailLocationColor: {
    color: "#6F6D6D",
  },
  description: {
    paddingVertical: 15,
  },
  descriptionHeading: {
    fontWeight: "500",
    fontSize: 15,
  },
  descriptionText: {
    color: "#6F6D6D",
    paddingTop: 10,
    lineHeight: 20,
  },
  locationMap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewDetail: {
    color: "#1c53ff",
    fontWeight: "bold",
    fontSize: 15,
  },
  mapImageWrapper: {
    marginVertical: 10,
    width: "100%",
    height: 150,
  },
  mapImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
  priceButtonSection: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  totalPrice: {
    color: "#6F6D6D",
    lineHeight: 20,
    fontWeight: "500",
  },
  pricePeriod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  detailPrice: {
    color: "#1c53ff",
    fontWeight: "bold",
    fontSize: 22,
  },
  rentButton: {
    paddingVertical: 20,
    paddingHorizontal: 45,
    backgroundColor: "black",
    borderRadius: 50,
  },
  rentButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
