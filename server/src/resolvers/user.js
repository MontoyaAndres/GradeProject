import bcrypt from "bcrypt";

import { tryLogin, createTokens } from "../utils/auth";
import formatErrors from "../utils/formatErrors";
import requiresAuth from "../utils/permissions";

export default {
  Query: {
    user: requiresAuth.createResolver(
      async (parent, args, { user: { _id }, userLoader }) =>
        userLoader.load(_id)
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
    )
  }
};
