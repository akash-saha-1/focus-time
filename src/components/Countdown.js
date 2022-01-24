import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  const interval = useRef(null);

  const countDown = () =>
    setMillis((time) => {
      const timeLeft = time - 1000;
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      return timeLeft;
    });

  useEffect(() => {
    // report the progress
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(countDown, 1000);
    //return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: "rgba(94,132,226,0.3)",
    marginTop: spacing.lg,
  },
});

export default Countdown;
