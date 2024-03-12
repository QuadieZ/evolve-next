import { HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";

export type ProductCardProps = {
  title: string;
  price: number;
  image: string;
  description: string;
  popularRank?: number;
  discountedPrice?: number;
};

export const VerticalProductCard = (props: ProductCardProps) => {
  const { title, price, image, description, popularRank, discountedPrice } =
    props;

  return (
    <Stack w="48%" boxShadow="lg" p={4} borderRadius="lg" gap={4} h="35vh">
      <Image src={image} alt={title} h="14vh" borderRadius="lg" />
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
        <Heading fontSize="md" fontWeight="normal" pr={8}>
          {title}
        </Heading>
        <Text fontSize="xs" color="brand.description" lineHeight={1.2}>
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
