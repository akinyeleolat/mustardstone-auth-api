const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'users';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// export model user with UserSchema
const UserModel = model(DOCUMENT_NAME, UserSchema);
module.exports = UserModel;
