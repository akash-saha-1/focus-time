import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundedButton from "../../components/RoundedButton";

const Timing = ({ changeTime, second }) => {
  return (
    <>
      {second ? (
        <View style={styles.container}>
          <View style={styles.timmingButton}>
            <RoundedButton
              size={60}
              title="30"
              textStyle={{ fontSize: 26 }}
              onPress={() => changeTime(30)}
            />
          </View>
          <View style={styles.timmingButton}>
            <RoundedButton
              size={60}
              title="40"
              v
              onPress={() => changeTime(40)}
            />
          </View>
          <View style={styles.timmingButton}>
            <RoundedButton
              size={60}
              title="45"
              textStyle={{ fontSize: 26 }}
              onPress={() => changeTime(45)}
            />
          </View>
          <View style={styles.timmingButton}>
            <RoundedButton
              size={60}
              title="60"
              textStyle={{ fontSize: 26 }}
              onPress={() => changeTime(60)}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.timmingButton}>
            <RoundedButton
              size={60}
              title="5"
              textStyle={{ fontSize: 26 }}
              onPress={() => changeTime(5)}
            />
          </View>
          <View style={styles.timmingButton}>
            <RoundedButton
              size={60}
              title="10"
              textStyle={{ fontSize: 26 }}
              onPress={() => changeTime(10)}
            />
          </View>
          <View style={styles.timmingButton}>
            <RoundedButton
              size={60}
              title="15"
              textStyle={{ fontSize: 26 }}
              onPress={() => changeTime(15)}
            />
          </View>
          <View style={styles.timmingButton}>
            <RoundedButton
              size={60}
              title="20"
              textStyle={{ fontSize: 26 }}
              onPress={() => changeTime(20)}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  timmingButton: {
    alignItems: "center",
  },
});

export default Timing;
