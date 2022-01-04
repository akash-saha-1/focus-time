import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import RoundedButton from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";

const FocusHistory = ({ focusHistory, onClear, setFocusSubject }) => {
  return (
    <SafeAreaView style={styles.viewContainer}>
      {focusHistory.length > 0 && (
        <View>
          <Text style={styles.title}>Things you have focused on</Text>
          <FlatList
            style={{ flex: 1 }} // to take availble height in screen and maintain ratio
            contentContainerStyle={styles.contentContainer}
            // this style should never have flex 1, which will stop scrolling and restrict all children to have specific height
            data={focusHistory}
            renderItem={({ item, index }) =>
              item.status > 1 ? (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setFocusSubject(item.subject)}
                >
                  <Text style={styles.historyItem(item.status)}>
                    {" "}
                    {item.subject + "->"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text key={item.key} style={styles.historyItem(item.status)}>
                  {item.subject}
                </Text>
              )
            }
          />
          <View style={styles.clearContainer}>
            <RoundedButton
              size={70}
              title="Clear"
              textStyle={{ fontSize: 20 }}
              onPress={onClear}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1.5,
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  historyItem: (status) => ({
    color: status > 1 ? "red" : "green",
    fontSize: status > 1 ? fontSizes.lg : fontSizes.ml,
  }),
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: "center",
    padding: spacing.md,
    marginBottom: spacing.md,
  },
});

export default FocusHistory;
