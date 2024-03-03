import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { API_ENDPOINT } from '../config/config';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

const registerUserSchema = z
  .object({
    username: z.string().trim().min(1, { message: 'username is required' }), //trim to eliminate whitespaces
    email: z.string().email('not a valid email').trim().min(1, { message: 'email required' }),
    password: z.string().trim().min(6, 'password should be at least 6 characters.'),
    confirmPassword: z.string().trim().min(6, 'confirm password should be at least 6 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'password do not match',
    path: ['confirmPassword'],
  });

type FormFields = z.infer<typeof registerUserSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: 'testname',
      email: 'test@email.com',
      password: '1231234',
      confirmPassword: '1231234',
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const register = await axios.post(`${API_ENDPOINT}/users/register`, data);
      console.log(register.data);

      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col justify-center w-full items-center  gap-4 h-screen  bg-zinc-300  '>
      <h3 className='text-center font-bold text-3xl'>Register</h3>
      <input {...register('username')} type='text' placeholder='username' className='p-2  ' />
      {errors.username && <div className='  text-red-500'>{errors.username.message}</div>}
      <input {...register('email')} type='text' placeholder='email' className='p-2' />
      {errors.email && <div className='  text-red-500'>{errors.email.message}</div>}
      <input {...register('password')} type='password' placeholder='password' className='p-2' />
      {errors.password && <div className='  text-red-500'>{errors.password.message}</div>}
      <input {...register('confirmPassword')} type='password' placeholder='confirm password' className='p-2' />
      {errors.confirmPassword && <div className='  text-red-500'>{errors.confirmPassword.message}</div>}
      <Link to='/'>Already have an account?</Link>
      <button type='submit' className='p-4 bg-blue-400 rounded-lg shadow-md text-white font-bold text-lg'>
        {isSubmitting ? 'loading...' : 'submit'}
      </button>
    </form>
  );
}
