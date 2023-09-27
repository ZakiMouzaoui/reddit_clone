import { firestore } from "@/app/firebase/client";
import { VStack } from "@chakra-ui/react";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import PostSkeleton from "../Post/PostSkeleton";
import EmptyPosts from "../Post/EmptyPosts";
import PostItem from "../Post/PostItem/PostItem";

function GuestUserFeeds() {
  const { isLoading, data } = useFirestoreQueryData(
    ["homePosts"],
    query(
      collection(firestore, "posts"),
      orderBy("votesStats", "desc"),
      limit(10)
    ),
    { subscribe: true, idField: "_id" }
  );

  if (isLoading) {
    return (
      <VStack>
        <PostSkeleton></PostSkeleton>
        <PostSkeleton></PostSkeleton>
      </VStack>
    );
  }
  if (data.length === 0) {
    return <EmptyPosts></EmptyPosts>;
  }
  return (
    <>
      {data.map((post, index) => (
        <PostItem isDetailsPage={false} key={index} post={post}></PostItem>
      ))}
    </>
  );
}

export default GuestUserFeeds;
