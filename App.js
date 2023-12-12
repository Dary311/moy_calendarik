import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const CalendarApp = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const isCurrentDay = (year, month, day) => {
    const currentDate = new Date();
    return (
      year === currentDate.getFullYear() &&
      month === currentDate.getMonth() + 1 &&
      day === currentDate.getDate()
    );
  };

  const goToCurrentMonth = () => {
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth() + 1);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = new Date(year, month - 1, 1).getDay();

    let calendarDays = [];

    for (let i = 0; i < firstDayIndex; i++) {
      calendarDays.push(<View key={`empty-${i}`} style={styles.emptyCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <TouchableOpacity
          key={day}
          style={[styles.calendarCell, isCurrentDay(year, month, day) && styles.currentDay]}
        >
          <Text style={[styles.calendarDayText, isCurrentDay(year, month, day) && styles.currentDayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return calendarDays;
  };

  const renderYears = () => {
    const years = Array.from({ length: 10 }, (_, index) => year - 5 + index);

    return years.map((item) => (
      <TouchableOpacity
        key={item}
        style={[
          styles.yearButton,
          item === year && styles.selectedYearButton,
        ]}
        onPress={() => setYear(item)}
      >
        <Text style={styles.yearButtonText}>{item}</Text>
      </TouchableOpacity>
    ));
  };

  const renderMonths = () => {
    return monthNames.map((item, index) => (
      <TouchableOpacity
        key={index + 1}
        style={[
          styles.monthButton,
          index + 1 === month && styles.selectedMonthButton,
        ]}
        onPress={() => setMonth(index + 1)}
      >
        <Text style={styles.monthButtonText}>{item}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ImageBackground source={require('./assets/photkaUrotka.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.yearScrollView}
          >
            {renderYears()}
          </ScrollView>
        </View>
        <View style={styles.header}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.monthScrollView}
          >
            {renderMonths()}
          </ScrollView>
        </View>
        <View style={styles.calendar}>{renderCalendar()}</View>
        <TouchableOpacity onPress={goToCurrentMonth} style={styles.currentMonthButton}>
          <Text style={styles.currentMonthButtonText}>Сегодня</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    margin: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    padding: 4,
  },
  yearScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  selectedYearButton: {
    backgroundColor: '#AFF3FF',
  },
  yearButtonText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  monthButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  selectedMonthButton: {
    backgroundColor: '#AFF3FF',
  },
  monthButtonText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    padding: 5,
  },
  currentMonthButton: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  currentMonthButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  calendarCell: {
    width: 53,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    margin: 4,
  },
  emptyCell: {
    width: 53,
    height: 53,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    margin: 4,
  },
  currentDay: {
    backgroundColor: '#AFF3FF',
  },
  currentDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calendarDayText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default CalendarApp;
