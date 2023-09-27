"use client";

import { authModalState } from "@/app/atoms/authModalAtom";
import CommunityMenu from "@/app/components/Post/CommunityMenu";
import CreatePostForm from "@/app/components/Post/CreatePostForm";
import PostRules from "@/app/components/Post/PostRules";
import { auth } from "@/app/firebase/client";
import { Box, Button, Flex, Menu, MenuButton, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

export default function page() {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Flex width={"100%"} bg={"#dae0e6"} minH={"100vh"}>
      <Flex
        gap={4}
        width={"96%"}
        marginX={"auto"}
        maxW={"1100px"}
        align={"flex-start"}
      >
        <Flex width={{ base: "100%", lg: "70%" }}>
          {user ? (
            <Flex mt={6} width={"100%"} direction={"column"}>
              <Box
                paddingBottom={2}
                borderBottom={"1px solid"}
                borderBottomColor={"white"}
                marginBottom={2}
              >
                <Text
                  fontSize={"lg"}
                  fontWeight={"semibold"}
                  color={"blackAlpha.900"}
                >
                  Create a post
                </Text>
              </Box>
              <CommunityMenu></CommunityMenu>
              <CreatePostForm></CreatePostForm>
            </Flex>
          ) : (
            <Flex
              direction={"column"}
              gap={2}
              align={"center"}
              justify={"center"}
              width={"100%"}
              height={"100vh"}
            >
              <Text fontSize={"1.25rem"}>Please login to create a post</Text>
              <Button
                color={"white"}
                bg={"blue.500"}
                border={"none"}
                _hover={{ bg: "blue.400" }}
                borderRadius={20}
                width={24}
                height={8}
                onClick={() =>
                  setAuthModalState({ isOpened: true, view: "login" })
                }
              >
                Login
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex width={"30%"} display={["none", "none", "none", "flex"]} mt={16}>
          <PostRules></PostRules>
        </Flex>
      </Flex>
    </Flex>
  );
}
