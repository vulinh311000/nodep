export const getLoginRegister = (req, res) => {
  return res.render("auth/master");
};

export const getLogout = (req, res) => {
  return res.send("Log out");
};
