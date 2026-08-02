import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

function App() {
  return (
    <Box minH={"100vh"} bg="gray.100" _dark={{ bg: "gray.900"}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Toaster placement = "bottom"/>
    </Box>
  );
}

export default App;
