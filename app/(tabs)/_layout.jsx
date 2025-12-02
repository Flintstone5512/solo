import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Tabs } from "expo-router";
import React, { useContext } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import Home from "../../assets/images/homes.svg";
import Bills from "../../assets/images/bills.svg";
import Dreams from "../../assets/images/dreams.svg";
import Profile from "../../assets/images/profiles.svg";
import Transactions from "../../assets/images/transactions.svg";

import ThemeContext from "../../theme/ThemeContext";

// Reusable animated tab button
const TabBarButton = ({ children, onPress, accessibilityState, title }) => {
  const isSelected = accessibilityState.selected;
  const opacity = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    opacity.value = withTiming(isSelected ? 1 : 0, { duration: 250 });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(124, 0, 255, ${0.08 * opacity.value})`,
    transform: [{ scale: withTiming(isSelected ? 1.05 : 1, { duration: 200 }) }],
  }));

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton} activeOpacity={0.9}>
      <Animated.View style={[styles.tabInner, animatedStyle]}>
        {children}
        <Text style={[styles.tabTitle, isSelected && styles.activeTabTitle]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const TabsLayout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarButton: (props) => <TabBarButton {...props} title={route.name} />,
          tabBarStyle: [styles.tabBar, { backgroundColor: theme.cardbg }],
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            // since your SVGs already contain their own colors, no tint or fill is applied
            switch (route.name) {
              case "home":
                return <Home width={26} height={26} />;
              case "bills":
                return <Bills width={26} height={26} />;
              case "dreams":
                return <Dreams width={26} height={26} />;
              case "profile":
                return <Profile width={26} height={26} />;
              case "transactions":
                return <Transactions width={26} height={26} />;
              default:
                return <Home width={26} height={26} />;
            }
          },
        })}
      >
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="bills" options={{ title: "Bills" }} />
        <Tabs.Screen name="dreams" options={{ title: "Dreams" }} />
        <Tabs.Screen name="transactions" options={{ title: "Transactions" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  tabBar: {
    flexDirection: "row",
    height: 70,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: "#FAF8FF",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(124,0,255,0.1)",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabInner: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tabTitle: {
    fontSize: 12,
    color: "#A199C5",
    marginTop: 4,
    textTransform: "capitalize",
  },
  activeTabTitle: {
    color: "#7C00FF",
    fontWeight: "700",
  },
});

export default TabsLayout;
