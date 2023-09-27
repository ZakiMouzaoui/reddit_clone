import useCommunityData from "@/app/hooks/useCommunityData";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function JoinButton({
  community,
  hasJoined,
  color = "#fc471e",
  height = "2rem",
}) {
  const [joinText, setJoinText] = useState(
    hasJoined === true ? "Joined" : "Join"
  );

  const { leaveOrJoinCommunity, joinLoading } = useCommunityData();

  useEffect(() => {
    if (hasJoined === true) setJoinText("Joined");
    else setJoinText("Join");
  }, [hasJoined]);

  const handleClick = (e) => {
    e.stopPropagation();
    leaveOrJoinCommunity(community, hasJoined);
  };

  return (
    <Button
      ms={4}
      mt={1.5}
      border={hasJoined && "1px solid"}
      borderColor={color}
      borderRadius={"10rem"}
      color={hasJoined === true ? color : "white"}
      fontWeight={"bold"}
      height={height}
      bg={hasJoined === true ? "transparent" : color}
      _hover={!hasJoined && { bg: color }}
      width={"6rem"}
      onMouseEnter={() => hasJoined === true && setJoinText("Leave")}
      onMouseLeave={() => hasJoined === true && setJoinText("Joined")}
      onClick={(e) => handleClick(e)}
      isLoading={joinLoading}
    >
      {joinText}
    </Button>
  );
}

export default JoinButton;
