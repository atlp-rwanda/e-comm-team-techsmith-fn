const removeDuplicates = (array) => {
  return array.filter((value, index) => {
    return array.indexOf(value) === index;
  });
};

const findInArrayWishList = (array, value) => {
  return array.find((element) => {
    return element.productId === value;
  });
};

export { removeDuplicates, findInArrayWishList };
