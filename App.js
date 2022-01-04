import React, { useState } from "react";
import { StyleSheet, Text, View, Platform, LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react/cjs/react.development";
import { Focus } from "./src/features/focus/Focus";
import FocusHistory from "./src/features/focus/FocusHistory";
import Timer from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";

// ignore all warning
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = async (focusSubject, status) => {
    const oldHistory = [...focusHistory];
    let newHistory = [...oldHistory];
    if (oldHistory && oldHistory.length > 0) {
      const modifiedHistory = oldHistory.filter(
        (obj, index) => obj.subject !== focusSubject
      );
      const addedHistory = [
        { subject: focusSubject, status, key: Math.random() },
        ...modifiedHistory,
      ];
      newHistory = [...addedHistory];
    } else {
      newHistory = [
        { subject: focusSubject, status, key: Math.random() },
        ...oldHistory,
      ];
    }
    setFocusHistory(newHistory);
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(newHistory));
    } catch (error) {
      console.error(error);
    }
  };

  const onTimerEnd = (focusSubject) => {
    addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
    setFocusSubject(null);
  };

  const clearSubject = (focusSubject) => {
    addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
    setFocusSubject(null);
  };

  const onClear = async () => {
    setFocusHistory([]);
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify([]));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadFocusHistory = async () => {
      try {
        const history = await AsyncStorage.getItem("focusHistory");
        if (history) {
          setFocusHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadFocusHistory();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={onTimerEnd}
          clearSubject={clearSubject}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus setFocusSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            onClear={onClear}
            setFocusSubject={setFocusSubject}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
  },
});
