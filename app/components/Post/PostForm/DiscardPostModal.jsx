import {
  isActiveDiscardModal,
  isDiscardModalOpened,
} from "@/app/atoms/discardModalAtom";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

let count = 0;

function DiscardPostModal() {
  const [isOpen, setIsOpen] = useRecoilState(isDiscardModalOpened);
  const isActive = useRecoilValue(isActiveDiscardModal);
  const resetIsOpened = useResetRecoilState(isDiscardModalOpened);
  const resetIsActive = useResetRecoilState(isActiveDiscardModal);

  const router = useRouter();

  const discardPost = () => {
    resetIsOpened();
    resetIsActive();
    router.back();
  };

  count++;

  return (
    <Modal
      isCentered
      isOpen={isOpen && isActive}
      onClose={() => setIsOpen(false)}
    >
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>Discard Post {count}</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          Returning to the previous page will discard your post
        </ModalBody>
        <ModalFooter bg={"blackAlpha.200"}>
          <Flex gap={2} align={"center"}>
            <Button
              border={"1px solid"}
              borderColor={"blackAlpha.500"}
              bg={"transparent"}
              borderRadius={"2rem"}
              height={"2rem"}
              _hover={{ bg: "blackAlpha.50" }}
              onClick={discardPost}
            >
              DiscardPost
            </Button>
            <Button
              color={"white"}
              bg={"#fc471e"}
              height={"2rem"}
              borderRadius={"2rem"}
              _hover={{ bg: "#ea471e" }}
              onClick={() => setIsOpen(false)}
            >
              Continue Editing
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default memo(DiscardPostModal);
