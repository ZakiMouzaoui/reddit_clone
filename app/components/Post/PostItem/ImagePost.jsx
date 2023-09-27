import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SimpleImageSlider from "react-simple-image-slider";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};

function ImagePost({ images }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleClick = (forward = true) => {
    if (forward) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx((prev) => prev - 1);
    }
  };
  return (
    <Flex width={"95%"} direction={"column"} position={"relative"}>
      {/* <Box>
        <Image src={images[currentIdx].imgUrl} position={"relative"}></Image>
        {images[currentIdx].caption !== "" && (
          <Box padding={2} bg={"blackAlpha.200"}>
            <Text fontSize={"0.8rem"} color={"blackAlpha.800"}>
              {images[currentIdx].caption}
            </Text>
          </Box>
        )}
      </Box>
      <Flex paddingX={2} justify={"space-between"} width={"100%s"}>
        <Icon
          position={"absolute"}
          left={0}
          top={0}
          bottom={0}
          marginTop={"auto"}
          marginBottom={"auto"}
          boxSize={"2.5rem"}
          boxShadow={"lg"}
          borderRadius={"50%"}
          bg={"white"}
          as={IoIosArrowBack}
          onClick={() => handleClick(false)}
        ></Icon>
        <Icon
          position={"absolute"}
          right={0}
          top={0}
          bottom={0}
          marginTop={"auto"}
          marginBottom={"auto"}
          boxSize={"2.5rem"}
          boxShadow={"lg"}
          borderRadius={"50%"}
          bg={"white"}
          as={IoIosArrowForward}
          onClick={() => handleClick()}
        ></Icon>
      </Flex> */}

      <SimpleImageSlider
        width={"100%"}
        height={300}
        images={images}
        showBullets={true}
        showNavs={true}
        navSize={30}
        navStyle={1}
        loop={false}
        onClickBullets={(idx) => {
          setCurrentIdx(idx);
        }}
        onClickNav={(toRight) => {
          if (toRight === true) {
            setCurrentIdx((prev) => prev + 1);
          } else {
            setCurrentIdx((prev) => prev - 1);
          }
        }}
      />

      {images[currentIdx].caption !== "" && (
        <Box padding={2} bg={"blackAlpha.200"}>
          <Text fontSize={"0.8rem"} color={"blackAlpha.800"}>
            {images[currentIdx].caption}
          </Text>
        </Box>
      )}
    </Flex>
  );
}

export default ImagePost;
