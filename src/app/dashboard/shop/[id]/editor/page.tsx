"use client";

import {
  Divider,
  HorizontalProductCard,
  ImageBanner,
  ScreenContainer,
  ShopName,
  VerticalProductCard,
} from "@/components";
import { CategorySelector } from "@/components/shopBuilder/CategorySelector";
import { ComponentRenderer } from "@/components/shopBuilder/ComponentRenderer";
import { ProductsList } from "@/components/shopBuilder/ProductsList";
import { useShopStore } from "@/state";
import { Component } from "@/types";
import { EditIcon } from "@chakra-ui/icons";
import {
  Collapse,
  Flex,
  HStack,
  IconButton,
  Slide,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const mockProducts = [
  {
    title: "Product 1",
    price: 100,
    image: "https://picsum.photos/300/500",
    description: "This is a product description",
  },
  {
    title: "Product 2",
    price: 200,
    image: "https://picsum.photos/300/500",
    description: "This is a product description",
  },
  {
    title: "Product 3",
    price: 300,
    image: "https://picsum.photos/300/500",
    description: "This is a product description",
  },
];

const mockComponents: Component[] = [
  {
    name: "ShopTitle",
    props: {
      name: "Your Store",
      description: "Be the real you",
    },
  },
  {
    name: "Divider",
  },
  {
    name: "ProductCategories",
    props: {
      categories: [
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
      ],
    },
  },
];

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

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack
      w="100%"
      h="100%"
      pos="absolute"
      top={0}
      left={0}
      justify="center"
      flexDir="row"
    >
      <Stack
        w={isOpen ? "65%" : "100%"}
        h="100%"
        overflowY="scroll"
        align="center"
        pos="relative"
      >
        <ScreenContainer>
          {mockComponents.map((component, index) => {
            return <ComponentRenderer {...component} key={index} />;
          })}
        </ScreenContainer>
        <IconButton
          pos="sticky"
          icon={<EditIcon />}
          aria-label="Component"
          onClick={onToggle}
          borderRadius="full"
          bottom={4}
          w="max-content"
          ml="auto"
          mr={4}
          minH="40px"
        />
      </Stack>
      <Stack
        bg="red"
        h="100%"
        w="35%"
        display={isOpen ? "flex" : "none"}
      ></Stack>
    </Stack>
  );
}
