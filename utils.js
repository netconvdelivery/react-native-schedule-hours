import moment from "moment";
import "moment/locale/pt-br";

export const parsedItems = (times) =>
  times.reduce((array, time, index) => {
    if (time + 1 === times[index + 1]) {
      return [...array, { min: time, max: time + 1 }];
    }
    return array;
  }, []);
