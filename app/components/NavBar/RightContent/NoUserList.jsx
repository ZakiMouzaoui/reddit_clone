import { authModalState } from "@/app/atoms/authModalAtom";
import { Flex, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { useSetRecoilState } from "recoil";

function NoUserList() {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <MenuList padding={0} borderRadius={3} border={"none"}>
      <MenuItem
        borderRadius={3}
        _hover={{ bg: "blue.500", color: "white" }}
        onClick={() =>
          setAuthModalState((prev) => ({
            isOpened: true,
            view: "login",
          }))
        }
      >
        <Flex align={"center"} gap={2}>
          <MdOutlineLogin size={22}></MdOutlineLogin>
          <Text fontWeight={"semibold"} mb={1}>
            Login / Register
          </Text>
        </Flex>
      </MenuItem>
    </MenuList>
  );
}

export default memo(NoUserList);
