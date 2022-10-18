/* eslint-disable no-unused-vars  */

export enum DateFormat {
  // ISO 8601
  ISO_STRING = "isoString",

  // These should be the standardized formats for displaying date/time on frontend,
  // if designers' designs show otherwise, we should advise them to standardize the format by using these
  DISPLAY_DATE = "DD MMM YYYY",
  DISPLAY_DATETIME = "DD MMM YYYY h:mma",
  DISPLAY_TIME = "h:mm A",
  DISPLAY_MONTH_YEAR = "MMM YY",

  // Picker components
  PICKER_DATE = "DD/MM/YYYY",
  PICKER_DATETIME = "DD/MM/YYYY hh:mma",
  PICKER_TIME = "h:mm A",
  API_DATETIME = "YYYY-MM-DDTHH:mm:ssZ",
  API_TIME = "HH:mm:ss"
}
