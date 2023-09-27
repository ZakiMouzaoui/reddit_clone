import { Box, Divider, Flex, Tooltip } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpRightCircle, BsChatDots, BsPlusLg } from "react-icons/bs";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

function Icons() {
  return (
    <Flex align={"center"} gap={1}>
      <Box align={"center"} gap={2} display={{ base: "none", lg: "flex" }}>
        <Tooltip label="Popular">
          <Box
            _hover={{ bg: "blackAlpha.100", borderRadius: 3 }}
            mt={0.5}
            padding={1}
          >
            <BsArrowUpRightCircle
              size={"1.5rem"}
              cursor={"pointer"}
            ></BsArrowUpRightCircle>
          </Box>
        </Tooltip>

        <Tooltip label="Filter">
          <Box _hover={{ bg: "blackAlpha.100", borderRadius: 3 }} padding={1}>
            <IoFilterCircleOutline
              size={"1.75rem"}
              cursor={"pointer"}
            ></IoFilterCircleOutline>
          </Box>
        </Tooltip>

        <Tooltip label="Live Video">
          <Box _hover={{ bg: "blackAlpha.100", borderRadius: 3 }} padding={1}>
            {" "}
            <IoVideocamOutline
              size={"1.75rem"}
              cursor={"pointer"}
            ></IoVideocamOutline>
          </Box>
        </Tooltip>
      </Box>
      <Divider orientation="vertical"></Divider>

      <Box gap={2} display={{ base: "none", md: "flex" }}>
        {" "}
        <Tooltip label="Chat">
          <Box _hover={{ bg: "blackAlpha.100", borderRadius: 3 }} padding={1}>
            <BsChatDots size={"1.5rem"} cursor={"pointer"}></BsChatDots>
          </Box>
        </Tooltip>
        <Tooltip label="Notifications">
          <Box _hover={{ bg: "blackAlpha.100", borderRadius: 3 }} padding={1}>
            <IoNotificationsOutline
              size={"1.5rem"}
              cursor={"pointer"}
            ></IoNotificationsOutline>
          </Box>
        </Tooltip>
        <Tooltip label="Create Post">
          <Box _hover={{ bg: "blackAlpha.100", borderRadius: 3 }} padding={1}>
            <BsPlusLg size={"1.5rem"} cursor={"pointer"}></BsPlusLg>
          </Box>
        </Tooltip>
      </Box>
    </Flex>
  );
}

export default Icons;
