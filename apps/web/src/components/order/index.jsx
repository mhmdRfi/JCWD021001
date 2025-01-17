import React, { useEffect, useState } from 'react'
import { Box, Text, Icon } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { paymentHandler } from './services/paymentHandler'
import OrderBodyDesktop from './order-body-dekstop'
import OrderBodyMobile from './order-body-mobile'
import ShoppingSummaryDesktop from './shopping-summary-dekstop'
import ShoppingSummaryMobile from './shopping-summary-mobile'
import DeliveryAddress from './deliveryAddress'
import { fetchStockOrder } from './services/fetchStockOrder'
import { useCart } from '../cart-table/service/cartContext'
import toast from 'react-hot-toast'

const OrderBody = ({ orderData, totalPrice, totalQuantity }) => {
  const [stockOrder, setStockOrder] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [nearestWarehouse, setNearestWarehouse] = useState(null)
  const [costResult, setCostResult] = useState('')
  const navigate = useNavigate()

  const { fetchCartCount } = useCart()

  // handle payment
  const handlePaymentClick = (orderItem) => {
    if (costResult !== null && costResult !== undefined && costResult !== 0) {
      paymentHandler(
        orderItem,
        stockOrder,
        selectedAddress,
        nearestWarehouse,
        costResult,
        totalPrice,
        totalQuantity,
        navigate,
        fetchCartCount,
      )
    } else {
      toast.error('Choose shipping service before payment.')
    }
  }

  useEffect(() => {
    fetchStockOrder(orderData, nearestWarehouse, setStockOrder) // Call fetchStockOrder from stockService
  }, [])

  return (
    <Box>
      {orderData?.map((orderItem) => (
        <Box key={orderItem?.id}>
          <Box padding={{ base: '24px 24px 280px 24px', xl: '24px' }}>
            {/* header */}
            <Box display={'flex'} flexDirection={'column'} gap={'6px'} mb={'16px'}>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'12px'}
                cursor={'pointer'}
                onClick={() => navigate('/cart')}
              >
                <Icon as={ArrowLeftIcon} fontSize={'22px'} />
                <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
                  Checkout
                </Text>
              </Box>
            </Box>
            {/* body */}
            <Box display={'flex'} gap={'16px'}>
              <Box
                w={{ base: 'full', xl: '1100px', '2xl': '1420px' }}
                display={'flex'}
                flexDirection={'column'}
                gap={'24px'}
              >
                {/* delivery address */}
                <DeliveryAddress
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                  nearestWarehouse={nearestWarehouse}
                  setNearestWarehouse={setNearestWarehouse}
                  costResult={costResult}
                  setCostResult={setCostResult}
                />
                {/* Product Display */}
                <Box
                  bgColor={'white'}
                  w={'full'}
                  h={'fit-content'}
                  borderRadius={'16px'}
                  padding={'4px'}
                >
                  {/* Desktop Version */}
                  <OrderBodyDesktop orderItem={orderItem} />
                  {/* Mobile Version */}
                  <OrderBodyMobile orderItem={orderItem} />
                </Box>
              </Box>
              {/* Shopping Summary - Desktop Version */}
              <ShoppingSummaryDesktop
                costResult={costResult ? costResult : 0}
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
                handlePaymentClick={() => handlePaymentClick(orderItem)}
              />
            </Box>
          </Box>
          {/* Shopping Summary - Mobile Version */}
          <ShoppingSummaryMobile
            costResult={costResult ? costResult : 0}
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
            handlePaymentClick={() => handlePaymentClick(orderItem)}
          />
        </Box>
      ))}
    </Box>
  )
}

export default OrderBody
