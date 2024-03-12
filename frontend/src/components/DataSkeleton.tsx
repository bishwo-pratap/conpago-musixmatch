import { Divider, Skeleton, Stack } from "@chakra-ui/react";


export default function DataSkeleton() {
  return (
    <Stack 
      mt={8} 
      spacing={1}
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
      <Skeleton height='50px' w={'70%'} my={4}/>
      <Divider />
      <Skeleton height='50px' w={'100%'} my={2}/>
      <Divider />
      <Skeleton height='50px' w={'100%'} my={2}/>
      <Divider />
      <Skeleton height='50px' w={'100%'} my={2}/>
      <Divider />
      <Skeleton height='50px' w={'100%'} my={2}/>
    </Stack>
  )
}
