import { formTabState } from "@/app/atoms/formTabAtom";
import {
  captionsState,
  descriptionState,
  imagesState,
  isInvalidFormSelector,
  linkState,
  titleState,
} from "@/app/atoms/postFormAtom";
import { auth, firestore, storage } from "@/app/firebase/client";
import { Button } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQueryClient } from "react-query";
import { useRecoilCallback, useRecoilValue } from "recoil";

function SubmitButton() {
  const disabled = useRecoilValue(isInvalidFormSelector);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const { communityId } = useParams();
  const router = useRouter();

  const onSubmit = useRecoilCallback(({ snapshot }) => async () => {
    const { index } = await snapshot.getPromise(formTabState);
    const title = await snapshot.getPromise(titleState);

    if (index === 0) {
      const description = await snapshot.getPromise(descriptionState);
      addTextPost(title, description);
    } else if (index === 1) {
      const images = await snapshot.getPromise(imagesState);
      const captions = await snapshot.getPromise(captionsState);
      addImagePost(title, images, captions);
    } else {
      const link = await snapshot.getPromise(linkState);
      addLinkPost(title, link);
    }
  });

  const addTextPost = async (title, bodyText) => {
    setLoading(true);

    try {
      await addDoc(collection(firestore, "posts"), {
        title,
        bodyText,
        creatorId: user?.uid,
        creatorDisplayName: user?.displayName || user?.email?.split("@")[0],
        communityId,
        numberOfComments: 0,
        votesStats: 0,
        type: "text",
        createdAt: serverTimestamp(),
      });

      //   queryClient.setQueriesData(["communityPosts", communityId], (old)=>{
      //     return [ ...old]
      //   })
      router.back();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const uploadImgs = async (images, captions, docId) => {
    let imgsWithCaptions = [];

    for (let i = 0, n = images.length; i < n; i++) {
      const res = await fetch(images[i]);
      const blob = await res.blob();

      const storageRef = ref(storage, `posts/${docId}/${Date.now() + i}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      imgsWithCaptions.push({ url, caption: captions[i] });
    }

    return imgsWithCaptions;
  };

  const addImagePost = async (title, images, captions) => {
    setLoading(true);

    try {
      const newDoc = await addDoc(collection(firestore, "posts"), {
        title,

        creatorId: user?.uid,
        creatorDisplayName: user?.displayName || user?.email?.split("@")[0],
        communityId,
        numberOfComments: 0,
        votesStats: 0,
        type: "image",
        createdAt: serverTimestamp(),
      });

      const imgsWithCaptions = await uploadImgs(images, captions, newDoc.id);

      await updateDoc(newDoc, {
        images: imgsWithCaptions,
      });
      router.back();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  //   const uploadImg = (img)=>{
  //     return new Promise((resolve, reject)=>{
  //         const storageRef = storage.ref().child(`posts/${communityId}`)
  //         const fileRef = storageRef.child(Date.now())
  //         const uploadTask = fileRef.put(img)

  //         uploadTask.on("state_changed", (snapshot)=>{uploadedFile = }, (err)=>{reject(err), ()=>{
  //             storageRef.ref(`posts/${communityId}`).child
  //         }})
  //     })
  //   }

  const addLinkPost = async (title, link) => {
    setLoading(true);

    try {
      const newDoc = await addDoc(collection(firestore, "posts"), {
        title,
        link,
        creatorId: user?.uid,
        creatorDisplayName: user?.displayName || user?.email?.split("@")[0],
        communityId,
        numberOfComments: 0,
        votesStats: 0,
        type: "link",
        createdAt: serverTimestamp(),
      });

      //   queryClient.setQueriesData(["communityPosts", communityId], (old)=>{
      //     return [ ...old]
      //   })
      router.back();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        bg={"blue.500"}
        color={"white"}
        _disabled={{ bg: "blackAlpha.500", color: "whiteAlpha.700" }}
        borderRadius={50}
        height={8}
        mt={1}
        _hover={disabled === false ? { bg: "blue.400" } : { bg: {} }}
        isDisabled={disabled}
        onClick={onSubmit}
        isLoading={loading}
      >
        Post
      </Button>
    </>
  );
}
export default memo(SubmitButton);
