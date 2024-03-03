import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import z from 'zod';
import { API_ENDPOINT } from '../config/config';
import axios from 'axios';

const loginUserSchema = z.object({
  username: z.string().trim().min(1, 'username is required'),
  email: z.string().trim().min(1, 'email is required').email('not a valid email'),
  password: z.string().trim().min(6, 'password should be at least 6 characters'),
});

type FormFields = z.infer<typeof loginUserSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(loginUserSchema), defaultValues: {} });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const login = await axios.post(`${API_ENDPOINT}/users/login`, data);

      reset();
      console.log(login.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center w-full items-center  gap-4 h-screen  bg-zinc-300  '>
        <h3 className='text-center font-bold text-3xl'>Login</h3>
        <input {...register('username')} type='text' placeholder='username' className='p-2  ' />
        {errors.username && <div className='  text-red-500'>{errors.username.message}</div>}
        <input {...register('email')} type='text' placeholder='email' className='p-2' />
        {errors.email && <div className='  text-red-500'>{errors.email.message}</div>}
        <input {...register('password')} type='password' placeholder='password' className='p-2' />
        {errors.password && <div className='  text-red-500'>{errors.password.message}</div>}
        <Link to='/register'>Don't have an Account?</Link>
        <Link to='/userDashboard'>
          <button type='submit' className='p-4 bg-blue-400 rounded-lg shadow-md text-white font-bold text-lg'>
            {isSubmitting ? 'loading...' : 'submit'}
          </button>
        </Link>
      </form>
    </div>
  );
}
