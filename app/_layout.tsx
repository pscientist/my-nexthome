import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { HousesProvider } from "../contexts/HousesContext";
import "../global.css";

export default function RootLayout() {
  return (
    <HousesProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#8C6D4A",
          tabBarInactiveTintColor: "#C0A98E",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            paddingBottom: 4,
          },
          tabBarStyle: {
            backgroundColor: "#FFF4E7",
            borderTopWidth: 0,
            height: 85,
            paddingHorizontal: 5,
            paddingTop: 4,
            paddingBottom: 12,
            shadowColor: "#B79C7F",
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: -6 },
            shadowRadius: 12,
            elevation: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="houses"
          options={{
            title: "Houses",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="format-list-bulleted" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="addeditform"
          options={{
            title: "Add/Edit",
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="add"
                size={28}
                color={focused ? "#FFFFFF" : "#765227"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="event" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="house-details"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </HousesProvider>
  );
}
