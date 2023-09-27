import { authModalState } from "@/app/atoms/authModalAtom";
import { userVotes } from "@/app/atoms/postAtom";
import { auth, firestore } from "@/app/firebase/client";
import { formatNumberAbbreviated } from "@/utils/formatNumber";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { collection, doc, increment, writeBatch } from "firebase/firestore";
import React from "react";
import { memo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { useRecoilValue, useSetRecoilState } from "recoil";

let count = 0;

function UpvoteDownvote({ postId, votes }) {
  count++;

  const [user] = useAuthState(auth);

  const userVotesState = useRecoilValue(userVotes);

  const hasUpvoted = userVotesState?.some(
    (doc) => doc._id === postId && doc.vote === 1
  );
  const hasDownvoted = userVotesState?.some(
    (doc) => doc._id === postId && doc.vote === -1
  );

  const ref = doc(firestore, "posts", postId);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onUpVote = async (e) => {
    e.stopPropagation();
    if (!user) {
      setAuthModalState({ isOpened: true, view: "login" });
      return;
    } else {
      const batch = writeBatch(firestore);
      const docRef = doc(firestore, `users/${user.uid}/postsVotes/${postId}`);

      if (hasUpvoted) {
        batch.delete(docRef);
        batch.update(ref, {
          votesStats: increment(-1),
        });
      } else if (hasDownvoted) {
        batch.update(docRef, {
          vote: 1,
        });
        batch.update(ref, {
          votesStats: increment(2),
        });
      } else {
        batch.set(docRef, {
          vote: 1,
        });
        batch.update(ref, {
          votesStats: increment(1),
        });
      }

      await batch.commit();
    }
  };

  const onDownVote = async (e) => {
    e.stopPropagation();
    if (!user) {
      setAuthModalState({ isOpened: true, view: "login" });
      return;
    } else {
      const batch = writeBatch(firestore);

      const docRef = doc(firestore, `users/${user.uid}/postsVotes/${postId}`);

      if (hasDownvoted) {
        batch.delete(docRef);
        batch.update(ref, {
          votesStats: increment(1),
        });
      } else if (hasUpvoted) {
        batch.update(docRef, {
          vote: -1,
        });
        batch.update(ref, {
          votesStats: increment(-2),
        });
      } else {
        batch.set(docRef, {
          vote: -1,
        });
        batch.update(ref, {
          votesStats: increment(-1),
        });
      }

      await batch.commit();
    }
  };

  return (
    <Flex
      height={"60px"}
      direction={"column"}
      align={"center"}
      justify={"space-between"}
    >
      <Flex
        borderRadius={2}
        paddingX={0.5}
        cursor={"pointer"}
        _hover={{ bg: "blackAlpha.200" }}
      >
        <Icon
          _hover={{ color: "#fc471e" }}
          boxSize={"1.5rem"}
          color={hasUpvoted ? "#ff4500" : "blackAlpha.600"}
          as={hasUpvoted ? BiSolidUpvote : BiUpvote}
          onClick={onUpVote}
        ></Icon>
      </Flex>
      <Text
        fontSize={"0.9rem"}
        color={
          hasUpvoted ? "#fc471e" : hasDownvoted ? "blue.500" : "blackAlpha.700"
        }
      >
        {formatNumberAbbreviated(votes)}
      </Text>
      <Flex
        cursor={"pointer"}
        borderRadius={2}
        paddingX={0.5}
        _hover={{ bg: "blackAlpha.200" }}
      >
        <Icon
          _hover={{ color: "blue.500" }}
          boxSize={"1.5rem"}
          color={hasDownvoted ? "blue.500" : "blackAlpha.600"}
          as={hasDownvoted === true ? BiSolidDownvote : BiDownvote}
          onClick={onDownVote}
        ></Icon>
      </Flex>
    </Flex>
  );
}

export default memo(UpvoteDownvote);
