const emailValidation = (email) => {
  // eslint-disable-next-line no-useless-escape
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(validEmail)) {
    return false;
  }
  return true;
};
export default emailValidation;
