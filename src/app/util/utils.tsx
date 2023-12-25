export const truncate = (str: string): string => {
  if (str.length < 20) return str;
  return str.substring(0, 17) + " ...";
};
