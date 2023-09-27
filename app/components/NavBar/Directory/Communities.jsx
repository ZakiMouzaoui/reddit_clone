import {
  Flex,
  Icon,
  Image,
  MenuItem,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsPlusLg, BsReddit } from "react-icons/bs";
import CreateCommunityModal from "../../Community/CreateCommunityModal";
import { useRecoilState } from "recoil";
import { communityModalState } from "@/app/atoms/createCommunityModalAtom";
import { FaRedditAlien } from "react-icons/fa";
import Link from "next/link";

function Communities({ loading, data }) {
  const [modalState, setModalState] = useRecoilState(communityModalState);

  const handleClose = () => {
    setModalState({ isOpened: false });
  };

  useEffect(() => {});

  return (
    <>
      <CreateCommunityModal
        isOpen={modalState.isOpened}
        handleClose={handleClose}
      ></CreateCommunityModal>
      <Text
        color={"blackAlpha.500"}
        textTransform={"uppercase"}
        fontSize={"2xs"}
        fontWeight={"bold"}
        paddingY={2}
        paddingX={4}
      >
        Your communities
      </Text>
      <MenuItem
        borderRadius={3}
        _hover={{
          bg: "blackAlpha.100",
        }}
        _active={{ bg: "blackAlpha.100" }}
        onClick={() => setModalState({ isOpened: true })}
      >
        <Flex alignItems={"center"} gap={2}>
          <BsPlusLg />
          <Text fontSize={"sm"} fontWeight={"normal"} mb={0.5}>
            Create Community
          </Text>
        </Flex>
      </MenuItem>

      {loading ? (
        <>
          <MenuItem>
            <Flex align={"center"} gap={3}>
              <SkeletonCircle boxSize={"1.5rem"}></SkeletonCircle>
              <Skeleton w={"9rem"} h={"0.8rem"}></Skeleton>
            </Flex>
          </MenuItem>
          <MenuItem>
            <Flex align={"center"} gap={3}>
              <SkeletonCircle boxSize={"1.5rem"}></SkeletonCircle>
              <Skeleton w={"9rem"} h={"0.8rem"}></Skeleton>
            </Flex>
          </MenuItem>
          <MenuItem>
            {" "}
            <Flex align={"center"} gap={3}>
              <SkeletonCircle boxSize={"1.5rem"}></SkeletonCircle>
              <Skeleton w={"9rem"} h={"0.8rem"}></Skeleton>
            </Flex>
          </MenuItem>
        </>
      ) : (
        <>
          {data &&
            data.map((community, index) => (
              <Link key={index} href={`/r/${community._id}`}>
                <MenuItem key={index}>
                  <Flex gap={3} align={"center"}>
                    {community.imageUrl ? (
                      <Image
                        borderRadius={"full"}
                        boxSize={"1.5rem"}
                        src={community.imageUrl}
                        fallback={<SkeletonCircle></SkeletonCircle>}
                      ></Image>
                    ) : (
                      <Icon
                        as={BsReddit}
                        boxSize={"1.5rem"}
                        color="blackAlpha.500"
                      ></Icon>
                    )}

                    <Text fontSize={"0.9rem"}>{community._id}</Text>
                  </Flex>
                </MenuItem>
              </Link>
            ))}
        </>
      )}
    </>
  );
}

export default Communities;
