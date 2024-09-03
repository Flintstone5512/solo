import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ThemeContext from '../../../theme/ThemeContext';
import Button from '../../../components/Button/Button'; // Assuming you have a Button component

const SoloAi = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* Add navigation back action */ }}>
          <Text style={[styles.backButton, { color: theme.color }]}>×</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.color }]}>Set your pace</Text>
      </View>

      <Text style={[styles.subtitle, { color: theme.color3 }]}>
        Set your plan pace just the way you like it. Always changeable.
      </Text>
      <Text style={[styles.link, { color: 'green' }]}>
        Learn about Smart Pace vs. Always
      </Text>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.option}>
          <View style={[styles.optionHeader, styles.optionActive]}>
            <Text style={styles.optionTitle}>Smart Pace</Text>
            <Text style={styles.optionBadge}>Recommended</Text>
          </View>
          <Text style={styles.optionDescription}>
            SoloMoney AI automatically transfers small, smart amounts, adapting daily to your bills and balance.
          </Text>
        </View>

        <View style={styles.option}>
          <View style={styles.optionHeader}>
            <Text style={styles.optionTitle}>Weekly</Text>
          </View>
        </View>

        <View style={styles.option}>
          <View style={styles.optionHeader}>
            <Text style={styles.optionTitle}>On Paycheck</Text>
          </View>
        </View>

        <View style={styles.option}>
          <View style={styles.optionHeader}>
            <Text style={styles.optionTitle}>Pay manually through SoloMoney</Text>
          </View>
        </View>
      </ScrollView>

      <Text style={[styles.footerText, { color: theme.color }]}>
        Smart pace is <Text style={{ color: 'green' }}>2.7 times faster</Text> in achieving your goals.
      </Text>

      <Button buttonText="Fine-tune Smart Pace" onPress={() => { /* Add button action */ }} style={styles.button} />
    </View>
  );
};

export default SoloAi;

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
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  content: {
    paddingBottom: 20,
  },
  option: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionHeader: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  optionActive: {
    borderColor: 'green',
    borderWidth: 2,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionBadge: {
    backgroundColor: 'green',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 12,
  },
  optionDescription: {
    padding: 15,
    fontSize: 14,
    color: '#757575',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    alignSelf: 'center',
    width: '100%',
  },
});
