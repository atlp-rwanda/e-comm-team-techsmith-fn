const token = localStorage.getItem('myToken') || null;
const checkIsLogged = () => {
  if (!token) {
    return false;
  }
  const fLetter = JSON.parse(localStorage.getItem('user')).name.split('')[0];
  const sLetter = JSON.parse(localStorage.getItem('user'))
    .name.split(' ')[1]
    .split('')[0];
  const { id } = JSON.parse(localStorage.getItem('user'));
  const profileName = fLetter + sLetter;
  const data = { id, token, profileName };

  return data;
};
export default checkIsLogged;
