import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../Api/serverAPI";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [showPassword, setShowPassowrd] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const location = useLocation();

  let from = "/";
  if (location.state && location.state.from && location.state.from.pathname) {
    from = location.state.from.pathname;
  }

  const handleClick = () => {
    setShowPassowrd((prev) => !prev);
  };

  const submitHandler = async () => {
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await login(email, password);

      toast({
        title: "User logged in successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setAuth(data);
      navigate(from, { replace: true });
    } catch (error) {
      if (error?.response?.status === 400) {
        toast({
          title: error?.response?.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      if (error?.response?.status === 401) {
        toast({
          title: error?.response?.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="loginEmail"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="loginPassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        backgroundColor="#46c556"
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="blue"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
