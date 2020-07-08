import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/pt-br";
import { parsedItems } from "./utils";
moment.locale("pt-br");
const ScheduleList = ({
  headerColor,
  onSelectHour,
  styleItems,
  styleItemsSelected,
  styleItemsText,
  items,
  title,
  visible,
}) => {
  const [selectHour, setHour] = useState();
  const [hours, setHours] = useState([]);

  const handleSelectHour = (hour) => {
    setHour(hour);
    onSelectHour(hour);
  };

  const listItems = async () => {
    const mapItems = await parsedItems(items);
    setHours(mapItems);
  };

  useEffect(() => {
    listItems();
  }, []);

  const styleItemHour = styleItems
    ? styleItems
    : styles({ headerColor }).itemHour;
  const styleItemHourSelected = styleItems
    ? styleItemsSelected
    : styles({ headerColor }).itemHourSelected;
  const styleItemHourText = styleItemsText
    ? styleItemsText
    : styles({ headerColor }).itemHourText;
  const styleItemHourTextSelected = styleItems
    ? styleItemsSelected
    : styles({ headerColor }).itemHourTextSelected;
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles({ headerColor }).container}>
        <View style={styles({ headerColor }).body}>
          <View style={styles({ headerColor }).header}>
            <Text style={styles({ headerColor }).title}>
              {moment().format("DD [de] MMMM [de] YYYY")}
            </Text>
          </View>
          <Text style={styles({ headerColor }).title}>{title}</Text>
          <View style={styles({ headerColor }).contentChip}>
            {hours.map((item) => (
              <TouchableOpacity
                onPress={() => handleSelectHour(item)}
                style={[
                  styleItemHour,
                  item.max.substring(0, 2) < moment().format("HH") &&
                    styles({ headerColor }).styleItemHourDisable,
                  selectHour === item && styleItemHourSelected,
                ]}
              >
                <Text
                  style={
                    selectHour === item
                      ? styleItemHourTextSelected
                      : styleItemHourText
                  }
                >
                  {item.min} ~ {item.max}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

ScheduleList.propTypes = {
  headerColor: PropTypes.string,
  onSelectHour: PropTypes.func,
  styleItems: PropTypes.shape({}),
  items: PropTypes.shape([]),
  title: PropTypes.string,
  visible: PropTypes.bool,
};
ScheduleList.defaultProps = {
  items: [],
  headerColor: "#3343CE",
  styleItems: null,
  visible: false,
  title: "",
  onSelectHour: () => null,
};

const styles = ({ headerColor }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#00000080",
      justifyContent: "center",
      paddingHorizontal: 10,
    },
    contentChip: {
      flexWrap: "wrap",
      flexDirection: "row",
      flex: 1,
    },
    styleItemHourDisable: { backgroundColor: "#ddd" },
    body: {
      flex: 0.8,
      backgroundColor: "#FFF",
      borderRadius: 10,
      overflow: "hidden",
    },
    itemHour: {
      margin: 5,
      minWidth: 115,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#000",
      borderRadius: 8,
      borderWidth: 1,
      height: 40,
    },
    itemHourSelected: {
      margin: 5,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      minWidth: 115,
      alignItems: "center",
      justifyContent: "center",
      borderColor: headerColor,
      backgroundColor: headerColor,
      borderRadius: 8,
      borderWidth: 1,
      height: 40,
    },
    titleList: {
      fontSize: 16,
      marginHorizontal: 10,
      marginVertical: 15,
    },
    date: {
      backgroundColor: "white",
      height: 40,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      marginTop: 10,
    },
    header: {
      backgroundColor: headerColor,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      color: "white",
    },
    textDate: {
      fontSize: 16,
      color: headerColor,
    },
    itemHourText: {
      color: "#000",
    },
    itemHourTextSelected: { color: "#FFF" },
  });

export default ScheduleList;
