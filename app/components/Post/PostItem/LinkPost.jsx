import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { PiShareBold } from "react-icons/pi";

export default function LinkPost({ link }) {
  return (
    <Flex gap={1} align={"center"}>
      <Text
        onClick={() => window.open(link, "_blank")}
        color={"blue.500"}
        _hover={{ textDecoration: "underline" }}
        fontSize={"0.85rem"}
      >
        {link}
      </Text>
      <Icon boxSize={"1rem"} color={"blue.500"} as={PiShareBold}></Icon>
    </Flex>
  );
}
