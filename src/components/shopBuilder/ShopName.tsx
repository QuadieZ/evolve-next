import { Button, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { EvolveButton } from "../EvolveButton";

export type ShopNameProps = {
  name: string;
  description?: string;
};

export const ShopName = (props: ShopNameProps) => {
  const { name, description } = props;
  return (
    <Stack w="100%" spacing={4} pos="relative">
      <Stack spacing={1}>
        <Heading fontWeight="medium" fontSize="xl">
          {name}
        </Heading>
        <Text color="brand.description">{description}</Text>
      </Stack>
      <HStack spacing={4}>
        <EvolveButton>Follow</EvolveButton>
        <EvolveButton variant="outline">Add Friend</EvolveButton>
      </HStack>
    </Stack>
  );
};
