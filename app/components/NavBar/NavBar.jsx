import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/client";
import { BsReddit } from "react-icons/bs";
import Directory from "./Directory/Directory";
import Link from "next/link";

function NavBar() {
  const [user, loading, _] = useAuthState(auth);
  return (
    <Flex
      bg="#fafafa"
      // height={"3.25rem"}
      height={"3.125rem"}
      padding="5px 21px"
      gap={5}
      align="center"
      width={"100%"}
      position={"sticky"}
      zIndex={99}
    >
      <Link href={"/"}>
        <Flex cursor={"pointer"} alignItems={"center"} paddingY={20}>
          <BsReddit color="#fc471e" size={"2.25rem"}></BsReddit>
          <Image
            src="/images/redditText.svg"
            boxSize="4rem"
            display={{ base: "none", lg: "unset" }}
          />
        </Flex>
      </Link>
      {user && <Directory></Directory>}
      <SearchInput></SearchInput>
      <RightContent loading={loading} user={user}></RightContent>
    </Flex>
  );
}

export default NavBar;
