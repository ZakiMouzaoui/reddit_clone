import { communityModalState } from "@/app/atoms/createCommunityModalAtom";
import { firestore } from "@/app/firebase/client";
import { getMyCommunities } from "@/app/hooks/useCommunityData";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSetRecoilState } from "recoil";

export default function CommunityMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [keywords, setKeywords] = useState("");

  let communtiyQuery;
  let ids;
  const communitiesRef = collection(firestore, "communities");

  if (keywords.trim() === "") {
    ids = getMyCommunities().data?.map((doc) => doc._id);

    if (ids && ids !== undefined) {
      if (ids.length > 0)
        communtiyQuery = query(communitiesRef, where("id", "in", ids));
      else communtiyQuery = query(communitiesRef, where("id", "in", ["null"]));
    }
  } else {
    communtiyQuery = query(
      communitiesRef,
      where("id", ">=", keywords),
      where("id", "<", keywords + "z")
    );
  }
  const { isLoading, data } = useFirestoreQueryData(
    ["searchCommunities", ids, keywords],
    communtiyQuery,
    { subscribe: true, idField: "_id" }
  );

  const handleClick = (e) => {
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  };

  const skeletons = [0, 1, 2];
  const setCommunityModal = useSetRecoilState(communityModalState);
  const onCreateCommunity = (e) => {
    e.stopPropagation();
    setCommunityModal({ isOpened: true });
  };

  return (
    <Flex
      mb={2}
      mt={2}
      direction={"column"}
      bg={"white"}
      borderRadius={"0.25rem"}
      padding={"0.5rem 1.1rem"}
      width={{ base: "100%", md: "320px" }}
      onClick={() => setIsVisible(true)}
    >
      <Flex justify={"space-between"} align={"center"}>
        <Flex gap={2} flex={1} align={"center"}>
          {!isVisible ? (
            <Box
              border={"1px dashed black"}
              width={"1.7rem"}
              height={"1.5rem"}
              borderRadius={"full"}
              mt={1}
            ></Box>
          ) : (
            <Icon
              boxSize={"1.7rem"}
              as={CiSearch}
              color={"blackAlpha.500"}
            ></Icon>
          )}

          <Input
            border={"none"}
            variant={"unstyled"}
            _focus={{ border: "none", boxShadow: "none" }}
            placeholder={
              isVisible ? "Search communities" : "Choose a community"
            }
            _placeholder={{
              color: "black",
              fontWeight: "semibold",
              fontSize: "0.9rem",
            }}
            onChange={(e) => setKeywords(e.target.value)}
          ></Input>
        </Flex>
        <ChevronDownIcon
          color={"blackAlpha.600"}
          cursor={"pointer"}
          boxSize={"1.3rem"}
          onClick={handleClick}
        >
          {" "}
        </ChevronDownIcon>
      </Flex>
      {isVisible && (
        <Flex mt={4} direction="column">
          <Flex align={"center"} justify={"space-between"} mb={3}>
            <Text
              textTransform={"uppercase"}
              color={"blackAlpha.600"}
              fontSize={"0.65rem"}
              fontWeight={"bold"}
              marginX={2}
            >
              your communities
            </Text>
            <Box
              color={"blue.400"}
              borderRadius={20}
              _hover={{ bg: "blackAlpha.200" }}
              fontSize={"0.8rem"}
              fontWeight={"bold"}
              width={"90px"}
              cursor={"pointer"}
              textAlign={"center"}
              onClick={onCreateCommunity}
            >
              Create New
            </Box>
          </Flex>
          {isLoading ? (
            <VStack align={"flex-start"}>
              {skeletons.map((_) => (
                <Flex gap={2} align={"center"}>
                  <SkeletonCircle boxSize={"2rem"}></SkeletonCircle>
                  <Flex direction={"column"} gap={1}>
                    <Skeleton height={"0.6rem"} width={"150px"}></Skeleton>
                    <Skeleton height={"0.6rem"} width={"100px"}></Skeleton>
                  </Flex>
                </Flex>
              ))}
            </VStack>
          ) : (
            data.map((doc) => (
              <Link href={`/r/${doc._id}/submit`}>
                <Flex
                  _hover={{ bg: "blackAlpha.100" }}
                  gap={2}
                  key={doc._id}
                  align={"center"}
                >
                  <Image
                    boxSize="2rem"
                    src={doc.imgUrl}
                    borderRadius={"full"}
                    fallback={
                      <SkeletonCircle boxSize={"2rem"}></SkeletonCircle>
                    }
                  ></Image>
                  <Flex direction={"column"}>
                    <Text fontSize={"0.9rem"} fontWeight={"semibold"}>
                      {doc._id}
                    </Text>
                    <Text
                      fontSize={"0.8rem"}
                      fontWeight="semibold"
                      color={"blackAlpha.600"}
                    >
                      {doc.totalMembers} members
                    </Text>
                  </Flex>
                </Flex>
              </Link>
            ))
          )}
        </Flex>
      )}
    </Flex>
  );
}
