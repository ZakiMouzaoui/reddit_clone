import {
  captionsState,
  imageIndexState,
  imagesState,
} from "@/app/atoms/postFormAtom";
import { Flex, Icon, Image, Input } from "@chakra-ui/react";
import React, { memo, useRef } from "react";
import { BsPlus } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useRecoilState, useSetRecoilState } from "recoil";

function ImagesSlider() {
  const [selectedImgIdx, setSelectedImgIdx] = useRecoilState(imageIndexState);
  const [selectedImages, setImagesState] = useRecoilState(imagesState);
  const setCaptions = useSetRecoilState(captionsState);
  const selectFileRef2 = useRef(null);

  const handleClick = (e, index, remove = true) => {
    if (remove === true) {
      e.stopPropagation();

      setImagesState(selectedImages.filter((_, i) => i !== index));
      setCaptions((prev) => prev.filter((_, i) => i !== index));

      if (selectedImgIdx > 0 && selectedImgIdx === index) {
        setSelectedImgIdx((prev) => prev - 1);
      }
    } else {
      setSelectedImgIdx(index);
    }
  };

  const appendImage = (e) => {
    const files = e.target.files;

    const imageArray = [];
    const captions = [];
    let count = 0;

    for (let i = 0; i < files.length; i++) {
      const image = URL.createObjectURL(files[i]);
      count++;

      imageArray.push(image);
      captions.push("");
    }

    setImagesState((prev) => [].concat(prev, imageArray));
    setCaptions((prev) => [].concat(prev, captions));
    setSelectedImgIdx(count + selectedImages.length - 1);
  };

  return (
    <Flex width={"100%"} wrap={"wrap"} align={"center"}>
      {selectedImages.map((image, index) => (
        <Flex
          border={
            selectedImgIdx === index
              ? "1px solid black"
              : "1px solid transparent"
          }
          width={"100px"}
          height={"100px"}
          key={index}
          justify={"center"}
          align={"center"}
          borderRadius={4}
          mr={2}
          mb={2}
          cursor={"pointer"}
          id={`box ${index}`}
          onClick={(e) => handleClick(e, index, false)}
          position={"relative"}
        >
          <Image
            width={selectedImgIdx === index ? "85px" : "95px"}
            height={selectedImgIdx === index ? "85px" : "95px"}
            display={"block"}
            margin={"auto"}
            objectFit={"cover"}
            src={image}
            alt="preview"
            borderRadius={4}
          ></Image>
          <Flex
            opacity={1}
            _hover={{
              bg: "transparent",
              "& .close": { visibility: "visible" },
            }}
            position={"absolute"}
            height={"100%"}
            width={"100%"}
            justify={"flex-end"}
            padding={selectedImgIdx !== index ? 2 : 3}
            bg={selectedImgIdx !== index && "whiteAlpha.500"}
          >
            <Flex
              bg={"black"}
              height={4}
              width={4}
              padding={2}
              borderRadius={50}
              align={"center"}
              justify={"center"}
              visibility={"hidden"}
              className="close"
            >
              <Icon
                onClick={(e) => handleClick(e, index)}
                color={"white"}
                as={IoMdClose}
              ></Icon>
            </Flex>
          </Flex>
        </Flex>
      ))}
      <Flex
        justify={"center"}
        align={"center"}
        width={"95px"}
        height={"95px"}
        key={"add-box"}
        border={"1px dashed"}
        borderColor={"blackAlpha.300"}
        borderRadius={4}
        cursor={"pointer"}
        onClick={() => selectFileRef2.current.click()}
        _hover={{ svg: { color: "black" } }}
        mb={2}
      >
        <Icon boxSize={10} color={"blackAlpha.500"} as={BsPlus}></Icon>
      </Flex>
      <Input
        onChange={(e) => appendImage(e)}
        ref={selectFileRef2}
        type="file"
        multiple
        hidden
      ></Input>
    </Flex>
  );
}

export default memo(ImagesSlider);
