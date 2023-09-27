import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import Communities from "./Communities";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "@/app/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { currentCommunityAtom } from "@/app/atoms/communitiesAtom";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

function Directory() {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen } = useDisclosure();

  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const communitiesQuery = collection(
    firestore,
    `users/${user.uid}/communitySnippets`
  );

  const { isLoading: loading, data } = useFirestoreQueryData(
    ["myCommunities"],
    communitiesQuery,
    { subscribe: true, idField: "_id" }
    // { enabled: isOpen }
  );

  return (
    <Flex>
      <Menu>
        <MenuButton
          // width={"100%"}
          // maxWidth={"300px"}
          // minW={"150px"}
          borderRadius={5}
          border={"1px solid"}
          borderColor={"gray.200"}
          bg="#fafafa"
          _hover={{
            border: "1px solid",
            borderColor: "gray.200",
            outline: "none",
            boxShadow: "none",
          }}
          _focus={{
            bg: "#fafafa",
          }}
          _expanded={{
            border: "1px solid",
            borderColor: "gray.200",
            bg: "#fafafa",
            outline: "none",
            boxShadow: "none",
          }}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          //   onClick={getCommunities}
          onClick={onOpen}
        >
          <Flex
            // overflowX={"auto"}
            // textOverflow={"ellipsis"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            align={"center"}
            gap={2}
          >
            {currentCommunity?.imgUrl ? (
              <Image
                borderRadius={"full"}
                boxSize={"1.5rem"}
                src={currentCommunity.imgUrl}
              ></Image>
            ) : (
              <AiFillHome size={22}></AiFillHome>
            )}
            <Box
              textOverflow={"ellipsis"}
              display={{ base: "none", lg: "unset" }}
            >
              <Text>{currentCommunity?._id || "Home"}</Text>
            </Box>
          </Flex>
        </MenuButton>
        <MenuList
          padding={0}
          border={"none"}
          borderRadius={3}
          boxShadow={"none"}
        >
          <Communities data={data} loading={loading}></Communities>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default memo(Directory);
