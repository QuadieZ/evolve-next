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
        src: "https://source.unsplash.com/random",
      },
    },
    {
      name: "ProductCategories",
      props: {
        categories: [
          {
            title: "Clothing",
            src: "https://source.unsplash.com/random",
          },
          {
            title: "Shoes",
            src: "https://source.unsplash.com/random",
          },
          {
            title: "Accessories",
            src: "https://source.unsplash.com/random",
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
        src: "https://source.unsplash.com/random",
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
            src: "https://source.unsplash.com/random",
          },
          {
            title: "Shoes",
            src: "https://source.unsplash.com/random",
          },
          {
            title: "Accessories",
            src: "https://source.unsplash.com/random",
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
            src: "https://source.unsplash.com/random",
          },
          {
            title: "Shoes",
            src: "https://source.unsplash.com/random",
          },
          {
            title: "Accessories",
            src: "https://source.unsplash.com/random",
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
