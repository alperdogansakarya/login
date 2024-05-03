import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function FaqScreen() {
  const [faqs, setFaqs] = useState([
    { question: 'Fındık ne zaman hasat edilir ?', answer: 'Fındıklar genellikle Ağustos ve Eylül aylarında hasat edilir. Bu dönemde kabukları çatlar ve fındıklar toplanmaya hazır hale gelir.', isOpen: false },
    { question: 'Fındık ağaçlarının bakımı nasıl yapılır', answer: 'Fındık ağaçlarının bakımı düzenli budama, sulama ve gübreleme işlemlerini içerir. Ayrıca zararlı böceklerle mücadele ve hastalıklara karşı önlemler almak da önemlidir.', isOpen: false },
    { question: 'Soru 3', answer: 'Cevap 3', isOpen: false },
  ]);

  const toggleFaq = (index) => {
    const newFaqs = [...faqs];
    newFaqs[index].isOpen = !newFaqs[index].isOpen;
    setFaqs(newFaqs);
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Arka plan rengi
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  baslikContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#8C999A',
    marginBottom: 10,
    paddingBottom: 10,
  },
  baslikText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color:'#006400',
    textShadowColor: 'rgba(0, 0, 0, 0.25)', // Gölge rengi
    textShadowOffset: { width: 1, height: 1 }, // Gölge offset
    textShadowRadius: 2, // Gölge yarıçapı
  },
  faqItem: {
    backgroundColor: '#fff', // Kutu arka plan rengi
    //borderRadius: 10,
    marginBottom:10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#8C999A',
    borderRadius: 10
   
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
    marginBottom: 5,
  //  borderBottomWidth: 1,
    //borderRadius:30,
  //  borderColor: '#006400',
    
  },
  answer: {
    fontSize: 14,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});
