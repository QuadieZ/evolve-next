"use client";

import { Heading, Stack } from "@chakra-ui/react";
import { HorizontalProductCard, VerticalProductCard } from ".";
import { useEffect, useState } from "react";

export type ProductData = {
  id: string;
  title: string;
  price?: number;
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

  const [fetchProducts, setFetchProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log(process.env.NEXT_PUBLIC_LINE_API_KEY);
      const data = await (await fetch("/api/products")).json();
      const products: ProductData[] = data.products.data.map((p) => ({
        id: p.id,
        title: p.name,
        description: p.description,
        image: p.imageUrls[0],
        price: p.variants[0].price,
      }));

      setFetchProducts(products as any);
    }

    fetchData();
  }, []);

  return (
    <Stack flexDir="column" w="100%" pos="relative" suppressHydrationWarning>
      <Heading fontWeight="medium" fontSize="lg" color="shop.content">
        {isFeatured ? "Featured Products" : "Our Products"}
      </Heading>
      <Stack
        flexDir="row"
        flexWrap={isFeatured ? "nowrap" : "wrap"}
        justify="space-between"
        spacing={3}
        overflowX={isFeatured ? "scroll" : "hidden"}
      >
        {fetchProducts.map((product: any) => {
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
