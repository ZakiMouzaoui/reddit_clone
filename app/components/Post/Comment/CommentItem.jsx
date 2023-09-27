import { Box, Button, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import React, { memo, useRef, useState } from "react";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { FaReddit } from "react-icons/fa";
import IconText from "../PostItem/IconText";
import { formatNumberAbbreviated } from "@/utils/formatNumber";
import { format } from "timeago.js";
import JoditEditor from "jodit-react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/app/firebase/client";
import DOMPurify from "dompurify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { commentVotesAtom } from "@/app/atoms/commentVotesAtom";
import { authModalState } from "@/app/atoms/authModalAtom";

function CommentItem({ comment, isOP, userId, userName }) {
  const editor = useRef("");
  const config = {
    readonly: false,
    placeholder: "What are your thoughts?",
    width: "100%",
  };
  const [isReplying, setIsReplying] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onDelete = () => {
    deleteDoc(doc(firestore, "comments", comment._id));
  };

  const onReply = async () => {
    const reply = DOMPurify.sanitize(editor.current.value, {
      ALLOWED_TAGS: [],
    });
    console.log(reply);
    if (reply.trim() !== "") {
      addDoc(collection(firestore, "comments"), {
        parentId: comment._id,
        posterId: userId,
        posterName: userName,
        createdAt: serverTimestamp(),
        postId: comment.postId,
        comment: reply,
        numberOfVotes: 0,
      });
      setIsReplying(false);
    }
  };

  const ref = doc(firestore, "comments", comment._id);

  const commentVotes = useRecoilValue(commentVotesAtom);
  console.log(commentVotes);
  const hasUpVoted = commentVotes.some(
    (doc) => doc._id === comment._id && doc.vote === 1
  );
  const hasDownVoted = commentVotes.some(
    (doc) => doc._id === comment._id && doc.vote === -1
  );

  const onUpVote = async (e) => {
    e.stopPropagation();
    if (!userId) {
      setAuthModalState({ isOpened: true, view: "login" });
      return;
    } else {
      const batch = writeBatch(firestore);
      const docRef = doc(
        firestore,
        `users/${userId}/commentVotes/${comment._id}`
      );

      if (hasUpVoted) {
        batch.delete(docRef);
        batch.update(ref, {
          numberOfVotes: increment(-1),
        });
      } else if (hasDownVoted) {
        batch.update(docRef, {
          vote: 1,
        });
        batch.update(ref, {
          numberOfVotes: increment(2),
        });
      } else {
        batch.set(docRef, {
          vote: 1,
        });
        batch.update(ref, {
          numberOfVotes: increment(1),
        });
      }

      await batch.commit();
    }
  };

  const onDownVote = async (e) => {
    e.stopPropagation();
    if (!userId) {
      setAuthModalState({ isOpened: true, view: "login" });
      return;
    } else {
      const batch = writeBatch(firestore);

      const docRef = doc(
        firestore,
        `users/${userId}/commentVotes/${comment._id}`
      );

      if (hasDownVoted) {
        batch.delete(docRef);
        batch.update(ref, {
          numberOfVotes: increment(1),
        });
      } else if (hasUpVoted) {
        batch.update(docRef, {
          vote: -1,
        });
        batch.update(ref, {
          numberOfVotes: increment(-2),
        });
      } else {
        batch.set(docRef, {
          vote: -1,
        });
        batch.update(ref, {
          numberOfVotes: increment(-1),
        });
      }

      await batch.commit();
    }
  };

  return (
    <Flex flexDirection={"column"} width={"100%"}>
      <Flex gap={2} align={"center"} width={"100%"}>
        <Icon as={FaReddit} color={"blackAlpha.600"} boxSize={"2rem"}></Icon>
        <Flex align={"center"}>
          <Text fontWeight={"medium"} fontSize={"0.8rem"}>
            {comment.posterName}
          </Text>
          {isOP && (
            <Text
              ms={1}
              fontSize={"0.8rem"}
              fontWeight={"bold"}
              color={"blue.500"}
            >
              OP
            </Text>
          )}

          <Text
            fontWeight={"medium"}
            fontSize={"0.8rem"}
            color={"blackAlpha.500"}
            ms={2}
          >
            {format(comment?.createdAt?.toMillis())}
          </Text>
        </Flex>
      </Flex>

      <Flex minW={"100%"}>
        {comment.parentId || comment.replies ? (
          <Flex mx={3.5} my={1.5} width={"2px"} bg={"blackAlpha.200"}></Flex>
        ) : (
          <Flex mx={3.5}></Flex>
        )}
        <Flex direction={"column"} ms={2.5} align={"flex-start"}>
          <Text color={"blackAlpha.800"}>{comment.comment}</Text>
          <Flex align={"center"}>
            <Flex gap={1.5}>
              {" "}
              <Flex
                borderRadius={2}
                paddingX={0.25}
                cursor={"pointer"}
                _hover={{ bg: "blackAlpha.200" }}
                ms={-1}
              >
                <Icon
                  _hover={{ color: "#ff4500" }}
                  boxSize={"1.5rem"}
                  color={hasUpVoted ? "#ff4500" : "blackAlpha.600"}
                  as={hasUpVoted ? BiSolidUpvote : BiUpvote}
                  onClick={onUpVote}
                ></Icon>
              </Flex>
              <Text fontWeight={"semibold"} fontSize={"0.9rem"}>
                {formatNumberAbbreviated(comment.numberOfVotes)}
              </Text>
              <Flex
                cursor={"pointer"}
                borderRadius={2}
                paddingX={0.25}
                _hover={{ bg: "blackAlpha.200" }}
              >
                <Icon
                  _hover={{ color: "blue.500" }}
                  boxSize={"1.5rem"}
                  color={hasDownVoted ? "blue.500" : "blackAlpha.600"}
                  as={hasDownVoted ? BiSolidDownvote : BiDownvote}
                  onClick={onDownVote}
                ></Icon>
              </Flex>
            </Flex>
            {userId && (
              <Box ms={1} mb={1.5} onClick={() => setIsReplying(true)}>
                <IconText
                  mbottom={1}
                  text={"Reply"}
                  icon={BsChatLeft}
                ></IconText>
              </Box>
            )}
            {isOP && userId && (
              <Box mb={2} onClick={onDelete}>
                <IconText
                  icon={AiOutlineDelete}
                  text={"Delete"}
                  fontSize="1.4rem"
                ></IconText>
              </Box>
            )}
          </Flex>
          {isReplying && (
            <Box mb={2} width={"100%"}>
              <JoditEditor ref={editor} tabIndex={1} config={config} />
              <Flex mt={2} justify={"flex-end"} gap={2}>
                {" "}
                <Button
                  borderRadius={"3xl"}
                  border={"1px solid"}
                  borderColor={"blue.500"}
                  color={"blue.500"}
                  height={"1.8rem"}
                  bg={"white"}
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
                <Button
                  borderRadius={"3xl"}
                  color={"white"}
                  height={"1.8rem"}
                  bg={"blue.500"}
                  _hover={{ bg: "blue.400" }}
                  onClick={onReply}
                >
                  Comment
                </Button>
              </Flex>
            </Box>
          )}
          <Box mt={!userId && 2} width={"100%"} ms={-3.5}>
            {comment.replies?.map((reply) => {
              return (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  isOP={reply.posterId === userId}
                  userId={userId}
                ></CommentItem>
              );
            })}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default memo(CommentItem);
