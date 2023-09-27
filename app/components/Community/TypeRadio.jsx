import { Flex, Icon, Radio, Text } from "@chakra-ui/react";
import React from "react";

function TypeRadio({ value, type, desc, icon }) {
  return (
    <Radio _focus={{ boxShadow: "none" }} value={value}>
      <Flex align={"center"}>
        <Icon as={icon} color={"blackAlpha.600"} mr={2} size={18}></Icon>
        <Text mr={2}>{type}</Text>
        <Text color={"blackAlpha.700"} fontSize={13} fontWeight={"normal"}>
          {desc}
        </Text>
      </Flex>
    </Radio>
  );
}

export default TypeRadio;
