import {
  Box,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import JoinButton from "./JoinButton";
import { collection, query } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth, firestore } from "@/app/firebase/client";

function Header({ community }) {
  const { data: user } = useAuthUser(["user"], auth);
  const q = query(
    collection(firestore, `users/${user?.uid}/communitySnippets`)
  );
  const { data: snippets, isLoading: loading } = useFirestoreQueryData(
    ["myCommunities"],
    q,
    {
      subscribe: true,
      idField: "_id",
    }
  );

  return (
    <Flex height={"44"} direction={"column"} width={"100%"}>
      <Box width={"100%"} flex={0.5} bg={"blue.500"}></Box>
      <Box width={"100%"} flex={0.5} bg="whiteAlpha.200">
        <Box
          maxW={"900px"}
          position={"relative"}
          margin={"auto"}
          width={"96%"}
          wordBreak={"break-all"}
        >
          <Flex
            border={"4px solid white"}
            borderRadius={"50%"}
            width={"4.7rem"}
            height={"4.7rem"}
            position={"absolute"}
            top={-4}
            justify={"center"}
            align={"center"}
          >
            {" "}
            {!community ? (
              <SkeletonCircle
                startColor="blackAlpha.300"
                endColor="blackAlpha.100"
                size={"64px"}
              ></SkeletonCircle>
            ) : (
              <Icon boxSize={"4.5rem"} as={FaReddit} color={"#fc471e"}></Icon>
            )}
          </Flex>
          <Flex>
            <>
              {!community ? (
                <Flex mt={2} ms={24} justify={"center"} direction={"column"}>
                  <Skeleton
                    startColor="blackAlpha.300"
                    endColor="blackAlpha.100"
                    mb={2}
                    height={"1.2rem"}
                    width={"10rem"}
                  ></Skeleton>
                  <Skeleton
                    startColor="blackAlpha.300"
                    endColor="blackAlpha.100"
                    height={"0.9rem"}
                    width={"6rem"}
                  ></Skeleton>
                </Flex>
              ) : (
                <Flex ms={24} justify={"center"} direction={"column"}>
                  <Flex align={"center"}>
                    <Text fontWeight={"semibold"} fontSize={"x-large"}>
                      {community._id}
                    </Text>
                  </Flex>

                  <Text
                    fontWeight={"semibold"}
                    color={"blackAlpha.600"}
                  >{`r/${community._id}`}</Text>
                </Flex>
              )}

              {community && (
                <JoinButton
                  community={community}
                  hasJoined={snippets?.some((doc) => doc._id === community._id)}
                ></JoinButton>
              )}
            </>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Header;
