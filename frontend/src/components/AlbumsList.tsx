'use client'

import {
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { FaCopyright } from 'react-icons/fa'
import { MdOutlineDateRange } from "react-icons/md";
import { AlbumsListProps } from '@/types/albums.types'
import { setAlbumName, setAlbumId } from '@/store/slice/albumsSlice'

const AlbumsList = ({ albumId, albumCopyright, albumName, albumRating, albumReleaseDate, checked = false }: AlbumsListProps) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const colorTextLight = checked ? 'white' : 'purple.600'
  const bgColorLight = checked ? 'purple.400' : 'gray.300'
  const colorTextDark = checked ? 'white' : 'purple.500'
  const bgColorDark = checked ? 'purple.400' : 'gray.300'
  const [btnLoading, setBtnLoading] = useState(false)
  const [randomGrowth] = useState((Math.random()*100).toFixed(2))

  const onViewTracksClick = async (name: string, link: string) =>{
    setBtnLoading(true)
    await dispatch(setAlbumName({name}))
    await dispatch(setAlbumId({id: albumId}))
    push(link)
  }
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
        <Flex maxW={300} minW={300}>
          <Heading size={'md'}>{albumName}</Heading>
        </Flex>
        <Flex maxW={300} minW={300}>
          <List spacing={3} textAlign="start">
            <ListItem key={albumReleaseDate}>
              <ListIcon as={MdOutlineDateRange} color="teal.400" />
              Release Date: {albumReleaseDate}
            </ListItem>
            <ListItem key={albumCopyright}>
              <ListIcon as={FaCopyright} color="teal.400" />
              {albumCopyright}
            </ListItem>
          </List>
        </Flex>
        <Flex minW={100}>
        <StatGroup>
            <Stat>
              <StatLabel>Album Rating</StatLabel>
              <StatNumber>{albumRating || 0} / 100</StatNumber>
              <StatHelpText>
                <StatArrow type={albumRating >= 50 ? 'increase' : 'decrease'} />
                {randomGrowth}%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Flex>
      <Flex minW={100}>
        <Link as={NextLink} href={`/tracks/${albumId}`}>
          <Button
            fontSize={'sm'}
            size="md"
            fontWeight={600}
            isLoading={btnLoading}
            loadingText='Redirecting'
            spinnerPlacement='end'
            color={useColorModeValue(colorTextLight, colorTextDark)}
            bgColor={useColorModeValue(bgColorLight, bgColorDark)}
            onClick={() => onViewTracksClick(albumName, `/tracks/${albumId}`)}
          >
            View Tracks
          </Button>
        </Link>
      </Flex>
    </Stack>
  )
}

export default AlbumsList;
