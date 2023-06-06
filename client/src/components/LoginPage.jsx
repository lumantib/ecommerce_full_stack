import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import publicRequest from '../requests/requestMethos';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    setIsLoading(true);
    publicRequest.post('/auth/login', data)
      .then((response) => {
        if (response.status === 200) {
          // Successful login, handle the response as needed
          const result = response.data;
          console.log("resuslt", result)
          localStorage.setItem("token", result?.accessToken)
          localStorage.setItem("username", result?.username)
          localStorage.setItem("email", result?.email)
          localStorage.setItem("isAdmin", result?.isAdmin)
          result.isAdmin ?
            navigate('/dashboard/products/all')
            :
            navigate('/')

        } else {
          // Error occurred during login
          const errorData = response.data;
          console.log("errorData", errorData);
        }
      })
      .catch((error) => {
        // Handle any network or server errors
        setError(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-6 flex-col'>
          <div>
            <label htmlFor="username" className="text-gray-800">
              Username:
            </label>
            <input
              type="text"
              id="username"
              {...register('username', {
                required: 'Username is required',
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            {errors.username && (
              <p className="text-red-500 mt-2">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-gray-800">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                // minLength: {
                //   value: 8,
                //   message: 'Password must be at least 8 characters long',
                // },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            {errors.password && (
              <p className="text-red-500 mt-2">{errors.password.message}</p>
            )}
          </div>
          {error && (
            <div className="text-red-500">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
