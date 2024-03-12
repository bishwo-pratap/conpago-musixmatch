'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Heading,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { ApiHelper } from '@/api';
import { routesConfig } from '@/config';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { User } from '@/store/slice/userSlice';
import { Tracks } from '@/store/slice/trackSlice';
import { Albums } from '@/store/slice/albumsSlice';
import { Artists } from '@/store/slice/artistsSlice';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import LyricsSkeleton from '@/components/LyricsSkeleton';
import { Lyrics, setLyrics, clearLyrics } from '@/store/slice/lyricsSlice';

export default function LyricsPage() {
  const pathParams = useParams();
  const { id } = pathParams;
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state : User) => state);
  const track = useSelector((state : Tracks) => state.tracks);
  const albums = useSelector((state : Albums) => state.albums);
  const artist = useSelector((state : Artists) => state.artists);
  const {lyrics} = useSelector((state : Lyrics) => state.lyrics);
  const [loading, setLoading] = useState(true);
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [lyricsObj, setLyricsObj] = useState<Lyrics>();
  
  const isLoggedIn = user && user?.token?.length > 1
 
  if(!isLoggedIn){
    redirect('/sign-in')
  }
  const goBackClick = async () => {
    push(`/tracks/${albums.album_id}`)
    await dispatch(clearLyrics())
  }

  useEffect(() => {
    if(track?.track_name?.length){
      setTrackName(track.track_name)
    }
  },[track])

  useEffect(() => {
    if(artist?.artist_name?.length){
      setArtistName(artist.artist_name)
    }
  },[artist])

  useEffect(() => {
    if(lyrics?.lyrics_body?.length){
      setLyricsObj(lyrics)
    }
  },[lyrics])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { lyricsEndpoint } = routesConfig;
        const response: any = await ApiHelper(lyricsEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user?.token}`
          },
          body: {
            "track_id": id
          }
        })
        await dispatch(setLyrics(response.data))
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    };

    if(user?.token.length && id){
      fetchData();
    }
  },[user, id])

  return (
    <Container maxW={'7xl'}>
      <Button 
        bg={''} 
        _hover={{
          color: 'gray.500',
        }}
        onClick={goBackClick}
      >
        <IoArrowBack />Back to Tracks
      </Button>
      <Stack 
        spacing={{ base: 6, md: 10 }}
        alignItems={'center'}
        justifyContent={{
          base: 'flex-start',
          md: 'space-around',
        }}
      >
        <Image
          alt={'pixel_tracking_url'}
          src={
            lyricsObj?.pixel_tracking_url || ''
          }
          w={1}
          h={1}
        />
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '3xl', lg: '3xl' }}>
            {trackName}
          </Heading>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}>
            {artistName}
          </Text>
        </Box>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          alignItems={'center'}
          justifyContent={{
            base: 'flex-start',
            md: 'space-around',
          }}
        >
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('pink.500', 'pink.300')}
            fontWeight={'500'}
            textTransform={'uppercase'}
            mb={'4'}>
            Lyrics
          </Text>

          { loading && 
            <LyricsSkeleton />
          }
          {!loading && (
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              fontWeight={'500'}
              pl={40}
              mb={'4'}>
              <pre>{lyricsObj?.lyrics_body}</pre>
            </Text>
            )
          }
          
        </Stack>
      </Stack>
    </Container>
  )
}
