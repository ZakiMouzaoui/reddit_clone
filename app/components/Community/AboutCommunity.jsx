import { firestore, storage } from "@/app/firebase/client";
import { formatDate, formatNumberAbbreviated } from "@/utils/formatNumber";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  SkeletonCircle,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { memo, useRef, useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsPlusCircleDotted } from "react-icons/bs";
import { HiOutlineCake } from "react-icons/hi";
import { format } from "timeago.js";

function AboutCommunity({ community, isModerator }) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const [description, setDescription] = useState(community?.description || "");
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const router = useRouter();
  const openForm = (e) => {
    e.stopPropagation();
    setShowInput(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setShowInput(false);
  };

  const addDescription = async (e) => {
    e.stopPropagation();
    const value = description.trim();

    if (value !== "") {
      setLoading(true);
      await updateDoc(doc(firestore, `communities/${community._id}`), {
        description: value,
      });
      setLoading(false);
      setShowInput(false);
    }
  };

  const onImgUpload = async (e) => {
    setUploadLoading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, `communities/${community._id}`);
    await uploadBytes(storageRef, file);
    const imgUrl = await getDownloadURL(storageRef);
    await updateDoc(doc(firestore, "communities", community._id), {
      imgUrl,
    });

    setUploadLoading(false);
    setImgLoaded(false);
  };

  return (
    <Flex
      borderRadius={"0.25rem"}
      direction={"column"}
      width={"100%"}
      onClick={handleClose}
    >
      <Flex
        paddingX={3}
        paddingY={2}
        bg={"blue.500"}
        borderRadius={"0.25rem 0.25rem 0 0"}
      >
        <Text fontWeight={"semibold"} color={"white"}>
          About community
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        paddingX={3}
        paddingY={4}
        bg={"white"}
        borderRadius={"0 0 0.25rem 0.25rem"}
        align={"start"}
      >
        <Flex gap={3} mb={1} align={"center"}>
          {uploadLoading === true ? (
            <Spinner color="blue.500" width={8} height={4}></Spinner>
          ) : community.imgUrl ? (
            <Flex
              position={"relative"}
              _hover={{
                ".edit-icon": { visibility: "visible" },
              }}
              cursor={isModerator && "pointer"}
              onClick={isModerator ? () => inputRef.current.click() : null}
              // bg={"blue"}
              borderRadius={"full"}
              width={"42%"}
              height={"3.5rem"}
            >
              <Image
                borderRadius={"full"}
                width={"3.5rem"}
                height={"3.5rem"}
                src={community.imgUrl}
                // onLoad={onImgLoad}
                // display={isImgLoaded === false ? "none" : "block"}
                fallback={<SkeletonCircle boxSize={"3.5rem"}></SkeletonCircle>}
              ></Image>

              {isModerator && (
                <Flex
                  align={"center"}
                  justify={"center"}
                  borderRadius={"full"}
                  width={"100%"}
                  height={"100%"}
                  position={"absolute"}
                  bg={"whiteAlpha.500"}
                  top={0}
                  visibility={"hidden"}
                  className="edit-icon"
                >
                  <Icon
                    boxSize={"1.5rem"}
                    padding={"0.35rem"}
                    borderRadius={"full"}
                    bg={"white"}
                    as={EditIcon}
                  ></Icon>
                </Flex>
              )}
            </Flex>
          ) : (
            <Tooltip bg={"black"} label="Add a community image">
              <span>
                <Icon
                  cursor={"pointer"}
                  as={BsPlusCircleDotted}
                  color={"blue.500"}
                  boxSize={"3rem"}
                  onClick={() => inputRef.current.click()}
                ></Icon>
              </span>
            </Tooltip>
          )}

          <Flex>
            <Text fontWeight={"medium"}>r/{community._id}</Text>
            <Input
              visibility={"hidden"}
              ref={inputRef}
              onChange={onImgUpload}
              type="file"
            ></Input>
          </Flex>
        </Flex>

        <Box
          width={"100%"}
          padding={showInput === false && 2}
          border={(!community.description || showInput === true) && "1px solid"}
          borderColor={showInput === true ? "blue.500" : "blackAlpha.300"}
          bg={!community.description || (showInput === true && "blackAlpha.50")}
          cursor={isModerator && "pointer"}
          _hover={
            isModerator && {
              border: "1px solid",
              borderRadius: 4,
              borderColor: "blue.500",
            }
          }
          onClick={isModerator ? openForm : null}
          // onBlur={handleClose}
        >
          {showInput === false ? (
            community.description ? (
              <Box>
                <Text display={"inline"} alignContent={"start"}>
                  {community.description}{" "}
                </Text>

                {isModerator && (
                  <Icon
                    alignmentBaseline="ideographic"
                    cursor={"pointer"}
                    onClick={openForm}
                    as={BiEditAlt}
                    boxSize={"1.2rem"}
                    color={"blue.500"}
                  ></Icon>
                )}
              </Box>
            ) : (
              <Text color="blue.500" fontWeight="bold" fontSize="0.75rem">
                Add description
              </Text>
            )
          ) : (
            <Flex direction={"column"}>
              <Input
                bg={"transparent"}
                height={9}
                paddingX={2}
                border="none"
                _focus={{ border: "none", boxShadow: "none" }}
                placeholder="Tell us about your community"
                _placeholder={{
                  color: "blackAlpha.700",
                  fontSize: "0.9rem",
                }}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus={true}
                value={description}
              ></Input>
              <Flex
                justify={"flex-end"}
                padding={2}
                fontSize={"xs"}
                fontWeight={"bold"}
                gap={2}
              >
                <Text color={"red"} onClick={handleClose}>
                  Cancel
                </Text>
                {loading === true ? (
                  <Spinner size={"xs"} color="blue.500"></Spinner>
                ) : (
                  <Text onClick={addDescription} color={"blue.500"}>
                    Save
                  </Text>
                )}
              </Flex>
            </Flex>
          )}
        </Box>

        <Tooltip label={format(community.createdAt.toMillis())}>
          <Flex gap={2} mt={2}>
            <Icon
              color={"blackAlpha.700"}
              boxSize={"1.5rem"}
              as={HiOutlineCake}
            ></Icon>
            <Text color={"blackAlpha.700"}>
              {" "}
              Created {formatDate(community.createdAt)}
            </Text>
          </Flex>
        </Tooltip>
        {community.privacyType === "private" && (
          <Flex align={"center"} gap={2}>
            <Icon
              color={"blackAlpha.700"}
              boxSize={"1.5rem"}
              as={AiOutlineEyeInvisible}
              mt={1.5}
            ></Icon>
            <Text mt={0.5} color={"blackAlpha.700"}>
              {" "}
              Private
            </Text>
          </Flex>
        )}
        <Divider marginY={4}></Divider>
        <Flex gap={12}>
          <Flex direction={"column"}>
            <Text fontWeight={"medium"}>
              {formatNumberAbbreviated(community.totalMembers)}
            </Text>
            <Text fontSize={"0.9rem"} color={"blackAlpha.600"}>
              Members
            </Text>
          </Flex>
          <Flex direction={"column"}>
            <Flex gap={1} align={"center"}>
              <Box
                width={2}
                height={2}
                borderRadius={"50%"}
                bg={"green.300"}
              ></Box>{" "}
              <Text fontWeight={"medium"}>3</Text>
            </Flex>
            <Text fontSize={"0.82rem"} color={"blackAlpha.600"}>
              Online
            </Text>
          </Flex>
        </Flex>
        <Divider marginY={4}></Divider>
        <Button
          color={"white"}
          width={"100%"}
          bg={"blue.500"}
          height={"1.85rem"}
          borderRadius={"1.25rem"}
          _hover={{ bg: "blue.400" }}
          onClick={() =>
            router.push(`/r/${community._id}/submit`, undefined, {
              shallow: true,
            })
          }
        >
          Create Post
        </Button>
      </Flex>
    </Flex>
  );
}

export default memo(AboutCommunity);
