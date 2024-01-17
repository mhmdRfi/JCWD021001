import { Box, Flex, Icon } from '@chakra-ui/react'
import { Body } from '../components/body'
import { useLocation, useParams } from 'react-router-dom'
import { getProduct } from '../services/readProduct'
import { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Navbar } from '../../../components/navbar'
import { SideBar } from '../../../components/sidebar'
import { getProductCategory } from '../services/readProductCategory'

export const Product = () => {
  // useLocation to know url route
  const location = useLocation()

  const { pathname } = location
  const { gender, group, category } = useParams()
  const breadCrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: gender,
      url: `/p/${gender}`,
    },
    {
      label: group,
      url: `/p/${gender}/${group}`,
    },
    {
      label: category,
      url: `/p/${gender}/${group}/${category}`,
    },
  ]
  // Splitting pathname for breadcrumbs
  const segments = pathname.split('/')

  // Empty array state for products
  const [products, setProducts] = useState([])

  // State for filtering products
  const [productName, setProductName] = useState('')
  const [productGender, setProductGender] = useState('')
  const [productGroup, setProductGroup] = useState('')
  const [productCategory, setProductCategory] = useState('')

  // Sidebar
  const [collapseSideBar, setCollapseSideBar] = useState(false)

  const [sortBy, setSortBy] = useState('name')
  const [orderBy, setOrderBy] = useState('ASC')
  // Get product data
  useEffect(() => {
    getProduct(productName, gender, group, category, setProducts, sortBy, orderBy)
  }, [
    productName,
    productGender,
    productGroup,
    productCategory,
    orderBy,
    sortBy,
    gender,
    group,
    category,
    setProductGender,
    setSortBy,
    setOrderBy,
    setProductGroup,
    setProductCategory,
  ])

  // This is for sidebar product categories, and type
  const [productCategories, setProductCategories] = useState([])
  // Get Product Category Data
  useEffect(() => {
    getProductCategory(setProductCategories)
  }, [])

  const toggleSideBar = () => {
    setCollapseSideBar(!collapseSideBar)
  }

  return (
    <Box minH={'100vh'}>
      <Navbar
        collapseSideBar={collapseSideBar}
        setCollapseSideBar={setCollapseSideBar}
        toggleSideBar={toggleSideBar}
      />
      <Box display={{ base: collapseSideBar ? 'block' : 'none', md: 'none' }}>
        <SideBar
          gender={gender}
          group={group}
          category={category}
          setProductGroup={setProductGroup}
          setProductCategory={setProductCategory}
          productCategories={productCategories}
          pathname={pathname}
          collapseSideBar={collapseSideBar}
          setCollapseSideBar={setCollapseSideBar}
          toggleSideBar={toggleSideBar}
          segments={segments}
        />
      </Box>
      <Box display={collapseSideBar ? 'none' : 'block'}>
        <Body
          breadCrumbs={breadCrumbs}
          gender={gender}
          group={group}
          category={category}
          pathname={pathname}
          segments={segments}
          products={products}
          productCategories={productCategories}
          setProductName={setProductName}
          setProductGender={setProductGender}
          setProductGroup={setProductGroup}
          setProductCategory={setProductCategory}
          setOrderBy={setOrderBy}
          setSortBy={setSortBy}
          orderBy={orderBy}
          sortBy={sortBy}
        />
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
