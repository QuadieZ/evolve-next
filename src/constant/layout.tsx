import { mockProducts } from "@/mockData";
import { Component, ShopLayout } from "@/types";

export const LAYOUT_TEMPLATE: Record<ShopLayout, Component[]> = {
  MINIMAL: [
    {
      name: "ShopTitle",
      props: {
        name: "ShopTitle",
        description: "Be the real you",
      },
    },
    {
      name: "Divider",
    },
    {
      name: "ImageBanner",
      props: {
        src: "https://picsum.photos/300/500",
      },
    },
    {
      name: "ProductCategories",
      props: {
        categories: [
          {
            title: "Clothing",
            src: "https://picsum.photos/300/500",
          },
          {
            title: "Shoes",
            src: "https://picsum.photos/300/500",
          },
          {
            title: "Accessories",
            src: "https://picsum.photos/300/500",
          },
        ],
      },
    },
    {
      name: "ProductsList",
      props: {
        products: mockProducts,
      },
    },
  ],
  CREATIVE: [
    {
      name: "ImageBanner",
      props: {
        src: "https://picsum.photos/300/500",
      },
    },
    {
      name: "ShopTitle",
      props: {
        name: "ShopTitle",
        description: "Be the real you",
      },
    },
    {
      name: "ProductsList",
      props: {
        products: mockProducts,
        isFeatured: true,
        variant: "compact",
      },
    },
    {
      name: "ProductCategories",
      props: {
        categories: [
          {
            title: "Clothing",
            src: "https://picsum.photos/300/500",
          },
          {
            title: "Shoes",
            src: "https://picsum.photos/300/500",
          },
          {
            title: "Accessories",
            src: "https://picsum.photos/300/500",
          },
        ],
      },
    },
    {
      name: "ProductsList",
      props: {
        products: mockProducts,
      },
    },
  ],
  CLEAR: [
    {
      name: "ShopTitle",
      props: {
        name: "ShopTitle",
        description: "Be the real you",
      },
    },
    {
      name: "ProductCategories",
      props: {
        categories: [
          {
            title: "Clothing",
            src: "https://picsum.photos/300/500",
          },
          {
            title: "Shoes",
            src: "https://picsum.photos/300/500",
          },
          {
            title: "Accessories",
            src: "https://picsum.photos/300/500",
          },
        ],
        variant: "clear",
      },
    },
    {
      name: "ProductsList",
      props: {
        products: mockProducts,
        productCardVariant: "clear",
      },
    },
  ],
};
