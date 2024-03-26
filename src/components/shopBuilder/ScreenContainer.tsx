import { Box, Flex, Stack, StackProps } from "@chakra-ui/react";

export type ScreenContainerProps = {
  children: React.ReactNode;
  containerRef: any;
} & StackProps;

export const ScreenContainer = (props: ScreenContainerProps) => {
  const { children, containerRef, ...rest } = props;

  return (
    <Stack
      w="430px"
      minH="932px"
      border="1px solid"
      borderColor="brand.primary"
      m={8}
      px={8}
      py={12}
      overflowY="scroll"
      ref={containerRef}
      {...rest}
    >
      {children}
    </Stack>
  );
};
