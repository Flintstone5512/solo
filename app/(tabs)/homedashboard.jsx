import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import ThemeContext from '../../theme/ThemeContext';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(10);
  const [compoundFrequency, setCompoundFrequency] = useState(1);
  const [result, setResult] = useState(null);

  const calculateCompoundInterest = () => {
    const P = principal;
    const r = rate / 100;
    const n = compoundFrequency;
    const t = time;
    const amount = P * Math.pow((1 + r / n), (n * t));
    setResult(amount.toFixed(2));
  };

  return (
    <View style={styles.calculator}>
      <Text style={styles.calculatorTitle}>Compound Interest Calculator</Text>
      <Text style={styles.label}>Principal Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(principal)}
        onChangeText={value => setPrincipal(Number(value))}
      />
      <Text style={styles.label}>Annual Interest Rate (%):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(rate)}
        onChangeText={value => setRate(Number(value))}
      />
      <Text style={styles.label}>Time (years):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(time)}
        onChangeText={value => setTime(Number(value))}
      />
      <Text style={styles.label}>Compounding Frequency (times per year):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(compoundFrequency)}
        onChangeText={value => setCompoundFrequency(Number(value))}
      />
      <Button title="Calculate" onPress={calculateCompoundInterest} />
      {result !== null && (
        <Text style={styles.result}>Future Value: ${result}</Text>
      )}
    </View>
  );
};

const HomeDashboard = () => {
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
        <Text style={[styles.title, { color: theme.color }]}>Home</Text>
        <TouchableOpacity onPress={() => handleNavigation('/earn')}>
          <Text style={[styles.earnButton, { color: '#FFD700' }]}>Earn $125</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.color }]}>Build your Credit fast!</Text>
          <Text style={[styles.cardSubtitle, { color: theme.color3 }]}>Check your rates today!</Text>
        </View>
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.color }]}>Refer your friends</Text>
          <Text style={[styles.cardSubtitle, { color: theme.color3 }]}>Get up to $125</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.color }]}>Create your retirement strategy</Text>
          <View style={styles.chart}>
            {/* Placeholder for bar chart */}
            <Text style={{ color: theme.color3 }}>Bar Chart</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.color }]}>Current plan goal</Text>
          <View style={styles.planGoal}>
            <Text style={[styles.planGoalText, { color: theme.color }]}>Rainy Day Fund</Text>
            <Text style={[styles.planGoalAmount, { color: theme.color }]}>$0 Saved</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '0%', backgroundColor: '#FFD700' }]} />
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.color }]}>Your Stack</Text>
          <View style={styles.stash}>
            <Text style={[styles.stashAmount, { color: theme.color }]}>$0.00</Text>
            <Text style={[styles.stashText, { color: theme.color3 }]}>Set aside for your plans</Text>
            <Text style={[styles.stashStatus, { color: '#6A1B9A' }]}>StackUps: On</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.color }]}>Your Checking Account</Text>
          <View style={styles.checkingAccount}>
            <Text style={[styles.bankName, { color: theme.color }]}>Bank of America</Text>
            <Text style={[styles.accountStatus, { color: '#FF0000' }]}>Account disconnected</Text>
            <TouchableOpacity onPress={() => handleNavigation('/reconnect')}>
              <Text style={styles.reconnectButton}>Reconnect</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Adding Compound Interest Calculator */}
        <CompoundInterestCalculator />
      </ScrollView>
      
    </View>
  );
};

export default HomeDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  earnButton: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 5,
  },
  card: {
    backgroundColor: '#6A1B9A',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 16,
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
  },
  planGoal: {
    padding: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  planGoalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planGoalAmount: {
    fontSize: 14,
    marginVertical: 10,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
  stash: {
    padding: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  stashAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stashText: {
    fontSize: 14,
    marginVertical: 10,
  },
  stashStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkingAccount: {
    padding: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  bankName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountStatus: {
    fontSize: 14,
    marginVertical: 10,
  },
  reconnectButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#6A1B9A',
  },
  footerButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  calculator: {
    padding: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 20,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
