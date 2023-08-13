import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import storage from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { register } from "../../Api/serverAPI";
import { useAuth } from "../../context/auth";
import { useChat } from "../../context/ChatProvider";

const Signup = () => {
  const [showPassword, setShowPassowrd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState("");
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(0);
  const [uploadState, setUploadState] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { setSelectedChat } = useChat();
  const location = useLocation();

  let from = "/";
  if (location.state && location.state.from && location.state.from.pathname) {
    from = location.state.from.pathname;
  }

  const handleClick = () => {
    setShowPassowrd((prev) => !prev);
  };

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await register(name, email, password, profilePic);

      toast({
        title: "User registered successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setIsLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setAuth(data);
      navigate(location, { replace: true });
      setSelectedChat(null);
    } catch (error) {
      if (error?.response?.status === 409)
        toast({
          title: error?.response?.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      setIsLoading(false);
    }
  };

  const uploadImage = async (picFile) => {
    setShowProgress(true);
    setIsLoading(true);

    const storageRef = ref(storage, `/profilePics/${picFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, picFile);

    setFileUploaded(picFile.name);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            snapshot.totalBytes > 0
              ? Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
              : 0;

          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              setUploadState("Upload is paused");
              break;
            case "running":
              setUploadState("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          setUploadState("Upload successful");

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfilePic(downloadURL);

            resolve();
            setIsLoading(false);
          });
        }
      );
    });
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="signUpEmail" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="signUppassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
        />
      </FormControl>
      {showProgress && (
        <>
          <CircularProgress value={progress}>
            <CircularProgressLabel>{progress}%</CircularProgressLabel>
          </CircularProgress>
          <p>File Name: {fileUploaded}</p>
          Status: {uploadState}
        </>
      )}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        disabled={!name || !email || !password || !confirmPassword}
        isLoading={isLoading}
        backgroundColor="#46c556"
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
