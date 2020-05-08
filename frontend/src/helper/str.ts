export const escapeRegExp = (str: string): string => {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}