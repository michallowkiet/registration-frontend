export const isEmpty = (str: string): boolean => {
  return /^$/.test(str);
};

export const emptyMsg = () => {
  return "This field cannot be empty.";
};
