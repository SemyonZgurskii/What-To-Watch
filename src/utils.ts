import {months} from "./constants";

export function getFormatDate(basicDate: string): string {
  const date = new Date(basicDate);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function getDateTime(basicDate: string): string {
  const date = new Date(basicDate);
  const year = date.getFullYear();
  let month: string | number = date.getMonth();
  let day: string | number = date.getDate();

  month = month > 10 ? month : `0${month}`;
  day = day > 10 ? day : `0${day}`;

  return `${year}-${month}-${day}`;
}

