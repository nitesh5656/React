import moment from "moment";
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + " years";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes";

  return Math.floor(seconds) + " seconds";
};

export function getTime(someDateTimeStamp) {
  let date = new Date(someDateTimeStamp);
  let hh = date.getHours();
  let mm = date.getMinutes();
  let session = "AM";

  if (hh == 0) hh = 12;

  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;

  let time = hh + ":" + mm + " " + session;

  return time;
}

export const getDateWithTime = (someDateTimeStamp) => {
  let newDate = new Date(someDateTimeStamp);
  return `${newDate.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} ${getTime(someDateTimeStamp)}`;
};

export const getDate = (someDateTimeStamp) => {
  let newDate = new Date(someDateTimeStamp);
  let month = newDate
    .toLocaleDateString("en-us", { month: "long" })
    .slice(0, 3);

  return `${weekday[newDate.getDay()]}, ${month} ${newDate.toLocaleDateString(
    "en-us",
    {
      day: "numeric",
    }
  )}, ${newDate.toLocaleDateString("en-us", {
    year: "numeric",
  })}`;
};

export function formatDate(someDateTimeStamp) {
  let date = moment(someDateTimeStamp);
  if (moment().diff(date, "days") >= 1) return getDate(someDateTimeStamp);

  return date.calendar().split(" ")[0];
}

export const isDateBeforeToday = (date) =>
  new Date(date).valueOf() > new Date().valueOf();

export const countHelper = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let item = lookup
    .slice()
    .reverse()
    .find((item) => {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};
