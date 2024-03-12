import { Stack } from "@chakra-ui/react";
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
};

export const ProductsList = (props: ProductsListProps) => {
  const { variant = "full", products, productCardVariant = "modern" } = props;

  return (
    <Stack
      flexDir="row"
      w="100%"
      flexWrap="wrap"
      justify="space-between"
      spacing={3}
      pos="relative"
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
          />
        );
      })}
    </Stack>
  );
};
