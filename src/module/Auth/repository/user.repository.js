import {User} from '../models/index.js';
import { handleSequelizeError } from '../../../common/error/sequeliseError.error.js';

export class UserRepository {

  // CREATE
  async createUser(data) {
    try {
      const user = await User.create(data);
      return this.mapToUserEntity(user);
    } catch (error) {
      handleSequelizeError(error);
    }
  };

  // READ
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user ? this.mapToUserEntity(user) : null;
    } catch (error) {
      handleSequelizeError(error);
    }
  };
  

  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user ? this.mapToUserEntity(user) : null;
    } catch (error) {
      handleSequelizeError(error);
    }
  };

  // MAPPER
  mapToUserEntity(user) {
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      accountStatus: user.accountStatus,
      enrolled: user.onboarded,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };
};