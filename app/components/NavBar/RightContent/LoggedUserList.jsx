import { Flex, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/client";
import { useResetRecoilState } from "recoil";
import { authModalState } from "@/app/atoms/authModalAtom";

function LoggedUserList() {
  const [signOut, _, __] = useSignOut(auth);
  const resetModalState = useResetRecoilState(authModalState);
  // const [user] = useAuthState(auth);

  // const queryClient = useQueryClient();

  const logout = () => {
    // queryClient.setQueriesData(["communities", user.uid], (_) => ({
    //   data: [],
    // }));
    signOut();
    resetModalState();
  };

  return (
    <MenuList padding={0} border={"none"} borderRadius={3} paddingY={0}>
      <MenuItem
        borderRadius={3}
        _hover={{ bg: "blackAlpha.100" }}
        borderBottom={"1px solid"}
        borderBottomColor={"blackAlpha.200"}
        _active={{ bg: "blackAlpha.100" }}
      >
        <Flex align={"center"} gap={2}>
          <CgProfile size={22}></CgProfile>
          <Text fontWeight={"semibold"} mb={1}>
            Profile
          </Text>
        </Flex>
      </MenuItem>

      <MenuItem
        borderRadius={3}
        onClick={logout}
        _hover={{ bg: "blackAlpha.100" }}
      >
        <Flex align={"center"} gap={2}>
          <HiOutlineLogout size={22} fontWeight={"200"}></HiOutlineLogout>
          <Text fontWeight={"semibold"} mb={1}>
            Logout
          </Text>
        </Flex>
      </MenuItem>
    </MenuList>
  );
}

export default memo(LoggedUserList);
