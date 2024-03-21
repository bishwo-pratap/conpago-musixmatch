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
import { routesConfig } from '@/config';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { User, logout } from '@/store/slice/userSlice';
import AlbumsList from '@/components/AlbumsList';
import DataSkeleton from '@/components/DataSkeleton';
import { Artists } from '@/store/slice/artistsSlice';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Albums, setAlbums } from '@/store/slice/albumsSlice';

const AlbumsPage = () => {
  const pathParams = useParams();
  const { id } = pathParams;
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [artistName, setArtistName] = useState('');
  const { user } = useSelector((state : User) => state);
  const albums = useSelector((state : Albums) => state.albums);
  const artists = useSelector((state : Artists) => state.artists);
  const [albumList, setAlbumList] = useState<Albums[]>([]);
  
  const isLoggedIn = user && user?.token?.length > 1
 
  if(!isLoggedIn){
    redirect('/sign-in')
  }

  useEffect(() => {
    if(artists?.artist_name?.length){
      setArtistName(artists.artist_name)
    }
  },[artists])

  useEffect(() => {
    if(albums?.album_list){
      setAlbumList(albums.album_list)
    }
  },[albums.album_list])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { albumsEndpoint } = routesConfig;
        const response: any = await ApiHelper(albumsEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user?.token}`
          },
          body: {
            "page": 1,
            "page_size": 3,
            "artist_id": id
          }
        })
        await dispatch(setAlbums(response.data))
        setLoading(false)
      } catch (error) {
        console.error(error)
        dispatch(logout());
        redirect('/sign-in')
      }
    };

    if(user?.token.length && id){
      fetchData();
    }
  },[user, id])

  const goBackClick = async () => {
    push('/artists')
  }
  
  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width={'100%'} direction={'column'}>
        { loading && 
          <DataSkeleton />
        }
        { !loading && <>
          <Stack
            p={2}
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
              <IoArrowBack />Back to Artists
            </Button>
            <Heading size={'lg'} ml={8}>
              Latest albums of <Text color="pink.400" display="inline">{artistName}</Text>
            </Heading>
          </Stack>
          <Divider />
          {albumList && albumList.length && albumList.map((obj, idx)=>{
            return (
              <Box key={obj?.album?.album_id}>
                <AlbumsList 
                  albumName={obj?.album?.album_name}
                  albumReleaseDate={obj?.album?.album_release_date}
                  albumCopyright={obj?.album?.album_copyright}
                  albumRating={obj?.album?.album_rating}
                  albumId={obj?.album?.album_id}
                  checked={(idx+1)%2==0}
                />
                {idx+1 != albumList.length && 
                  <Divider />
                }
              </Box>
            )
          })}
        </>}
      </Stack>
    </Box>
  )
}

export default AlbumsPage
