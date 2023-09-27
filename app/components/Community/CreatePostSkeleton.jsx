import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React, { memo } from "react";

function CreatePostSkeleton() {
  return (
    <Flex
      borderRadius={4}
      align={"center"}
      bg={"white"}
      padding={2}
      width={"100%"}
    >
      <SkeletonCircle
        startColor="blackAlpha.300"
        endColor="blackAlpha.100"
        height={10}
        width={10}
      ></SkeletonCircle>
      <Skeleton
        startColor="blackAlpha.300"
        endColor="blackAlpha.100"
        ms={2}
        height={10}
        borderRadius={4}
        width={"78%"}
      ></Skeleton>
      <SkeletonCircle
        startColor="blackAlpha.300"
        endColor="blackAlpha.100"
        ms={3}
        width={6}
        height={6}
      ></SkeletonCircle>
      <SkeletonCircle
        startColor="blackAlpha.300"
        endColor="blackAlpha.100"
        ms={2}
        width={6}
        height={6}
      ></SkeletonCircle>
    </Flex>
  );
}

export default memo(CreatePostSkeleton);
