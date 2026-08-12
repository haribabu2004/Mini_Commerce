import { useState, useRef, useEffect } from "react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
} from "./ui/dialog.jsx"; // Using your UI dialog/drawer wrappers
import {
  IconButton,
  Input,
  VStack,
  HStack,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { LuMessageSquare, LuSend } from "react-icons/lu";

export const ChatBotDrawer = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI Sales Assistant. How can I help you find products today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    // 1. Append user message to UI state immediately
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      // 2. Call backend Express Gemini endpoint using native fetch
      const res = await fetch("/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: userText }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.reply || "Sorry, I couldn't fetch a response right now.",
          },
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "AI Assistant is currently offline. Please check your backend server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      {/* Floating Circular Action Button in Bottom-Right Corner */}
      <DialogTrigger asChild>
        <IconButton
          aria-label="Open AI Assistant"
          colorPalette="blue"
          rounded="full"
          size="lg"
          position="fixed"
          bottom="30px"
          right="30px"
          shadow="2xl"
          zIndex={1000}
        >
          <LuMessageSquare />
        </IconButton>
      </DialogTrigger>

      {/* Slide-out Drawer Panel */}
      <DialogContent>
        <DialogHeader bg="blue.600" color="white">
          <DialogTitle color="white">🤖 AI Sales Assistant</DialogTitle>
          <DialogCloseTrigger color="white" />
        </DialogHeader>

        <DialogBody display="flex" flexDirection="column" p={4} bg="gray.50">
          {/* Chat Messages Log */}
          <VStack flex="1" overflowY="auto" gap={3} align="stretch" pr={2}>
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                bg={msg.sender === "user" ? "blue.500" : "white"}
                color={msg.sender === "user" ? "white" : "black"}
                px={4}
                py={2}
                rounded="lg"
                shadow="xs"
                maxW="80%"
                whiteSpace="pre-wrap"
              >
                <Text fontSize="sm">{msg.text}</Text>
              </Box>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <HStack
                alignSelf="flex-start"
                bg="white"
                px={4}
                py={2}
                rounded="lg"
              >
                <Spinner size="xs" color="blue.500" />
                <Text fontSize="xs" color="gray.500">
                  AI is searching inventory...
                </Text>
              </HStack>
            )}
            <div ref={chatEndRef} />
          </VStack>

          {/* User Input Controls */}
          <HStack mt={4}>
            <Input
              placeholder="Ask about products, prices..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              bg="white"
              color="black"
              _placeholder={{ color: "gray.500" }}
            />
            <IconButton
              aria-label="Send message"
              colorPalette="blue"
              onClick={handleSend}
              loading={loading}
            >
              <LuSend />
            </IconButton>
          </HStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
