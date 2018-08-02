import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pick from 'lodash.pick';

import formatErrors from '../utils/formatErrors';

export default {
  Mutation: {
    SendEmail: async (parent, { email }, { transporter, models, EMAIL_SECRET, CurrentURL }) => {
      try {
        return await models.User.findOne({ email }).then(user => {
          if (user) {
            const emailToken = jwt.sign(
              {
                user: pick(user, '_id')
              },
              EMAIL_SECRET,
              {
                expiresIn: '1d'
              }
            );

            const url =
              process.env.NODE_ENV === 'production'
                ? `${CurrentURL}/reset/${emailToken}`
                : `http://localhost:3000/reset/${emailToken}`;

            transporter.sendMail({
              to: email,
              subject: 'Confirmar cambio de contraseña',
              html: `Para cambiar la contraseña entre a <a href="${url}">${url}</a> <br> Este token solo dura 24 horas.`
            });

            return {
              ok: true
            };
          }

          return {
            ok: false,
            errors: [{ path: 'email', message: 'Correo incorrecto' }]
          };
        });
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    SendToken: async (parent, { token, password }, { models, EMAIL_SECRET }) => {
      try {
        const {
          user: { _id }
        } = jwt.verify(token, EMAIL_SECRET);

        return models.User.findById({ _id }).then(async user => {
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(password, salt);

          await models.User.findByIdAndUpdate({ _id: user._id }, { password: passwordHash });

          return true;
        });
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
};
