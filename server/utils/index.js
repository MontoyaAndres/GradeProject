const jwt = require('jsonwebtoken');

const authenticate = (context) => {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.SESSION_KEY);
    return userId;
  }

  throw new Error('No autorizado.');
}

module.exports = {
  authenticate
}
