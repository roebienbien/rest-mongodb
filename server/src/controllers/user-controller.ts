import { UserModel } from '../models/user-model';
import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user-schema';
import { createUser, deleteUserById, findAllUsers, findUserById, findUsersPaginated } from '../service/user-service';

export const registerUser = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
  try {
    const student = await createUser(req.body);

    return res.status(200).json(student);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;

    if (!id) {
      return res.status(204).send('user does not exist');
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, body, { new: true });
    console.log('update');
    return res.status(200).send('user updated successfully');
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getUsersPaginated = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.p as string) || 0; //API_ENDPOINT?p=0
    const perPage = 10;
    const skipPage = perPage * page;

    const users = await findUsersPaginated(skipPage, perPage);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(204).send(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allStudent = await findAllUsers();

    return res.status(200).json(allStudent);
  } catch (error) {
    return res.status(400).send(error);
  }
};
