import { authModalState } from "@/app/atoms/authModalAtom";
import DOMPurify from "dompurify";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import JoditEditor from "jodit-react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/firebase/client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function CommentInput({ postId }) {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(true);
  const editor = useRef("");
  const placeholder = "What are your thoughts?";
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
    }),
    [placeholder]
  );

  const onChange = (content) => {
    const plainText = DOMPurify.sanitize(content, { ALLOWED_TAGS: [] });
    setComment(plainText);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => setDisabled(comment.trim() === ""), 500);
    return () => clearTimeout(timeOutId);
  }, [comment]);

  const onComment = async () => {
    if (!user) {
      setAuthModalState((prev) => ({ ...prev, isOpened: true }));
      return;
    }

    addDoc(collection(firestore, "comments"), {
      posterId: user.uid,
      posterName: user.displayName || user.email.split("@")[0],
      parentId: null,
      postId,
      numberOfVotes: 0,
      createdAt: serverTimestamp(),
      comment,
    });
    editor.value = "";
  };

  return (
    <>
      <Box width={"100%"}>
        <JoditEditor
          ref={editor}
          config={config}
          onChange={(content) => onChange(content)}
        />
      </Box>
      <Flex justify={"flex-end"} gap={2} width={"100%"}>
        {" "}
        <Button
          borderRadius={"3xl"}
          color={"white"}
          height={"1.8rem"}
          bg={"blue.500"}
          _hover={{ bg: "blue.400" }}
          isDisabled={disabled}
          _disabled={{ bg: "blue.200" }}
          onClick={
            disabled
              ? null
              : () => {
                  onComment();
                }
          }
          cursor={disabled && "no-drop"}
        >
          Comment
        </Button>
      </Flex>
    </>
  );
}
