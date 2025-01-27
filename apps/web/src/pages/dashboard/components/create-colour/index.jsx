import {
  Box,
  Text,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Button,
  VStack,
  useToast,
  Heading,
} from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { API_ROUTE } from '../../../../services/route'

export const CreateColour = (props) => {
  // SET TOAST
  const toast = useToast()
  // SET TOAST

  //   SCHEMA
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required').min(1, 'Field cannot be empty'),
  })
  //   SCHEMA

  //   INITIAL VALUE
  const initialValues = {
    name: '',
  }
  //   INITIAL VALUE

  //   CREATE PRODUCT CATEGORY
  const createProductCategory = async (name) => {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.post(
        `${API_ROUTE}/colour`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      toast({
        title: `${res?.data?.message}`,
        status: 'success',
        placement: 'bottom',
      })
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'An unexpected error occurred'
      toast({
        title: `${errorMessage}`,
        status: 'error',
      })
    }
    //   CREATE PRODUCT CATEGORY
  }

  // HANDLE SUBMIT
  const handleSubmit = async (values, { setSubmitting }, actions) => {
    createProductCategory(values.name)
    setSubmitting(false)
  }
  // HANDLE SUBMIT
  return (
    <Box p={'1em'} bgColor={'white'} w={'100%'} minH={'100vh'}>
      <Heading
        as={'h1'}
        fontSize={{ base: '1em', md: '1.5em' }}
        fontWeight={'bold'}
        justifyContent={'space-between'}
      >
        Create Colour
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <VStack>
            <Field name="name">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name} mb={3}>
                  <FormLabel htmlFor="name" fontWeight={'bold'}>
                    Colour Name
                  </FormLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Type Product Name Here"
                    borderColor={'transparent'}
                    focusBorderColor={'transparent'}
                    bgColor={'grey.50'}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              alignSelf={'flex-end'}
              type="submit"
              _hover={{
                bgColor: 'redPure.500',
              }}
              w={'5em'}
              bgColor={'redPure.500'}
              color={'white'}
              isLoading={false}
            >
              Submit
            </Button>
          </VStack>
        </Form>
      </Formik>
    </Box>
  )
}
