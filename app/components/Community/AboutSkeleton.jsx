import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React, { memo } from "react";

const AboutSkeleton = () => {
  return (
    <Flex
      borderRadius={4}
      bg={"white"}
      padding={4}
      direction={"column"}
      width={"100%"}
      height={250}
    >
      <Skeleton
        startColor="blackAlpha.300"
        endColor="blackAlpha.100"
        height={"1rem"}
        width={"69%"}
        mb={2}
      ></Skeleton>
      <Flex mt={4} gap={2} align={"center"}>
        <SkeletonCircle
          startColor="blackAlpha.300"
          endColor="blackAlpha.100"
          width={"3.5rem"}
          height={"3.5rem"}
          mb={2}
        ></SkeletonCircle>

        <Skeleton
          startColor="blackAlpha.300"
          endColor="blackAlpha.100"
          height={"1rem"}
          width={"35%"}
          mb={2}
        ></Skeleton>
      </Flex>
      <Skeleton
        startColor="blackAlpha.300"
        endColor="blackAlpha.100"
        height={"2rem"}
        width={"100%"}
        mb={8}
      ></Skeleton>
      <Skeleton
        startColor="blackAlpha.300"
        endColor="blackAlpha.100"
        height={"0.8rem"}
        width={"72%"}
        mb={2}
      ></Skeleton>
      <Skeleton
        startColor="blackAlpha.300"
        endColor="blackAlpha.100"
        height={"0.8rem"}
        width={"55%"}
      ></Skeleton>
    </Flex>
  );
};

export default memo(AboutSkeleton);
