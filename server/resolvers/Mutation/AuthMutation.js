const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');

async function signup(_, { email, password }) {
  try {
    let user = await UserModel.findOne({ email }).lean();

    if (user) {
      throw new Error('El correo ya existe.');
    }

    const _password = await bcrypt.hash(password, 10);
    user = await new UserModel({ email, password: _password }).save();

    const token = jwt.sign({ userId: user._id }, process.env.SESSION_KEY);

    return { token, user };
  } catch (err) {
    throw new Error(err);
  }
}

async function login(_, { email, password }) {
  try {
    const user = await UserModel.findOne({ email }, { password: 1 }).lean();

    if (!user) {
      throw new Error('No se encontro el usuario.');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Contraseña invalida.');
    }
    // remove password from user object to limit scope (security)
    user.password = undefined;

    return {
      token: jwt.sign({ userId: user._id }, process.env.SESSION_KEY),
      user
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  signup,
  login
}
