import { Flex } from "@chakra-ui/react";
import React, { memo, useEffect } from "react";
import TabItems from "./PostForm/TabItems";
import Form from "./PostForm/Form";
import { useSetRecoilState } from "recoil";
import { currentCommunity } from "@/app/atoms/postFormAtom";
import { useParams } from "next/navigation";

function CreatePostForm() {
  const setCurrentCommunity = useSetRecoilState(currentCommunity);
  const { communityId } = useParams();

  useEffect(() => {
    setCurrentCommunity(communityId || null);
  }, []);
  return (
    <Flex width={"100%"} bg={"white"} borderRadius={4} direction={"column"}>
      <TabItems></TabItems>
      <Form></Form>
    </Flex>
  );
}

export default memo(CreatePostForm);
