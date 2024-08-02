import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const MenuScreen = ({ navigation }) => {
  const images = [
    require('../img/slide11.png'), // İlk resim
    require('../img/slide33.png'), // İkinci resim
    require('../img/slide22.png'), // Üçüncü resim
  ];

  const handleAskAnything = () => {
    navigation.navigate('Aklına Geleni Sor');
  };

  const handleFAQs = () => {
    navigation.navigate('Sık Sorulan Sorular');
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          autoplay={true}
          autoplayTimeout={3}
          loop={true}
          showsPagination={true}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={image} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAskAnything} style={styles.button}>
          <Text style={styles.buttonText}>Aklına Geleni Sor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFAQs} style={styles.button}>
          <Text style={styles.buttonText}>Sık Sorulan Sorular</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.introTextContainer}>
        <Text style={styles.introText}>Hoşgeldiniz!</Text>
        <Text style={styles.introText}>Ben Tarım Tekno Bot.</Text>
        <Text style={styles.introText}>
          Fındıkla alakalı bilirkişiler tarafından onaylanmış verilerimle, size yardımcı olmak için buradayım.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    position: 'relative',
  },
  swiperContainer: {
    height: 250,
    width: '100%',
    marginBottom: 15,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'cover',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.1)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: 'rgba(0,0,0,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#124936',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  introText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#0A6847',
  },
  introTextContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
});

export default MenuScreen;