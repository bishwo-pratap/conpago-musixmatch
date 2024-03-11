'use client'

import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons'
import { NavItem } from '@/types/nav.types'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import Image from 'next/image'

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Explore Artists',
    href: '/artists',
  },
]

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      <Flex
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link as={NextLink} href='/' 
            ml={colorMode == 'light' ? '' :'2'}
            mt={colorMode == 'light' ? '' :'1'}
          >
            <Image src={colorMode == 'light' ? '/mm_logo.png':'/mm_logo_white.png'}
              alt='logo' width={colorMode == 'light' ? '150' : '135'} 
              height={colorMode == 'light' ? '50' : '50'}
              />
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav colorMode={colorMode}/>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button 
            bg={''} 
            _hover={{
              bg: '',
            }}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          
          <Link as={NextLink} href='/sign-in'>
            <Button 
              fontSize={'sm'} fontWeight={400}
              bg={''} 
              _hover={{
                bg: '',
                textDecoration: 'underline'
              }}>
              Sign In
            </Button>
          </Link>
          <Link as={NextLink} href='/sign-up'>
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              _hover={{
                bg: 'pink.300',
              }}>
              Sign Up
            </Button>
          </Link>
          
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = ({colorMode}: {colorMode: String}) => {
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  return (
    <Stack direction={'row'} spacing={4} 
      mb={colorMode == 'light' ? '' :'2'}
      ml={colorMode == 'light' ? '' :'1'}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link 
            as={NextLink} href={navItem.href ?? '#'} 
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
            fontSize={'sm'} fontWeight={500} p={2}>
              {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  )
}


const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Stack spacing={4} onClick={onToggle}>
      <Link 
        as={NextLink} href={href ?? '#'} 
        py={2} alignItems="center"
        justifyContent="space-between"
        _hover={{
          textDecoration: 'none',
        }}
        fontWeight={600} 
        color={useColorModeValue('gray.600', 'gray.200')}
        >
        {label}
      </Link>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
        </Stack>
      </Collapse>
    </Stack>
  )
}
