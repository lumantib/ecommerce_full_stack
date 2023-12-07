import React, { useState } from 'react';
import { useNavigate, Redirect, Route, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import publicRequest from '../requests/requestMethos';


const Register = () => {
  const [error, setError] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onSubmit = data => {
    setIsLoading(true);
    publicRequest.post('auth/register', data)
      .then(res => {
        console.log(res)
        navigate('/login');
      })
      .catch((error) => {
        // Handle any network or server errors
        setError(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(data)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Register
        </h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} class="">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
              {...register("username")}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="abc@gmail.com"
              {...register("email")}

            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Password
            </label>
            <input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="*******"
              {...register("password")}

            />
          </div>
          {error && (
            <div className="text-red-500">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 mb-2"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <p>Already have an account? <Link to="/login" className='text-blue-600 font-bold'>Login</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default Register
