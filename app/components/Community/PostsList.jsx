import React, { memo, useEffect } from "react";
import PostSkeleton from "../Post/PostSkeleton";
import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import PostItem from "../Post/PostItem/PostItem";
import { useParams } from "next/navigation";
import { collection, orderBy, query, where } from "firebase/firestore";
import { auth, firestore } from "@/app/firebase/client";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { useSetRecoilState } from "recoil";
import { userVotes } from "@/app/atoms/postAtom";
import { useAuthUser } from "@react-query-firebase/auth";
import EmptyPosts from "../Post/EmptyPosts";

function PostsList() {
  const { communityId } = useParams();
  const { data } = useAuthUser(["user"], auth);
  const setUserVotes = useSetRecoilState(userVotes);

  const postsQuery = query(
    collection(firestore, "posts"),
    where("communityId", "==", communityId),
    orderBy("createdAt", "desc")
  );
  const {
    isLoading,
    data: posts,
    error,
  } = useFirestoreQueryData(["posts", communityId], postsQuery, {
    subscribe: true,
    idField: "_id",
  });

  const votesQuery = query(
    collection(firestore, `users/${data?.uid}/postsVotes`)
  );

  const { data: votes } = useFirestoreQueryData(
    ["postsVotes", data?.uid],
    votesQuery,
    {
      idField: "_id",
      subscribe: true,
    }
  );

  useEffect(() => {
    if (votes) {
      setUserVotes(votes);
    }
  }, [votes]);

  if (error) {
    return <h2>Something went wrong</h2>;
  }

  if (isLoading === true) {
    return (
      <Flex direction={"column"} gap={2} width={"100%"}>
        <PostSkeleton />
        <PostSkeleton />
      </Flex>
    );
  }

  return (
    <>
      {posts.length > 0 ? (
        <VStack width={"100%"} spacing={2.5}>
          {posts.map((doc) => (
            <PostItem isDetailsPage={false} key={doc._id} post={doc}></PostItem>
          ))}
        </VStack>
      ) : (
        <EmptyPosts></EmptyPosts>
      )}
    </>
  );
}

export default memo(PostsList);
