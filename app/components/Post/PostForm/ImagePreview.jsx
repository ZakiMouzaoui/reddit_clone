import { Flex, Image } from "@chakra-ui/react";
import React, { memo } from "react";

function ImagePreview({ img }) {
  return (
    <Flex borderRadius={4} bg={"blackAlpha.100"} width={"50%"} height={200}>
      <Image
        src={img}
        objectFit={"cover"}
        width={"100%"}
        borderRadius={4}
      ></Image>
    </Flex>
  );
}

export default memo(ImagePreview);
