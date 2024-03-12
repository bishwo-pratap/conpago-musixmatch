'use client'

import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ApiHelper } from '@/api';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import TrackList from '@/components/TrackList';
import { User } from '@/store/slice/userSlice';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Albums } from '@/store/slice/albumsSlice';
import { Tracks, setTracks } from '@/store/slice/trackSlice';
import { Artists } from '@/store/slice/artistsSlice';
import DataSkeleton from '@/components/DataSkeleton';

const TracksPage = () => {
  const pathParams = useParams();
  const { id } = pathParams;
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [albumName, setAlbumName] = useState('');
  const { user } = useSelector((state : User) => state);
  const albums = useSelector((state : Albums) => state.albums);
  const tracks = useSelector((state : Tracks) => state.tracks);
  const artists = useSelector((state : Artists) => state.artists);
  const [tracksList, setTracksList] = useState<Tracks[]>([]);
  const isLoggedIn = user && user?.token?.length > 1
 
  if(!isLoggedIn){
    redirect('/sign-in')
  }

  useEffect(() => {
    if(albums?.album_name?.length){
      setAlbumName(albums.album_name)
    }
  },[albums])

  useEffect(() => {
    if(tracks?.track_list){
      setTracksList(tracks.track_list)
    }
  },[tracks.track_list])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await ApiHelper('user/album-tracks', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user?.token}`
          },
          body: {
            "page": 1,
            "page_size": 3,
            "album_id": id,
            "f_has_lyrics": true // filter tracks with lyrics
          }
        })
        await dispatch(setTracks(response.data))
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    };

    if(user?.token.length && id){
      fetchData();
    }
  },[user, id])

  const goBackClick = async () => {
    push(`/albums/${artists?.artist_id}`)
  }

  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width={'100%'} direction={'column'}>
        { loading && 
          <DataSkeleton />
        }
        { !loading && <>
          <Stack
            p={5}
            alignItems={'center'}
            justifyContent={{
              base: 'flex-start',
              md: 'center',
            }}
            direction={{
              base: 'column',
              md: 'row',
            }}>
              
            <Button
              bg={''} 
              _hover={{
                color: 'gray.500',
              }}
              onClick={goBackClick}
            >
              <IoArrowBack />Back to Albums
            </Button>
            <Heading size={'lg'} ml={8} maxW={800}>
              Tracks for <Text color="pink.400" display="inline">{albumName}</Text> album
            </Heading>
          </Stack>
          <Divider />
          {tracksList && tracksList.length >=1 && tracksList.map((obj, idx)=>{
            return (
              <Box key={obj?.track?.track_id}>
                <TrackList 
                  trackId={obj?.track?.track_id}
                  trackName={obj?.track?.track_name}
                  trackRating={obj?.track?.track_rating}
                  trackShareUrl={obj?.track?.track_share_url}
                  explicit={obj?.track?.explicit}
                  numFavourite={obj?.track?.num_favourite}
                  primaryGenres={obj?.track?.primary_genres}
                  checked={(idx+1)%2==0}
                />
                {idx+1 != tracksList.length && 
                  <Divider />
                }
              </Box>
            )
          })}
          {tracksList && tracksList.length == 0 && (
            <Stack
            p={5}
            alignItems={'center'}
            justifyContent={{
              base: 'flex-start',
              md: 'center',
            }}
            direction={{
              base: 'column',
              md: 'row',
            }}>
              <Heading size={'md'} ml={8} maxW={800}>
                No tracks available for the album
              </Heading>
            </Stack>
          )}
        </>}
      </Stack>
    </Box>
  )
}

export default TracksPage
