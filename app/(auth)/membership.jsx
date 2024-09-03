import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button/Button';
import ThemeContext from '../../theme/ThemeContext';
import { useRouter } from 'expo-router';

const Membership = () => {
  const { theme, darkMode } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    console.log('Membership component is mounted');
  }, []);

  const handleContinue = () => {
    router.push('soloups'); // Navigate to the solosups component
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.color }]}>Get real results with the SoloMoney Membership</Text>
      <View style={styles.planContainer}>
        <View style={[styles.planBox, styles.debtPaydown]}>
          <Text style={styles.planTitle}>Debt Paydown plan</Text>
          <Text style={styles.planDescription}>Interest savings that crush your debt faster</Text>
        </View>
        <View style={[styles.planBox, styles.creditMonitoring]}>
          <Text style={styles.planTitle}>Build Credit</Text>
          <Text style={styles.planDescription}>Easily build and track your Credit health</Text>
        </View>
        <View style={[styles.planBox, styles.carRefinance]}>
          <Text style={styles.planTitle}>Retirement Health</Text>
          <Text style={styles.planDescription}>Build and track your Retirement health</Text>
        </View>
        <View style={[styles.planBox, styles.budgetPlanner]}>
          <Text style={styles.planTitle}>Budget Planner</Text>
          <Text style={styles.planDescription}>Budget and save on your everyday expenses</Text>
        </View>
      </View>
      <View style={styles.membershipContainer}>
        <Text style={styles.membershipTitle}>SoloMoney Membership</Text>
        <Text style={styles.discountText}>13% OFF</Text>
        <Text style={styles.planDuration}>3 Months Plan</Text>
        <Text style={styles.planPrice}>$39</Text> 
        <Text style={styles.planNote}>Cancel anytime.</Text>
        
      </View>
      <Button buttonText="Continue" onPress={handleContinue} />
      <Text style={styles.footerText}>By clicking above, I consent to Membership fees and I acknowledge that I have read, understood and consent to the language and authorization outlined in Bright’s <Text style={styles.link}>Membership Authorization</Text></Text>
    </View>
  );
};

export default Membership;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  planContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  planBox: {
    width: '48%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  debtPaydown: {
    backgroundColor: '#e1f8e9',
  },
  creditMonitoring: {
    backgroundColor: '#fff2cc',
  },
  carRefinance: {
    backgroundColor: '#ffe1d8',
  },
  budgetPlanner: {
    backgroundColor: '#e0f7ff',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planDescription: {
    fontSize: 14,
    color: '#757575',
  },
  membershipContainer: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  discountText: {
    color: 'green',
    fontWeight: 'bold',
  },
  planDuration: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121212',
  },
  planNote: {
    fontSize: 14,
    color: '#757575',
  },
  footerText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
    marginVertical: 20,
  },
  link: {
    color: '#FFAF2A',
    textDecorationLine: 'underline',
  }
});
