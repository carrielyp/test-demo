import type { Dayjs, OpUnitType } from "dayjs";
import dayjs from "dayjs";
import type { ManipulateType } from "dayjs-precise-range";
import preciseDiff from "dayjs-precise-range";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";
import { DateFormat } from "../constants/dateFormat";

dayjs.extend(relativeTime);
dayjs.extend(preciseDiff);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export type DateUnit = OpUnitType;

export type TimePeriod = "morning" | "afternoon" | "evening";

export class DateUtil {
  static toDate(str: string, format: string) {
    if (!str) {
      return null as unknown as Date;
    }

    let dayjsDate;

    if (format === DateFormat.ISO_STRING) {
      dayjsDate = dayjs(str);
    } else {
      dayjsDate = dayjs(str, format, true);
    }

    if (!dayjsDate.isValid()) {
      throw new Error("Invalid value");
    }

    return dayjsDate.toDate();
  }

  static isValidDate(str: string, format: string) {
    if (!str) {
      return false;
    }

    const dayjsDate = dayjs(str, format, true);

    if (!dayjsDate.isValid()) {
      return false;
    }

    return true;
  }

  static toString(date: Date | string, format: string) {
    if (!date) {
      return null as unknown as string;
    }

    if (format === DateFormat.ISO_STRING) {
      return dayjs(date).toISOString();
    }

    return dayjs(date).format(format);
  }

  static toDisplayDate(date: Date | string) {
    return this.toString(date, DateFormat.DISPLAY_DATE);
  }

  static toDisplayTime(date: Date) {
    return this.toString(date, DateFormat.DISPLAY_TIME);
  }

  static toDisplayDateTime(date: Date) {
    return this.toString(date, DateFormat.DISPLAY_DATETIME);
  }

  static fromStringToString(str: string, fromFormat: string, toFormat: string) {
    const date = this.toDate(str, fromFormat);

    return this.toString(date, toFormat);
  }

  static getDiff(start: Date, end: Date, unit: OpUnitType) {
    return dayjs(end).diff(dayjs(start), unit);
  }

  static getRelative(date1: Date, date2: Date) {
    return dayjs(date1).from(date2, true);
  }

  static getPreciseRelative(date1: Date, date2: Date): string {
    return dayjs["preciseDiff"](dayjs(date1), dayjs(date2));
  }

  static getShortRelative(secondsOrDate1: number | Date, date2?: Date) {
    let seconds =
      typeof secondsOrDate1 === "number"
        ? secondsOrDate1
        : Math.floor(
            this.getDiff(secondsOrDate1, date2 || new Date(), "second")
          );
    const hours = Math.floor(seconds / 3600);

    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);

    seconds -= minutes * 60;

    const strs: string[] = [];

    if (hours) {
      strs.push(`${hours}hr`);
    }

    if (minutes) {
      strs.push(`${minutes}min`);
    }

    if (seconds) {
      strs.push(`${Math.round(seconds)}s`);
    }

    if (strs.length === 0) {
      return "0s";
    }

