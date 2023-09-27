import React from "react";
import AuthButtons from "./AuthButtons";
import { Flex, Spinner } from "@chakra-ui/react";
import AuthModal from "../../Auth/AuthModal";

import Icons from "./Icons";
import ProfileMenu from "./ProfileMenu";

function RightContent({ user }) {
  return (
    <Flex align="center" gap={2}>
      {user ? (
        <Icons></Icons>
      ) : (
        <>
          <AuthModal></AuthModal>
          <AuthButtons></AuthButtons>
        </>
      )}

      <ProfileMenu user={user}></ProfileMenu>
    </Flex>
  );
}

export default RightContent;
