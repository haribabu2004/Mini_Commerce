// import React from "react";

import { Container, VStack, Text, SimpleGrid, Input, InputGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import { useEffect,useState } from "react";

import ProductCard from "../components/ProductCard.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { ChatBotDrawer } from "../components/ChatBotDrawer.jsx";


const HomePage = () => {
  const { fetchProducts, products, pagination } = useProductStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(()=>{
    fetchProducts(page,search);
  },[fetchProducts,page,search])

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  }

  console.log("Result");
  console.log(products);  

  return (
    <Container maxW="6xl" py={12}>
      <VStack gap={8}>
        {" "}
        
        <Text
          fontSize="3xl"
          fontWeight="bold"
          bgGradient="to-r" 
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
          textAlign="center"
        >
          Current Products 🚀
        </Text>

        {/* 1. Search Bar */}
        <InputGroup maxW="500px" w="full">
          <Input
            placeholder="Search products by name..."
            value={search}
            onChange={handleSearchChange}
            bg="white"
            _dark={{ bg: "gray.800" }}
          />
        </InputGroup>

        {/* Prodcut grid */}
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          gap={10} 
          w="full"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign="center"
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to="/create">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
        {/* Server-side Pagination Controls */}
        <Pagination pagination={pagination} onPageChange={(p) => setPage(p)}/>
      </VStack>

      {/* Floating ChatBot */}
      <ChatBotDrawer/>
    </Container>
  );
};

export default HomePage;
