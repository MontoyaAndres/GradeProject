import { tryLogin } from '../utils/auth';
import requiresAuth from '../utils/permissions';

export default {
  Query: {
    user: requiresAuth.createResolver(async (parent, args, { models, user: { _id } }) =>
      models.User.findById({ _id }).lean()
    )
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    updateUsernameOrEmail: requiresAuth.createResolver(async (parent, args, { models, user: { _id } }) => {
      try {
        await models.User.findByIdAndUpdate(_id, { ...args });
        return true;
      } catch (err) {
        return false;
      }
    })
  }
};
