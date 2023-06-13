const getCatName = (id, arr) => {
  const category = arr.find((item) => {
    return item.id === id;
  });
  return category ? category.name : 'Category';
};

export { getCatName };
