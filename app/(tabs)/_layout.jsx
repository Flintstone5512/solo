import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Tabs } from 'expo-router';
import React, { useContext } from 'react';
import Home from "../../assets/images/home.svg";
import Wallet from "../../assets/images/wallet.svg";
import Booking from "../../assets/images/transaction.svg";
import Profile from "../../assets/images/profile.svg";
import Active_Home from "../../assets/images/active_home.svg";
import Active_Wallet from "../../assets/images/active_wallet.svg";
import Active_Booking from "../../assets/images/active_booking.svg";
import Active_Profile from "../../assets/images/active_profile.svg";
import { Cabin_500Medium, Cabin_700Bold } from '@expo-google-fonts/cabin';
import ThemeContext from '../../theme/ThemeContext';
import Dark_active1 from "../../assets/images/dark_active_profile1.svg";
import Dark_active2 from "../../assets/images/dark_active_profile2.svg";
import Dark_active3 from "../../assets/images/dark_active_profile3.svg";
import Dark_active4 from "../../assets/images/dark_active_profile4.svg";


const TabBarButton = ({ children, onPress, accessibilityState, title }) => {
  const { theme, darkMode } = useContext(ThemeContext);

  const isSelected = accessibilityState.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tabButton,
        isSelected ? [styles.activeTabButton] : null,
      ]}
    >
      {children}
      <Text style={[styles.tabTitle, isSelected ? [styles.activeTabTitle, { color: theme.bordercolor }] : styles.tabTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const TabsLayout = () => {
  const { theme, darkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarButton: (props) => (
            <TabBarButton {...props} title={route.name} />
          ),
          tabBarStyle: [styles.tabBar, { backgroundColor: theme.cardbg }],
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let IconComponent;
            if (focused) {
              switch (route.name) {
                case 'home':
                  IconComponent = darkMode ? Dark_active1 : Active_Home;
                  break;
                case 'transaction':
                  IconComponent = darkMode ? Dark_active2 : Active_Booking;
                  break;
                case 'wallet':
                  IconComponent = darkMode ? Dark_active3 : Active_Wallet;
                  break;
                case 'profile':
                  IconComponent = darkMode ? Dark_active4 : Active_Profile;
                  break;
                default:
                  IconComponent = Home;
                  break;
              }
            } else {
              switch (route.name) {
                case 'home':
                  IconComponent = Home;
                  break;
                case 'transaction':
                  IconComponent = Booking;
                  break;
                case 'wallet':
                  IconComponent = Wallet;
                  break;
                case 'profile':
                  IconComponent = Profile;
                  break;
                default:
                  IconComponent = Home;
                  break;
              }
            }
            return <IconComponent />;
          },
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="transaction"
          options={{
            title: 'Transaction',
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Wallet',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabBar: {
    width: '100%',
    maxHeight: 85,
    height: '100%',
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    paddingTop: 10, 
  },
  tabTitle: {
    fontSize: 12,
    fontFamily: 'Cabin_500Medium',
    color: '#757575',
    textTransform: 'capitalize',
    paddingTop: 10, 
    paddingBottom: 15,
  },
  activeTabTitle: {
    color: '#3629B7',
    fontFamily: 'Cabin_700Bold',
  },
  activeTabButton: {},
});

export default TabsLayout;
