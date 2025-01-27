import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import OrderManagementBody from '../../components/order-management'
import { getOrderManagement } from './service/getOrderManagement'
import { getWarehouse } from './service/getWarehouse'
import { useSelector } from 'react-redux'

const OrderManagement = () => {
  const [orderData, setOrderData] = useState([])
  const [warehouseData, setWarehouseData] = useState([])
  const [selectOrderStatusId, setSelectOrderStatusId] = useState(() => {
    const storedTab = localStorage.getItem('statusOrder')
    return location.state?.status || (storedTab ? JSON.parse(storedTab) : [2])
  })

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [pagination, setPagination] = useState([])
  const orderDateRef = useRef('')

  const user = useSelector((state) => state.AuthReducer.user)
  const adminWarehouse = user?.roleId === 2 ? user?.warehouseId : undefined;
  
  const refreshOrder = async (orderNumber, warehouseId) => {
    try {
      const data = await getOrderManagement(
        adminWarehouse,
        orderNumber,
        orderDateRef.current,
        warehouseId,
        selectOrderStatusId,
        page,
        pageSize,
      )
      setOrderData(data?.orders)
      setPagination(data?.pagination)
    } catch (error) {
      console.error('Error fetching order data:', error)
    }
  }

  const refreshWarehouse = async () => {
    try {
      const data = await getWarehouse()
      setWarehouseData(data)
      // setLoading(false)
    } catch (error) {
      console.error('Error fetching warehouse data:', error)
      // setLoading(false)
    }
  }
  useEffect(() => {
    refreshOrder()
    refreshWarehouse()
  }, [page, pageSize, selectOrderStatusId])
  useEffect(() => {
    const shouldRefresh = location.state?.refresh
    if (shouldRefresh) {
      refreshOrder()
    }
  }, [location.state?.refresh]) // Add orderData as a dependency to re-run the effect when orderData changes

  const handleOrderNumberSubmit = (orderNumber) => {
    refreshOrder(orderNumber)
  }

  const handleOrderDateSubmit = (date) => {
    orderDateRef.current = date
    refreshOrder(undefined)
  }

  const handleWarehouseSubmit = (warehouseId) => {
    refreshOrder(undefined, warehouseId)
  }

  const handleTabClick = (...additionalParams) => {
    setSelectOrderStatusId([...additionalParams])
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }
  return (
    <>
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderManagementBody
          user={user}
          orderData={orderData}
          warehouseData={warehouseData}
          onOrderNumberSubmit={handleOrderNumberSubmit}
          onOrderDateSubmit={handleOrderDateSubmit}
          onWarehouseSubmit={handleWarehouseSubmit}
          onTabClick={handleTabClick}
          onPageChange={handlePageChange}
          pagination={pagination}
        />
      </Box>
    </>
  )
}
export default OrderManagement
