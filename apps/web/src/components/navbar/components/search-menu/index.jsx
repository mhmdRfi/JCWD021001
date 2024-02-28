import { InputGroup, Input, InputRightElement, Icon } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const SearchMenu = () => {
  // Input filter by name
  const [filter, setFilter] = useState('')

  // Handle Input Filter
  const setInputFilter = (value) => {
    setFilter(value)
  }

  // Navigate
  const navigate = useNavigate()

  // Handle enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?q=${filter}`)
    }
  }
  return (
    <InputGroup>
      <Input
        w={{ md: '15em', lg: '25em' }}
        variant={'outline'}
        border={'1px solid lightgray'}
        placeholder={'Search a product here'}
        onChange={(e) => {
          setInputFilter(e?.target?.value)
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
