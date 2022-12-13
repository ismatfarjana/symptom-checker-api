const userService = require('../services/user.service')
// const logger = require('../logger/api.logger');

class UserController {
  async getAllUsers() {

    return await userService.getAllUsers();
  }

  async getOneUser(id) {

    return await userService.getOneUser(id);
  }

  async createUser(user) {

    return await userService.createUser(user);
  }

  async updateUser(id, user) {

    return await userService.updateUser(id, user);
  }

  async deleteUser(userId) {

    return await userService.deleteUser(userId);
  }
}

module.exports = new UserController();