import { Avatar, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";

type CategoryData = {
  title: string;
  src?: string;
  isSelected?: boolean;
};

export type CategorySelectorProps = {
  categories: CategoryData[];
  variant?: "clear" | "fill";
};

export const CategorySelector = (props: CategorySelectorProps) => {
  const { categories, variant = "fill" } = props;

  function getItemStyle(isSelected: boolean) {
    if (variant === "clear") {
      return {
        bgColor: "transparent",
        color: isSelected ? "shop.primary" : "shop.text",
        borderColor: isSelected ? "shop.primary" : "shop.secondaryBackground",
        borderWidth: "1px",
      };
    }
    return {
      bgColor: isSelected ? "shop.primary" : "shop.secondaryBackground",
      color: isSelected ? "shop.contrast" : "shop.text",
      borderColor: "transparent",
    };
  }

  return (
    <Stack w="100%" my={4} pos="relative">
      <Heading fontWeight="medium" fontSize="lg" color="shop.content">
        Categories
      </Heading>
      <HStack overflowX="scroll" w="100%">
        {categories.map((category, index) => (
          <HStack
            key={index}
            pl={2}
            pr={4}
            py={1}
            borderRadius="full"
            minW="35%"
            {...getItemStyle(!!category.isSelected)}
          >
            <Avatar src={category.src} name={category.title} size="sm" />
            <Text fontSize="sm" wordBreak="normal" lineHeight={1.2}>
              {category.title}
            </Text>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};
