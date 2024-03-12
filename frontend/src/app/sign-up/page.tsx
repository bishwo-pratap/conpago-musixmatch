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
  Select,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Box,
  Text,
} from '@chakra-ui/react'
import * as Yup from 'yup';
import NextLink from 'next/link';
import { useState } from 'react';
import { ApiHelper } from '@/api';
import { Link } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FormTypesProps } from '../../types/form.types';
import { User, setUser } from '@/store/slice/userSlice';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { redirect } from 'next/navigation';

const countries = [
  { "label": "United States", "value": "USA" },
  { "label": "Canada", "value": "CAN" },
  { "label": "United Kingdom", "value": "UK" },
  { "label": "Germany", "value": "GER" },
  { "label": "France", "value": "FRA" },
  { "label": "Japan", "value": "JPN" },
  { "label": "Australia", "value": "AUS" },
  { "label": "Brazil", "value": "BRA" },
  { "label": "India", "value": "IND" },
  { "label": "South Africa", "value": "RSA" }
]

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
      'Password must contain at least one number and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Same password as above is required'),
  country: Yup.string().required('Please select a country'),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('')
  const dispatch = useDispatch();
  const {user} = useSelector((state : User) => state);
  
  const isLoggedIn = user && user?.token?.length > 1
 
  if(isLoggedIn){
    redirect('/artists')
  }
  
  const handleSubmit = async (values:Record<string,string>) => {
    console.log('Form submitted:', values);
    const body = {...values};
    delete body.confirmPassword;
    const response: any = await ApiHelper('auth/register', {
      method: 'POST',
      body
    })
    if(response.code === 401) {
      setSignUpErrorMessage(response.message)
    }
    dispatch(setUser(response))
    redirect('/artists')
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://imgix.ranker.com/user_node_img/50140/1002781906/original/1002781906-photo-u-1127482082?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=650'
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign up and get unlimited lyrics</Heading>
          { signUpErrorMessage &&
            <Text color='red'> {signUpErrorMessage} </Text>
          }
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              country: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="name" >
                {({ field, form }: FormTypesProps) => (
                  <FormControl 
                    id="name" 
                    isInvalid={form.errors.name && form.touched.name} 
                    isRequired 
                    pt={4}
                    key={'name'}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input {...field} type="text" placeholder="Your name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
                        placeholder='8 characters, one number and one special character'
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
              <Field name="confirmPassword">
                {({ field, form }: FormTypesProps) => (
                  <FormControl 
                    id="confirmPassword" 
                    isInvalid={form.errors.confirmPassword && form.touched.confirmPassword} 
                    isRequired 
                    pt={4}
                    key={'confirmPassword'}
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input 
                        {...field} 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='Same as password'
                      />
                    </InputGroup>  
                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="country">
                {({ field, form }: FormTypesProps) => (
                  <FormControl 
                    id="country" 
                    isInvalid={form.errors.country && form.touched.country} 
                    isRequired 
                    pt={4}
                    key={'country'}
                  >
                    <FormLabel>Country</FormLabel>
                    <Select  {...field} placeholder='Select Country'>
                      {countries && countries.map(({label, value})=>{
                        return (
                          <option value={value} key={label}>{label}</option>
                        )
                      })}
                    </Select>
                    <FormErrorMessage>{form.errors.country}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box my={3}>
                <Link as={NextLink} href='/sign-in' fontSize={'md'} fontWeight={400} color={'pink.500'} >
                  Already have an account?
                </Link>
              </Box>
              <Box my={3}>
                <Field name="submit">
                  {({ field, form }: FormTypesProps) => (
                    <FormControl 
                      key={'submit'}
                    >
                      <Button fontWeight={600}
                        color={'white'}
                        bg={'pink.400'}
                        _hover={{
                          bg: 'pink.300',
                        }}
                        type='submit'
                        minW={'full'}
                        >
                        Sign in
                      </Button>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Form>
          </Formik>
        </Stack>
      </Flex>
    </Stack>
  )
}
