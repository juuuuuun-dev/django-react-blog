import moment from "moment";

export const sortDate = (a: string | undefined, b: string | undefined): number => {
  const aDate = moment(a);
  const bDate = moment(b);
  return parseInt(aDate.format('X')) - parseInt(bDate.format('X'));
}

export const sortBoolean = (a: boolean | undefined, b: boolean | undefined): number => a !== b ? 1 : 0;

export const sortTextLength = (a: string, b: string): number => a.length - b.length;