import { Image, Text, VStack } from "@chakra-ui/react";
import React, { memo } from "react";

const EmptyPosts = () => {
  return (
    <VStack bg={"white"} width={"100%"}>
      <Image width={120} alt="not-found" src="/images/sad-alien.webp"></Image>
      <Text mb={3} fontSize={"1.2rem"}>
        Looks like this community has no posts
      </Text>
    </VStack>
  );
};

export default memo(EmptyPosts);
