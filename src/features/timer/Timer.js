import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration, Platform } from "react-native";
import Countdown from "../../components/Countdown";
import RoundedButton from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";
import { ProgressBar } from "react-native-paper";
import Timing from "./Timing";
import { useKeepAwake } from "expo-keep-awake";
//var Sound = require("react-native-sound");

// setting the sound
//Sound.setCategory("Playback");
// var ding = new Sound("alarm.mp3", Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//     console.log("failed to load the sound", error);
//     return;
//   }
//   // if loaded successfully
//   console.log(
//     "duration in seconds: " +
//       ding.getDuration() +
//       "number of channels: " +
//       ding.getNumberOfChannels()
//   );
// });

const DEFAULT_TIME = 0.05;

const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 3000);
    } else {
      Vibration.vibrate(2000);
    }
  };

  const onEnd = () => {
    vibrate();
    setIsStarted(false);
    setTimeout(() => {
      setMinutes(DEFAULT_TIME);
      onTimerEnd(focusSubject);
      setProgress(1);
    }, 1000);
  };
  //console.log(progress);
  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown
          isPaused={!isStarted}
          onProgress={onProgress}
          minutes={minutes}
          setIsStarted={setIsStarted}
          onEnd={onEnd}
        />
      </View>
      <View styles={styles.subContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progress}>
        <ProgressBar
          progress={progress}
          color={colors.lightBlue}
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing changeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            size={100}
            textStyle={{ fontSize: 30 }}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="Start"
            size={100}
            textStyle={{ fontSize: 30 }}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title="Back"
          size={65}
          textStyle={{ fontSize: 18 }}
          onPress={() => clearSubject(focusSubject)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.white,
    textAlign: "center",
    fontSize: fontSizes.md,
  },
  task: {
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    fontSize: fontSizes.lg,
  },
  countDown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.2,
    padding: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {
    paddingTop: spacing.sm,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
export default Timer;
