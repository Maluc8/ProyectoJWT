import userSchema from "../models/userSchema.js";

class UserMongooseDao {
  async paginate(criteria) {
    const { limit, page } = criteria;
    const userDocuments = await userSchema.paginate({}, { limit, page });

    userDocuments.docs = userDocuments.docs.map((document) => ({
      id: document?._id,
      firstName: document?.firstName,
      lastName: document?.lastName,
      email: document?.email,
      age: document?.age,
      password: document?.password,
      cart: document?.cart,
      role: document?.role,
      isAdmin: document?.isAdmin,
    }));
    return userDocuments;
  }

  async getOne(id) {
    const userDocument = await userSchema.findOne({ _id: id });
    if (!userDocument._id) {
      throw new Error("User dont exist.");
    }
    return {
      id: document?._id,
      firstName: document?.firstName,
      lastName: document?.lastName,
      email: document?.email,
      age: document?.age,
      password: document?.password,
      cart: document?.cart,
      role: document?.role,
      isAdmin: document?.isAdmin,
    };
  }
  async getOneByEmail(email) {
    const userDocument = await userSchema.findOne({ email: email });
    if (!userDocument._id) {
      throw new Error("User dont exist.");
    }
    return {
      id: document?._id,
      firstName: document?.firstName,
      lastName: document?.lastName,
      email: document?.email,
      age: document?.age,
      password: document?.password,
      cart: document?.cart,
      role: document?.role,
      isAdmin: document?.isAdmin,
    };
  }

  async create(data) {
    const userDocument = await userSchema.create(data);
    return {
      id: document?._id,
      firstName: document?.firstName,
      lastName: document?.lastName,
      email: document?.email,
      age: document?.age,
      password: document?.password,
      cart: document?.cart,
      role: document?.role,
      isAdmin: document?.isAdmin,
    };
  }

  async updateOne(id, data) {
    const userDocument = await userDocument.findOneAndUpdate(
      { _id: id },
      data,
      { new: true }
    );
    if (!userDocument._id) {
      throw new Error("User dont exist.");
    }
    return {
      id: document?._id,
      firstName: document?.firstName,
      lastName: document?.lastName,
      email: document?.email,
      age: document?.age,
      password: document?.password,
      cart: document?.cart,
      role: document?.role,
      isAdmin: document?.isAdmin,
    };
  }

  async deleteOne(id) {
    return await userSchema.deleteOne({ _id: id });
  }
}

export default UserMongooseDao;
