import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import ThemeContext from './theme/ThemeContext';
import Button from './components/Button/Button';

const HomeDash = () => {
  const { theme, darkMode } = useContext(ThemeContext);
  const router = useRouter();

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        translucent
        backgroundColor="transparent"
        barStyle={darkMode ? "light-content" : "dark-content"} 
      />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.balance, { color: theme.color }]}>$16,003.00</Text>
          <Button buttonText="Add Money" onPress={() => handleNavigation('/add_money')} />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => handleNavigation('/notifications')}>
            <Image source={{ uri: 'notification-icon-url' }} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigation('/send')}>
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigation('/receive')}>
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigation('/history')}>
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigation('/balance')}>
            <Text style={styles.actionText}>A/C Balance</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.promotion}>
          <Text style={[styles.promotionText, { color: theme.color }]}>Cashback 100%</Text>
          <Text style={[styles.promotionText, { color: theme.color }]}>Invite your friends and get Cashback</Text>
        </View>
        <View style={styles.services}>
          <Text style={[styles.sectionTitle, { color: theme.color }]}>Payou Services</Text>
          <View style={styles.serviceGrid}>
            <TouchableOpacity style={styles.serviceButton} onPress={() => handleNavigation('/recharge')}>
              <Text style={styles.serviceText}>Recharge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton} onPress={() => handleNavigation('/travel')}>
              <Text style={styles.serviceText}>Travelling</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton} onPress={() => handleNavigation('/hotel')}>
              <Text style={styles.serviceText}>Hotel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton} onPress={() => handleNavigation('/wifi')}>
              <Text style={styles.serviceText}>Wifi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton} onPress={() => handleNavigation('/electricity')}>
              <Text style={styles.serviceText}>Electricity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton} onPress={() => handleNavigation('/movie')}>
              <Text style={styles.serviceText}>Movie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton} onPress={() => handleNavigation('/store')}>
              <Text style={styles.serviceText}>Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton} onPress={() => handleNavigation('/more')}>
              <Text style={styles.serviceText}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeDash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: '#6A1B9A', // Purple color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionText: {
    color: '#FFD700', // Gold color
    fontSize: 16,
  },
  promotion: {
    backgroundColor: '#6A1B9A', // Purple color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  promotionText: {
    color: '#FFD700', // Gold color
    fontSize: 16,
  },
  services: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceButton: {
    backgroundColor: '#6A1B9A', // Purple color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginVertical: 5,
  },
  serviceText: {
    color: '#FFD700', // Gold color
    fontSize: 14,
  },
});
