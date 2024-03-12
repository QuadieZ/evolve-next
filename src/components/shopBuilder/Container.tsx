import { Flex } from "@chakra-ui/react";

export type ContainerProps = {
  children: React.ReactNode;
};

export const Container = (props: ContainerProps) => {
  const { children } = props;

  return <Flex w="100%" h="200px" bg="red" />;
};
