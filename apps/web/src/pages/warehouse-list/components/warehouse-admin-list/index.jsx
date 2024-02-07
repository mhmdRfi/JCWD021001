import {
  Button,
  Modal,
  ModalBody,
  Text,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
  Flex,
  Box,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getWarehouseAdmin } from '../../services/getWarehouseList'

function WarehouseAdmin({ warehouseId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [warehouseAdmin, setWarehouseAdmin] = useState([])


  const fetchWarehouseAdmin = async () => {
    try {
      const fetchWarehouseData = await getWarehouseAdmin(warehouseId)
      setWarehouseAdmin(fetchWarehouseData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchWarehouseAdmin()
  }, [])

  console.log(warehouseAdmin);

  return (
    <>
      <Text
        onClick={onOpen}
        color={'#CD0244'}
        // fontSize={'12px'}
        fontWeight={'700'}
        padding={'4px 16px'}
        w={'72px'}
        _hover={'none'}
        _active={'none'}
      >
        Admin List
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Warehouse</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {warehouseAdmin.length > 0 ? (
              <Box>
                {warehouseAdmin?.map((admin, index) => (
                  <Flex key={admin.id} bg={index % 2 === 0 ? '#FFF1F5' : 'white'} p={'10px 10px'}>
                    <Text>{admin.username}</Text>
                  </Flex>
                ))}
              </Box>
            ) : (
              <Text>There is no admin assigned</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              width={'168px'}
              padding={'12px 16px'}
              bgColor={'white'}
              color={'brand.lightred'}
              variant={'outline'}
              borderColor={'brand.lightred'}
              _hover={{ borderColor: '#f50f5a', color: '#f50f5a' }}
              _active={{ opacity: '70%' }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WarehouseAdmin
