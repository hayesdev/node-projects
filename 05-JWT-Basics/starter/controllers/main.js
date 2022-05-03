const login = (req, res) => {
  res.send("Fake Login/Register/Signup Route");
};
const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello Greg`,
    secret: `Here is your authorized data, your secret number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
