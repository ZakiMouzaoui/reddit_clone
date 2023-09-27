import { Flex, Icon, Skeleton, Text } from "@chakra-ui/react";
import React from "react";

function IconText({
  icon,
  text,
  fontSize = "1.2rem",
  isDetailsPage,
  mbottom,
  onClick,
}) {
  return (
    <Flex
      mt={2}
      padding={1}
      _hover={!isDetailsPage && { bg: "blackAlpha.200" }}
      cursor={!isDetailsPage && "pointer"}
      borderRadius={2}
      align={"center"}
      onClick={onClick}
    >
      <Icon color={"blackAlpha.600"} boxSize={fontSize} as={icon} mr={2}></Icon>

      {text ? (
        <Text
          mb={mbottom && 1.5}
          fontSize={"0.75rem"}
          fontWeight={"bold"}
          color={"blackAlpha.600"}
        >
          {text}
        </Text>
      ) : (
        <Skeleton
          startColor="blackAlpha.300"
          endColor="blackAlpha.100"
          height={2}
          width={"60px"}
        ></Skeleton>
      )}
    </Flex>
  );
}

export default IconText;
