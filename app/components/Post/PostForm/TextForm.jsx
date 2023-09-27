import React, { memo, useRef } from "react";
import JoditEditor from "jodit-react";
import { Box } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { descriptionState } from "@/app/atoms/postFormAtom";

function TextForm() {
  const editor = useRef(null);
  const setDescriptionState = useSetRecoilState(descriptionState);

  const config = {
    readonly: false,
    placeholder: "Text (optional)",
    width: "100%",
  };

  return (
    <Box width={"100%"}>
      <JoditEditor
        ref={editor}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setDescriptionState(newContent)}
      />
    </Box>
  );
}

export default memo(TextForm);
