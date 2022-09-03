import React, {useState}from 'react';
import {View, Text, StyleSheet, Vibration} from 'react-native'
import {ProgressBar} from 'react-native-paper'
import {Countdown} from '../components/Countdown'
import {RoundedButton} from '../components/RoundedButton'
import {spacing} from '../utils/sizes'
import {colors} from '../utils/colors'
import {Timing } from "./Timing"
import {useKeepAwake} from 'expo-keep-awake'

export const Timer = ({focusSubject, clearSubject, onTimerEnd}) => {
  useKeepAwake()
  const [isStarted, setIsStarted] = useState(false)
  const [progess, setProgess] = useState(1)
  const [minutes, setMinutes] = useState(0.2)

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ]

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN)
    setIsStarted(false)
    setProgess(1)
    reset()
    onTimerEnd(focusSubject)
  }

  return ( 
    <View style={style.container}>
      <View style={style.countdown}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={setProgess} onEnd={onEnd} />
        <View style={{paddingTop: spacing.xxl}}>
          <Text style={style.title}>Focus on:</Text>
          <Text style={style.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar
          progress={progess}
          color={colors.progrssBar}
          style={{height: spacing.sm}}
        />
      </View>
      <View style={style.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={style.buttonWrapper}>
        {!isStarted && <RoundedButton title="start" onPress={() => setIsStarted(true)}/>}
        {isStarted && <RoundedButton title="pauze" onPress={()  => setIsStarted(false)}/>}
        
      </View>
      <View style={style.timingWrapper}>
        <RoundedButton size={50} title={'-'} onPress={clearSubject}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
      flex: 1,

  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  task: {
    color: colors.white,
    textAlign: 'center'
  },
  timingWrapper: {
    flex: 0.1,
    padding: spacing.xxl,
    alignItems: 'center'
  }
})