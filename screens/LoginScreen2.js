import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState} from 'react';
import { TextInput, Image } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      navigation.navigate('Menu');
    }
  });
},[])

  
  const handleSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password).
      then(userCredentials => {
        const user = userCredentials.user;
        console.log('Kullanıcı', user.email);
      }).catch((error) => alert(error.message));
    
  }



  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).
      then(userCredentials => {
        const user = userCredentials.user;
        console.log('Kullanıcı Giriş Yaptı', user.email);
      }).catch((error) => alert(error.message));
    
  }

  return (
    <KeyboardAvoidingView
      style={styles.container} behavior='padding'>
      
       <View style={styles.containerimg}>
        <Image
          source={require('../img/TtbLogo.png')} // Fotoğrafın dosya yolunu buraya ekleyin
          style={styles.image}
        />
      </View>
    
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          placeholder="Şifre"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={text  => setPassword(text)}
        />
        
      </View>
      
      <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Giriş Yap</Text>         
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.outlineButton]}>
         <Text style={styles.outlineButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
  input:{
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 15,
    elevation: 5
  },
  inputContainer:{
    width: '80%',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 30,
     flexDirection: 'row', // Butonları yatay olarak yerleştirmek için
    justifyContent: 'space-between', // Aralarındaki boşluğu paylaştırarak
  },
  button: {
    backgroundColor: '#124936',
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 5,
   borderRadius:10,
    alignItems: 'center',
    elevation: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    
  },
  outlineButton: {
    backgroundColor: 'white'
    
  },
  outlineButtonText: {
    fontSize: 16,
   
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'cover', 
  },
  containerimg: {
    marginBottom:15
  }

})