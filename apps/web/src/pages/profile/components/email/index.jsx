import {
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Text,
  FormErrorMessage,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { EmailScheme } from '../../services/validation'
import { updateEmail } from '../../services/updateProfile'
import { logoutSuccess, setUser } from '../../../../redux/reducer/authReducer'
import { useNavigate } from 'react-router-dom'

function UpdateEmail() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector((state) => state.AuthReducer.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: user.email,
    },
    validationSchema: EmailScheme,

    onSubmit: async (values) => {
      try {
        const data = await updateEmail(user.id, values.email)
        if (data) {
          dispatch(setUser(data))
        }
        onClose()
      } catch (err) {
        console.log(err)
      }
    },
  })

  return (
    <>
      <Flex
        w={'100%'}
        display="flex"
        justifyContent="space-between"
        _hover={{ color: 'brand.lightred', bg: '' }}
        alignItems="center"
        bg={'transparent'}
        paddingLeft={'20px'}
        fontWeight={'500'}
        cursor={'pointer'}
        fontSize={{ base: '12px', md: '16px' }}
        onClick={onOpen}
      >
        <Flex alignItems={'center'} gap={'5'}>
          {user?.email}
          {user?.isVerified ? (
            <Flex alignItems={'center'} gap={'4px'}>
              <Icon as={CheckBadgeIcon} color={'blue'} boxSize={{ base: '12px', md: '16px' }} />
              <Text color={'brand.lightred'}>Verified</Text>
            </Flex>
          ) : (
            <Text fontSize={'14px'} color={'brand.lightred'}>
              Verify Email
            </Text>
          )}
        </Flex>
        <span>
          <Icon as={ChevronRightIcon} />
        </span>
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', md: 'md' }}>
          <ModalOverlay />
          <form onSubmit={formik.handleSubmit}>
            <ModalContent>
              {user?.isVerified ? (
                <>
                  <ModalHeader fontSize={{ base: '14px', md: '24px' }}>Edit Email</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl isInvalid={!!(formik.touched.email && formik.errors.email)}>
                      <FormLabel fontSize={{ base: '12px', md: '16px' }}>Email</FormLabel>
                      <Input
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />

                      {formik.touched.email && formik.errors.email && (
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                      )}
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      bg={'brand.lightred'}
                      fontSize={{ base: '12px', md: '16px' }}
                      size={{ base: 'sm', md: 'md' }}
                      color={'white'}
                      _hover={{ bg: '#f62252' }}
                      _active={{ bg: '#f95278' }}
                      mr={3}
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={onClose}
                      variant={'outline'}
                      borderColor={'brand.lightred'}
                      bg={'white'}
                      color={'brand.lightred'}
                      fontSize={{ base: '12px', md: '16px' }}
                      size={{ base: 'sm', md: 'md' }}
                      _hover={{ borderColor: '#f62252', color: '#f62252' }}
                      _active={{ borderColor: '#f95278', color: '#f95278' }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      dispatch(logoutSuccess()), navigate('/new-unverified-email')
                    }}
                  >
                    Verify your email
                  </Button>
                </>
              )}
            </ModalContent>
          </form>
        </Modal>
      </Flex>
    </>
  )
}

export default UpdateEmail
