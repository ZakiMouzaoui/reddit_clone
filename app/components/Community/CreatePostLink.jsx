import { Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { formTabState } from "@/app/atoms/formTabAtom";

function CreatePostLink({ communityId }) {
  const router = useRouter();

  const setTabState = useSetRecoilState(formTabState);

  const handleClick = (index) => {
    setTabState({ index });
    if (communityId) {
      router.push(`/r/${communityId}/submit`, undefined, { shallow: true });
    } else {
      router.push("/r/submit", undefined, { shallow: true });
    }
  };

  return (
    <Flex
      borderRadius={4}
      border={"1px solid"}
      borderColor={"blackAlpha.400"}
      padding={2}
      bg={"white"}
      justify={"center"}
      align={"center"}
      width={"100%"}
    >
      <Icon
        cursor={"pointer"}
        color={"blackAlpha.500"}
        as={FaReddit}
        boxSize={10}
      ></Icon>
      <Input
        mx={2}
        _hover={{ borderColor: "blue.500" }}
        _focus={{ boxShadow: "none", outline: "none" }}
        placeholder={"Create Post"}
        bg={"blackAlpha.50"}
        onFocus={() => handleClick(0)}
        _placeholder={{ color: "blackAlpha.500" }}
      ></Input>
      <Flex
        justify={"center"}
        align={"center"}
        padding={2}
        cursor={"pointer"}
        _hover={{ bg: "blackAlpha.200" }}
        borderRadius={4}
        onClick={() => handleClick(1)}
      >
        <Icon
          margin={"auto"}
          color={"blackAlpha.500"}
          boxSize={5}
          as={IoImageOutline}
        ></Icon>
      </Flex>
      <Flex
        justify={"center"}
        align={"center"}
        padding={2}
        cursor={"pointer"}
        _hover={{ bg: "blackAlpha.200" }}
        borderRadius={4}
        onClick={() => handleClick(2)}
      >
        <Icon color={"blackAlpha.500"} boxSize={4} as={ImAttachment}></Icon>
      </Flex>
    </Flex>
  );
}

export default CreatePostLink;
