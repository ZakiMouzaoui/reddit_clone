import { authModalState } from "@/app/atoms/authModalAtom";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";

function AuthButtons() {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Flex gap={2} align="center">
      <Button
        borderRadius={"2rem"}
        color={"blue.500"}
        bg={"white"}
        border="1px solid"
        borderColor={"blue.500"}
        height={"1.75rem"}
        width={"110px"}
        display={{ base: "none", md: "flex" }}
        fontWeight={400}
        _hover={{
          bg: "gray.100",
        }}
        onClick={() => {
          setAuthModalState({ isOpened: true, view: "login" });
        }}
      >
        Login
      </Button>
      <Button
        borderRadius={"2rem"}
        color={"white"}
        bg={"blue.500"}
        height={"1.75rem"}
        width={"110px"}
        display={{ base: "none", md: "flex" }}
        fontWeight={400}
        _hover={{
          bg: "blue.400",
        }}
        onClick={() => {
          setAuthModalState({ isOpened: true, view: "signup" });
        }}
      >
        Sign Up
      </Button>
    </Flex>
  );
}

export default AuthButtons;
