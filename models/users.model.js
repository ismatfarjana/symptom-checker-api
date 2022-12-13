// Define schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  yearOfBirth: { type: String, required: true },
},
  {
    timestamps: {
      createDate: 'created_at',
      updateDate: 'updated_at'
    }
  }
);

const User = mongoose.model('users', userSchema, 'users');

module.exports = {
  User
}