'use client'

import { 
  Stack,
   Flex,
   Button,
   Text,
   VStack,
   useBreakpointValue,
   Highlight 
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export default function Hero() {
  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={
        '/banner.png'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              <Highlight
                query='Power of Lyrics'
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100', opacity:'0.5' }}
              >
                Unlock the Power of Lyrics with MusixMatch: Your Melodic Playground for Music and Words!
              </Highlight>
            
          </Text>
          <Stack direction={'row'}>
            <Link as={NextLink} href='/sign-in'>
              <Button 
                bg={'pink.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'pink.500' }}>
                Get Started
              </Button>
            </Link>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  )
}
