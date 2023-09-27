"use client";

import { Flex } from "@chakra-ui/react";
import React from "react";

function LayoutContent(props) {
  return (
    <Flex bg={"#dae0e6"} justify={"center"}>
      <Flex
        maxWidth={props.maxWidth || "900px"}
        width={props.width || "100%"}
        paddingY={4}
        gap={5}
        height={"100%"}
      >
        <Flex mx={{ base: 2, md: 0 }} width={{ base: "100%", md: "65%" }}>
          {props.children[0]}
        </Flex>
        <Flex
          border={"1px solid red"}
          width={"auto"}
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {props.children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LayoutContent;
