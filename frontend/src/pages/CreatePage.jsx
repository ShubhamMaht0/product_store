import { useColorModeValue } from '@/components/ui/color-mode';
import { toaster } from '@/components/ui/toaster';
import { useProductStore } from '@/store/product.js';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const CreatePage = () => {
  const [newProduct,setNewProduct] = useState({
    name:"",
    price:"",
    image:"",
  });

  const {createProduct} = useProductStore();

  const handleAddProduct = async()=> {
    const {success, message} = await createProduct(newProduct);
    if(!success){
      toaster.create({
        title: "Error",
        description: message,
        type:"error",
      })
    }
    else {
      toaster.create({
        title: "Success",
        description: message,
        type:"success",
      })
    }
    setNewProduct({name:"",price:"",image:""});
  }
  return (
    <Container maxW={'lg'}>
      <VStack
      spaceY={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
        w={"full"} bg={useColorModeValue("white","gray.800")}
        p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spaceY={4}>
            <Input
            placeholder='Product Name'
            name='name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct,name:e.target.value})}
            />
            <Input
            placeholder='Price'
            name='price'
            type='number'
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct,price:e.target.value})}
            />
            <Input
            placeholder='Image URL'
            name='image'
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct,image:e.target.value})}
            />
            <Button
            bgColor={'skyblue'}
            colorScheme={'inherit'}
            onClick={handleAddProduct} 
            w={'full'}
            >Add Product</Button>
          </VStack>

        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage