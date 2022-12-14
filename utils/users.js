const userController = require('../controllers/users.controller')

const getUsers = async (req, res) => {
  await userController.getAllUsers()
    .then(data => res.json(data))
  // return res.json({ status: 200, users: data });
}

const getOneUser = async (req, res) => {
  const { id } = req.params;
  await userController.getOneUser(id)
    .then(data => res.json(data))
}

const createUser = async (req, res) => {
  const user = req.body.user;

  await userController.createUser(user)
    .then(data => {
      res.json(data)
    })
}

const updateUser = async (req, res) => {
  const userUpdate = req.body;
  const id = req.params.id
  // console.log("id in update:", id)
  // console.log("user update in util:", userUpdate)

  await userController.updateUser(id, userUpdate)
    .then(data => res.json(data))
}

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await userController.deleteUser(id)
    .then(data => res.json(data))

}


module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
} 