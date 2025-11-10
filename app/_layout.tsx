import { Tabs } from "expo-router";
// import { NativeWindStyleSheet } from "nativewind";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable, Text } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { TamaguiProvider } from '@tamagui/core';
import { Platform, StyleSheet, View } from 'react-native';
import { HousesProvider } from "../contexts/HousesContext";
import "../global.css";
import config from '../tamagui.config';

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

        const icon = options.tabBarIcon
          ? options.tabBarIcon({
            focused: isFocused,
            color: isFocused ? '#765227' : '#8C6D4A',
            size: 24,
          })
          : null;

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
            <View style={styles.tabItemContent}>
              {icon && <View style={styles.iconContainer}>{icon}</View>}
              <Text style={[styles.tabItemText, isFocused && styles.tabItemTextFocused]}>
                {label}
              </Text>
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#FFF4E7',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    minHeight: 60,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabItemContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabItemText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8C6D4A',
    marginTop: 2,
  },
  tabItemTextFocused: {
    color: '#765227',
    fontWeight: '700',
  },
});