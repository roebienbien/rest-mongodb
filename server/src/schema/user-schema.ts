import { Schema } from 'mongoose';
import z from 'zod';

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

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
