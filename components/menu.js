import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Bu kısmı kullandığınız ikon setine göre güncelleyin

const CustomMenu = ({ navigation, screens }) => {
  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        {screens.map((screen, index) => (
          <TouchableOpacity key={index} onPress={() => handleNavigate(screen.name)} style={styles.menuItem}>
            <Text style={styles.menuItemText}>{screen.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    backgroundColor:'#124936'
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    color: '#fff', // Koyu Yeşil
  },
});

export default CustomMenu;
