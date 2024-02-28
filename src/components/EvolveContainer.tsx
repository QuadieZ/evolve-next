import { Flex } from "@chakra-ui/react";

export const EvolveContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex overflowY="scroll" flexDir="column" flex={1} w="100%" px={16} py={12}>
      {children}
    </Flex>
  );
};
