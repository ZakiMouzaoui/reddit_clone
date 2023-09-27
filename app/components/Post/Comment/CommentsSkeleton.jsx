import { Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";
import React from "react";

export default function CommentsSkeleton() {
  return (
    <VStack>
      <Flex direction={"column"}>
        <Flex gap={4} align={"center"}>
          <SkeletonCircle width={"3rem"} height={"3rem"}></SkeletonCircle>
          <Skeleton height={"0.8rem"} width={"20rem"}></Skeleton>
        </Flex>
        <Skeleton ms={"4rem"} height={"5rem"} width={"20rem"}></Skeleton>
      </Flex>
      <Flex direction={"column"}>
        <Flex gap={4} align={"center"}>
          <SkeletonCircle width={"3rem"} height={"3rem"}></SkeletonCircle>
          <Skeleton height={"0.8rem"} width={"20rem"}></Skeleton>
        </Flex>
        <Skeleton ms={"4rem"} height={"5rem"} width={"20rem"}></Skeleton>
      </Flex>

      <Flex direction={"column"}>
        <Flex gap={4} align={"center"}>
          <SkeletonCircle width={"3rem"} height={"3rem"}></SkeletonCircle>
          <Skeleton height={"0.8rem"} width={"20rem"}></Skeleton>
        </Flex>
        <Skeleton ms={"4rem"} height={"5rem"} width={"20rem"}></Skeleton>
      </Flex>
    </VStack>
  );
}
