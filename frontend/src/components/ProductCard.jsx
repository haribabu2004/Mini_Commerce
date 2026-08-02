import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import {
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogFooter,
} from "./ui/dialog.jsx";
import { LuSquarePen, LuTrash2 } from "react-icons/lu";

import { useProductStore } from "../store/product.js";
import { useState } from "react";
import { toaster } from "./ui/toaster";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setOpen(false);

    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
    });
  };

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg="white"
      _dark={{ bg: "gray.800" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text
          fontWeight="bold"
          fontSize="xl"
          color="gray.600"
          _dark={{ color: "gray.200" }}
          mb={4}
        >
        ₹{product.price}
        </Text>

        <HStack gap={2}>
          <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger asChild>
              <IconButton aria-label="Edit product" colorPalette="blue">
                <LuSquarePen />
              </IconButton>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>

              <DialogBody>
                <VStack gap={4}>
                  <Input
                    placeholder="Product Name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Image URL"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </DialogBody>

              <DialogFooter>
                <Button variant="outline" mr={3} onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  colorPalette="blue"
                  onClick={() =>
                    handleUpdateProduct(product._id, updatedProduct)
                  }
                >
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>

          <IconButton aria-label="Delete product" colorPalette="red">
            <LuTrash2 onClick={() => handleDeleteProduct(product._id)} />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
