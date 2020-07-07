import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";

const localeDefault = {
  name: "pt",
  config: {
    months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
      "_"
    ),
    monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
    weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
      "_"
    ),
    weekdaysShort: "dom_seg_ter_qua_qui_sex_sáb".split("_"),
    weekdaysMin: "dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY [às] LT",
      LLLL: "dddd, D [de] MMMM [de] YYYY [às] LT",
    },
    calendar: {
      sameDay: "[Hoje às] LT",
      nextDay: "[Amanhã às] LT",
      nextWeek: "dddd [às] LT",
      lastDay: "[Ontem às] LT",
      lastWeek: function () {
        return this.day() === 0 || this.day() === 6
          ? "[Último] dddd [às] LT" // Saturday + Sunday
          : "[Última] dddd [às] LT"; // Monday - Friday
      },
      sameElse: "L",
    },
    relativeTime: {
      future: "em %s",
      past: "%s atrás",
      s: "segundos",
      m: "um minuto",
      mm: "%d minutos",
      h: "uma hora",
      hh: "%d horas",
      d: "um dia",
      dd: "%d dias",
      M: "um mês",
      MM: "%d meses",
      y: "um ano",
      yy: "%d anos",
    },
    ordinal: "%dº",
  },
};
const ScheduleList = ({
  headerColor,
  locale,
  onSelectHour,
  styleItems,
  styleItemsSelected,
  styleItemsText,
  items,
  title,
  visible,
}) => {
  const [selectHour, setHour] = useState();

  const handleSelectHour = (hour) => {
    setHour(hour.id);
    onSelectHour(hour);
  };

  const styleItemHour = styleItems ? styleItems : styles.itemHour;
  const styleItemHourSelected = styleItems
    ? styleItemsSelected
    : styles.itemHourSelected;
  const styleItemHourText = styleItemsText
    ? styleItemsText
    : styles.itemHourText;
  const styleItemHourTextSelected = styleItems
    ? styleItemsSelected
    : styles.itemHourTextSelected;
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.body}>
          <CalendarStrip
            scrollable
            style={{ height: 80, paddingTop: 10 }}
            highlightDateNumberStyle={{ color: "black" }}
            highlightDateNameStyle={{ color: "black" }}
            daySelectionAnimation={{
              type: "background",
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: "white",
              highlightColor: "white",
            }}
            selectedDate={moment()}
            locale={locale}
            calendarColor={headerColor}
            calendarHeaderStyle={{ color: "white" }}
            dateNumberStyle={{ color: "white" }}
            dateNameStyle={{ color: "white" }}
            iconContainer={{ flex: 0.1 }}
          />
          <Text style={styles.title}>{title}</Text>

          <View style={styles.contentChip}>
            {items.map((item) => (
              <TouchableOpacity
                onPress={() => handleSelectHour(item)}
                style={
                  selectHour === item.id ? styleItemHourSelected : styleItemHour
                }
              >
                <Text
                  style={
                    selectHour === item.id
                      ? styleItemHourTextSelected
                      : styleItemHourText
                  }
                >
                  {item.text}
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
  locale: PropTypes.shape({}),
  items: PropTypes.shape([]),
  title: PropTypes.string,
  visible: PropTypes.bool,
};
ScheduleList.defaultProps = {
  items: [],
  headerColor: "#3343CE",
  locale: localeDefault,
  styleItems: null,
  visible: false,
  title: "",
  onSelectHour: () => null,
};

const styles = StyleSheet.create({
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
  body: {
    flex: 0.8,
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  itemHour: {
    margin: 5,
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
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#3343CE",
    backgroundColor: "#3343CE",
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
  },
  title: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  itemHourText: {
    color: "#000",
  },
  itemHourTextSelected: { color: "#FFF" },
});

export default ScheduleList;
