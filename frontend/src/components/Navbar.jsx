import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import React from "react";

// In Chakra v3, use the ColorModeButton from your local snippets folder
import { ColorModeButton } from "./ui/color-mode";
import { LuSquarePlus } from "react-icons/lu";

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack gap={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button variant="ghost">
              <LuSquarePlus size={20} />
            </Button>
          </Link>
          {/* Replaces manual toggle button and hook */}
          <ColorModeButton />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
