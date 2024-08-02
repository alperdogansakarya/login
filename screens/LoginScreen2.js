
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, Image } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
export default function LoginScreen2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Menu');
      }
    });
    return unsubscribe;
  }, []);
  const handleSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Kullanıcı', user.email);
        navigation.navigate('Menu'); // Giriş yaptıktan sonra doğrudan yönlendir
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Bu email adresi zaten kullanılıyor.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Geçersiz email adresi.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Şifre en az 6 karakter olmalıdır.';
            break;
          default:
            errorMessage = 'Kayıt olurken bir hata oluştu.';
        }
        Alert.alert('Kayıt Hatası', errorMessage);
      });
  };
  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Kullanıcı Giriş Yaptı', user.email);
        navigation.navigate('Menu'); // Giriş yaptıktan sonra doğrudan yönlendir
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Geçersiz email adresi.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Bu kullanıcı hesabı devre dışı bırakılmış.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Böyle bir kullanıcı bulunamadı.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Yanlış şifre.';
            break;
          default:
            errorMessage = 'Giriş yaparken bir hata oluştu.';
        }
        Alert.alert('Giriş Hatası', errorMessage);
      });
  };
  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert('Şifre Sıfırlama Hatası', 'Lütfen e-posta adresinizi girin.');
      return;
    }
    auth.sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Şifre Sıfırlama', 'Şifre sıfırlama e-postası gönderildi.');
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Geçersiz email adresi.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Böyle bir kullanıcı bulunamadı.';
            break;
          default:
            errorMessage = 'Şifre sıfırlarken bir hata oluştu.';
        }
        Alert.alert('Şifre Sıfırlama Hatası', errorMessage);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      
      <View style={styles.containerimg}>
        <Image
          source={require('../img/TtbLogo.png')}
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
          onChangeText={text => setPassword(text)}
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
      <TouchableOpacity onPress={handlePasswordReset} style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordButtonText}>Şifremi Unuttum</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 15,
    elevation: 5
  },
  inputContainer: {
    width: '80%',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#124936',
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 5,
    borderRadius: 10,
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
    marginBottom: 15
  },
  forgotPasswordButton: {
    marginTop: 20,
  },
  forgotPasswordButtonText: {
    color: '#124936',
    fontSize: 16,
  }
});
