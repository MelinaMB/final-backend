import { UserModel } from '../models/users.model.js';

export class UsersModels {
  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw new Error('validation error: please complete firstName, lastname and email.');
    }
  }
  async getAll() {
    const users = await UserModel.find({});
    return users;
  }

  async createOne(firstName, lastName, email, age) {
    const userCreated = await UserModel.create({ firstName, lastName, email, age});
    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async findOneAndDelete(user){
    const eliminarUser = await UserModel.findOneAndDelete(user);
    console.log(eliminarUser);
    return eliminarUser;
  }

  async updateOne(_id, firstName, lastName, email, age) {
    if (!_id) throw new Error('invalid _id');
    this.validateUser(firstName, lastName, email);
    const userUptaded = await UserModel.updateOne({ _id: id }, { firstName, lastName, email, age });
    return userUptaded;
  }

  async updateOne(_id, user) {
    if (!_id) throw new Error('invalid _id');
    const userUptaded = await UserModel.updateOne({ _id: id }, user);
    return userUptaded;
  }

  async getUserById(id) {
    const user = await UserModel.findOne({ _id: id });
    return user;
  };

  async updateUser(userId, userActualizado) {
    return await UserModel.findOneAndUpdate({ _id: userId }, userActualizado);
  }

  async find(users){
    return await UserModel.find(users);
  }
}
