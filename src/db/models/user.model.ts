import { userSchema } from '../schemas';
import mongoose from 'mongoose';

const UserModel = mongoose.model('User', userSchema, 'users');

export default UserModel;
