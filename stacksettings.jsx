import React, { useContext } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import ThemeContext from '../../theme/ThemeContext';

const StackSettings = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* Add navigation back action */ }}>
          <Text style={[styles.backButton, { color: theme.color }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.color }]}>Your Stack Settings</Text>
      </View>

      <Text style={[styles.balance, { color: theme.color }]}>$0.00</Text>

      <View style={styles.setting}>
        <Text style={[styles.settingTitle, { color: theme.color }]}>StackUps</Text>
        <Switch value={true} />
      </View>
      <Text style={[styles.settingDescription, { color: theme.color3 }]}>
        Stack your spare change to build your retirement, and rainy day fund!
      </Text>

      <View style={styles.setting}>
        <Text style={[styles.settingTitle, { color: theme.color }]}>Safety net</Text>
        <Text style={[styles.settingValue, { color: theme.color }]}>$50.00</Text>
      </View>
      <Text style={[styles.settingDescription, { color: theme.color3 }]}>
        SoloMoney will stop stacking extra money when your checking account balance goes below this amount.
      </Text>

      <View style={styles.setting}>
        <Text style={[styles.settingTitle, { color: theme.color }]}>Set your pace</Text>
        <Text style={[styles.settingValue, { color: 'green' }]}>Smart Pace</Text>
      </View>
      <Text style={[styles.settingDescription, { color: theme.color3 }]}>
        Configure how you want SoloMoney to automatically save for you.
      </Text>

      <View style={styles.setting}>
        <Text style={[styles.settingTitle, { color: theme.color }]}>Monthly limit</Text>
        <Text style={[styles.settingValue, { color: theme.color }]}>$0.00</Text>
      </View>
      <Text style={[styles.settingDescription, { color: theme.color3 }]}>
        SoloMoney will make AutoSavings throughout the month up to your total monthly limit. We'll also ensure you always have enough for other bills and expenses.
      </Text>

      <TouchableOpacity style={styles.withdrawButton} onPress={() => { /* Add withdraw action */ }}>
        <Text style={styles.withdrawText}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StackSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingValue: {
    fontSize: 16,
  },
  settingDescription: {
    fontSize: 14,
    color: '#757575',
    marginVertical: 5,
  },
  withdrawButton: {
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
  },
  withdrawText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
