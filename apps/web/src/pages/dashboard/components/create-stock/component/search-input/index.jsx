import { InputGroup, Input, InputRightElement, Icon, useDisclosure } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const SearchInput = (props) => {
  // FILTER
  const [filter, setFilter] = useState('')

  //   HANDLE KEY PRESS
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props?.setProductNameFilter(filter)
    }
  }
  const navigate = useNavigate()
  const handleNavigate = () => {
    if (props?.pageValue) {
      navigate('/dashboard/product-list?pa=1')
      props?.changeBoxToggle(props?.pageValue)
    }
  }
  return (
    <InputGroup>
      <Input
        id={'exclude'}
        w={{ base: '9em', lg: '20em' }}
        variant={'outline'}
        bg={'white'}
        border={'1px solid lightgray'}
        focusBorderColor={'lightgray'}
        placeholder={'Search a product here'}
        onChange={(e) => {
          setFilter(e?.target?.value)
          props?.changeBoxToggle(1)
          props?.setProductNameFilter(e.target.value)
          handleNavigate()
        }}
        value={filter}
        onKeyDown={handleKeyPress}
      />
      <InputRightElement>
        <Icon as={MagnifyingGlassIcon} />
      </InputRightElement>
    </InputGroup>
  )
}
