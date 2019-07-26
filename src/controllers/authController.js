export const getLoginRegister = (req, res) => {
  return res.render("auth/loginRegister");
};

export const getLogout = (req, res) => {
  return res.send("Log out");
};
