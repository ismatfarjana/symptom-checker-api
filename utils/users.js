const getUsers = (req, res) => {
  return res.json({ status: 200, users: "all users" });
}

module.exports = {
  getUsers
}