import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { OpenAI } from 'openai'
import { OPENAI_API_KEY } from '@env';
import { auth, firestore, firebasedegisken } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
//import CustomMenu from '../components/menu';
const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [name, setName] = useState('Alper');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [firstQuestionAsked, setFirstQuestionAsked] = useState(false); // Durumu burada tanımlayın

  const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
  });


  
  let thread = null;

  const handleSendMessage = async () => {
    if (!firstQuestionAsked) {
      setFirstQuestionAsked(true); // İlk soru sorulduğunda durumu güncelleyin
    }

    if (inputText.trim() === '') {
      setInputError(true);
      return;
    }

    setIsLoading(true);
    
    const timestamp = firebasedegisken.FieldValue.serverTimestamp();

    // Firestore'a mesajı kaydet
    await firestore.collection('messagelog').add({
      content: inputText,
      role: 'user',
      timestamp: timestamp
    });

    const assistant = await openai.beta.assistants.retrieve(
      "asst_BkxLa5XEFFyZ1YQEyKpd6M1u"
    );

    const currentThread = await getThread();

    await openai.beta.threads.messages.create(currentThread.id, {
      role: "user",
      content: inputText
    });

    const run = await openai.beta.threads.runs.create(currentThread.id, {
      assistant_id: assistant.id,
    });

    let isCompleted = false;

    do {
      const check_run = await openai.beta.threads.runs.retrieve(currentThread.id, run.id)

      if (check_run.status === "completed") {
        const messages = await openai.beta.threads.messages.list(currentThread.id);

        const reply = messages.data[0].content[0].text.value.toString().trim();
        setChatHistory(prevChat => [...prevChat, { role: 'user', content: inputText }, { role: 'ai', content: reply }]);
        isCompleted = true;
      }

      if (!isCompleted) {
        await sleep(1000);
      }
    } while (!isCompleted)

    setIsLoading(false);
    setInputText('');
    setInputError(false);
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const getThread = async () => {
    if(!thread)
      thread = await openai.beta.threads.create();

    return thread;
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0; // Değişiklik burada

  return (
    <View style={styles.container}>
      {(!firstQuestionAsked && chatHistory.length === 0) && ( // Duruma göre ekranda fotoğraf ve yazıyı gösterin
        <View style={styles.introContainer}>
          <Image source={require('../img/TtbLogo.png')} style={styles.introImage} />
          <Text style={styles.introText}>Hoş geldiniz! </Text>
           <Text style={styles.introText}> Size nasıl yardımcı olabilirim?</Text>
        </View>
      )}
      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 100 }} 
        keyboardShouldPersistTaps="handled" // Klavye açıkken ScrollView üzerindeki dokunuşları işlemek için
      >
        {chatHistory.map((message, index) => (
          <View key={index} style={[styles.messageContainer, { alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start' }]}>
            {message.role === 'user' ? (
              <Image source={require('../img/user.png')} style={[styles.imageUser]} />
            ) : (
              <Image source={require('../img/TtbLogo.png')} style={styles.imageAi} />
            )}
            <Text style={[styles.messageText, { color: message.role === 'user' ? '#fff' : '#fff' }]}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.inputContainer}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Sorunuzu buraya yazın..."
          placeholderTextColor="#888"
          style={[styles.input, inputError && styles.errorInput]}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          {isLoading ? (
            <ActivityIndicator size="small" color="fff" />
          ) : (
            <Icon name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity> 
      </KeyboardAvoidingView>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Koyu Yeşil
  },
  introContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  introText: {
    fontSize: 18,
    textAlign: 'center',
  },
  imageUser: {
    height: 30,
    width: 30,
    marginBottom: 5,
    alignSelf: 'flex-end'
  },
  imageAi: {
    height: 30,
    width: 30,
    marginBottom: 5,
    borderRadius: 20
  },
  chatContainer: {
    flex: 1,
  },
  messageContainer: {
    backgroundColor: '#006400', // Koyu Yeşil
    padding: 12,
    marginVertical: 7,
    borderRadius: 20,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  roleText: {
    fontSize: 12,
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#8C999A',
    borderRadius: 10,
    padding: 10,
    color: 'black',
  },
  errorInput: {
    borderColor: 'red',
  },
  sendButton: {
    backgroundColor: '#006400', 
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
    alignSelf: 'center', // Yazi ortalanir
  },
  introText: {
    fontSize: 20,
    color:'#B8B6B5'
  },


  
});

export default ChatScreen;
