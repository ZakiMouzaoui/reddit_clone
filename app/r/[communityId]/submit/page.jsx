"use client";

import { authModalState } from "@/app/atoms/authModalAtom";
import CreatePostForm from "@/app/components/Post/CreatePostForm";
import { auth, firestore } from "@/app/firebase/client";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { currentCommunityAtom } from "@/app/atoms/communitiesAtom";
import AboutSkeleton from "@/app/components/Community/AboutSkeleton";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { doc } from "firebase/firestore";
import AboutCommunity from "@/app/components/Community/AboutCommunity";
import PostRules from "@/app/components/Post/PostRules";

function Submit() {
  const setAuthModalState = useSetRecoilState(authModalState);
  const setCommunityState = useSetRecoilState(currentCommunityAtom);

  const [user] = useAuthState(auth);
  const { communityId } = useParams();

  const { isLoading, data } = useFirestoreDocumentData(
    ["communities", communityId],
    doc(firestore, "communities", communityId),
    { subscribe: true, idField: "_id" }
  );

  useEffect(() => {
    if (data) {
      setCommunityState(data);
    }
  }, [data]);

  return (
    <Flex width={"100%"} bg={"#dae0e6"} minH={"100vh"}>
      <Flex gap={4} width={"96%"} marginX={"auto"} maxW={"1100px"}>
        <Flex width={{ base: "100%", lg: "70%" }}>
          {user ? (
            <Flex mt={6} width={"100%"} direction={"column"}>
              <Box
                paddingBottom={2}
                borderBottom={"1px solid"}
                borderBottomColor={"white"}
                marginBottom={2}
              >
                <Text
                  fontSize={"lg"}
                  fontWeight={"semibold"}
                  color={"blackAlpha.900"}
                >
                  Create a post
                </Text>
              </Box>
              <CreatePostForm></CreatePostForm>
            </Flex>
          ) : (
            <Flex
              direction={"column"}
              gap={2}
              align={"center"}
              justify={"center"}
              width={"100%"}
              height={"100vh"}
            >
              <Text fontSize={"1.25rem"}>Please login to create a post</Text>
              <Button
                color={"white"}
                bg={"blue.500"}
                border={"none"}
                _hover={{ bg: "blue.400" }}
                borderRadius={20}
                width={24}
                height={8}
                onClick={() =>
                  setAuthModalState({ isOpened: true, view: "login" })
                }
              >
                Login
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex
          display={{ base: "none", lg: "flex" }}
          direction={"column"}
          mt={16}
          width={"30%"}
          gap={4}
        >
          <>
            {isLoading ? (
              <AboutSkeleton></AboutSkeleton>
            ) : (
              <AboutCommunity
                community={data}
                isModerator={false}
              ></AboutCommunity>
            )}
            <PostRules></PostRules>
          </>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Submit;
