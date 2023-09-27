import {
  Box,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { memo, useState } from "react";
import IconText from "./IconText";
import { VscComment } from "react-icons/vsc";
import { IoGiftOutline } from "react-icons/io5";
import { PiShareFatLight } from "react-icons/pi";
import TextPost from "./TextPost";
import { format } from "timeago.js";
import LinkPost from "./LinkPost";
import UpvoteDownvote from "./UpvoteDownvote";
import ImagePost from "./ImagePost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/firebase/client";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import CommentSection from "../Comment/CommentSection";
import { ShareSocial } from "react-share-social";

const isEqual = require("react-fast-compare");

function PostItem({ post, isDetailsPage }) {
  const type = post.type;
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    try {
      await deleteDoc(doc(firestore, "posts", post._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const router = useRouter();
  const style = {
    root: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
    },
    copyContainer: {
      border: "1px solid blue",
      background: "rgb(0,0,0,0.7)",
    },
    title: {
      color: "aquamarine",
      fontStyle: "italic",
    },
  };

  return (
    <Flex
      border={!isDetailsPage ? "1px solid" : "none"}
      borderColor={"blackAlpha.400"}
      _hover={!isDetailsPage && { borderColor: "blackAlpha.800" }}
      gap={3}
      padding={2}
      bg={"white"}
      borderRadius={4}
      cursor={!isDetailsPage && "pointer"}
      align={"start"}
      width={"100%"}
      maxHeight={!isDetailsPage && 475}
      overflowY={!isDetailsPage && "auto"}
      textOverflow={"ellipsis"}
      onClick={
        !isDetailsPage
          ? () => router.push(`/r/${post.communityId}/comments/${post._id}`)
          : null
      }
    >
      <UpvoteDownvote
        key={post._id}
        postId={post._id}
        votes={post.votesStats}
      ></UpvoteDownvote>

      <Flex direction={"column"} width={"100%"}>
        <Text
          color={"blackAlpha.600"}
          fontSize={"0.75rem"}
          fontWeight={"medium"}
        >{`Posted by u/${post.creatorDisplayName} ${format(
          post.createdAt.toMillis()
        )} `}</Text>
        <Text mb={1} fontSize={"1.3rem"}>
          {post.title}
        </Text>
        {type === "text" ? (
          <TextPost body={post.bodyText}></TextPost>
        ) : type === "link" ? (
          <LinkPost link={post.link}></LinkPost>
        ) : (
          <ImagePost images={post.images}></ImagePost>
        )}

        <Flex ms={-1} gap={3} align={"center"}>
          <IconText
            isDetailsPage={isDetailsPage}
            icon={VscComment}
            text={post.numberOfComments.toString()}
          ></IconText>
          <IconText icon={IoGiftOutline} text={"Award"}></IconText>
          <IconText
            onClick={handleClick}
            icon={PiShareFatLight}
            text={"Share"}
          ></IconText>

          {post.creatorId === user?.uid && (
            <Box onClick={onDelete}>
              <IconText icon={AiOutlineDelete} text={"Delete"}></IconText>
            </Box>
          )}
        </Flex>

        {isDetailsPage && (
          <>
            <Divider my={4}></Divider>
            <CommentSection postId={post._id}></CommentSection>
          </>
        )}
      </Flex>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ShareSocial
              url={`r/${post.communityId}/comments/${post._id}`}
              socialTypes={["facebook", "twitter", "whatsapp", "telegram"]}
            />

            <ModalCloseButton></ModalCloseButton>
          </ModalHeader>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default memo(PostItem, isEqual);
