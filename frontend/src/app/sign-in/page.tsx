'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Box,
  Text,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import NextLink from 'next/link';
import { useState } from 'react';
import { ApiHelper } from '@/api';
import { Link } from '@chakra-ui/react';
import { routesConfig } from '@/config';
import { redirect } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { User, setUser } from '@/store/slice/userSlice';
import { FormTypesProps } from '../../types/form.types';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FormikHelpers } from 'formik';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
      'Password must contain at least one number and one special character'
    )
});

interface SignInValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const dispatch = useDispatch();
  const {user} = useSelector((state : User) => state);
  const isLoggedIn = user && user?.token?.length > 1
 
  if(isLoggedIn){
    redirect('/artists')
  }
  
  const handleSubmit = async (values: SignInValues, {resetForm}: FormikHelpers<SignInValues>) => {
    try {
      const { signInEndpoint } = routesConfig;
      const response: any = await ApiHelper(signInEndpoint, {
        method: 'POST',
        body: values
      })
      if(response.code === 401) {
        setLoginErrorMessage(response.message)
        resetForm()
      }
      dispatch(setUser(response))
      redirect('/artists')
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign In</Heading>
          { loginErrorMessage &&
            <Text color='red'> {loginErrorMessage} </Text>
          }
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignInSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="email">
                {({ field, form }: FormTypesProps) => (
                  <FormControl 
                    id="email" 
                    isInvalid={form.errors.email && form.touched.email} 
                    isRequired 
                    pt={4}
                    key={'email'}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input {...field} type="email" placeholder="email@address.com" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: FormTypesProps) => (
                  <FormControl 
                    id="password" 
                    isInvalid={form.errors.password && form.touched.password} 
                    isRequired 
                    pt={4}
                    key={'password'}
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input 
                        {...field} 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='********'
                      />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() => setShowPassword((showPassword) => !showPassword)}>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>  
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box my={3}>
                <Link as={NextLink} href='/sign-up' fontSize={'md'} fontWeight={400} color={'pink.500'} >
                  Register as a new user
                </Link>
              </Box>
              <Box my={3}>
                <Button fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  minW={'full'}
                  type='submit'
                  _hover={{
                    bg: 'pink.300',
                  }}>
                  Sign in
                </Button>
              </Box>
            </Form>
          </Formik>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://www.rollingstone.com/wp-content/uploads/2021/09/RS_500_Great_Songs_1800x1200.jpg?w=1581&h=1054&crop=1'
          }
        />
      </Flex>
    </Stack>
  )
}
