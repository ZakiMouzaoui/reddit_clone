import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { firestore } from "../firebase/client";

export const getPostsByCommunity = async (communityId) => {
  try {
    const postsQuery = query(collection(firestore, "posts"));
    const docs = await getDocs(postsQuery);
    const posts = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return { data: posts };
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong...");
  }
};

const upvotePost = async (postId, hasUpvoted, hasDownvoted) => {
  console.log(hasUpvoted);
  const ref = doc(firestore, `posts/${postId}`);
  await updateDoc(ref, {
    votesStats: increment(
      hasUpvoted === true ? -1 : hasDownvoted === true ? -2 : 1
    ),
  });
};

const downVotePost = async (postId, hasUpvoted, hasDownvoted) => {
  const ref = doc(firestore, `posts/${postId}`);
  await updateDoc(ref, {
    votesStats: increment(
      hasUpvoted === true ? -2 : hasDownvoted === true ? 1 : -1
    ),
  });
};

const upvoteOrDownvotePost = async (
  postId,
  votingValue,
  hasUpvoted,
  hasDownvoted
) => {
  if (votingValue === 1) {
    upvotePost(postId, hasUpvoted, hasDownvoted);
  } else {
    downVotePost(postId, hasUpvoted, hasDownvoted);
  }
};

const getPostsVotes = async (userId) => {
  const collectionRef = collection(firestore, `users/${userId}/postsVotes`);
  const docs = (await getDocs(collectionRef)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return docs;
};

export const useGetPostsVotes = (userId) => {
  return useQuery(["postsVotes", userId], () => getPostsVotes(userId), {
    retry: false,
    notifyOnChangeProps: "tracked",
    refetchOnWindowFocus: false,
  });
};

export const getCommunityPosts = (communityId) => {
  return useQuery(
    ["communityPosts", communityId],
    () => getPostsByCommunity(communityId),
    {
      retry: false,
      notifyOnChangeProps: ["data"],
      refetchOnWindowFocus: false,
    }
  );
};

export const useVotePost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ postId, votingValue, hasUpvoted, hasDownvoted }) =>
      upvoteOrDownvotePost(postId, votingValue, hasUpvoted, hasDownvoted),
    {
      onSuccess: (data) => {
        console.log("success");
      },
      onError: (err) => {
        console.log(err);
      },

      retry: false,
    }
  );
};
