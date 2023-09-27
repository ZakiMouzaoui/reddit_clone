import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Menu, MenuButton, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import LoggedUserList from "./LoggedUserList";
import NoUserList from "./NoUserList";
import { IoSparklesSharp } from "react-icons/io5";

function ProfileMenu({ user }) {
  return (
    <Menu>
      <MenuButton
        borderRadius={5}
        border={"1px solid"}
        borderColor={"gray.200"}
        bg="#fafafa"
        _hover={{
          border: "1px solid",
          borderColor: "gray.200",
          outline: "none",
          boxShadow: "none",
        }}
        _focus={{
          bg: "#fafafa",
        }}
        _expanded={{
          border: "1px solid",
          borderColor: "gray.200",
          bg: "#fafafa",
          outline: "none",
          boxShadow: "none",
        }}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {user ? (
          <Flex align={"center"}>
            <FaRedditSquare size={"1.5rem"} color="gray"></FaRedditSquare>
            <Flex display={{ base: "none", lg: "unset" }}>
              <Flex ms={2} direction={"column"} alignItems={"flex-start"}>
                <Text fontSize={"0.9rem"} fontWeight={"medium"}>
                  {user?.displayName || user?.email?.split("@")[0]}
                </Text>
                <Flex>
                  <IoSparklesSharp color="#fc471e"></IoSparklesSharp>
                  <Text ms={1} fontSize={"0.9rem"} color={"blackAlpha.600"}>
                    1 karma
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <VscAccount size={"1.5rem"}></VscAccount>
        )}
      </MenuButton>

      {user ? <LoggedUserList></LoggedUserList> : <NoUserList></NoUserList>}
    </Menu>
  );
}

export default memo(ProfileMenu);
