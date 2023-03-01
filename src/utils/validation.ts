export const isEmpty = (str: string | undefined): boolean => {
  if (str === undefined) {
    return true;
  }
  return /^$/.test(str);
};

export const emptyMsg = () => {
  return "This field cannot be empty.";
};
