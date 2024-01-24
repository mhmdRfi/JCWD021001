import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStock } from './services/readStock'
import { TableBody } from './component/table-body'

export const StockManagement = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(4)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')

  // PATHNAME
  const pathName = location.pathname

  // NAVIGATE
  const navigate = useNavigate()

  // TOAST
  const toast = useToast()

  // STOCKS
  const [stocks, setStocks] = useState([])
  useEffect(() => {
    getStock(warehouseId).then((data) => setStocks(data))
  }, [warehouseId])

  console.log('STOCKS', stocks)
  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'}>Stock Management</Text>
            <Button
              _hover={{
                bgColor: 'redPure.500',
              }}
              w={'10em'}
              bgColor={'redPure.500'}
              color={'white'}
              onClick={() => {
                navigate('/dashboard/stock-management/create-stock')
              }}
            >
              Create Stock
            </Button>
          </Flex>
          <Box
            h={'70vh'}
            overflowX={'scroll'}
            overflowY={'scroll'}
            sx={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <TableContainer w={'100%'}>
              <Table
                variant={'striped'}
                colorScheme={'customTableColor'}
                style={{
                  padding: '0',
                  borderRadius: '.5em',
                  overflow: 'hidden',
                }}
              >
                <Thead bg={'redPure.500'} position={'relative'}>
                  <Tr>
                    <Th color={'#FEFEFE'}>Products</Th>
                    <Th color={'#FEFEFE'}>Size</Th>
                    <Th color={'#FEFEFE'}>Color</Th>
                    <Th color={'#FEFEFE'}>Price</Th>
                    <Th color={'#FEFEFE'} w={'10em'}>
                      Stock
                    </Th>
                    <Th color={'#FEFEFE'} w={'10em'}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody position={'relative'} color={'#6D6D6D'} fontWeight={'500'}>
                  <TableBody stocks={stocks} />
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Flex>
    </Box>
  )
}
