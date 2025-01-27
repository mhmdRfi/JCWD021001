import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import { Squares2X2Icon } from '@heroicons/react/24/outline'
import { SidebarButton } from '../sidebar-button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
export const Sidebar = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const warehouseValue = queryParams.get('wa') || queryParams.get('war')
  const monthValue = queryParams.get('mo')
  // NAVIGATE
  const navigate = useNavigate()
  // NAVIGATE

  // Toggle Box Colour
  const [boxToggle, setBoxToggle] = useState({})

  // Handle Toggle
  const changeBoxToggle = (id) => {
    setBoxToggle((set) => ({
      [id]: !set[id],
      [!id]: set[id],
    }))
  }
  return (
    <Box
      position={'relative'}
      p={'1em'}
      m={{ base: '0' }}
      w={{ base: '100%', lg: '15em' }}
      borderEndRadius={{ base: 'none', md: '1em' }}
      zIndex={'2'}
      top={'0'}
      minH={'100vh'}
      display={{ base: props?.collapseSideBar ? 'block' : 'none', lg: 'block' }}
    >
      <VStack align={'stretch'}>
        <HStack alignItems={'center'}>
          <Icon as={Squares2X2Icon} />
          <Text>Dashboard</Text>
        </HStack>
        <VStack align={'stretch'} spacing={'1.5em'}>
          <SidebarButton label={'User Management'} icon={Squares2X2Icon} />
          <Box p={'0 1.3em'} borderLeft={'2px solid lightgray'}>
            <VStack align={'stretch'} spacing={'1.5em'}>
              <Text
                onClick={() => {
                  navigate('/dashboard/admin-list')
                }}
                cursor={'pointer'}
              >
                Admin List
              </Text>
              <Text
                onClick={() => {
                  navigate('/dashboard/user-list')
                }}
                cursor={'pointer'}
              >
                User List
              </Text>
            </VStack>
          </Box>
          <SidebarButton label={'Warehouse Management'} icon={Squares2X2Icon} />
          <Box p={'0 1.3em'} borderLeft={'2px solid lightgray'}>
            <VStack align={'stretch'} spacing={'1.5em'}>
              <Text
                onClick={() => {
                  navigate('/dashboard/warehouse-list')
                }}
                cursor={'pointer'}
              >
                Warehouse List
              </Text>
            </VStack>
          </Box>
          <SidebarButton
            label={'Product'}
            icon={Squares2X2Icon}
            boxToggle={boxToggle}
            changeBoxToggle={changeBoxToggle}
          />
          <Box p={'0 1.3em'} borderLeft={'2px solid lightgray'}>
            <VStack align={'stretch'} spacing={'1.5em'}>
              <Text
                onClick={() => {
                  navigate('/dashboard/product-list?pa=1')
                }}
                cursor={'pointer'}
              >
                Product List
              </Text>
              <Text
                onClick={() => {
                  navigate('/dashboard/product-category')
                }}
                cursor={'pointer'}
              >
                Product Category
              </Text>
              <Text
                onClick={() => {
                  navigate('/dashboard/product-colour')
                }}
                cursor={'pointer'}
              >
                Product Colour
              </Text>
            </VStack>
          </Box>
          <SidebarButton label={'Inventory'} icon={Squares2X2Icon} />
          <Box p={'0 1.3em'} borderLeft={'2px solid lightgray'}>
            <VStack align={'stretch'} spacing={'1.5em'}>
              <Text
                onClick={() => {
                  navigate(
                    `/dashboard/stock-management?pa=1${
                      warehouseValue ? `&wa=${warehouseValue}` : ''
                    }`,
                  )
                }}
                cursor={'pointer'}
              >
                Stock Management
              </Text>
              <Text
                onClick={() => {
                  navigate(
                    `/dashboard/stock-mutation?pa=1&sta=req${
                      warehouseValue ? `&wa=${warehouseValue}` : ''
                    }`,
                  )
                }}
                cursor={'pointer'}
              >
                Stock Mutation
              </Text>
            </VStack>
          </Box>
          <SidebarButton label={'Order'} icon={Squares2X2Icon} />
          <Box p={'0 1.3em'} borderLeft={'2px solid lightgray'}>
            <VStack align={'stretch'} spacing={'1.5em'}>
              <Text
                onClick={() => {
                  navigate('/dashboard/order-management', {
                    state: { refresh: true, activeTab: 0, status: [2] },
                  })
                }}
                cursor={'pointer'}
              >
                Order Management
              </Text>
            </VStack>
          </Box>
          <SidebarButton label={'Report'} icon={Squares2X2Icon} />
          <Box p={'0 1.3em'} borderLeft={'2px solid lightgray'}>
            <VStack align={'stretch'} spacing={'1.5em'}>
              <Text
                onClick={() => {
                  navigate(
                    `/dashboard/sales-report?pa=1&cat=all&mo=${monthValue ? monthValue : 'jan'}${
                      warehouseValue ? `&war=${warehouseValue || 0}` : ``
                    }`,
                  )
                }}
                cursor={'pointer'}
              >
                Sales Report
              </Text>
              <Text
                onClick={() => {
                  navigate(
                    `/dashboard/stock-report?pa=1&mo=${monthValue ? monthValue : 'jan'}${
                      warehouseValue ? `&war=${warehouseValue || 0}` : ``
                    }`,
                  )
                }}
                cursor={'pointer'}
              >
                Stock Report
              </Text>
            </VStack>
          </Box>
        </VStack>
        <Flex
          alignItems={'center'}
          w={'6.5em'}
          justifyContent={'space-between'}
          onClick={() => props?.toggleSideBar()}
          cursor={'pointer'}
          display={{ base: 'flex', lg: 'none' }}
        >
          <Flex
            bgColor={'white'}
            w={'1.8em'}
            h={'1.8em'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'50%'}
            shadow={'md'}
          >
            <Icon as={ChevronLeftIcon} />
          </Flex>
          <Text>Collapse</Text>
        </Flex>
      </VStack>
    </Box>
  )
}
