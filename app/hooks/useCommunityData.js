import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/client";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { useQuery } from "react-query";
import { authModalState } from "../atoms/authModalAtom";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const useCommunityData = () => {
  const [user] = useAuthState(auth);

  const setModalState = useSetRecoilState(authModalState);

  const leaveOrJoinCommunity = (communityData, isJoined) => {
    if (!user) {
      setModalState({ isOpened: true, view: "login" });
      return;
    }

    if (isJoined === true) {
      leaveCommunity(communityData._id);
    } else {
      joinCommunity(communityData);
    }
  };

  const leaveCommunity = async (communityId) => {
    // setJoinLoading(true);
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `users/${user.uid}/communitySnippets`, communityId)
      );
      batch.update(doc(firestore, "communities", communityId), {
        totalMembers: increment(-1),
      });
      await batch.commit();
      // queryClient.setQueriesData(["myCommunities", user.uid], (old) => {
      //   return {
      //     data: old.filter((doc) => doc.communityId !== communityId),
      //   };
      // });
    } catch (err) {
      console.log(err);
    }
    // setJoinLoading(false);
  };

  const joinCommunity = async (communityData) => {
    // setJoinLoading(true);
    try {
      const batch = writeBatch(firestore);
      const snippet = {
        communityId: communityData._id,
        imageUrl: communityData.imgUrl || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user.uid}/communitySnippets`,
          communityData._id
        ),
        snippet
      );
      batch.update(doc(firestore, "communities", communityData._id), {
        totalMembers: increment(1),
      });
      await batch.commit();
      // queryClient.setQueriesData(["myCommunities", user.uid], (old) => {
      //   console.log(old);
      //   return [...old, snippet];
      // });
    } catch (err) {
      console.log(err);
    }
    // setJoinLoading(false);
  };

  const getmMyCommunities = async () => {
    const queryDocs = await getDocs(
      collection(firestore, `users/${user.uid}/communitySnippets`)
    );
    const snippets = queryDocs.docs.map((doc) => ({ ...doc.data() }));
    return { data: snippets };
  };

  const { isLoading, data } = useQuery(
    ["myCommunities", user?.uid],
    () => getmMyCommunities(),
    { enabled: !!user, notifyOnChangeProps: "tracked" }
  );

  return { loading: isLoading, data, leaveOrJoinCommunity, getMyCommunities };
};

export const getMyCommunities = () => {
  const [user] = useAuthState(auth);
  return useFirestoreQueryData(
    ["myCommunities"],
    collection(firestore, `users/${user?.uid}/communitySnippets`),
    { subscribe: true, idField: "_id" }
  );
};

export default useCommunityData;
