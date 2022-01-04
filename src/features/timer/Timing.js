import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundedButton from "../../components/RoundedButton";

const Timing = ({ changeTime }) => {
  return (
    <>
      <View style={styles.timmingButton}>
        <RoundedButton size={70} title="10" onPress={() => changeTime(10)} />
      </View>
      <View style={styles.timmingButton}>
        <RoundedButton size={70} title="15" onPress={() => changeTime(15)} />
      </View>
      <View style={styles.timmingButton}>
        <RoundedButton size={70} title="20" onPress={() => changeTime(20)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timmingButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default Timing;
