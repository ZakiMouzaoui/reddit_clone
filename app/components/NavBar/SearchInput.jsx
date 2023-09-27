import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";

function SearchInput() {
  return (
    <Flex flexGrow={1}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon
            as={Search2Icon}
            color={"blackAlpha.600"}
            fontWeight={"light"}
            mt={1}
          />
        </InputLeftElement>

        <Input
          borderRadius={50}
          placeholder={"Search Reddit"}
          _placeholder={{
            color: "blackAlpha.600",
            visibility: ["hidden", "visible"],
          }}
          _hover={{
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            boxShadow: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="blackAlpha.50"
        />
      </InputGroup>
    </Flex>
  );
}

export default SearchInput;
