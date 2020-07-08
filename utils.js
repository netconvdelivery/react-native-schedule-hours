
  import moment from 'moment';
  import 'moment/locale/pt-br';

  export const parsedItems = times =>
  times.reduce((array, time, index) => {
    if (time + 1 === times[index + 1]) {
      let timeMin = moment();
      let timeMax = moment();
      timeMin.set({hour: time, minute: 0, second: 0, millisecond: 0});
      timeMax.set({hour: time + 1, minute: 0, second: 0, millisecond: 0});
      return [
        ...array,
        {min: timeMin.format('HH:mm'), max: timeMax.format('HH:mm')},
      ];
    }
    return array;
  }, []);