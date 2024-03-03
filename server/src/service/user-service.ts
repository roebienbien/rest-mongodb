import { UserModel } from '../models/user-model';
import { CreateUserInput } from '../schema/user-schema';

export function createUser(input: CreateUserInput) {
  return UserModel.create(input);
}

export function deleteUserById(id: string) {
  return UserModel.findOneAndDelete({ _id: id });
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findAllUsers() {
  return UserModel.find({});
}
