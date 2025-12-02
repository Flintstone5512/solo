import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/Onboard1.png')} style={styles.backIcon} /> {/* Replace with actual back icon */}
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>Join us on social media!</Text>
        <Text style={styles.bannerSubText}>Fresh videos. Smart tips. Follow @joinSoloMoney</Text>
      </View>

      <View style={styles.item}>
        <Image source={require('../../assets/icons/credit-cards.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Credit Cards</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icons/funding-account.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Funding Account</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icons/security.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Security</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icons/account-info.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Account Info</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icons/notifications.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Notifications</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icons/info.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>How SoloMoney works</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icons/referrals.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Referrals</Text>
        <View style={styles.referralBadge}>
          <Text style={styles.referralText}>Get $25</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icons/legal.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Legal</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icons/feature-request.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Submit feature request</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icons/contact-support.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Contact support</Text>
      </View>
      <TouchableOpacity style={styles.item} onPress={() => { /* Add logout functionality here */ }}>
        <Image source={require('../../assets/icons/logout.png')} style={styles.icon} /> {/* Replace with actual icon */}
        <Text style={styles.itemText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.02.1</Text>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  title: {
    fontSize: 26,
    lineHeight: 36,
    fontFamily: 'Cabin_700Bold',
    color: '#121212',
  },
  banner: {
    backgroundColor: '#6BCB77',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 18,
    fontFamily: 'Cabin_700Bold',
    color: '#fff',
  },
  bannerSubText: {
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
    color: '#121212',
    flex: 1,
  },
  referralBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  referralText: {
    fontSize: 12,
    fontFamily: 'Lato_700Bold',
    color: '#fff',
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
    color: '#757575',
    textAlign: 'center',
    marginVertical: 20,
  },
});
