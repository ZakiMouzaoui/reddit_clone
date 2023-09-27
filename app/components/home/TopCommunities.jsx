import { firestore } from "@/app/firebase/client";
import {
  Box,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import JoinButton from "../Community/JoinButton";
import { getMyCommunities } from "@/app/hooks/useCommunityData";
import Link from "next/link";

function TopCommunities() {
  const skeletons = [0, 1, 2];
  const { data: myCommunities } = getMyCommunities();

  const { isLoading, data } = useFirestoreQueryData(
    ["topCommunities"],
    query(
      collection(firestore, "communities"),
      orderBy("totalMembers", "desc"),
      limit(5)
    ),
    { subscribe: true, idField: "_id" }
  );
  return (
    <Flex borderRadius={"0.15rem"} direction={"column"}>
      <Flex height={"80px"} position={"relative"}>
        <Image
          borderRadius={"0.15rem 0.15rem 0 0"}
          src="/images/top-communities.png"
          width={"100%"}
          h={"100%"}
          objectFit={"cover"}
        ></Image>
        <Flex
          position={"absolute"}
          h={"100%"}
          width={"100%"}
          paddingX={4}
          paddingY={1}
          align={"flex-end"}
          bgGradient="linear(to-t, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%)"
        >
          <Text color={"white"} fontWeight={"semibold"}>
            Top Communities
          </Text>
        </Flex>
      </Flex>
      <Flex bg={"white"}>
        {isLoading ? (
          <VStack width={"100%"}>
            {skeletons.map((index) => (
              <>
                <Flex
                  key={index}
                  paddingX={4}
                  paddingTop={index === 0 ? 2 : 1}
                  width={"100%"}
                  justifyContent={"space-between"}
                  align={"center"}
                >
                  <Flex width={"100%"} gap={2} align={"center"}>
                    <SkeletonCircle
                      startColor="blackAlpha.300"
                      endColor="blackAlpha.100"
                      boxSize={"2.5rem"}
                    ></SkeletonCircle>{" "}
                    <Skeleton
                      startColor="blackAlpha.300"
                      endColor="blackAlpha.100"
                      width={"80%"}
                      height={"0.8rem"}
                    ></Skeleton>{" "}
                  </Flex>
                </Flex>{" "}
                <Divider></Divider>
              </>
            ))}
          </VStack>
        ) : (
          <Flex direction={"column"} width={"100%"}>
            {data.map((community, index) => (
              <>
                <Link href={`/r/${community._id}`}>
                  {" "}
                  <Box
                    width={"100%"}
                    cursor={"pointer"}
                    _hover={{ bg: "blackAlpha.200" }}
                    key={index}
                    overflowX={"hidden"}
                  >
                    <Flex
                      w={"100%"}
                      align={"center"}
                      justifyContent={"space-between"}
                      paddingY={2}
                      paddingX={4}
                    >
                      <Flex align={"center"} gap={2} width={"70%"}>
                        <Box me={4} width={"5px"}>
                          <Text fontWeight={"semibold"}>{index + 1}</Text>
                        </Box>
                        <Image
                          src={community?.imgUrl}
                          boxSize={"2.5rem"}
                          borderRadius={"full"}
                          fallback={
                            <SkeletonCircle
                              startColor="blackAlpha.300"
                              endColor="blackAlpha.100"
                              boxSize={"2.5rem"}
                            ></SkeletonCircle>
                          }
                        ></Image>
                        <Box whiteSpace={"nowrap"} overflow={"hidden"}>
                          {" "}
                          <Text fontWeight={"semibold"}>r/{community._id}</Text>
                        </Box>
                      </Flex>
                      <Flex justify={"flex-end"} width={"35%"}>
                        <JoinButton
                          community={community}
                          hasJoined={
                            myCommunities &&
                            myCommunities.some(
                              (doc) => doc._id === community._id
                            )
                          }
                          color="blue.500"
                          height="1.6rem"
                        ></JoinButton>
                      </Flex>
                    </Flex>
                    <Divider height={0}></Divider>
                  </Box>
                </Link>
              </>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default TopCommunities;
