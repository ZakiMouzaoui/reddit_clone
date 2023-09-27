import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { provider, auth, firestore } from "@/app/firebase/client";
import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function OAuthInputs() {
  //   const [user, loading] = useSignInWithGoogle(auth);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      setLoading(false);

      const { displayName, email, providerData, uid } = result.user;
      const docRef = doc(firestore, "users", uid);
      await setDoc(docRef, { displayName, email, providerData });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Flex width={"100%"} direction={"column"}>
      <Button
        borderRadius={50}
        width={"100%"}
        mb={2}
        height={9}
        bg={"white"}
        border={"1px solid"}
        borderColor={"gray.400"}
        _hover={{ bg: "gray.50" }}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Flex align={"flex-end"} gap={2}>
          <FcGoogle></FcGoogle>
          <Text fontWeight={"normal"}>Continue with Google</Text>
        </Flex>
      </Button>

      {/* <Button
        borderRadius={50}
        width={"100%"}
        bg={"gray.100"}
        mb={2}
        height={9}
      >
        <Flex align={"flex-end"} justify={"center"} gap={2}>
          <BsFacebook color="#3B5998" />
          <Text fontWeight={"normal"}>Login with Facebook</Text>
        </Flex>
      </Button> */}
      <Flex gap={2} align={"center"} justify={"center"}>
        <Divider />
        <Text fontSize={12} color={"gray.600"}>
          OR
        </Text>
        <Divider />
      </Flex>
      <br></br>
    </Flex>
  );
}

export default memo(OAuthInputs);
