import { NextFunction } from 'express';
// import { Schema, Document } from 'mongoose';
import z from 'zod';
import bcrypt from 'bcrypt';
import { Schema, Document } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserDocument>(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // If password is not modified, move to the next middleware
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    return next(error);
  }
});

// using zod to validate resources
export const createUserSchema = z.object({
  body: z
    .object({
      username: z.string().trim().min(1, { message: 'username is required' }), //trim to eliminate whitespaces
      email: z.string().email('not a valid email').trim().min(1, { message: 'email required' }),
      password: z.string().trim().min(6, 'password should be at least 6 characters.'),
      confirmPassword: z.string().trim().min(6, 'confirm password should be at least 6 characters.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'password do not match',
      path: ['confirmPassword'],
    }),
});

export default userSchema;
export type CreateUserInput = z.TypeOf<typeof createUserSchema>['body'];
