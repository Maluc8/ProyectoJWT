import dotenv from 'dotenv';
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from '../data/factories/dbFactory.js';
import config from '../config/index.js';
let db;
try {
  db = DbFactory.create(config.DB);
}
 catch {
  console.log('Error al crear la DB');
}

import UserMongooseRepository from '../data/repositories/mongoose/userMongooseRepository.js';

describe('Testing User Mongoose Repository', () => {
  beforeAll(async function() {
    await db.init(config.dbUri);
    this.userRepository = new UserMongooseRepository();
    console.log(
      'userMongooseRepository.test beforeAll userRepository \n',
      this.userRepository
    );
  });
  afterAll(function() {
    db.drop();
    db.close();
  });
  beforeEach(function() {
    // this.timeout(5000);
  });
  test('El repositorio debe ser una instancia de UserMongooseRepository', function() {
    console.log(
      'userMongooseRepository.test Repositorio debe ser una instancia de UserMongooseRepository\n',
      this.userRepository instanceof UserMongooseRepository
    );
    expect(this.userRepository instanceof UserMongooseRepository).toBeTruthy();
  });
  test('El repositorio debe devolver un arreglo', async function() {
    return await this.userRepository
      .paginate({ limit: 5, page: 1 })
      .then((result) => {
        expect(Array.isArray(result.users)).toBe(true);
        expect(result.pagination.limit).toBe(5);
      });
  });
  test('El repositorio debe poder crear un user', function() {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 19,
      isAdmin: false,
      password: 12345678
    };

    return this.userRepository.create(user).then((result) => {
      expect(result.firstName).to.be.equals(user.firstName);
      expect(result.email).to.be.equals(user.email);
    });
  });
});
