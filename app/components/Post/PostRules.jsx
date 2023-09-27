import { Divider, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import React, { memo } from "react";
import { FaReddit } from "react-icons/fa";

function PostRules() {
  const rules = [
    "Remember the human",
    "Behave like you would in real life",
    "Look for the original source of content",
    "Search for duplicates before posting",
    "Read the community’s rules",
  ];
  return (
    <Flex
      direction={"column"}
      padding={"0.8rem 1.1rem"}
      bg={"white"}
      borderRadius={"0.25rem"}
      display={{ base: "none", lg: "flex" }}
      width={"100%"}
    >
      <Flex gap={2} align={"center"}>
        <Icon boxSize={"2.5rem"} as={FaReddit} color="#ff4500"></Icon>
        <Text fontWeight={"semibold"}>Posting to Reddit</Text>
      </Flex>
      <VStack align={"flex-start"}>
        <Divider mt={2}></Divider>
        {rules.map((rule, index) => (
          <>
            <Flex fontSize={"0.9rem"} fontWeight={"medium"} gap={1} key={index}>
              <Text>{index + 1}.</Text>
              <Text>{rule}</Text>
            </Flex>
            <Divider></Divider>
          </>
        ))}
      </VStack>
    </Flex>
  );
}

export default memo(PostRules);
