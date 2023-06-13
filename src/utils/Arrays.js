const removeDuplicates = (array) => {
  return array.filter((value, index) => {
    return array.indexOf(value) === index;
  });
};

export { removeDuplicates };
