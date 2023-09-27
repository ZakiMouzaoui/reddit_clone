import { captionsState, imageIndexState } from "@/app/atoms/postFormAtom";
import { Input } from "@chakra-ui/react";
import React, { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function CaptionInput() {
  const [captionsValue, setCaptions] = useRecoilState(captionsState);
  const selectedImgIdx = useRecoilValue(imageIndexState);

  const onCaptionChange = (e) => {
    const value = e.target.value.trim();
    console.log(value);
    console.log(captionsValue[selectedImgIdx]);
    if (value !== captionsValue[selectedImgIdx]) {
      setCaptions((prev) => {
        const captions = [...prev];
        captions[selectedImgIdx] = value;
        return captions;
      });
    }
  };

  return (
    <>
      <Input
        key={selectedImgIdx}
        _focus={{ border: "1px solid black", boxShadow: "none" }}
        placeholder={"Add a caption..."}
        _placeholder={{
          color: "blackAlpha.500",
          fontWeight: "medium",
        }}
        fontSize={"sm"}
        defaultValue={captionsValue[selectedImgIdx] || ""}
        onBlur={onCaptionChange}
      ></Input>
    </>
  );
}

export default memo(CaptionInput);
