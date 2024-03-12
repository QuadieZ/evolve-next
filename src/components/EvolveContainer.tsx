import { Flex } from "@chakra-ui/react";

export const EvolveContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex flexDir="column" flex={1} w="100%" px={16} py={12} pos="relative">
      {children}
    </Flex>
  );
};
