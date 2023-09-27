"use client";

import { authModalState } from "@/app/atoms/authModalAtom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

function AuthModal() {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      isOpened: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.isOpened} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} padding={"8px 0px 15px 0px"}>
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Register"}
            {modalState.view === "resetPassword" && "Reset Password"}

            <ModalCloseButton />
          </ModalHeader>

          <ModalBody mb={3}>
            <Flex align={"center"} justify={"center"} direction={"column"}>
              {modalState.view === "login" && <Login></Login>}
              {modalState.view === "signup" && <Register />}
              {modalState.view === "resetPassword" && <ResetPassword />}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
