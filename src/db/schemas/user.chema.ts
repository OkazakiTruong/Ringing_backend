import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  birth_day: Date,
  phone: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateddAt: {
    type: Date,
    default: Date.now,
  },
});

export default userSchema;
