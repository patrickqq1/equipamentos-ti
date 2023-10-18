import React from 'react'
import NavBar from '../../components/navBar'
import { Flex } from '@chakra-ui/react'

const Equipaments: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Flex minH="100vh" alignItems="center" justifyContent="center">
        EM MANUNTENÇÃO
      </Flex>
    </div>
  )
}

export default Equipaments
