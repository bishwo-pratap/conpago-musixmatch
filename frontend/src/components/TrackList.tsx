'use client'

import {
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import { TrackListProps } from '@/types/track.types'

const TrackList = ({ name, twitter, country, rating, checked = false, artistId }: TrackListProps) => {
  const colorTextLight = checked ? 'white' : 'purple.600'
  const bgColorLight = checked ? 'purple.400' : 'gray.300'

  const colorTextDark = checked ? 'white' : 'purple.500'
  const bgColorDark = checked ? 'purple.400' : 'gray.300'

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: 'flex-start',
        md: 'space-around',
      }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems={{ md: 'start' }}>
        <Flex minW={200}>
          <Heading size={'md'}>{name}</Heading>
        </Flex>
        <Flex minW={200}>
          <List spacing={3} textAlign="start">
            <ListItem key={country}>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Country: {country}
            </ListItem>
            <ListItem key={twitter}>
              <ListIcon as={FaCheckCircle} color="green.500" />
              {twitter}
            </ListItem>
          </List>
        </Flex>
        <Flex minW={100}>
          <Heading size={'md'}>{rating || 0}/100</Heading>
        </Flex>
      <Flex minW={100}>
        <Link as={NextLink} href={`/lyrics/${artistId}`}>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            size="md"
            fontWeight={600}
            color={useColorModeValue(colorTextLight, colorTextDark)}
            bgColor={useColorModeValue(bgColorLight, bgColorDark)}
          >
            View Lyrics
          </Button>
        </Link>
      </Flex>
    </Stack>
  )
}

export default TrackList;
