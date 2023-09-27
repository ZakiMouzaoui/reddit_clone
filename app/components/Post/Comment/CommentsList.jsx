import React from "react";
import CommentItem from "./CommentItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/client";
import { Icon, Text, VStack } from "@chakra-ui/react";
import { LiaCommentsSolid } from "react-icons/lia";

function CommentsList({ comments }) {
  const [user] = useAuthState(auth);

  const organizeComments = (comments, parentCommentId = null, memo = {}) => {
    if (memo[parentCommentId]) {
      return memo[parentCommentId];
    }

    const organized = [];

    for (const comment of comments) {
      if (comment.parentId === parentCommentId) {
        const replies = organizeComments(comments, comment._id);
        if (replies.length > 0) {
          comment.replies = replies;
        }
        organized.push(comment);
      }
    }
    memo[parentCommentId] = organized;

    return organized;
  };

  const commentsList = organizeComments(comments);

  return (
    <>
      {commentsList.length > 0 ? (
        commentsList.map((comment) => (
          <CommentItem
            key={comment._id}
            isOP={comment.posterId === user?.uid}
            comment={comment}
            userId={user?.uid}
            userName={user?.displayName || user?.email.split("@")[0]}
          ></CommentItem>
        ))
      ) : (
        <VStack my={"3rem"} width={"100%"} justify={"center"}>
          <Icon
            boxSize={"2.5rem"}
            color={"blue.400"}
            as={LiaCommentsSolid}
          ></Icon>
          <Text
            fontWeight={"semibold"}
            fontSize={"1.2rem"}
            color="blackAlpha.500"
          >
            No comments yet
          </Text>
          <Text fontWeight={"semibold"} color="blackAlpha.500">
            Be the first to share what you think!
          </Text>
        </VStack>
      )}
    </>
  );
}

export default CommentsList;
