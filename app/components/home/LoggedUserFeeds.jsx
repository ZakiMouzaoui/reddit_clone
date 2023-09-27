import { auth, firestore } from "@/app/firebase/client";
import { getMyCommunities } from "@/app/hooks/useCommunityData";
import { VStack } from "@chakra-ui/react";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import PostSkeleton from "../Post/PostSkeleton";
import EmptyPosts from "../Post/EmptyPosts";
import PostItem from "../Post/PostItem/PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { userVotes } from "@/app/atoms/postAtom";

export default function LoggedUserFeeds() {
  const { data: myCommunities } = getMyCommunities();
  const ids = myCommunities?.map((doc) => doc._id) || ["f"];
  const [user] = useAuthState(auth);

  let postsQuery = null;
  if (ids) {
    if (ids.length > 0)
      postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "in", ids)
      );
    else
      postsQuery = query(
        collection(firestore, "posts"),
        orderBy("votesStats", "desc")
      );
  }

  const { isLoading, data } = useFirestoreQueryData(
    ["homePostsLogin", ids],

    postsQuery,
    { subscribe: true, idField: "_id" }
  );
  const votesQuery = query(
    collection(firestore, `users/${user?.uid}/postsVotes`)
  );

  const { data: votes } = useFirestoreQueryData(
    ["postsVotes", user?.uid],
    votesQuery,
    {
      idField: "_id",
      subscribe: true,
    }
  );

  const setUserVotes = useSetRecoilState(userVotes);

  useEffect(() => {
    if (votes) {
      setUserVotes(votes);
    }
  }, [votes]);
  if (isLoading || !data) {
    return (
      <VStack>
        <PostSkeleton></PostSkeleton>
        <PostSkeleton></PostSkeleton>
      </VStack>
    );
  }
  if (data?.length === 0) {
    return <EmptyPosts></EmptyPosts>;
  }
  return (
    <>
      {data?.map((doc, index) => (
        <PostItem key={index} post={doc}></PostItem>
      ))}
    </>
  );
}
