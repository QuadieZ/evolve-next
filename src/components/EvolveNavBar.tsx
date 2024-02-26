import { Flex, Heading } from "@chakra-ui/react";

export const EvolveNavBar = () => {
  return (
    <Flex w="100%" h="10vh" bg="red" align="center">
      <Flex gap={2}>
        <Heading color="brand.primary" as="h4" size="md">
          EVOLVE
        </Heading>
        <Heading as="h4" size="md">
          by DevA
        </Heading>
      </Flex>
      <Flex>
        
      </Flex>
    </Flex>
  );
};
