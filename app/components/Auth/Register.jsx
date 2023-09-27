import { authModalState } from "@/app/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { memo, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import OAuthInputs from "./OAuthInputs";
import { auth, firestore } from "@/app/firebase/client";
import { errors } from "@/app/firebase/errors";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const setAuthModalState = useSetRecoilState(authModalState);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setFormError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const { displayName, email, providerData, uid } = res.user;
      const docRef = doc(firestore, "users", uid);
      await setDoc(docRef, { displayName, email, providerData });
    } catch (err) {
      console.log(err);
      setFormError(errors[err.message]);
    }

    setLoading(false);
  };

  return (
    <Flex
      align="center"
      justify="center"
      direction={"column"}
      mb={2}
      width={"70%"}
      margin={"auto"}
    >
      <OAuthInputs></OAuthInputs>
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          ref={emailRef}
          required
          mb={2}
          _hover={{
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _placeholder={{
            color: "gray.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            boxShadow: "none",
            borderColor: "blue.500",
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          ref={passwordRef}
          required
          mb={2}
          _hover={{
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _placeholder={{
            color: "gray.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            boxShadow: "none",
            borderColor: "blue.500",
          }}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          ref={confirmPasswordRef}
          required
          _hover={{
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _placeholder={{
            color: "gray.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            boxShadow: "none",
            borderColor: "blue.500",
          }}
        />

        <Text mb={3} color={"red"} fontSize={12}>
          {formError}
        </Text>

        <Button
          type="submit"
          borderRadius={50}
          width={"100%"}
          bg={"blue.500"}
          color={"white"}
          height={"36px"}
          _hover={{ bg: "blue.400" }}
          isLoading={loading}
        >
          Register
        </Button>
        <Flex justify={"center"} align={"baseline"} gap={1}>
          <Text mt={2}>Already a redditor?</Text>
          <Text
            color={"blue.500"}
            fontWeight={600}
            _hover={{ color: "blue.600" }}
            cursor={"pointer"}
            onClick={() =>
              setAuthModalState((prev) => ({ ...prev, view: "login" }))
            }
          >
            Login
          </Text>
        </Flex>
      </form>
    </Flex>
  );
}

export default memo(Register);
