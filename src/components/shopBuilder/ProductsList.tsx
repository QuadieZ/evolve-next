import { Heading, Stack } from "@chakra-ui/react";
import { HorizontalProductCard, VerticalProductCard } from ".";

export type ProductData = {
  title: string;
  price: number;
  image: string;
  description: string;
};

export type ProductsListProps = {
  variant?: "full" | "compact";
  products: ProductData[];
  productCardVariant?: "clear" | "modern";
  isFeatured?: boolean;
};

export const ProductsList = (props: ProductsListProps) => {
  const {
    variant = "full",
    products,
    productCardVariant = "modern",
    isFeatured,
  } = props;

  return (
    <Stack flexDir="column" w="100%" pos="relative">
      <Heading fontWeight="medium" fontSize="lg" color="shop.content">
        {isFeatured ? "Featured Products" : "Our Products"}
      </Heading>
      <Stack
        flexDir="row"
        flexWrap={isFeatured ? "nowrap" : "wrap"}
        justify="space-between"
        spacing={3}
      >
        {products.map((product) => {
          if (variant === "full") {
            return (
              <HorizontalProductCard
                {...product}
                key={product.title}
                variant={productCardVariant}
              />
            );
          }
          return (
            <VerticalProductCard
              {...product}
              key={product.title}
              variant={productCardVariant}
              isFeatured={isFeatured}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
