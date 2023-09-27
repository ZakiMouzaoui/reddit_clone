import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { PiShieldCheckeredFill } from "react-icons/pi";

function PremiumReddit() {
  return (
    <Flex
      direction={"column"}
      bg={"white"}
      padding={"0.8rem 1.1rem"}
      gap={2}
      borderRadius={"0.25rem"}
    >
      <Flex gap={2}>
        <Icon
          boxSize={"1.6rem"}
          as={PiShieldCheckeredFill}
          color={"#fc471e"}
          mt={0.5}
        ></Icon>
        <Flex fontSize={"0.9rem"} direction={"column"}>
          <Text fontWeight={"semibold"}>Reddit premium</Text>
          <Text>The best reddit experience, with monthly coins</Text>
        </Flex>
      </Flex>
      <Button
        width={"100%"}
        borderRadius={"2rem"}
        height={"1.7rem"}
        bg={"#fc471e"}
        _hover={{ bg: "#ec4400" }}
        color={"white"}
      >
        Try Now
      </Button>
    </Flex>
  );
}

export default memo(PremiumReddit);
