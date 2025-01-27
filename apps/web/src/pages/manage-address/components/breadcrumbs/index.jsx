import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon,  } from '@chakra-ui/react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@chakra-ui/icons'
export const BreadCrumbs = () => {
  
    return (
      <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem >
          <BreadcrumbLink href='/'>
          <Icon as={HomeIcon} boxSize={'16px'} color={'#838383'} />
          </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem >
          <BreadcrumbLink href='/profile'
          color={'brand.lightred'}
          fontWeight={'700'}
          fontSize={'12px'}>
            Account Setting
          </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={'brand.lightred'}
          fontWeight={'700'}
          fontSize={'12px'}>
              Manage Address
          </BreadcrumbLink>
      </BreadcrumbItem>
  </Breadcrumb>
    )
};
