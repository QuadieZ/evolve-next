import { Circle, HStack, Text } from "@chakra-ui/react";

export const Divider = () => {
  return (
    <HStack w="100%" justify="center" my={6}>
      <Circle size="5px" bg="brand.divider" />
      <Circle size="5px" bg="brand.divider" />
      <Circle size="5px" bg="brand.divider" />
    </HStack>
  );
};
