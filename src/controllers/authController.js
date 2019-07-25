const getLoginRegister = (req, res) => {
  return res.render("auth/loginRegister");
};

const getLogout = (req, res) => {
  return res.send("Log out");
};

module.exports = {
  getLoginRegister,
  getLogout
};
