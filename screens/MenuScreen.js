import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import CustomMenu from '../components/menu';




const MenuScreen = ({ navigation }) => {
  const handleAskAnything = () => {
    // 'Aklına Geleni Sor' ekranına git
    navigation.navigate('Home');
  };

  const handleFAQs = () => {
    // 'Sık Sorulan Sorular' ekranına git
    navigation.navigate('Ssk');
  };

  return (
      <View style={styles.container}>
          
          <View style={styles.menuContainer}>
              <CustomMenu navigation={navigation} screens={[{ name: 'Home', title: 'Aklına Geleni Sor' }, { name: 'Ssk', title: 'Sık Sorulan Sorular' }]} />
      </View>

      
      
      <View style={styles.containerimg}>
        <Image
          source={require('../img/TtbLogo.png')} // Fotoğrafın dosya yolunu buraya ekleyin
          style={styles.image}
        />
      </View>
          <View>
              <TouchableOpacity onPress={handleAskAnything} style={styles.button}>
        <Text style={styles.buttonText}>Aklına Geleni Sor</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFAQs} style={styles.button}>
        <Text style={styles.buttonText}>Sık Sorulan Sorular</Text>
      </TouchableOpacity>
          </View>
      

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Arka plan rengi - Beyaz
    position: 'relative',
  },
  button: {
    backgroundColor: '#124936', // Buton arka plan rengi - Koyu Yeşil
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', // Buton metin rengi - Beyaz
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  menuContainer:{
    position: 'absolute',
    bottom:5,
    borderRadius: 10,
    
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'cover', 
  },
  containerimg: {
    marginBottom:15
  }
});

export default MenuScreen;
