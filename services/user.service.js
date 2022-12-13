// Define User service for Data manipulation
const crypto = require('crypto');
const userRepository = require('../repositories/user.repository');

class UserService {
  constructor() { }

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }

  async getOneUser(id) {
    return await userRepository.getOneUser(id);
  }
  async createUser(user) {
    user._id = crypto.randomBytes(16).toString('hex');
    // console.log("user in service:", user)
    return await userRepository.createUser(user);
  }
  async updateUser(id, user) {
    return await userRepository.updateUser(id, user);
  }
  async deleteUser(userId) {
    return await userRepository.deleteUser(userId);
  }
}

module.exports = new UserService();