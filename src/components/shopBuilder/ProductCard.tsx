import { HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";

export type ProductCardProps = {
  title: string;
  price: number;
  image: string;
  description: string;
  popularRank?: number;
  discountedPrice?: number;
  variant?: "clear" | "modern";
};

export const VerticalProductCard = (props: ProductCardProps) => {
  const {
    title,
    price,
    image,
    description,
    popularRank,
    discountedPrice,
    variant = "modern",
  } = props;

  return (
    <Stack
      w="48%"
      boxShadow={variant === "modern" ? "lg" : "none"}
      p={3}
      borderRadius="lg"
      gap={2}
      h="30vh"
      borderWidth={variant === "modern" ? "none" : "1px"}
      borderColor="black"
      pos="relative"
    >
      <Image
        src={image}
        alt={title}
        h="14vh"
        borderRadius="lg"
        objectFit="cover"
      />
      <Stack gap={1} pos="relative">
        <Stack pos="absolute" right={0} top={0} gap={0} align="flex-end">
          <Text
            fontSize="xs"
            fontWeight="500"
            color={discountedPrice ? "brand.primary" : "black"}
          >
            {discountedPrice ?? price}฿
          </Text>
          {discountedPrice && (
            <Text fontSize="10px" fontWeight="500" textDecor="line-through">
              {price}฿
            </Text>
          )}
        </Stack>
        <Heading fontSize="sm" fontWeight="normal" pr={8}>
          {title}
        </Heading>
        <Text fontSize="xs" color="brand.description" lineHeight={1.2} pr={8}>
          {description}
        </Text>
        {(discountedPrice || popularRank) && (
          <HStack mt={2} gap={1}>
            {popularRank && (
              <Text
                fontSize="8px"
                color="white"
                background="brand.primary"
                py={0.5}
                px={3}
                borderRadius="full"
              >
                Popular #{popularRank}
              </Text>
            )}
            {discountedPrice && (
              <Text
                fontSize="8px"
                color="white"
                background="#FF4C4C"
                py={0.5}
                px={3}
                borderRadius="full"
              >
                Offer
              </Text>
            )}
          </HStack>
        )}
      </Stack>
    </Stack>
  );
};

export const HorizontalProductCard = (props: ProductCardProps) => {
  const {
    title,
    price,
    image,
    description,
    variant = "modern",
    discountedPrice,
    popularRank,
  } = props;

  return (
    <HStack
      w="100%"
      h="20vh"
      boxShadow={variant === "modern" ? "lg" : "none"}
      p={3}
      borderRadius="lg"
      gap={4}
      borderWidth={variant === "modern" ? "none" : "1px"}
      borderColor="black"
      pos="relative"
    >
      <Image
        src={image}
        alt={title}
        h="100%"
        w="40%"
        borderRadius="lg"
        objectFit="cover"
      />
      <Stack gap={1} pos="relative" justify="flex-start" h="100%" pt={6}>
        <Stack
          pos="absolute"
          right={0}
          top={0}
          gap={0}
          align="flex-end"
          pt={6}
          pr={2}
        >
          <Text
            fontSize="xs"
            fontWeight="500"
            color={discountedPrice ? "brand.primary" : "black"}
          >
            {discountedPrice ?? price}฿
          </Text>
          {discountedPrice && (
            <Text fontSize="10px" fontWeight="500" textDecor="line-through">
              {price}฿
            </Text>
          )}
        </Stack>
        <Heading fontSize="md" fontWeight="normal" pr={8}>
          {title}
        </Heading>
        <Text fontSize="xs" color="brand.description" lineHeight={1.2} pr={8}>
          {description}
        </Text>
        {(discountedPrice || popularRank) && (
          <HStack mt={2} gap={1}>
            {popularRank && (
              <Text
                fontSize="8px"
                color="white"
                background="brand.primary"
                py={0.5}
                px={3}
                borderRadius="full"
              >
                Popular #{popularRank}
              </Text>
            )}
            {discountedPrice && (
              <Text
                fontSize="8px"
                color="white"
                background="#FF4C4C"
                py={0.5}
                px={3}
                borderRadius="full"
              >
                Offer
              </Text>
            )}
          </HStack>
        )}
      </Stack>
    </HStack>
  );
};
