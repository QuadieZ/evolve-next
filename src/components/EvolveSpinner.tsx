import { Center, Spinner } from "@chakra-ui/react";

export const EvolveSpinner = () => {
  return (
    <Center w="100%" h="100%" pb={8}>
      <Spinner size="xl" color="brand.primary" />
    </Center>
  );
};
