import React from 'react';
import { useNavigate, Redirect, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import publicRequest from '../requests/requestMethos';


const Register = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onSubmit = data => {
    publicRequest.post('api/auth/register', data)
      .then(res => {
        console.log(res)
        navigate('/');
      })
      .catch(err => console.log(err))
    console.log(data)
  };

  return (
    <div class="w-full ">
      <div className='flex w-full justify-center items-center h-full py-8'>
        <form action="" onSubmit={handleSubmit(onSubmit)} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[500px]">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              username
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
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Mobile Number
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="num" type="number" placeholder=""
              {...register("phoneNumber")}

            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Password
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="*******"
              {...register("password")}

            />
          </div>
          <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
