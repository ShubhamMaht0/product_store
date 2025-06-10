import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { BsPlusSquare } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useColorMode } from './ui/color-mode'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{
        base: "column",
        sm: "row"
      }}
      >
        <Link to={'/'}>
        <Text
          fontSize={{base:22, sm:28}}
          fontWeight={'bold'}
          textTransform={"uppercase"}
          alignItems={'center'}
          spaceX={2}
          display={"flex"}
          bgGradient={'to-r'} gradientFrom={'cyan.400'} gradientTo={'blue.500'}
          bgClip={'text'}
        >
          Product Store 🛒
        </Text>
        </Link>
        <HStack alignItems={"center"}>
          <Link to={"/create"}>
            <Button><BsPlusSquare></BsPlusSquare></Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <LuSun/>:<IoMoon/>}            
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar