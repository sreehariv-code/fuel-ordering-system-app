import React from 'react';
import { View, Image, StyleSheet, Dimensions ,ViewPropTypes} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const carouselItems = [
    { image: require('../assets/image1.jpg') },
    { image: require('../assets/image2.jpg') },
    { image: require('../assets/image3.jpg') },
    // Add more images as needed
  ];

  function MyCarousel() {
    const renderItem = ({ item }) => (
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Carousel 
          data={carouselItems}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width*0.84}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      margin:8,
      height:180,
      justifyContent: 'center',
      alignItems: 'center',
    },
    carouselItem: {
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });

  
  export default MyCarousel;