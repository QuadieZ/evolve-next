import { Button, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { EvolveButton } from "../EvolveButton";

export type ShopNameProps = {
  name: string;
  description?: string;
  headerColor?: string;
  logo?: string;
  //descriptionColor?: string;
  primaryButtonBgColor?: string;
  primaryButtonColor?: string;
  secondaryButtonOutlineColor?: string;
  secondaryButtonColor?: string;
};

export const ShopName = (props: ShopNameProps) => {
  const {
    name,
    description,
    logo,
    headerColor,
    primaryButtonBgColor,
    primaryButtonColor,
    secondaryButtonColor,
    secondaryButtonOutlineColor,
  } = props;

  return (
    <Stack w="100%" spacing={4} pos="relative">
      <HStack>
        {/* {logo && <Image src={logo} boxSize="50px" alt="shop logo" />} */}
        <Stack spacing={1}>
          <Heading
            fontWeight="medium"
            fontSize="xl"
            color={headerColor ?? "shop.content"}
          >
            {name}
          </Heading>
          <Text color={secondaryButtonOutlineColor ?? "shop.border"}>
            {description}
          </Text>
        </Stack>
      </HStack>
      <HStack spacing={4}>
        <EvolveButton
          bg={primaryButtonBgColor ?? "shop.primary"}
          color={primaryButtonColor ?? "shop.contrast"}
        >
          Follow
        </EvolveButton>
        <EvolveButton
          variant="outline"
          color={secondaryButtonColor ?? "shop.content"}
          borderColor={secondaryButtonOutlineColor ?? "shop.border"}
        >
          Add Friend
        </EvolveButton>
      </HStack>
    </Stack>
  );
};
