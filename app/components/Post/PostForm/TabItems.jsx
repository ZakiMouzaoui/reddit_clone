import React, { memo } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { postFormState } from "@/app/atoms/postFormAtom";
import { formTabState } from "@/app/atoms/formTabAtom";

const items = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
];
function TabItems() {
  const { index: currentIndex } = useRecoilValue(formTabState);

  return (
    <Flex width={"100%"}>
      {items.map((item, index) => (
        <TabItem
          selected={currentIndex === index}
          key={index}
          item={item}
          index={index}
        ></TabItem>
      ))}
    </Flex>
  );
}

export default memo(TabItems);
