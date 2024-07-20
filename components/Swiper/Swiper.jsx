import { Cabin_400Regular, Cabin_500Medium, Cabin_700Bold } from '@expo-google-fonts/cabin';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import React, { useRef } from 'react';
import { View, FlatList, Animated, Dimensions, StyleSheet, Image, Text } from 'react-native';

const { width } = Dimensions.get('window');

const CustomSwiper = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        
        pagingEnabled
        decelerationRate={'fast'}
        snapToInterval={width}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
            extrapolate: 'clamp',
          });

          return (
            <View style={styles.itemContainer}>
              <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.image} />
                  <View style={styles.content}>
                    <Text style={styles.name_head}>name</Text>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.type}>{item.type}</Text>
                    <View style={styles.card_row}>
                    <Text style={styles.cardNo}>{item.card_no}</Text>
                    <Text style={styles.expire}>{item.expire}</Text>
                    </View>
                    <Text style={styles.balance}>{item.balance}</Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width:width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingRight: 55,
  },
  item: {
    width: width ,
    height: 200, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 280,
    height: 170,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    position: 'absolute',
    top: 20, 
    left: 20, 
    right: 20,
  },
  name_head: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Cabin_400Regular',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  name: {
   fontSize: 24,
   lineHeight: 29,
   fontFamily: 'Cabin_700Bold',
   color: '#ffffff',
   textTransform: 'capitalize',
  },
  type: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Cabin_500Medium',
    color: '#ffffff',
    textTransform: 'capitalize',
    marginTop: 15,
  },
  card_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 4,
  },
  cardNo: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#ffffff',
  },
  expire: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Lato_400Regular',
    color: '#ffffff',
  },
  balance: {
   fontSize: 20,
   lineHeight: 28,
   fontFamily: 'Lato_700Bold',
   color: '#ffffff',
  },
});

export default CustomSwiper;
