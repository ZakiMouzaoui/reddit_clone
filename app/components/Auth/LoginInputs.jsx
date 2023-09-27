import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { memo, useRef } from "react";
import { authModalState } from "@/app/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/client";
import { errors } from "@/app/firebase/errors";

function LoginInputs() {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signInWithEmailAndPassword, _, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const email = useRef("");
  const password = useRef("");

  const onSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email.current.value, password.current.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="email"
        ref={email}
        placeholder="Email"
        name="email"
        required
        mb={2}
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
      />
      <Input
        type="password"
        ref={password}
        placeholder="Password"
        name="password"
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
      />
      <Text mb={3} fontSize={"sm"} color={"red"}>
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
        Login
      </Button>
      <Flex gap={1} align={"baseline"} justify={"center"}>
        <Text fontSize={14} mt={1}>
          Forgot your password?{" "}
        </Text>
        <Text
          cursor={"pointer"}
          _hover={{ color: "blue.600" }}
          fontWeight={"semibold"}
          fontSize={14}
          color={"blue.500"}
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
        >
          click here
        </Text>
      </Flex>
      <Flex justify={"center"} align={"baseline"} gap={1}>
        <Text fontSize={15} mt={2}>
          New to reddit?
        </Text>
        <Text
          color={"blue.500"}
          fontWeight={"semibold"}
          _hover={{ color: "blue.600" }}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "signup" }))
          }
        >
          Register
        </Text>
      </Flex>
    </form>
  );
}

export default memo(LoginInputs);
