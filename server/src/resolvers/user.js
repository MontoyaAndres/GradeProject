import bcrypt from "bcrypt";

import { tryLogin, createTokens } from "../utils/auth";
import formatErrors from "../utils/formatErrors";
import { requiresAuth, requiresAdmin } from "../utils/permissions";

export default {
  Query: {
    user: requiresAuth.createResolver(
      async (parent, args, { user: { _id }, userLoader }) =>
        userLoader.load(_id)
    ),
    listUsers: requiresAdmin.createResolver(
      async (parent, args, { models, user: { _id } }) =>
        models.User.find({ _id: { $ne: _id } })
    )
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    updateUsernameOrEmail: requiresAuth.createResolver(
      async (parent, args, { models, user: { _id } }) => {
        try {
          await models.User.findByIdAndUpdate(_id, { ...args });
          return true;
        } catch (err) {
          return false;
        }
      }
    ),
    updatePassword: requiresAuth.createResolver(
      (
        parent,
        { oldPassword, newPassword },
        { models, user: { _id }, SECRET, SECRET2 }
      ) => {
        try {
          return models.User.findById({ _id }).then(async user => {
            const checkPassword = await bcrypt.compare(
              oldPassword,
              user.password
            );

            if (!checkPassword) {
              return {
                ok: false,
                errors: [
                  { path: "oldPassword", message: "Contraseña incorrecta." }
                ]
              };
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(newPassword, salt);
            await models.User.findByIdAndUpdate(_id, {
              password: passwordHash
            });

            // create new token
            const refreshTokenSecret = newPassword + SECRET2;
            const [token, refreshToken] = await createTokens(
              user,
              SECRET,
              refreshTokenSecret
            );
            return {
              ok: true,
              token,
              refreshToken
            };
          });
        } catch (err) {
          return {
            ok: false,
            errors: formatErrors(err, models)
          };
        }
      }
    ),
    createUser: requiresAdmin.createResolver(
      (parent, { username, type, email, password }, { models }) => {
        try {
          return models.User.findOne({ email }).then(async user => {
            if (user && user.email === email) {
              return {
                ok: false,
                errors: [{ path: "email", message: "El correo ya existe." }]
              };
            }

            await models.User.create({ username, type, email, password });
            return {
              ok: true
            };
          });
        } catch (err) {
          return false;
        }
      }
    ),
    deleteUser: requiresAdmin.createResolver(
      async (parent, { _id }, { models, type }) => {
        try {
          return await models.User.findByIdAndRemove({ _id }).then(() => true);
        } catch (err) {
          return false;
        }
      }
    )
  }
};
