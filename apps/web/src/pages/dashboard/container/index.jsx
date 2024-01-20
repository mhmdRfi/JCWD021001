import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { Navbar } from '../../../components/navbar'
import { Body } from '../components/body'
import { Sidebar } from '../components/sidebar'
import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { ProductList } from '../components/product-list'
import { useParams } from 'react-router-dom'

export const Dashboard = () => {
  const { destination, createProduct } = useParams()
  const [collapseSideBar, setCollapseSideBar] = useState(true)
  const toggleSideBar = () => {
    setCollapseSideBar(!collapseSideBar)
  }
  return (
    <Box minH={'100vh'}>
      <Navbar />
      <Box display={{ md: 'flex' }} gap={'1em'} w={'100%'}>
        <Box display={{ md: 'flex' }}>
          <Sidebar
            collapseSideBar={collapseSideBar}
            setCollapseSideBar={setCollapseSideBar}
            toggleSideBar={toggleSideBar}
          />
        </Box>
        <Box w={'100%'}>
          <Body destination={destination} createProduct={createProduct} />
        </Box>
      </Box>
      <Flex
        zIndex={'3'}
        bgColor={'white'}
        position={'fixed'}
        top={'50%'}
        transform={'translateY(50%)'}
        w={'1.8em'}
        h={'1.8em'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={'50%'}
        left={'-.5em'}
        visibility={{
          base: collapseSideBar ? 'hidden' : 'visible',
          md: 'hidden',
        }}
        cursor={'pointer'}
      >
        <Icon as={ChevronRightIcon} onClick={() => toggleSideBar()} />
      </Flex>
    </Box>
  )
}