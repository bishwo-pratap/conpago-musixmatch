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
import { ArtistListProps } from '@/types/artist.types'
import { FaHouseUser, FaTwitter } from 'react-icons/fa'
import { setArtistId, setArtistName } from '@/store/slice/artistsSlice'

const ArtistList = (
  { ranking, name, twitter, country, rating, checked = false, artistId }: ArtistListProps
) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const colorTextLight = checked ? 'white' : 'purple.600'
  const bgColorLight = checked ? 'purple.400' : 'gray.300'
  const colorTextDark = checked ? 'white' : 'purple.500'
  const bgColorDark = checked ? 'purple.400' : 'gray.300'
  const [btnLoading, setBtnLoading] = useState(false)
  const [randomGrowth] = useState((Math.random()*100).toFixed(2))

  const onViewAlbumClick = async (name: string, link: string) =>{
    setBtnLoading(true)
    await dispatch(setArtistName({name}))
    await dispatch(setArtistId({id:artistId}))
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
        <Flex minW={1}>
          <Heading size={'md'}>#{ranking}</Heading>
        </Flex>
        <Flex maxW={200} minW={200}>
          <Heading size={'md'}>{name}</Heading>
        </Flex>
        <Flex minW={200}>
          <List spacing={3} textAlign="start">
            <ListItem key={country}>
              <ListIcon as={FaHouseUser} color="teal.400" />
              Country: {country}
            </ListItem>
            {twitter && 
              <ListItem key={twitter}>
                <ListIcon as={FaTwitter} color="teal.300" />
                <Link 
                  href={twitter}
                  target='__blank' 
                  color= 'teal.300'
                    _hover={{
                      textDecoration: 'none',
                      color: 'teal.500',
                    }}
                >
                  Twitter Handle
                </Link>
              </ListItem>
            }
            
          </List>
        </Flex>
        <Flex minW={100}>
          <StatGroup>
            <Stat>
              <StatLabel>Artist Rating</StatLabel>
              <StatNumber>{rating || 0} / 100</StatNumber>
              <StatHelpText>
                <StatArrow type={rating >= 50 ? 'increase' : 'decrease'} />
                {randomGrowth}%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Flex>
      <Flex minW={100}>
          <Button
            fontSize={'sm'}
            size="md"
            isLoading={btnLoading}
            loadingText='Redirecting'
            spinnerPlacement='end'
            fontWeight={600}
            color={useColorModeValue(colorTextLight, colorTextDark)}
            bgColor={useColorModeValue(bgColorLight, bgColorDark)}
            onClick={() => onViewAlbumClick(name, `/albums/${artistId}`)}
          >
            View Albums
          </Button>
      </Flex>
    </Stack>
  )
}

export default ArtistList;
