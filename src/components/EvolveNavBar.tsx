"use client";

import { useUserStore } from "@/state";
import { Avatar, Flex, Heading, Image, Img } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const EvolveNavBar = () => {
  const userProfile = useUserStore((state) => state.userProfile);
  console.log(userProfile?.pictureUrl);

  const [username, setUsername] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    userProfile?.pictureUrl && setImageSrc(userProfile?.pictureUrl);
    userProfile?.display_name && setUsername(userProfile?.display_name);
  }, [userProfile?.pictureUrl, userProfile?.display_name]);

  return (
    <Flex
      w="100%"
      h="10vh"
      align="center"
      justify="space-between"
      px={8}
      borderBottom="1px"
      borderColor="border.item"
    >
      <Flex gap={2}>
        <Heading color="brand.primary" as="h4" size="md">
          EVOLVE
        </Heading>
        <Heading as="h4" size="md">
          by DevA
        </Heading>
      </Flex>
      <Flex w="fit-content">
        <Avatar src={imageSrc} name={username} boxSize="6vh" />
      </Flex>
    </Flex>
  );
};
