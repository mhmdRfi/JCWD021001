import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'
import { useNavigate } from 'react-router-dom'
export const ProductCard = (props) => {
  const navigate = useNavigate()

  // TRUNCATE STRING
  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str
    }
    return str.slice(0, maxLength) + '...'
  }
  // TRUNCATE STRING
  return (
    <Box
      bgColor={'white'}
      minW={'10em'}
      maxW={'10em'}
      h={{ base: '16em' }}
      borderRadius={'.5em'}
      overflow={'hidden'}
      cursor={'pointer'}
      onClick={() => navigate(`/product/${props?.id}/?col=0&sz=0`)}
    >
      <AspectRatio ratio={1}>
        <Image
          src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
            props?.picture[0]?.imageUrl
          }`}
          objectFit={'cover'}
          alt={'Photo Products'}
        />
      </AspectRatio>
      <Box p={'.5em 1em'} h={{ base: '6.5em', sm: '7.3em' }}>
        <Flex
          flexDir={'column'}
          w={'100%'}
          h={'80%'}
          justifyContent={'space-between'}
          fontSize={'.85em'}
          fontWeight={'bold'}
        >
          <Text alignItems={'justify'}>{truncateString(props?.name, 20)}</Text>
          <Text>{toRupiah(props?.price)}</Text>
        </Flex>
      </Box>
    </Box>
  )
}
