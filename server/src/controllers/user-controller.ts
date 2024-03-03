import { UserModel } from '../models/user-model';
import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user-schema';
import { createUser, deleteUserById, findAllUsers, findUserById } from '../service/user-service';

export const registerUser = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
  try {
    const student = await createUser(req.body);
    return res.status(200).json(student);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete();

    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// export async function deleteUser(req: Request, res: Response) {
//   const id = req.params.id;
//   const user = await findUserById(id);
//   try {
//     if (!user) {
//       return res.send(`User does not exist`);
//     }
//     const removedStudent = await UserModel.findOneAndDelete();
//     res.send(`Student: ${user?._id} successfully deleted`);
//   } catch (e) {
//     res.sendStatus(400).send(`Cannot delete student ${user?._id} `);
//   }
// }

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