    return strs.join(" ");
  }

  static setTime(date: Date, time: Date) {
    const newDate = new Date(date.getTime());

    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate.setSeconds(time.getSeconds());

    return newDate;
  }

  static addTime(date: Date, duration: number, unit: ManipulateType) {
    return dayjs(date).add(duration, unit).toDate();
  }

  static getStartOfYear(date: Date) {
    return dayjs(date).startOf("year").toDate();
  }

  static getEndOfYear(date: Date) {
    return dayjs(date).endOf("year").toDate();
  }

  static getStartOfMonth(date: Date) {
    return dayjs(date).startOf("month").toDate();
  }

  static getEndOfMonth(date: Date) {
    return dayjs(date).endOf("month").toDate();
  }

  static getStartOfWeek(date: Date) {
    return dayjs(date).startOf("week").toDate();
  }

  static getEndOfWeek(date: Date) {
    return dayjs(date).endOf("week").toDate();
  }

  static getStartOfDate(date: Date) {
    return dayjs(date).startOf("date").toDate();
  }

  static getEndOfDate(date: Date) {
    return dayjs(date).endOf("date").toDate();
  }

  static getStartOfHour(date: Date) {
    return dayjs(date).startOf("hour").toDate();
  }

  static getEndOfHour(date: Date) {
    return dayjs(date).endOf("hour").toDate();
  }

  static getStartOfMinute(date: Date) {
    return dayjs(date).startOf("minute").toDate();
  }

  static getEndOfMinute(date: Date) {
    return dayjs(date).endOf("minute").toDate();
  }

  static getDay(dateOrDay: Date | number, format: "long" | "short" = "long") {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const day =
      weekdays[
        typeof dateOrDay === "number" ? dateOrDay : dayjs(dateOrDay).day()
      ];

    if (format === "long") {
      return day;
    }

    return day.substring(0, 3);
  }

  static getMonth(date: Date, format: "long" | "short" = "long") {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const month = months[dayjs(date).month()];

    if (format === "long") {
      return month;
    }

    return month.substring(0, 3);
  }

  static isSame(date1: Date, date2: Date, unit?: OpUnitType) {
    return dayjs(date1).isSame(dayjs(date2), unit);
  }

  static isBefore(date1: Date, date2: Date, unit?: OpUnitType) {
    return dayjs(date1).isBefore(dayjs(date2), unit);
  }

  static isAfter(date1: Date, date2: Date, unit?: OpUnitType) {
    return dayjs(date1).isAfter(dayjs(date2), unit);
  }

  /**
   * Parameter 4 is a string with two characters; '[' means inclusive, '(' exclusive
   *
   * '()' excludes start and end date (default)
   *
   * '[]' includes start and end date
   *
   * '[)' includes the start date but excludes the stop
   *
   * '[]' includes start and end date
   */
  static isBetween(
    date: Date,
    from: Date,
    to: Date,
    unit?: OpUnitType,
    boundary?: "()" | "[]" | "[)" | "(]"
  ) {
    return dayjs(date).isBetween(dayjs(from), dayjs(to), unit, boundary);
  }

  static isFirstNdaysOfMonth(date: Date, day: number) {
    const firstDate = this.getStartOfMonth(new Date());
    const lastDay = this.addTime(firstDate, day, "day");
    const thisDay: Dayjs = dayjs(date);

    return (
      thisDay.isSameOrAfter(dayjs(firstDate), "date") &&
      thisDay.isBefore(lastDay, "date")
    );
  }

  static isLastNdaysOfMonth(date: Date, day: number) {
    const lastDay = this.getEndOfMonth(date);
    const lastNday = this.addTime(lastDay, -day + 1, "day");

    if (
      dayjs(date).isSameOrAfter(dayjs(lastNday), "date") &&
      dayjs(date).isSameOrBefore(dayjs(lastDay), "date")
    ) {
      return true;
    }

    return false;
  }

  static isSameDate(date1: Date, date2: Date) {
    return this.isSame(date1, date2, "date");
  }

  static isBeforeDate(date1: Date, date2: Date) {
    return this.isBefore(date1, date2, "date");
  }

  static isAfterDate(date1: Date, date2: Date) {
    return this.isAfter(date1, date2, "date");
  }

  static isBetweenDate(date: Date, from: Date, to: Date) {
    return this.isBetween(date, from, to, "date", "[]");
  }

  static getTimePeriod(date: Date): TimePeriod {
    const hour = date.getHours();

    if (hour >= 6 && hour < 12) {
      return "morning";
    }

    if (hour >= 12 && hour < 18) {
      return "afternoon";
    }

    return "evening";
  }

  static getAge(dob: Date, now = new Date()) {
    return now.getFullYear() - dob.getFullYear();
  }
}

/**
 * Returns years and months and it accepts any dayjs accepted date format
 * @param dob - Date of Birth of person
 * @param date - should be feature date with respect to DOB
 * @returns {string} - it will calculate the age of a person from today Date,
 *          if date params provided then it'll calculate the age of the given date
 */
export const getAgeInYearsMonths = (dob: string, date?: string) => {
  const year_age = dayjs(date).diff(dob, "year");
  const month_age = dayjs(date).diff(dob, "month") % 12;

  return `${year_age} years ${month_age} months`;
};
