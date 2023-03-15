import { Pressable, StyleSheet, View, Text } from "react-native";

function ColorButton(props) {
  return (
    <View style={styles.display}>
      <Pressable onPress={() => props.submitHandler()}>
        <View
          style={{
            backgroundColor: props.color,
            padding: 30,
            alignItems: "center",
          }}
        >
          <Text style={styles.buttonTextStyle}>{props.title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ColorButton;

const styles = StyleSheet.create({
  display: {
    flex: 1,
  },

  buttonTextStyle: {
    color: "white",
    fontStyle: "italic",
    fontSize: 24,
  },
});
