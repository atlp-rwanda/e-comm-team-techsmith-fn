const removeDuplicates = (array) => {
  return array.filter((value, index) => {
    return array.indexOf(value) === index;
  });
};

const removeDuplicateMessages = (array) => {
  return array.filter((value, index, arr) => {
    return value.messageBody !== arr[index + 1]?.messageBody;
  });
};

const findInArrayWishList = (array, value) => {
  return array.find((element) => {
    return element.productId === value;
  });
};

export { removeDuplicates, findInArrayWishList, removeDuplicateMessages };
