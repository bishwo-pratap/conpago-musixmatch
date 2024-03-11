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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export default function SignIn() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign In</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Link as={NextLink} href='/sign-up' fontSize={'md'} fontWeight={400} color={'pink.500'} >
            Register as a new user
          </Link>
          <Button fontWeight={600}
          color={'white'}
          bg={'pink.400'}
          _hover={{
            bg: 'pink.300',
          }}>
            Sign in
          </Button>
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
