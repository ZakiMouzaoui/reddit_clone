"use client";

import { Box, Flex } from "@chakra-ui/react";
import CreatePostLink from "./components/Community/CreatePostLink";
import TopCommunities from "./components/home/TopCommunities";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/client";
import GuestUserFeeds from "./components/home/GuestUserFeeds";
import LoggedUserFeeds from "./components/home/LoggedUserFeeds";
import PremiumReddit from "./components/home/PremiumReddit";
import HomeReddit from "./components/home/HomeReddit";
export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <Box bg={"blackAlpha.100"} minH={"100vh"}>
      <Flex paddingY={6} gap={4} maxW={"900px"} width={"96%"} marginX={"auto"}>
        <Flex gap={4} direction={"column"} width={{ base: "100%", lg: "65%" }}>
          <CreatePostLink></CreatePostLink>
          {!user ? (
            <GuestUserFeeds></GuestUserFeeds>
          ) : (
            <LoggedUserFeeds></LoggedUserFeeds>
          )}
        </Flex>
        <Flex
          direction={"column"}
          flex={1}
          display={["none", "none", "none", "flex"]}
          gap={4}
        >
          <TopCommunities></TopCommunities>
          <PremiumReddit></PremiumReddit>
          <HomeReddit></HomeReddit>
        </Flex>
      </Flex>
    </Box>
  );
}
