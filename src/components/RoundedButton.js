import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "./../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  icon = false,
  iconSize = 24,
  iconName,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}
    >
      {icon == true ? (
        <MaterialCommunityIcons name={iconName} size={iconSize} color="white" />
      ) : (
        <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
      borderColor: colors.white,
      borderWidth: 2,
    },
    text: {
      color: colors.white,
      fontSize: 30,
    },
  });

export default RoundedButton;
