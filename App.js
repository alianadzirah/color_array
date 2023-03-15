import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import ColorButton from "./components/ColorButton";

export default function App() {
  //unique key
  const [colorID, setColorID] = useState(0);
  const [largestData, setLargestData] = useState(0);
  const [currentData, setCurrentData] = useState(0);
  const [rowItem, setRowItem] = useState([]);

  //list of colors
  const color = [
    "lightseagreen",
    "firebrick",
    "lightpink",
    "maroon",
    "cornflowerblue",
    "burlywood",
    "darkslateblue",
    "lightcoral",
    "orange",
    "darksalmon",
  ];

  function generateKey() {
    setColorID(colorID + 1);
  }

  //randomized color
  function randomItem() {
    const randomIndex = Math.floor(Math.random() * 9) + 1;
    return randomIndex;
  }

  function pushColor() {
    setRowItem((currentRowItem) => [
      ...currentRowItem,
      {
        colorName: color[randomItem()],
        id: colorID,
      },
    ]);
  }

  useEffect(() => {
    if (currentData > largestData || currentData === largestData) {
      setLargestData(currentData);
    }
  }, [currentData]);

  //to add random button color
  function randomHandler() {
    setCurrentData(currentData + 1);
    generateKey();
    pushColor();
    console.log(randomItem());
    console.log(color[randomItem()]);
    console.log(rowItem);
    console.log("push flatlist color");
  }

  //to remove the recent color button
  function removeHandler() {
    rowItem.pop();
    setRowItem((currentRowItem) => [...currentRowItem]);
    setCurrentData(currentData - 1);
    console.log("remove flatlist color");
  }

  //popup alert name
  function displayPopup(name) {
    Alert.alert("Color", "This is " + name + " color", [
      { text: "OK", onPress: () => console.log("OK!") },
    ]);
  }

  return (
    <View style={styles.pageDisplay}>
      {/* scrollable data */}
      <View style={styles.scrollableContent}>
        <FlatList
          data={rowItem}
          renderItem={(itemData) => {
            itemData.index;
            return (
              <View key={itemData.item.key}>
                <Pressable
                  onPress={() => displayPopup(itemData.item.colorName)}
                  style={{
                    backgroundColor: itemData.item.colorName,
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  <View>
                    <Text style={styles.listStyling}>
                      {itemData.item.colorName}
                    </Text>
                  </View>
                </Pressable>
              </View>
            );
          }}
        />
      </View>

      {/* row data */}
      <View style={styles.rowData}>
        <Text style={styles.rowDataStyle}>Current: {currentData}</Text>
        <Text style={styles.rowDataStyle}>Largest: {largestData}</Text>
      </View>

      {/* row button */}
      <View style={styles.rowButton}>
        <ColorButton
          color={"red"}
          title={"Remove"}
          submitHandler={removeHandler}
        />
        <ColorButton
          color={"lightgreen"}
          title={"Push"}
          submitHandler={randomHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageDisplay: {
    paddingTop: 35,
    width: "100%",
    flex: 1,
  },

  scrollableContent: {
    height: "75%",
  },

  rowData: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 120,
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    justifyContent: "space-evenly",
  },
  rowDataStyle: {
    fontWeight: "bold",
    fontSize: 18,
    fontStyle: "italic",
  },

  rowButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
  },

  listStyling: {
    color: "white",
    textAlign: "center",
  },
});
