import React, { useContext, useState } from 'react'
import { Form, Input, Button } from "@heroui/react";
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { sendLoginDataApi } from '../ApiRequests/ApiRequests';
import { useNavigate } from 'react-router-dom';
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
      email: "abdo2@gmail.com",
      password: "Abdo123@"
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
    <div className='flex justify-center'>
      <Form onSubmit={handleSubmit(submit)} className="w-xs sm:w-sm md:w-md flex lg:w-lg flex-col gap-4">
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

        <div className="flex gap-2">
          <Button isLoading={loading} color="primary" type="submit">
            {loading ? '' : 'Login'}
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
        {APIError && <p className='text-red-700'>{APIError}</p>}
      </Form>
    </div>
  </>
}
