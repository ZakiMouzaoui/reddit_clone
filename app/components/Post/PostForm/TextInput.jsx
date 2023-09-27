import { isActiveDiscardModal } from "@/app/atoms/discardModalAtom";
import { titleState } from "@/app/atoms/postFormAtom";
import { Input } from "@chakra-ui/react";
import React, { memo } from "react";
import { useSetRecoilState } from "recoil";

function TextInput() {
  const setTitleState = useSetRecoilState(titleState);
  const setIsActive = useSetRecoilState(isActiveDiscardModal);

  const onChange = (e) => {
    setTitleState(e.target.value.trim());
    setIsActive(true);
  };

  return (
    <Input
      _focus={{ border: "1px solid black", boxShadow: "none" }}
      _placeholder={{ color: "blackAlpha.500" }}
      placeholder="Title"
      onChange={onChange}
    ></Input>
  );
}

export default memo(TextInput);
