import React, { memo, useRef, useState } from "react";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  captionsState,
  imageIndexState,
  imagesState,
} from "@/app/atoms/postFormAtom";
import ImagePreview from "./ImagePreview";
import ImagesSlider from "./ImagesSlider";
import { FaRedditAlien } from "react-icons/fa";
import CaptionInput from "./CaptionInput";

function ImageForm() {
  const [isDragEnter, setIsDraggingEnter] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingEnter(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingEnter(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    uploadImages(files, true);
    setIsDraggingEnter(false);
  };

  const [selectedImgIdx, setImgIndex] = useRecoilState(imageIndexState);
  const [selectedImages, setImagesState] = useRecoilState(imagesState);
  const setCaptions = useSetRecoilState(captionsState);

  const uploadImages = (files, append = false) => {
    const imageArray = [];
    const captions = [];
    let count = 0;

    for (let i = 0; i < files.length; i++) {
      const image = URL.createObjectURL(files[i]);

      imageArray.push(image);
      captions.push("");
      count++;
    }
    if (append === true) {
      setImagesState((prev) => [].concat(prev, imageArray));
      setImgIndex(selectedImages.length + count - 1);
    } else {
      setImagesState(imageArray);
      setCaptions(captions);
      setImgIndex(0);
    }
  };

  const selectFileRef1 = useRef(null);
  const fileTypes = ["jpg", "png", "jpeg", "avif", "webp"];

  return (
    <>
      {selectedImages.length === 0 ? (
        <Flex
          width={"100%"}
          border={isDragEnter === true ? "2px dashed" : "1px dashed"}
          borderColor={isDragEnter === true ? "blue.500" : "blackAlpha.300"}
          borderRadius={4}
          height={300}
          align={"center"}
          justify={"center"}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {isDragEnter === true ? (
            <Flex direction={"column"} align={"center"}>
              <Icon as={FaRedditAlien} color="blue.500" boxSize={16}></Icon>
              <Text color="blue.500">Drag and drop here</Text>
            </Flex>
          ) : (
            <Flex gap={2} align={"center"}>
              <Text color={"blue.500"}>Drag and drop images or</Text>

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
                onClick={() => selectFileRef1.current.click()}
              >
                Upload
              </Button>
              <Input
                onChange={(e) => uploadImages(e.target.files)}
                ref={selectFileRef1}
                type="file"
                multiple
                hidden
              ></Input>
            </Flex>
          )}
        </Flex>
      ) : (
        <Flex
          direction={"column"}
          border={isDragEnter === true ? "2px dashed" : "1px solid"}
          borderColor={isDragEnter === true ? "blue.500" : "blackAlpha.200"}
          borderRadius={4}
          padding={2}
          width={"100%"}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImagesSlider></ImagesSlider>

          <Flex width={"100%"} mt={2} gap={3}>
            <ImagePreview img={selectedImages[selectedImgIdx]}></ImagePreview>

            <Flex width={"50%"}>
              <CaptionInput></CaptionInput>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default memo(ImageForm);
