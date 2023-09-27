"use client";

import { currentCommunityAtom } from "@/app/atoms/communitiesAtom";
import { userVotes } from "@/app/atoms/postAtom";
import AboutCommunity from "@/app/components/Community/AboutCommunity";
import AboutSkeleton from "@/app/components/Community/AboutSkeleton";
import PostItem from "@/app/components/Post/PostItem/PostItem";
import PostSkeleton from "@/app/components/Post/PostSkeleton";
import { auth, firestore } from "@/app/firebase/client";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import {
  useFirestoreDocumentData,
  useFirestoreQueryData,
} from "@react-query-firebase/firestore";
import { collection, doc, query } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

function page() {
  const { postId, communityId } = useParams();
  const [user] = useAuthState(auth);
  const setUserVotes = useSetRecoilState(userVotes);

  const [error, setError] = useState(false);

  const postRef = doc(firestore, "posts", postId);
  const { data, isLoading, refetch } = useFirestoreDocumentData(
    ["posts", postId],
    postRef,
    {
      subscribe: true,
      idField: "_id",
    }
  );

  const communityRef = doc(firestore, "communities", communityId);
  const { data: community, isLoading: loadingCommunity } =
    useFirestoreDocumentData(["communities", communityId], communityRef, {
      subscribe: true,
      idField: "_id",
    });

  const votesQuery = query(
    collection(firestore, `users/${user?.uid}/postsVotes`)
  );

  const { data: votes } = useFirestoreQueryData(
    ["postsVotes", user?.uid],
    votesQuery,
    {
      idField: "_id",
      subscribe: true,
    }
  );

  const setCurrentCommunity = useSetRecoilState(currentCommunityAtom);

  useEffect(() => {
    if (votes) {
      setUserVotes(votes);
    }
  }, [votes]);

  useEffect(() => {
    if (!isLoading && !data) {
      setError(true);
    }
    if (community) {
      setCurrentCommunity(community);
    }
  }, [isLoading, community]);

  if (error) {
    return (
      <VStack justify={"center"} height={"100vh"}>
        <Text fontSize={"1.2rem"} color={"blackAlpha.600"}>
          Something went wrong. Just don't panic
        </Text>
        <Button
          bg={"blue.500"}
          height={"2rem"}
          borderRadius={"2rem"}
          color={"white"}
          _hover={{ bg: "blue.400" }}
          onClick={refetch}
        >
          Retry
        </Button>
      </VStack>
    );
  }

  return (
    <>
      <Box width={"100%"} bg={"blackAlpha.200"} minH={"100vh"}>
        <Flex
          paddingY={4}
          gap={4}
          width={"96%"}
          margin={"auto"}
          maxWidth={"900px"}
        >
          <Flex width={{ sm: "100%", lg: "65%" }}>
            {isLoading ? (
              <VStack width={"100%"}>
                <PostSkeleton></PostSkeleton>
                <PostSkeleton></PostSkeleton>
              </VStack>
            ) : (
              <PostItem post={data} isDetailsPage={true}></PostItem>
            )}
          </Flex>
          <Flex display={["none", "none", "none", "flex"]} flex={1}>
            {" "}
            {loadingCommunity === true || !data ? (
              <AboutSkeleton></AboutSkeleton>
            ) : (
              <AboutCommunity community={community}></AboutCommunity>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default page;
