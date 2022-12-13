// CRUD operations
// const crypto = require('crypto');
const { connect } = require('../config/db.config');
const { User } = require('../models/users.model.js');

class UserRepository {
  constructor() {
    connect();
  }

  async getAllUsers() {
    const users = await User.find({});
    // console.log("users:", users)
    return users;
  }

  async getOneUser(id) {
    const users = await User.find({ _id: id });
    // console.log("users:", users)
    return users;
  }

  async createUser(user) {
    // user._id = crypto.randomBytes(16).toString('hex');
    // console.log("user in repository:", user)
    const newUser = new User(user)
    // console.log("newUser:", newUser)
    // let obj;
    // newUser.save((err, user) => {
    //   if (err) {
    //     console.log("err in repo:", err)
    //     obj = err.Error
    //     // return err.Error;
    //   }
    //   else { //If no errors, send it back to the client
    //     obj = ({ message: "user successfully added!", user });
    //   }
    //   console.log("obj:", obj)
    //   return obj;
    // });
    try {
      return await User.create(newUser);
    } catch (err) {
      // console.error('Error:' + err)
      if (err) {
        return (err);
      }
    }
    // return user;
  }
  async updateUser(id, user) {
    try {
      await User.updateOne({ _id: id }, { $set: user })
    } catch {
      console.error('Error:' + err)
    }
    return user;
  }

  async deleteUser(userId) {
    let data = {};
    try {
      data = await User.deleteOne({ _id: userId })
    } catch {
      console.error('Error:' + err)
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new UserRepository();