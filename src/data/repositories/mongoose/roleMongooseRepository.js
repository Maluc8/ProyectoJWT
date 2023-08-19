import roleSchema from '../../models/rolesSchema.js';
import Role from '../../../domain/entities/role.js';

class RoleMongooseRepository {
  async paginate(criteria) {
    const { limit, page } = criteria;
    const { docs, ...pagination } = await roleSchema.paginate(
      {},
      { limit, page }
    );

    const roles = docs.map((document) => new Role(document._id, document.name));

    return roles, pagination;
  }

  async getOne(id) {
    const roleDocument = await roleSchema.findOne({ _id: id });

    if (!roleDocument) {
      throw new Error('Role not found.');
    }

    return new Role(document._id, document.name, document.permissions);
  }

  async create(data) {
    const roleDocument = await roleSchema.create(data);

    return new Role(document._id, document.name, document.permissions);
  }

  async updateOne(id, data) {
    const roleDocument = await roleSchema.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!roleDocument) {
      throw new Error('Role not found.');
    }

    return new Role(document._id, document.name, document.permissions);
  }

  async deleteOne(id) {
    return roleSchema.deleteOne({ _id: id });
  }
}
export default RoleMongooseRepository;
