"use client";

import React from "react";
import { getCommunityPosts } from "../../hooks/usePostData";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

function page({ params: { pageId } }) {
  const { isLoading, data } = getCommunityPosts(pageId);
  const router = useRouter();

  if (isLoading === true) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      DATA FETCHED <Button onClick={() => router.back()}></Button>
    </div>
  );
}

export default page;
