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
import { Link } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { SiMicrogenetics } from "react-icons/si"
import { MdNoAdultContent } from "react-icons/md"
import { TrackListProps } from '@/types/track.types'
import { setTrackName } from '@/store/slice/trackSlice'
import { FaShareAltSquare, FaGrinStars } from 'react-icons/fa'


const TrackList = (
  { trackId, trackName, trackRating, trackShareUrl, explicit, numFavourite, primaryGenres, checked = false }: TrackListProps
) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const colorTextLight = checked ? 'white' : 'purple.600'
  const bgColorLight = checked ? 'purple.400' : 'gray.300'
  const colorTextDark = checked ? 'white' : 'purple.500'
  const bgColorDark = checked ? 'purple.400' : 'gray.300'
  const [btnLoading, setBtnLoading] = useState(false)
  const [randomGrowth] = useState((Math.random()*100).toFixed(2))

  const getGenres = () => {
    if (
      !primaryGenres || 
      !primaryGenres.music_genre_list || 
      !Array.isArray(primaryGenres.music_genre_list)
    ) {
      return '';
    }
  
    return primaryGenres.music_genre_list.map((item) => {
      return item.music_genre?.music_genre_name || null;
    }).filter(Boolean).join(',');

  }

  const onViewLyricsClick = async (name: string, link: string) =>{
    setBtnLoading(true)
    await dispatch(setTrackName({name}))
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
        <Flex minW={300} maxW={300}>
          <Heading size={'md'}>{trackName}</Heading>
        </Flex>
        <Flex minW={200}>
          <List spacing={3} textAlign="start">
            <ListItem key={numFavourite}>
              <ListIcon as={FaGrinStars} color="teal.400" />
              {numFavourite} Favourites
            </ListItem>
            <ListItem key={trackId}>
              <ListIcon as={MdNoAdultContent} color="teal.400" />
              {explicit ? 'Explicit Lyrics' : 'Clean Lyrics'}
            </ListItem>
            <ListItem key={trackId+'_genres'}>
              <ListIcon as={SiMicrogenetics} color="teal.400" />
              {getGenres()}
            </ListItem>
            <ListItem key={trackRating}>
              <ListIcon as={FaShareAltSquare} color="teal.400" />
              <Link 
                  href={trackShareUrl}
                  target='__blank' 
                  color= 'teal.300'
                    _hover={{
                      textDecoration: 'none',
                      color: 'teal.500',
                    }}
                >
                  Track Share
                </Link>
            </ListItem>
          </List>
        </Flex>
        <Flex minW={100}>
          <StatGroup>
            <Stat>
              <StatLabel>Track Rating</StatLabel>
              <StatNumber>{trackRating || 0} / 100</StatNumber>
              <StatHelpText>
                <StatArrow type={trackRating >= 50 ? 'increase' : 'decrease'} />
                {randomGrowth}%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Flex>
      <Flex minW={100}>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          size="md"
          fontWeight={600}
          isLoading={btnLoading}
          loadingText='Redirecting'
          spinnerPlacement='end'
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
          onClick={() => onViewLyricsClick(trackName, `/lyrics/${trackId}`)}
        >
          View Lyrics
        </Button>
      </Flex>
    </Stack>
  )
}

export default TrackList;
