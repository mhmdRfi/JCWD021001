import { Box } from '@chakra-ui/react'
import { Navbar } from '../../../components/navbar'
import { Body } from '../components/body'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductDetails } from '../services/readProductDetails'
export const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  console.log('PRODUCT', product)
  useEffect(() => {
    getProductDetails(id, setProduct)
  }, [])
  return (
    <Box>
      <Navbar />
      <Body product={product} />
    </Box>
  )
}
