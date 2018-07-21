import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  username: {
    type: String
  }
});

// eslint-disable-next-line
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('user', userSchema);

export default User;
