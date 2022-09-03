import React, {useState} from 'react';
import {View, Text, StyleSheet } from 'react-native'
import {colors} from '../utils/colors'
import { TextInput } from 'react-native-paper'
import {RoundedButton} from '../components/RoundedButton'
import {spacing} from '../utils/sizes'

export const Focus = ({assSubject}) => {
  const [subject, setSubject] = useState(null)
  
  return (
    <View style={styles.container}>
      <View style={styles.inputCotainer}>
        <TextInput  
          style={styles.textInput}
          label="What would you lik to focus on?" 
          onChangeText={setSubject}
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={50} onPress={() => assSubject(subject)} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  inputCotainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    marginRight: spacing.lg
  },
  button: {
    justifyContent: 'center',
  }

})