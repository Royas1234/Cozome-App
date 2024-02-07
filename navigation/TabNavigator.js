import { SafeAreaView, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import SavedScreen from "../screens/SavedScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GlobalStyles from "../Styles/GlobalStyles";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home-minus" : "home-minus-outline";
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={22}
                  color={color}
                  style={{ top: 5 }}
                />
              );
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
              return (
                <Ionicons
                  name={iconName}
                  size={22}
                  color={color}
                  style={{ top: 5 }}
                />
              );
            } else if (route.name === "Saved") {
              iconName = focused ? "bookmark" : "bookmark-outline";
              return (
                <Ionicons
                  name={iconName}
                  size={22}
                  color={color}
                  style={{ top: 5 }}
                />
              );
            } else if (route.name === "Message") {
              iconName = focused ? "message" : "message-outline";
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={22}
                  color={color}
                  style={{ top: 5 }}
                />
              );
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
              return (
                <Ionicons
                  name={iconName}
                  size={22}
                  color={color}
                  style={{ top: 5 }}
                />
              );
            }
          },
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, fontWeight: "bold" }}>
              {route.name}
            </Text>
          ),
          tabBarStyle: [styles.tabBarStyle],
          headerShown: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Message" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  tabBarStyle: {
    paddingHorizontal: 5,
  },
});
