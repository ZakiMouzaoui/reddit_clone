import { Box, Flex, Icon, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { IoGiftOutline } from "react-icons/io5";
import { VscComment } from "react-icons/vsc";
import { PiShareFatLight } from "react-icons/pi";
import { BsBookmark } from "react-icons/bs";
import IconText from "./PostItem/IconText";

function PostSkeleton() {
  return (
    <Flex borderRadius={4} direction={"column"} gap={2} width={"100%"}>
      <Flex gap={3} padding={2} bg={"white"} borderRadius={4}>
        <Flex height={"60px"} direction={"column"} justify={"space-between"}>
          <Icon
            boxSize={"1.5rem"}
            color={"blackAlpha.600"}
            as={BiUpvote}
          ></Icon>
          <Box height={2}></Box>
          <Icon
            boxSize={"1.5rem"}
            color={"blackAlpha.600"}
            as={BiDownvote}
          ></Icon>
        </Flex>
        <Flex mt={1} direction={"column"} width={"100%"}>
          <Skeleton
            startColor="blackAlpha.300"
            endColor="blackAlpha.100"
            height={2}
            width={"150px"}
          ></Skeleton>
          <Skeleton
            startColor="blackAlpha.300"
            endColor="blackAlpha.100"
            height={4}
            width={"300px"}
            mt={4}
          ></Skeleton>
          <Skeleton
            startColor="blackAlpha.300"
            endColor="blackAlpha.100"
            height={32}
            width={"100%"}
            mt={4}
          ></Skeleton>
          <Flex gap={4} align={"center"}>
            <IconText icon={VscComment}></IconText>
            <IconText icon={IoGiftOutline} text={"Award"}></IconText>
            <IconText icon={PiShareFatLight} text={"Share"}></IconText>
            <IconText
              fontSize="1.1rem"
              icon={BsBookmark}
              text={"Save"}
            ></IconText>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PostSkeleton;
