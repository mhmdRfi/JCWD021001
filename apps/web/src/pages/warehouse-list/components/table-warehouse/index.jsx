import {
  Table,
  TableContainer,
  Td,
  Thead,
  Tr,
  Text,
  Tbody,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { SortName, SortWarehouseCity } from '../sort-warehouse'
import DeleteWarehouse from '../delete-warehouse'
import WarehouseAdmin from '../warehouse-admin-list'
import { ChevronDownIcon } from '@chakra-ui/icons'
import AssignAdmin from '../assign-admin'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function TableWarehouse({ warehouse, onWarehouseUpdated, setSortField, setSortOrder }) {
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshWarehouseAdmin = () => {
    // This will change the key, triggering a re-render of WarehouseAdmin
    setRefreshKey((prevKey) => prevKey + 1)
  }

  return (
    <>
      <TableContainer maxWidth={{base: '100vw', md: '80vw'}} borderRadius={'8px'}>
        <Table size={{base: 'sm', md:'md'}}>
          <Thead bgColor={'#CD0244'}>
            <Tr>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                    Name
                  </Text>
                  <SortName
                    onWarehouseUpdated={onWarehouseUpdated}
                    setSortField={setSortField}
                    setSortOrder={setSortOrder}
                  />
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                  Location
                </Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                  Province
                </Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                    City
                  </Text>
                  <SortWarehouseCity
                    onWarehouseUpdated={onWarehouseUpdated}
                    setSortField={setSortField}
                    setSortOrder={setSortOrder}
                  />
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                  Admin Management
                </Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                  Action
                </Text>
              </Td>
            </Tr>
          </Thead>
          <Tbody fontSize={'14px'}>
            {warehouse?.map((warehouse, index) => (
              <Tr key={warehouse.id} bg={index % 2 === 0 ? '#FFF1F5' : 'white'}>
                <Td padding={'8px 8px 8px 16px'}>{warehouse.name}</Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Text isTruncated>{warehouse.WarehouseAddress?.location}</Text>
                </Td>
                <Td maxW={'250px'} padding={'8px 8px 8px 16px'}>
                  {warehouse.WarehouseAddress?.City?.Province.name}
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Text>{warehouse.WarehouseAddress?.City?.name}</Text>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Menu>
                    <MenuButton fontWeight={'700'} color={'brand.lightred'}>
                      Manage Admin <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem _hover={{ bg: '#FFF1F5' }} _active={{ bg: '#FFF1F5' }}>
                        <WarehouseAdmin key={refreshKey} warehouseId={warehouse.id} />
                      </MenuItem>
                      <MenuItem _hover={{ bg: '#FFF1F5' }} _active={{ bg: '#FFF1F5' }}>
                        <AssignAdmin
                          warehouseId={warehouse.id}
                          onAdminAssigned={refreshWarehouseAdmin}
                        />
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Box display={'flex'} gap={'8px'}>
                    <Button
                      onClick={() => {
                        navigate('/edit-warehouse', { state: { warehouse } })
                      }}
                      bg={'#CD0244'}
                      color={'white'}
                      fontSize={'12px'}
                      fontWeight={'700'}
                      padding={'4px 16px'}
                      w={'72px'}
                      _hover={''}
                      _active={''}
                    >
                      Edit
                    </Button>
                    <DeleteWarehouse id={warehouse.id} onDeletedWarehouse={onWarehouseUpdated} />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableWarehouse
