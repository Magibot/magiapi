export const millisecondsToDays = (milliseconds: number) => {
  milliseconds = milliseconds || 0;
  const floatDays = milliseconds / 24 / 60 / 60 / 1000;
  return Math.trunc(floatDays);
};

export const addDaysToDate = (date: Date, days: number) => {
  date.setDate(date.getDate() + days);
  return date;
};
