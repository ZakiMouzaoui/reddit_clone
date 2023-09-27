import { communityModalState } from "@/app/atoms/createCommunityModalAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { FaReddit } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

function HomeReddit() {
  const setCommunityModal = useSetRecoilState(communityModalState);
  return (
    <Flex
      direction={"column"}
      gap={3}
      bg={"white"}
      borderRadius={"0.25rem"}
      position={"relative"}
    >
      <Box width={"100%"} borderRadius={"0.25rem 0.25rem 0 0"}>
        <Image
          height={"100%"}
          width={"100%"}
          src="/images/redditPersonalHome.png"
          borderRadius={"0.25rem 0.25rem 0 0"}
        ></Image>
      </Box>
      <Flex
        direction={"column"}
        padding={"0.8rem 1.1rem"}
        gap={3}
        width={"100%"}
        position={"absolute"}
        bg={"white"}
        top={10}
        borderRadius={"0 0 0.25rem 0.25rem"}
      >
        <Flex gap={2} align={"center"}>
          <Icon as={FaReddit} color={"#fc471e"} boxSize={"2.5rem"}></Icon>
          <Text fontWeight={"semibold"}>Home</Text>
        </Flex>
        <Text>Your personal reddit front page, built for you</Text>
        <Button
          width={"100%"}
          borderRadius={"2rem"}
          height={"1.7rem"}
          bg={"blue.500"}
          _hover={{ bg: "blue.400" }}
          color={"white"}
        >
          Create Post
        </Button>
        <Button
          width={"100%"}
          borderRadius={"2rem"}
          border="1px solid"
          borderColor="blue.500"
          height={"1.7rem"}
          bg={"white"}
          _hover={{ bg: "blue.50" }}
          color={"blue.500"}
          onClick={() => setCommunityModal({ isOpened: true })}
        >
          Create Community
        </Button>
      </Flex>
    </Flex>
  );
}

export default memo(HomeReddit);
