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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

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

export default function SignUp() {
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
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select placeholder='Select country'>
              {countries && countries.map(({label, value})=>{
                return (
                  <option value={value}>{label}</option>
                )
              })}
            </Select>
          </FormControl>
          <Link as={NextLink} href='/sign-in' fontSize={'md'} fontWeight={400} color={'pink.500'} >
            Already have an account?
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
      
    </Stack>
  )
}
