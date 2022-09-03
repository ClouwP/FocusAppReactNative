import React, { useState } from 'react';
import {Timer} from './src/features/Timer'
import {FocusHistory} from './src/features/FocusHistory'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';

export default function App() {
  const [currentSubjet, setCurrentSubject] = useState();
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubjet ? (
        <>
          <Focus assSubject={setCurrentSubject}/>
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer 
          focusSubject={currentSubjet}
          onTimerEnd={(subject) => {
            setHistory([...history, subject])
          }}
          clearSubject={() => {setCurrentSubject(null)}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkblue,
  },
});
