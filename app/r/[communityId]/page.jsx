"use client";

import { currentCommunityAtom } from "@/app/atoms/communitiesAtom";
import AboutCommunity from "@/app/components/Community/AboutCommunity";
import AboutSkeleton from "@/app/components/Community/AboutSkeleton";
import CommunityNotFound from "@/app/components/Community/CommunityNotFound";
import CreatePostLink from "@/app/components/Community/CreatePostLink";
import CreatePostSkeleton from "@/app/components/Community/CreatePostSkeleton";
import Header from "@/app/components/Community/Header";
import PostsList from "@/app/components/Community/PostsList";
import { auth, firestore } from "@/app/firebase/client";
import { Box, Flex } from "@chakra-ui/react";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

export default function page({ params: { communityId } }) {
  const [isFound, setIsFound] = useState(null);
  const [user] = useAuthState(auth);

  const communityQuery = doc(firestore, "communities", communityId);
  const { isLoading, data } = useFirestoreDocumentData(
    ["communities", communityId],
    communityQuery,
    { subscribe: true, idField: "_id" },
    { notifyOnChangeProps: ["data"] }
  );

  const setCurrentCommunity = useSetRecoilState(currentCommunityAtom);

  useEffect(() => {
    if (isLoading === false && !data) {
      setIsFound(false);
    }
    if (data) {
      setCurrentCommunity(data);
    }
  }, [data, isLoading]);

  if (isFound === false) {
    return <CommunityNotFound></CommunityNotFound>;
  }
  return (
    <>
      <Header community={data} id={communityId}></Header>

      <Box width={"100%"} bg={"blackAlpha.200"}>
        <Flex
          paddingY={2}
          gap={4}
          width={"96%"}
          margin={"auto"}
          maxWidth={"900px"}
        >
          <Flex
            alignItems={"flex-start"}
            width={{ sm: "100%", lg: "65%" }}
            gap={4}
            direction={"column"}
          >
            {data ? (
              <CreatePostLink communityId={communityId}></CreatePostLink>
            ) : (
              <CreatePostSkeleton></CreatePostSkeleton>
            )}
            <PostsList></PostsList>
          </Flex>
          <Flex display={["none", "none", "none", "flex"]} flex={1}>
            {" "}
            {isLoading === true || !data ? (
              <AboutSkeleton></AboutSkeleton>
            ) : (
              <AboutCommunity
                isModerator={user?.uid === data.moderator}
                community={data}
              ></AboutCommunity>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
