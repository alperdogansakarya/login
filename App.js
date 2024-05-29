import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { auth } from './firebase';
import LoginScreen2 from './screens/LoginScreen2';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import SskScreen from './screens/SskScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      props.navigation.navigate('Çıkış Yap');
      console.log("Başarıyla çıkış yapıldı");
    })
    .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentScroll}>
        <View style={styles.photoContainer}>
          <Image
            source={require('./img/TtbLogo.png')}
            style={styles.image}
          />
        </View>

        {userEmail && (
          <View style={styles.userInfo}>
            <Image
              source={require('./img/user.png')} // Küçük profil fotoğrafı için placeholder resim
              style={styles.profileImage}
            />
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
        )}

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Geliştirici: Ali Alper Doğan</Text>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Çıkış Yap"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Menu" component={MenuScreen} />
        <Drawer.Screen name="Aklına Geleni Sor" component={HomeScreen} />
        <Drawer.Screen name="Sık Sorulan Sorular" component={SskScreen} />
        <Drawer.Screen name="Çıkış Yap" component={LoginScreen2} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContentScroll: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  photoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 20, // Email ve profil fotoğrafını sola hizalamak için padding
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userEmail: {
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});