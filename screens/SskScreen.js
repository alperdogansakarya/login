import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import faqsData from '../faqs.json'; 

export default function FaqScreen() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setFaqs(faqsData); 
  }, []);

  const toggleFaq = (index) => {
    const newFaqs = [...faqs];
    newFaqs[index].isOpen = !newFaqs[index].isOpen;
    setFaqs(newFaqs);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.baslikContainer}>
        <Text style={styles.baslikText}>Sık Sorulan Sorular</Text>
      </View>

      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleFaq(index)} style={styles.faqContent}>
            <Text style={styles.question}>{faq.question}</Text>
            <FontAwesome5 name={faq.isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#006400" />
          </TouchableOpacity>
          {faq.isOpen && <Text style={styles.answer}>{faq.answer}</Text>}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  baslikContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    paddingBottom: 10,
  },
  baslikText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color:'#006400',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  faqItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  faqContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  answer: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: '#333',
  },
});
