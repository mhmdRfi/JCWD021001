import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStock } from './services/readStock'
import { TableBody } from './component/table-body'
import { PaginationList } from '../product-list/components/pagination-list'
import { getWarehouses } from '../form-mutation/services/readWarehouse'

export const StockManagement = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(null)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')
  const warehouseValue = queryParams.get('wa') //warehouse value

  // PATHNAME
  const pathName = location.pathname

  // NAVIGATE
  const navigate = useNavigate()

  // TOAST
  const [trigger, setTrigger] = useState(false)

  // STOCKS
  const [stocks, setStocks] = useState([])
  useEffect(() => {
    if (props?.isSuperAdmin) {
      getStock(warehouseValue, '', pageValue, 10).then((data) => setStocks(data))
    }
    if (!props?.isSuperAdmin) {
      setWarehouseId(props?.user?.warehouseId)
      getStock(warehouseId, '', pageValue, 10).then((data) => setStocks(data))
    }
  }, [warehouseId, pageValue, warehouseValue, trigger])

  // Toggle Box Colour
  const [boxToggle, setBoxToggle] = useState({ 1: true })

  // Handle Toggle
  const changeBoxToggle = (id) => {
    if (pageValue != id) {
      setBoxToggle((set) => ({
        [id]: !set[id],
        [!id]: set[id],
      }))
    }
  }

  // Warehouse lists
  const [warehouses, setWarehouses] = useState([])

  useEffect(() => {
    getWarehouses('').then((data) => {
      setWarehouses(data)
    })
  }, [])

  // Warehouse options
  const warehouseOptions = warehouses?.map((warehouse, index) => {
    return (
      <option
        key={index}
        id={warehouse?.id}
        value={warehouse?.id}
        selected={warehouse?.id === +warehouseValue}
      >
        {warehouse?.WarehouseAddress?.location}
      </option>
    )
  })

  return (
    <Box height={'100%'} w={'100%'} minH={'100vh'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading
              as={'h1'}
              fontSize={{ base: '1em', md: '1.5em' }}
              fontWeight={'bold'}
              justifyContent={'space-between'}
            >
              Stock Management
            </Heading>
            <HStack>
              {props?.isSuperAdmin && (
                <Select
                  placeholder={'Select warehouse'}
                  id={'recipientWarehouseAddress'}
                  name={'recipientWarehouseAddress'}
                  type={'text'}
                  bg={'white'}
                  border={'1px solid lightgray'}
                  focusBorderColor={'lightgray'}
                  onChange={async (e) => {
                    setWarehouseId(e?.target?.value)
                    {
                      e?.target?.value
                        ? navigate(`${pathName}?pa=1&wa=${e?.target?.value}`)
                        : navigate(`${pathName}?pa=1`)
                    }
                  }}
                >
                  {warehouseOptions}
                </Select>
              )}
              <Button
                _hover={{
                  bgColor: 'redPure.600',
                }}
                h={'2.5em'}
                w={'10em'}
                bgColor={'redPure.600'}
                color={'white'}
                onClick={() => {
                  navigate(
                    `/dashboard/stock-management/create-stock${
                      warehouseValue ? `?wa=${warehouseValue}` : ''
                    }`,
                  )
                }}
              >
                Create Stock
              </Button>
            </HStack>
          </Flex>
          <Box
            maxW={'100%'}
            boxShadow={'md'}
            h={'27em'}
            borderRadius={'.5em'}
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
                <Thead bg={'redPure.600'} position={'relative'}>
                  <Tr>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Products
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Size
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Color
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Price
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                      Stock
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody position={'relative'} fontWeight={'bold'}>
                  <TableBody
                    stocks={stocks}
                    pathName={pathName}
                    warehouseId={warehouseId}
                    warehouseValue={warehouseValue}
                    setTrigger={setTrigger}
                    trigger={trigger}
                  />
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
        <PaginationList
          boxToggle={boxToggle}
          warehouseValue={warehouseValue}
          changeBoxToggle={changeBoxToggle}
          location={location}
          pathName={pathName}
          pageValue={pageValue}
        />
      </Flex>
    </Box>
  )
}
