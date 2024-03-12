"use client";

import {
  Divider,
  ImageBanner,
  ScreenContainer,
  ShopName,
  VerticalProductCard,
} from "@/components";
import { CategorySelector } from "@/components/shopBuilder/CategorySelector";
import { useShopStore } from "@/state";
import { HStack, Stack, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const isDraft = searchParams.get("isDraft") === "true";
  const draftStyle = useShopStore((state) => state.draftStyle);
  const currentShopStyle = useShopStore(
    (state) => state.currentShop?.shopStyle
  );

  const [shopStyle, setShopStyle] = useState(
    isDraft ? draftStyle : currentShopStyle
  );

  return (
    <ScreenContainer>
      <ShopName name="Your Store" description="Be the real you" />
      <Divider />
      <ImageBanner src="https://picsum.photos/500/1000" type="rounded" />
      <CategorySelector
        variant="clear"
        categories={[
          {
            title: "ALL",
            isSelected: true,
          },
          {
            title: "Summer",
            src: "https://picsum.photos/300/500",
          },
          {
            title: "Winter",
            src: "https://picsum.photos/300/500",
          },
        ]}
      />
      <HStack w="100%" justify="space-between">
        <VerticalProductCard
          title="Product 1 PPP"
          price={100}
          discountedPrice={50}
          image="https://picsum.photos/300/500"
          popularRank={1}
          description="This is a product description"
        />
        <VerticalProductCard
          title="Product 1 PPP"
          price={100}
          image="https://picsum.photos/300/500"
          description="This is a product description"
        />
      </HStack>
    </ScreenContainer>
  );
}
