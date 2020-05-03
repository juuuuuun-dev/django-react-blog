import moment from "moment";

export const sortDate = (a: string, b: string): number => {
  const aDate = moment(a);
  const bDate = moment(b);
  return parseInt(aDate.format('X')) - parseInt(bDate.format('X'));
}