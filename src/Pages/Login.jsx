import React, { useContext, useState } from 'react'
import { Form, Input, Button } from "@heroui/react";
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { sendLoginDataApi } from '../ApiRequests/ApiRequests';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';



const schema = zod.object({
  email: zod.string().nonempty('email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'email is invalid'),
  password: zod.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'password is invalid')
});

export default function Login() {
  const { setIsLoginned, setToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [APIError, setAPIError] = useState(null);
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues:
    {
      email: "",
      password: ""
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const submit = async (userData) => {
    setLoading(true)
    const responseState = await sendLoginDataApi(userData)
    if (responseState.message === 'success') {
      localStorage.setItem('socialAppToken', responseState.token)
      setAPIError(null);
      setIsLoginned(true)
      setToken(localStorage.getItem('socialAppToken'))
      navigate('/')
    } else {
      setAPIError(responseState.error)
    }
    setLoading(false);
  }


  return <>
    <h2 className='text-3xl font-medium text-center mb-8'>Login Now...</h2>
    <div className='min-h-143 flex flex-col'>
      <Form onSubmit={handleSubmit(submit)} className="w-xs sm:w-sm md:w-md flex lg:w-lg flex-col gap-4 mx-auto">
        <Input
          isInvalid={Boolean(errors.email)}
          {...register('email')}
          errorMessage={errors.email?.message}
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
        />

        <Input
          isInvalid={Boolean(errors.password)}
          {...register('password')}
          errorMessage={errors.password?.message}
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
        />

        <div className="flex items-center gap-2 mb-1">
          <Button className='px-5' isLoading={loading} color="primary" type="submit">
            {loading ? '' : 'Login'}
          </Button>
          <Button className='px-5' type="reset" variant="flat">
            Reset
          </Button>
        </div>
        <p>Haven't an Account yet..! <Link className='text-blue-700' to={'/register'}>Register Now</Link> </p>
        {APIError && <p className='text-red-700'>{APIError}</p>}
      </Form>
    </div>
  </>
}
