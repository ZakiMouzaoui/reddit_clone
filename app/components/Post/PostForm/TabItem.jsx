import { formTabState } from "@/app/atoms/formTabAtom";
import { Flex, Icon } from "@chakra-ui/react";
import React, { memo } from "react";
import { useSetRecoilState } from "recoil";

function TabItem({ index, item, selected }) {
  const setTabState = useSetRecoilState(formTabState);

  return (
    <Flex
      color={selected === true ? "blue.500" : "blackAlpha.600"}
      fontWeight={"bold"}
      gap={2}
      justify="center"
      align="center"
      height={12}
      borderRight={index !== 3 && "1px solid"}
      borderBottom={selected === true ? "2px solid" : "1px solid"}
      borderColor={"blackAlpha.200"}
      borderBottomColor={selected === true ? "blue.500" : "blackAlpha.200"}
      _hover={{ bg: "blue.50" }}
      cursor={"pointer"}
      width={"100%"}
      onClick={() => setTabState((prev) => ({ ...prev, index }))}
    >
      <Icon boxSize={18} as={item.icon}></Icon>
      {item.title}
    </Flex>
  );
}

export default memo(TabItem);
