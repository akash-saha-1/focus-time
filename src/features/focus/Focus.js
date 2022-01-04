import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import RoundedButton from "../../components/RoundedButton";
import { fontSizes, spacing } from "../../utils/sizes";

export const Focus = ({ setFocusSubject }) => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.textView}>
          <TextInput
            style={styles.textInput}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              setSubject(text);
            }}
            onChangeText={(text) => setText(text)}
          />
          <RoundedButton
            title="+"
            size={50}
            //onPress={() => addSubject(subject)}
            onPress={() => {
              setFocusSubject(text);
              setText("");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    marginTop: spacing.lg,
  },
  titleContainer: {
    flex: 0.65,
    justifyContent: "center",
    padding: spacing.md,
  },
  title: {
    color: "white",
    fontSize: fontSizes.lg,
    fontWeight: "bold",
  },
  textView: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginRight: 20,
  },
});
