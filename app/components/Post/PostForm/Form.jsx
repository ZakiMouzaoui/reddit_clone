import React, { memo } from "react";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import TextForm from "./TextForm";
import ImageForm from "./ImageForm";
import { Button, Flex, VStack } from "@chakra-ui/react";
import LinkForm from "./LinkForm";
import SubmitButton from "./SubmitButton";
import { formTabState } from "@/app/atoms/formTabAtom";
import TextInput from "./TextInput";
import {
  isActiveDiscardModal,
  isDiscardModalOpened,
} from "@/app/atoms/discardModalAtom";
import DiscardPostModal from "./DiscardPostModal";
import { useRouter } from "next/navigation";

function Form() {
  const tabState = useRecoilValue(formTabState);
  const setModalState = useSetRecoilState(isDiscardModalOpened);
  const router = useRouter();

  const onSubmit = useRecoilCallback(({ snapshot }) => async () => {
    const isActive = await snapshot.getPromise(isActiveDiscardModal);

    if (isActive === true) {
      setModalState(true);
    } else {
      router.back();
    }
  });

  return (
    <>
      <DiscardPostModal></DiscardPostModal>
      <VStack width={"100%"} padding={4} spacing={2} align={"flex-start"}>
        <TextInput></TextInput>
        {tabState.index === 0 && <TextForm></TextForm>}
        {tabState.index === 1 && <ImageForm></ImageForm>}
        {tabState.index === 2 && <LinkForm />}

        <Flex justify={"flex-end"} width={"100%"}>
          <Button
            bg={"white"}
            color={"blue.500"}
            border="1px solid"
            borderColor={"blue.500"}
            borderRadius={50}
            height={8}
            mt={1}
            mr={2}
            _hover={{ bg: "blue.50" }}
            onClick={onSubmit}
          >
            Cancel
          </Button>
          <SubmitButton />
        </Flex>
      </VStack>
    </>
  );
}

export default memo(Form);
