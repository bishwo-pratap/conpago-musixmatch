'use client'

import {
  Box,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ApiHelper } from '@/api';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@/store/slice/userSlice';
import ArtistList from '@/components/ArtistsList';
import { useDispatch, useSelector } from 'react-redux';
import { Artists, setArtists } from '@/store/slice/artistsSlice';
import DataSkeleton from '@/components/DataSkeleton';

const ArtistsPage = () => {
  const { user } = useSelector((state : User) => state);
  const artists = useSelector((state : Artists) => state.artists);
  const [artistList, setArtistList] = useState<Artists[]>([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = user && user?.token?.length > 1
  const dispatch = useDispatch();
 
  if(!isLoggedIn){
    redirect('/sign-in')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await ApiHelper('user/top-artists', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user?.token}`
          },
          body: {
            "page": 1,
            "page_size": 10
          }
        })
        await dispatch(setArtists(response.data))
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    };

    if(user?.token.length){
      fetchData();
    }
  },[user])

  useEffect(() => {
    if(artists?.artist_list?.length){
      setArtistList(artists.artist_list)
    }
  },[artists])

  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width={'100%'} direction={'column'}>
        { loading && 
          <DataSkeleton />
        }
        {!loading && <>
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
              Top artists in your country: <Text color="pink.400" display="inline">{user?.user?.country}</Text>
            </Heading>
          </Stack>
          <Divider />
          {artistList && artistList.length && artistList.map((obj, idx)=>{
            return (
              <Box key={obj?.artist?.artist_id}>
                <ArtistList 
                  ranking={idx+1}
                  name={obj?.artist?.artist_name} 
                  country={obj?.artist?.artist_country || "US"} 
                  twitter={obj?.artist?.artist_twitter_url || ""} 
                  artistId={obj?.artist?.artist_id} 
                  rating={obj?.artist?.artist_rating}
                  checked={(idx+1)%2==0}
                />
                {idx+1 != artistList.length && 
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

export default ArtistsPage
