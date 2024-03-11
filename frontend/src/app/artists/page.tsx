'use client'

import ArtistList from '@/components/ArtistsList'
import {
  Box,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

const Artists = () => {
  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width={'100%'} direction={'column'}>
        <Stack
          p={5}
          alignItems={'center'}
          justifyContent={{
            base: 'flex-start',
            md: 'space-around',
          }}
          direction={{
            base: 'column',
            md: 'row',
          }}>
          <Heading size={'lg'} >
            Top artists in your country: <Text color="pink.400" display="inline">{'{country}'}</Text>
          </Heading>
        </Stack>
        <Divider />
        <ArtistList 
          name={'Starter'} 
          country="US" 
          twitter={'asdf'} 
          artistId={12} 
          rating={100}
        />
        <Divider />
        <ArtistList
          name={'Lorem Plus'}
          country="Pillipines"
          twitter={'twitter'}
          artistId={123}
          rating={88}
          checked={true}
        />
        <Divider />
        <ArtistList 
          name={'Lorem Pro'} 
          country="Brazil" 
          twitter={'twitter'} 
          rating={85}
          artistId={1234} 
        />
      </Stack>
    </Box>
  )
}

export default Artists
