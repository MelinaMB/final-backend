import { UsersModels } from '../DAO/classes/users.dao.js';

const Models = new UsersModels();

 class UserService {
  
  async getAll() {
    const usersList = await Models.getAll();
    return usersList;
  }

  async createOne() {
    const userCreated = await Models.createOne();
    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await Models.deletedOne({ _id: _id });
    return deleted;
  }

  async deleted(listaDeUsuario) {
    listaDeUsuario.forEach(usuario => {
      Models.deletedOne(usuario._id);
    });
  }

  async updateOne(_id, user) {
    if (!_id) throw new Error('invalid _id');
    const userUptaded = await Models.updateOne(_id, user);
    return userUptaded;
  }

  async getUserById(uid){
    const user = await Models.getUserById(uid);
    return user;
  }

  async userPremium(idUser){
    try {
      const userId = await this.getUserById(idUser);
      if (userId){
        userId.premium = !userId.premium;
        const userRolCambio = await Models.updateUser(userId._id, userId);
        return userRolCambio;
      } else {
        throw Error("Usuario no encontrado");
      }
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
      next(error);
    }
  }

  async findOneAndDelete(user){
    try {
      const encontrarYEliminar = await Models.findOneAndDelete(user);
      return encontrarYEliminar;
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
    }
  }

  async find(users){
    try {
      const find = await Models.find(users);
      return find;
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
    }
  }
}

export default UserService;
