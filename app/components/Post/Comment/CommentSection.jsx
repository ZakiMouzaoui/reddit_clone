import { auth, firestore } from "@/app/firebase/client";
import { Button, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import React, { memo, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import isEqual from "react-fast-compare";
import CommentInput from "./CommentInput";
import CommentsSkeleton from "./CommentsSkeleton";
import { collection, query, where } from "firebase/firestore";
import CommentsList from "./CommentsList";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { useSetRecoilState } from "recoil";
import { commentVotesAtom } from "@/app/atoms/commentVotesAtom";

function CommentSection({ postId }) {
  const [user] = useAuthState(auth);

  const commentsRef = query(
    collection(firestore, "comments"),
    where("postId", "==", postId)
  );
  const { isLoading, data: comments } = useFirestoreQueryData(
    ["comments", postId],
    commentsRef,
    { subscribe: true, idField: "_id" }
  );

  const commentVotesQuery = collection(
    firestore,
    `users/${user?.uid}/commentVotes`
  );

  const { data: commentVotes } = useFirestoreQueryData(
    ["commentVotes", user?.uid],
    commentVotesQuery,
    { subscribe: true, idField: "_id" }
  );

  const setCommentVotes = useSetRecoilState(commentVotesAtom);

  useEffect(() => {
    if (commentVotes) {
      setCommentVotes(commentVotes);
    }
  }, [commentVotes]);

  return (
    <>
      <VStack align={"flex-start"} justify={"flex-start"} width={"100%"}>
        {user ? (
          <VStack justify={"flex-start"} width={"100%"}>
            <Flex
              width={"100%"}
              align={"flex-start"}
              gap={1}
              fontSize={"0.8rem"}
            >
              <Text>Comment as </Text>
              <Text color={"blue.500"}>
                {user?.displayName || user?.email.split("@")[0]}
              </Text>
            </Flex>
            <CommentInput postId={postId}></CommentInput>
            <Divider my={3}></Divider>
          </VStack>
        ) : (
          <VStack mb={4} justify={"center"} align={"center"} width={"100%"}>
            <Text>Please login to post a comment</Text>
            <Button
              borderRadius={"3xl"}
              color={"white"}
              height={"1.8rem"}
              bg={"blue.500"}
              _hover={{ bg: "blue.400" }}
            >
              Login
            </Button>
          </VStack>
        )}

        {isLoading ? (
          <CommentsSkeleton></CommentsSkeleton>
        ) : (
          <CommentsList
            commentVotes={commentVotes}
            comments={comments}
          ></CommentsList>
        )}
      </VStack>
    </>
  );
}

export default memo(CommentSection, isEqual);
