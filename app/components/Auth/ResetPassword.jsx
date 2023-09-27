import { authModalState } from "@/app/atoms/authModalAtom";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth } from "@/app/firebase/client";
import { errors } from "@/app/firebase/errors";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
  const [success, setSuccess] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);

  const email = useRef("");

  const handleClick = (view) => {
    setAuthModalState((prev) => ({
      ...prev,
      view,
    }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.current.value);
      setSuccess(true);
      setError(undefined);
    } catch (err) {
      setSuccess(false);
      setError(err);
    }
    setLoading(false);
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      width={"70%"}
      margin={"auto"}
      direction={"column"}
    >
      <Image width={"40px"} src="images/redditFace.svg"></Image>
      <Text fontSize={15} fontWeight={"bold"}>
        Reset your password
      </Text>
      <Text mt={2} fontSize={15} textAlign={"center"}>
        Enter the email associated with your account and we'll send you a reset
        link
      </Text>

      {success === false ? (
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <Input
            width={"100%"}
            type="email"
            required
            _hover={{
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _placeholder={{
              color: "gray.500",
            }}
            _focus={{
              outline: "none",
              border: "1px solid",
              boxShadow: "none",
              borderColor: "blue.500",
            }}
            mt={3}
            placeholder="your email"
            ref={email}
          ></Input>
          <Text mb={3} fontSize={12} color={"red"}>
            {error && errors[error.message]}
          </Text>
          <Button
            type="submit"
            borderRadius={50}
            width={"100%"}
            bg={"blue.500"}
            color={"white"}
            height={"36px"}
            _hover={{ bg: "blue.400" }}
            isLoading={loading}
          >
            Reset Password
          </Button>
          <Flex
            mt={3}
            gap={1}
            alignContent={"center"}
            alignItems={"center"}
            justify={"center"}
          >
            <Text
              cursor={"pointer"}
              _hover={{ color: "blue.600" }}
              fontSize={12}
              fontWeight={"bold"}
              color={"blue.500"}
              onClick={() => handleClick("login")}
            >
              LOGIN
            </Text>

            <Text fontSize={12} fontWeight={"bold"} color={"blue.500"}>
              .
            </Text>

            <Text
              cursor={"pointer"}
              _hover={{ color: "blue.600" }}
              fontSize={12}
              fontWeight={"bold"}
              color={"blue.500"}
              onClick={() => handleClick("signup")}
            >
              REGISTER
            </Text>
          </Flex>
        </form>
      ) : (
        <Flex direction={"column"} justify={"center"} align={"center"}>
          <Alert mt={3} status="success">
            <AlertIcon />
            <Text textAlign="center">A reset link was sent to your email!</Text>
          </Alert>
          <Flex align={"baseline"} gap={1}>
            <Text mt="1" fontSize={14}>
              Didn't recieve an email?
            </Text>
            <Text
              fontSize={14}
              color={"blue.500"}
              _hover={{ color: "blue.600" }}
              cursor={"pointer"}
              onClick={() => setSuccess(false)}
            >
              resend
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default ResetPassword;
