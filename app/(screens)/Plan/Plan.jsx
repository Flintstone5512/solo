import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ThemeContext from '../../../theme/ThemeContext';
import Button from '../../../components/Button/Button'; // Assuming you have a Button component

const TrackYourPlan = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* Add navigation back action */ }}>
          <Text style={[styles.backButton, { color: theme.color }]}>×</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.color }]}>Track your plan</Text>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tabButtonActive}>
          <Text style={styles.tabButtonText}>Track your plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>Set your pace</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Start building your first Retirement Fund</Text>
            <Text style={styles.stepDescription}>Build smarter and 3x faster with Solo Money</Text>
            <Button buttonText="Add Credit Card" onPress={() => { /* Add button action */ }} style={styles.stepButton} />
            <TouchableOpacity>
              <Text style={styles.stepLink}>I don't have Credit Cards</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Rainy Day Fund</Text>
            <Text style={styles.stepDescription}>Build your Retirement</Text>
            <Text style={styles.stepSavings}>$0 saved</Text>
            <Text style={styles.stepSavingsPercent}>0%</Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Save for future plans</Text>
            <Text style={styles.stepDescription}>Vacation, tuition, weddings...</Text>
            <Button buttonText="Activate" onPress={() => { /* Add button action */ }} style={styles.stepButtonActivate} />
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Start Investing</Text>
            <Text style={styles.stepDescription}>Invest 5% of your monthly income</Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>5</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Build target wealth</Text>
            <Text style={styles.stepDescription}>Achieve your desired goal</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackYourPlan;

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
    fontSize: 30,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
  },
  tabButtonActive: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  tabButtonText: {
    color: 'white',
  },
  content: {
    paddingBottom: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontSize: 16,
  },
  stepContent: {
    marginLeft: 20,
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },
  stepButton: {
    backgroundColor: 'green',
  },
  stepButtonActivate: {
    backgroundColor: 'transparent',
    borderColor: 'green',
    borderWidth: 1,
  },
  stepLink: {
    color: 'green',
    marginTop: 5,
  },
  stepSavings: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  stepSavingsPercent: {
    fontSize: 16,
    color: 'green',
  },
});
