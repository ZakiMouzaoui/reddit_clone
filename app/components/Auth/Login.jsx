import { Flex, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import LoginInputs from "./LoginInputs";
import OAuthInputs from "./OAuthInputs";

function Login() {
  return (
    <Flex
      align="center"
      justify="center"
      direction={"column"}
      mb={2}
      width={"70%"}
      margin={"auto"}
    >
      <OAuthInputs></OAuthInputs>
      <LoginInputs></LoginInputs>
    </Flex>
  );
}

export default memo(Login);
