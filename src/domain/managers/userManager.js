import container from '../../container.js';
import { createHash } from '../../utils/index.js';

class UserManager {
  constructor() {
    this.userRepository = container.resolve('UserRepository');
  }

  async paginate(criteria) {
    return this.userRepository.paginate(criteria);
  }

  async getOne(id) {
    return this.userRepository.getOne(id);
  }

  async create(data) {
    const dto = {
      ...data,
      password: await createHash(data.password, 10)
    };
    const user = await this.userRepository.create(dto);
    return { ...user, password: undefined };
  }

  async updateOne(id, data) {
    return this.userRepository.updateOne(id, data);
  }

  async deleteOne(id) {
    return this.userRepository.deleteOne(id);
  }

  async getOneByEmail(email) {
    return this.userRepository.getOneByEmail(email);
  }

  async forgetPassword(dto) {
    const user = await this.userRepository.getOneByEmail(dto.email);
    user.password = dto.password;
    return this.userRepository.updateOne(user.id, user);
  }
}

export default UserManager;
