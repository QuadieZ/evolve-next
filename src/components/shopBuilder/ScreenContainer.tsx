import { Box, Flex, Stack } from "@chakra-ui/react";

export type ScreenContainerProps = {
  children: React.ReactNode;
};
export const ScreenContainer = (props: ScreenContainerProps) => {
  return (
    <Stack
      w="430px"
      minH="932px"
      border="1px solid"
      borderColor="brand.primary"
      p={12}
      m={8}
      overflowY="scroll"
    >
      {props.children}
    </Stack>
  );
};
