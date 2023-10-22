import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Form = () => {
  const [marksAllocation, setMarksAllocation] = useState({});
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [indexNumber, setIndexNumber] = useState('');

  const handleFormSubmit = () => {
    // Here you can process the form data as needed
    console.log('Marks Allocation: ', marksAllocation);
    console.log('Number of Questions: ', numberOfQuestions);
    console.log('Index Number: ', indexNumber);
    // You can add your logic for form submission or API calls here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Exam Paper Information Form</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Marks Allocation for Each of 7 Questions:</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., 10, 15, 20, 10, 25, 30, 20"
          onChangeText={(text) => {
            const marks = text.split(',').map((mark) => parseInt(mark.trim()));
            setMarksAllocation(marks);
          }}
          value={marksAllocation}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number of Questions to be Answered:</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., 5"
          onChangeText={(text) => setNumberOfQuestions(text)}
          value={numberOfQuestions}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Index Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., 12345"
          onChangeText={(text) => setIndexNumber(text)}
          value={indexNumber}
          keyboardType="numeric"
        />
      </View>

      <Button title="Submit" onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default Form;
