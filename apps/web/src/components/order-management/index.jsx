import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Tabs, TabPanels, TabPanel } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import NewOrderTable from './order-management-table/new-orders-table'
import CustomTabList from './custom-tablist'
import useOrderManagementState from './service/useOrderManagementState'
import NewOrder from './order-card/new-order'
import BreadcrumbNav from './breadcrumbnav'
import Search from './search'
import DateFilter from './date-filter'
import MobileMenu from './mobile-menu'
import Pagination from './pagination'
import OnProcess from './order-card/on-process'
import OnProcessTable from './order-management-table/on-process-table'
import OnDeliveryTable from './order-management-table/on-delivery-table'
import OnDelivery from './order-card/on-delivery'
import OrderConfirmedTable from './order-management-table/order-confirmed-table'
import OrderConfirmed from './order-card/order-confirmed'
import OrderCancelledTable from './order-management-table/order-cancelled-table'
import OrderCancelled from './order-card/order-cancelled'
import ModalCheck from './modal-check'

const OrderManagementBody = ({
  user,
  orderData,
  warehouseData,
  onOrderNumberSubmit,
  onOrderDateSubmit,
  onWarehouseSubmit,
  onTabClick,
  onPageChange,
  pagination,
}) => {
  const {
    expandedProducts,
    orderNumber,
    orderDate,
    selectedWarehouse,
    isMobile,
    isTabListVisible,
    handleToggleProducts,
    handleAcceptButton,
    handleRejectButton,
    handleToggleTabList,
    handleOrderNumberChange,
    handleOrderDateChange,
    handleOrderNumberSubmit,
    handleOrderNumberKeyPress,
    handleSelectWarehouseChange,
    checkStock,
    handleCheckStock,
    isOpen,
    onClose,
    handleSendButton,
    handleCanceltOnProcess,
    handleTabChange,
    activeTab,
    handleTabClick,
    formatDate,
  } = useOrderManagementState({
    orderData,
    onOrderNumberSubmit,
    onOrderDateSubmit,
    onWarehouseSubmit,
    onTabClick,
  })
  return (
    <Box display={'flex'}>
      <Box w={'100%'} minH={'100vh'} padding={'24px'}>
        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
              Order Management
            </Text>
            <Box display={{ base: 'none', xl: 'flex' }} alignItems={'center'} gap={'16px'}>
              <Search
                orderNumber={orderNumber}
                handleOrderNumberChange={handleOrderNumberChange}
                handleOrderNumberKeyPress={handleOrderNumberKeyPress}
                handleOrderNumberSubmit={handleOrderNumberSubmit}
              />
              {user.roleId !== 2 && (
                <Box
                  bgColor={'white'}
                  w={'250px'}
                  padding={'4px 12px 4px 8px'}
                  borderRadius={'8px'}
                >
                  <Select
                    placeholder="Warehouse Name"
                    border={'none'}
                    value={selectedWarehouse}
                    onChange={handleSelectWarehouseChange}
                  >
                    {warehouseData.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </Select>
                </Box>
              )}
              <DateFilter orderDate={orderDate} handleOrderDateChange={handleOrderDateChange} />
            </Box>
          </Box>
          <BreadcrumbNav />
          <Box display={{ base: 'flex', xl: 'none' }} alignItems={'center'} gap={'16px'}>
            <Search
              orderNumber={orderNumber}
              handleOrderNumberChange={handleOrderNumberChange}
              handleOrderNumberKeyPress={handleOrderNumberKeyPress}
              handleOrderNumberSubmit={handleOrderNumberSubmit}
            />
            {user.roleId !== 2 && (
              <Box bgColor={'white'} w={'250px'} padding={'4px 12px 4px 8px'} borderRadius={'8px'}>
                <Select
                  placeholder="Warehouse Name"
                  border={'none'}
                  value={selectedWarehouse}
                  onChange={handleSelectWarehouseChange}
                >
                  {warehouseData.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </Select>
              </Box>
            )}

            <DateFilter orderDate={orderDate} handleOrderDateChange={handleOrderDateChange} />
          </Box>
          <MobileMenu
            isMobile={isMobile}
            isTabListVisible={isTabListVisible}
            handleToggleTabList={handleToggleTabList}
          />
          <Tabs index={activeTab} onChange={handleTabChange}>
            <CustomTabList
              isTabListVisible={isTabListVisible}
              handleTabClick={handleTabClick}
              isMobile={isMobile}
            />
            <TabPanels>
              {/* New Order */}
              <TabPanel padding={{ base: '16px 0 16px 0', xl: '16px' }}>
                <NewOrder
                  newOrder={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleRejectButton={handleRejectButton}
                  handleCheckStock={handleCheckStock}
                  formatDate={formatDate}
                />
                <NewOrderTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleRejectButton={handleRejectButton}
                  handleCheckStock={handleCheckStock}
                  formatDate={formatDate}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
              {/* On Process */}
              <TabPanel>
                <OnProcess
                  onProcessOrders={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleSendButton={handleSendButton}
                  handleCanceltOnProcess={handleCanceltOnProcess}
                  formatDate={formatDate}
                />
                <OnProcessTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleSendButton={handleSendButton}
                  handleCanceltOnProcess={handleCanceltOnProcess}
                  formatDate={formatDate}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
              <TabPanel>
                <OnDelivery
                  onDeliveryOrders={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                  formatDate={formatDate}
                />
                <OnDeliveryTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                  formatDate={formatDate}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
              <TabPanel>
                <OrderConfirmed
                  orderConfirmedOrders={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                  formatDate={formatDate}
                />
                <OrderConfirmedTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                  formatDate={formatDate}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
              <TabPanel>
                <OrderCancelled
                  orderCancelledOrders={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                  formatDate={formatDate}
                />
                <OrderCancelledTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                  formatDate={formatDate}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <ModalCheck
            checkStock={checkStock}
            isOpen={isOpen}
            onClose={onClose}
            handleAcceptButton={handleAcceptButton}
          />
        </Box>
      </Box>
    </Box>
  )
}
export default OrderManagementBody
