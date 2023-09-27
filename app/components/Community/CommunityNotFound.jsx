import { communityModalState } from "@/app/atoms/createCommunityModalAtom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";

function CommunityNotFound() {
  const setModalState = useSetRecoilState(communityModalState);

  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      bg={"#dae0e6"}
      h={"100vh"}
      gap={5}
    >
      <Box height={100} borderRadius={50} width={100} bg={"#A8a8a8"}></Box>
      <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"1.125rem"}>
        Sorry, there aren’t any communities on Reddit with that name.
      </Text>
      <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"0.875rem"}>
        This community may have been banned or the community name is incorrect.
      </Text>
      <Flex mt={4} gap={3} align={"center"}>
        <Button
          borderRadius={20}
          height={"2rem"}
          border={"1px solid"}
          color={"blue.500"}
          borderColor={"blue.500"}
          bg={"transparent"}
          onClick={() => setModalState((prev) => ({ ...prev, isOpened: true }))}
        >
          Create Community
        </Button>
        <Link href={"/"}>
          <Button
            borderRadius={20}
            height={"2rem"}
            border={"none"}
            color={"white"}
            bg={"blue.500"}
            _hover={{ bg: "blue.400" }}
          >
            GO HOME
          </Button>
        </Link>{" "}
      </Flex>
    </Flex>
  );
}

export default CommunityNotFound;
