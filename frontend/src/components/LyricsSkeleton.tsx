import { Heading, Skeleton, Stack } from "@chakra-ui/react";


export default function LyricsSkeleton() {
  return (
    <Stack 
      spacing={2}
      alignItems={'center'} 
      justifyContent={{
        base: 'flex-start',
        md: 'center',
      }}
      direction={{
        base: 'column',
        md: 'column',
      }}
    >
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
      <Skeleton height='20px' maxW={'100%'} minW={'100%'}/>
    </Stack>
  )
}
