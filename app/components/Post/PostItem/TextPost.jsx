import { Text } from "@chakra-ui/react";
import React from "react";

function TextPost({ body }) {
  return (
    <Text fontSize={"0.9rem"}>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
    </Text>
  );
}

export default TextPost;
