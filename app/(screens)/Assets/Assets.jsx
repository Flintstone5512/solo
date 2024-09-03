import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ThemeContext from '../../../theme/ThemeContext';
import Button from '../../../components/Button/Button'; // Assuming you have a Button component

const Assets = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.color }]}>Assets</Text>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: 'path_to_flag_image' }} style={styles.image} /> {/* Replace with actual image path */}
        <Text style={[styles.subtitle, { color: theme.color3 }]}>
          Tailor your Smart Retirement to find the best options for you.
        </Text>
        <Button buttonText="Let's Start" onPress={() => { /* Add button action */ }} />

        <View style={styles.assetItem}>
          <Image source={{ uri: 'path_to_umbrella_image' }} style={styles.assetIcon} /> {/* Replace with actual image path */}
          <View style={styles.assetInfo}>
            <Text style={[styles.assetTitle, { color: theme.color }]}>Smart Retirement Fund</Text>
            <Text style={[styles.assetDescription, { color: theme.color3 }]}>Saved 0%</Text>
          </View>
          <View style={styles.assetAmount}>
            <Text style={[styles.assetAmountText, { color: theme.color }]}>$1,000</Text>
            <Text style={[styles.assetSavedAmount, { color: 'green' }]}>$0</Text>
          </View>
        </View>

        <View style={styles.assetItem}>
          <Image source={{ uri: 'path_to_investment_image' }} style={styles.assetIcon} /> {/* Replace with actual image path */}
          <View style={styles.assetInfo}>
            <Text style={[styles.assetTitle, { color: theme.color }]}>Smart Investing</Text>
            <Text style={[styles.assetDescription, { color: theme.color3 }]}>Saved 0%</Text>
          </View>
          <View style={styles.assetAmount}>
            <Text style={[styles.assetAmountText, { color: theme.color }]}>$0</Text>
            <Text style={[styles.assetSavedAmount, { color: 'green' }]}>$0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Assets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    lineHeight: 36,
    fontFamily: 'Cabin_700Bold',
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
  },
  assetIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  assetInfo: {
    flex: 1,
  },
  assetTitle: {
    fontSize: 16,
    fontFamily: 'Lato_700Bold',
    marginBottom: 5,
  },
  assetDescription: {
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
  },
  assetAmount: {
    alignItems: 'flex-end',
  },
  assetAmountText: {
    fontSize: 16,
    fontFamily: 'Lato_700Bold',
    marginBottom: 5,
  },
  assetSavedAmount: {
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
  },
});
