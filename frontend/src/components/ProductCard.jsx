import { Box, Button, Group, Heading, HStack, IconButton, Image, Input, Popover, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useColorModeValue } from './ui/color-mode'
import { useProductStore } from '@/store/product.js'
import { toaster } from './ui/toaster'
import { Field, Portal } from '@ark-ui/react'

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg = useColorModeValue("white","gray.800");
    const [open, setOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const {deleteProduct, updateProduct} = useProductStore();
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);

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
    };

    const handleUpdateProduct = async (pid, updatedProduct) =>{
        const {success, message} = await updateProduct(pid, updatedProduct);
        setOpen(false);

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
            description: "Product updated successfully.",
            type:"success",
            })
        }
    }
    return (
        <Box
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{transform:"translateY(-5px)",shadow:'xl'}}
        bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/>

            <Box p={2}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack>
                    <IconButton bg={bg} color={'green'} onClick={setOpen}><FaEdit/></IconButton>
                    <IconButton bg={bg} color={'red'} onClick={()=> handleDeleteProduct(product._id)}><MdDelete/></IconButton>
                </HStack>
            </Box>

            <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)} >
                <Portal>
                <Popover.Positioner >
                    <Popover.Content
                    css={{ "--popover-bg": "colors.gray.800" }}
                    style={{
                        marginLeft: '150%',
                    }}
                    >
                        <Popover.Arrow>
                            <Popover.ArrowTip />
                        </Popover.Arrow>
                        <Popover.Body p={4}>
                            <Popover.Title textAlign={'center'} fontWeight="bold" fontSize={'lg'} p={4}>Update Product</Popover.Title>
                            <Stack gap="4">
                                <Field.Root>
                                    <Input placeholder="Product Name" value={updatedProduct.name}
                                    onChange={(e)=> setUpdatedProduct({...updatedProduct, name:e.target.value})}
                                    />
                                </Field.Root>
                                <Field.Root>
                                    <Input placeholder="Price" value={updatedProduct.price}
                                    onChange={(e)=> setUpdatedProduct({...updatedProduct, price:e.target.value})}
                                    />
                                </Field.Root>
                                <Field.Root>
                                    <Input placeholder="Image URL" value={updatedProduct.image}
                                    onChange={(e)=> setUpdatedProduct({...updatedProduct, image:e.target.value})}
                                    />
                                </Field.Root>
                            </Stack>
                        </Popover.Body>
                        <Popover.Footer>
                            <Group>
                                <Button size="sm" onClick={() =>handleUpdateProduct(product._id, updatedProduct)}>
                                Update
                                </Button>
                                <Button size="sm" onClick={()=>setOpen(false)}>Cancel</Button>
                            </Group>
                        </Popover.Footer>
                    </Popover.Content>
                </Popover.Positioner>
                </Portal>
            </Popover.Root>

        </Box>
    )
}

export default ProductCard