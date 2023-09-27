import { communityLabel } from "@/utils/labels";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  RadioGroup,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BiSolidLockAlt } from "react-icons/bi";
import TypeRadio from "./TypeRadio";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "@/app/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { communityModalState } from "@/app/atoms/createCommunityModalAtom";

function CreateCommunityModal({ isOpen }) {
  const [_, setModalState] = useRecoilState(communityModalState);

  const handleClose = () => {
    setModalState({ isOpened: false });
  };

  const [name, setName] = useState("");
  const [count, setCount] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const onChange = (e) => {
    const l = e.target.value.length;
    if (l <= 21) {
      setName(e.target.value);
      setCount(21 - l);
    }
  };

  const [formError, setFormError] = useState(null);

  const onSubmit = async () => {
    if (formError) {
      setFormError(null);
    }

    const value = name.trim();
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (value === "") {
      setFormError("A community name is required");
      return;
    } else if (value.length < 3 || format.test(value)) {
      setFormError(
        "Community names must be between 3–21 characters, and can only contains letters, numbers and underscores"
      );
      return;
    }

    setLoading(true);

    try {
      await runTransaction(firestore, async (transaction) => {
        const docRef = doc(firestore, "communities", value);
        const document = await transaction.get(docRef);
        if (document.exists()) {
          throw new Error(`Sorry, r/${value} is taken. Try another.`);
        }
        transaction.set(docRef, {
          moderator: user?.uid,
          createdAt: serverTimestamp(),
          totalMembers: 1,
          privacyType: communityType,
        });

        transaction.set(
          doc(firestore, `users/${user.uid}/communitySnippets`, value),
          {
            communityId: value,
            isModerator: true,
          }
        );
      });
    } catch (err) {
      setFormError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW={590}>
          <ModalHeader padding={"8px 0px 15px 24px"}>
            Create Community
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody mb={3}>
            <Flex
              fontWeight={"semibold"}
              fontSize={16}
              justify={"center"}
              direction={"column"}
            >
              <Text>Name</Text>
              <Flex gap={2} align={"center"}>
                <Text
                  color={"blackAlpha.700"}
                  fontSize={14}
                  fontWeight={"normal"}
                >
                  Community names including capitalization cannot be changed.
                </Text>
                <Tooltip placement="bottom" label={communityLabel}>
                  <span style={{ display: "block", marginTop: 2 }}>
                    <Icon
                      cursor={"pointer"}
                      as={HiOutlineExclamationCircle}
                    ></Icon>
                  </span>
                </Tooltip>
              </Flex>
              <Box mt={5} position={"relative"}>
                <Text ms={3} zIndex={9} color={"blackAlpha.500"}>
                  r/
                </Text>
                <Input
                  px={6}
                  top={-5}
                  zIndex={8}
                  position={"absolute"}
                  mt={3}
                  value={name}
                  onChange={onChange}
                  _focus={{
                    border: "2px solid",
                    borderColor: "black.200",
                    boxShadow: "none",
                  }}
                ></Input>
                <Text
                  fontSize={14}
                  fontWeight={"normal"}
                  mt={2}
                  color={count > 0 ? "blackAlpha.700" : "red"}
                >
                  {count} characters remaining
                </Text>
                <Text fontSize={"xs"} fontWeight={"normal"} color={"red"}>
                  {formError}
                </Text>
              </Box>
              <Text mt={5}>Community Type</Text>
              <RadioGroup
                mt={2}
                onChange={setCommunityType}
                value={communityType}
              >
                <Stack>
                  <TypeRadio
                    value={"public"}
                    type={"Public"}
                    desc={
                      "Anyone can view, post, and comment to this community"
                    }
                    icon={BsFillPersonFill}
                  ></TypeRadio>

                  <TypeRadio
                    value={"restriced"}
                    type="Restricted"
                    desc="Anyone can view this community, but only approved users
                        can post"
                    icon={AiFillEye}
                  ></TypeRadio>
                  <TypeRadio
                    value={"private"}
                    type={"Private"}
                    desc={
                      "Only approved users can view and submit to this community"
                    }
                    icon={BiSolidLockAlt}
                  ></TypeRadio>
                </Stack>
              </RadioGroup>
            </Flex>
          </ModalBody>
          <ModalFooter bg={"blackAlpha.200"}>
            <Flex gap={2}>
              <Button
                borderRadius={20}
                height={8}
                border={"1px solid"}
                borderColor={"blue.400"}
                color={"blue.400"}
                bg={"transparent"}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                borderRadius={20}
                height={8}
                border={"1px solid"}
                borderColor={"blue.400"}
                color={"white"}
                bg={"blue.400"}
                _hover={{ bg: "blue.500" }}
                onClick={onSubmit}
                isLoading={loading}
              >
                Create Community
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateCommunityModal;
