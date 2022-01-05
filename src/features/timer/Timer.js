import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Vibration, Platform } from "react-native";
import Countdown from "../../components/Countdown";
import RoundedButton from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";
import { ProgressBar } from "react-native-paper";
import Timing from "./Timing";
import { useKeepAwake } from "expo-keep-awake";
import { Audio } from "expo-av";

const DEFAULT_TIME = 2;

const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [vibrateSound, enableVibrateSound] = useState(true);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./../../../assets/alarm.wav")
    );
    await sound.playAsync();
  }, []);

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), DEFAULT_TIME * 1000);
    } else {
      Vibration.vibrate(DEFAULT_TIME * 1000);
    }
  };

  const onEnd = async () => {
    if (vibrateSound) {
      await playSound();
      vibrate();
    }
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
      <View style={styles.timeWrapper}>
        <Timing changeTime={changeTime} />
        <Timing changeTime={changeTime} second={true} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="Pause"
            size={100}
            textStyle={{ fontSize: 26 }}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="Start"
            size={100}
            textStyle={{ fontSize: 28 }}
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
        {!vibrateSound ? (
          <RoundedButton
            icon={true}
            size={50}
            iconSize={26}
            iconName={"volume-vibrate"}
            onPress={() => enableVibrateSound(true)}
          />
        ) : (
          <RoundedButton
            icon={true}
            size={50}
            iconSize={26}
            iconName={"vibrate-off"}
            onPress={() => enableVibrateSound(false)}
          />
        )}

        <RoundedButton
          title="Done"
          size={65}
          textStyle={{ fontSize: 18 }}
          onPress={onEnd}
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
  timeWrapper: {
    flex: 0.4,
    padding: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  buttonWrapper: {
    flex: 0.2,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  progress: {
    paddingTop: spacing.sm,
  },
  clearSubject: {
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default Timer;
