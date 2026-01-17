import React, { useState } from 'react';
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { sendRegisterDataApi } from '../ApiRequests/ApiRequests';
import { Link, useNavigate } from 'react-router-dom';

const schema = zod.object({
  // name validation
  name: zod.string().nonempty('name is requred').max(10, 'name must be at max 10 characters').min(3, 'name must be at least 3 characters'),
  // email validation
  email: zod.string().nonempty('email is requred').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'email is invalid'),
  // password validation
  password: zod.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'password is invalid'),
  // rePassword validation
  rePassword: zod.string().nonempty('rePassword is required'),
  // date validation
  dateOfBirth: zod.coerce.date('date is required').refine((date) => {
    const yearOfBirth = date.getFullYear();
    const currentYear = new Date().getFullYear();
    const userAge = currentYear - yearOfBirth;
    return userAge >= 10
  }, 'user age must be greatter than 10'
  ),
  // gender validation
  gender: zod.string().nonempty('gender is required')

}).refine((data) => data.password === data.rePassword, { path: ['rePassword'], message: "password and rePassword don't match" });

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [APIError, setAPIError] = useState(null);
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const submit = async (userData) => {
    setLoading(true);
    const registerState = await sendRegisterDataApi(userData);
    if (registerState.message) {
      console.log('success');
      setAPIError(null)
      navigate('/login')
    } else {
      setAPIError(registerState.error)
    }
    setLoading(false);
  }
  return <>
    <h2 className='text-3xl font-medium text-center mb-8'>Register Now...</h2>
    <div className='min-h-143 flex flex-col'>
      <Form onSubmit={handleSubmit(submit)} className='w-xs sm:w-sm md:w-md lg:w-lg mx-auto'>
        <Input
          isInvalid={Boolean(errors.name)}
          label="Name"
          labelPlacement="outside"
          errorMessage={errors.name?.message}
          {...register('name')}
          placeholder="Enter your name"
          type="text"
        />

        <Input
          isInvalid={Boolean(errors.email)}
          label="Email"
          labelPlacement="outside"
          errorMessage={errors.email?.message}
          {...register("email")}
          placeholder="Enter your email"
          type="email"

        />

        <Input
          isInvalid={Boolean(errors.password)}
          label="Password"
          labelPlacement="outside"
          errorMessage={errors.password?.message}
          {...register("password")}
          placeholder="Enter your password"
          type="password"
        />

        <Input
          isInvalid={Boolean(errors.rePassword)}
          label="Re-Password"
          labelPlacement="outside"
          errorMessage={errors.rePassword?.message}
          {...register("rePassword")}
          placeholder="Enter your Re-password"
          type="password"
        />

        <Input
          isInvalid={Boolean(errors.dateOfBirth)}
          label="Birthday"
          labelPlacement="outside"
          errorMessage={errors.dateOfBirth?.message}
          {...register("dateOfBirth")}
          type="date"
        />

        <Select
          isInvalid={Boolean(errors.gender)}
          defaultSelectedKeys={["male"]}
          labelPlacement="outside"
          label="Gender"
          errorMessage={errors.gender?.message}
          {...register("gender")}
          placeholder="Select your gender"
        >
          <SelectItem key={'male'}>Male</SelectItem>
          <SelectItem key={'female'}>Female</SelectItem>
        </Select>

        <div className="flex items-center gap-2">
          <Button isLoading={loading} color="primary" type='submit'>
            {loading ? '' : 'Create Account'}
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
          <p>Already Has an Account..! <Link className='text-blue-700' to={'/login'}>Login Now</Link> </p>
        </div>
        {APIError && <p className='text-red-700'>{APIError}</p>}
      </Form>
    </div>
  </>
}
