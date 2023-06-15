const logOut = () => {
  localStorage.removeItem('myToken');
  localStorage.removeItem('user');
};
export default logOut;
