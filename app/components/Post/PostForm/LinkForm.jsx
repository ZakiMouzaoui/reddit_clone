import { isValidLinkState, linkState } from "@/app/atoms/postFormAtom";
import { Flex, Input, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function LinkForm() {
  const [linkValue, setLinkState] = useRecoilState(linkState);
  const errorMessage = useRecoilValue(isValidLinkState).errorMessage;

  return (
    <>
      <Input
        _placeholder={{ color: "blackAlpha.500" }}
        placeholder="Url"
        height={16}
        defaultValue={linkValue}
        onBlur={(e) => setLinkState(e.target.value)}
        borderColor={errorMessage ? "red" : "gray.200"}
        _hover={{ borderColor: errorMessage === false && "red" }}
        _focus={{
          borderColor: errorMessage === false ? "red" : "black",
          boxShadow: "none",
        }}
      ></Input>
      <Text fontSize={"small"} color={"red"}>
        {errorMessage && (
          <Flex justify={"flex-start"} flex={1} width={"100%"}>
            <Text fontSize={"xs"}>{errorMessage}</Text>
          </Flex>
        )}
      </Text>
    </>
  );
}

export default memo(LinkForm);
