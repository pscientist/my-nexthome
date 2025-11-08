import { Tabs } from "expo-router";
// import { NativeWindStyleSheet } from "nativewind";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable, Text } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { TamaguiProvider } from '@tamagui/core';
import { StyleSheet, View } from 'react-native';
import { HousesProvider } from "../contexts/HousesContext";
import "../global.css";
import config from '../tamagui.config';


// NativeWindStyleSheet.setOutput({
// default: "native",
// });

// Load Reactotron only in development
if (__DEV__) {
  require("../config/reactotron");
}

export default function RootLayout() {

  return (
    <TamaguiProvider config={config}>
      <HousesProvider>
        <Tabs
          tabBar={(props) => <FloatingTabBar {...props} />}
        >
          <Tabs.Screen
            name="index"
          // options={{
          //   title: "Home",
          //   tabBarIcon: ({ color, size }) => (
          //     <MaterialIcons name="home" size={size} color={color} />
          //   ),
          // }}
          />
          <Tabs.Screen
            name="houses"
          // options={{
          //   title: "Houses",
          //   tabBarIcon: ({ color, size }) => (
          //     <MaterialIcons name="format-list-bulleted" size={size} color={color} />
          //   ),
          // }}
          />
          <Tabs.Screen
            name="addeditform"
          // options={{
          //   title: "Add/Edit",
          //   tabBarIcon: ({ focused }) => (
          //     <MaterialIcons
          //       name="add"
          //       size={28}
          //       color={focused ? "#FFFFFF" : "#765227"}
          //     />
          //   ),
          // }}
          />
          <Tabs.Screen
            name="calendar"
          // options={{
          //   title: "Calendar",
          //   tabBarIcon: ({ color, size }) => (
          //     <MaterialIcons name="event" size={size} color={color} />
          //   ),
          // }}
          />
          <Tabs.Screen
            name="settings"
          // options={{
          //   title: "Settings",
          //   tabBarIcon: ({ color, size }) => (
          //     <MaterialIcons name="settings" size={size} color={color} />
          //   ),
          // }}
          />
        </Tabs>
      </HousesProvider>
    </TamaguiProvider>
  );
}

function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <Text style={styles.tabItemText}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View >
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF4E7',
    marginHorizontal: 16,

  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  tabItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8C6D4A',
  },
});