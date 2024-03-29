import { ComponentProps, ComponentType, ContainerDataProps } from "@/types";
import {
  CategorySelector,
  CategorySelectorProps,
  Container,
  Divider,
  ImageBanner,
  ImageBannerProps,
  ProductsList,
  ProductsListProps,
  ShopName,
  ShopNameProps,
} from ".";
import { mockProducts } from "@/mockData";
import { useShopStore } from "@/state";
import { useState } from "react";

export type ComponentRendererProps = {
  name: ComponentType;
  props?: ComponentProps;
};

export const ComponentRenderer = (props: ComponentRendererProps) => {
  const { name, props: componentProps } = props;
  const currentShop = useShopStore((state) => state.currentShop);

  if (name === "ShopTitle") {
    return (
      <ShopName
        {...(componentProps as ShopNameProps)}
        name={currentShop?.shopName ?? "Shop"}
        description={currentShop?.shopDescription}
      />
    );
  }

  if (name === "Divider") {
    return <Divider />;
  }

  if (name === "ProductCategories") {
    return <CategorySelector {...(componentProps as CategorySelectorProps)} />;
  }

  if (name === "Container") {
    const { children, ...rest } = componentProps as ContainerDataProps;

    return (
      <Container {...rest}>
        {children.map((c, index) => (
          <ComponentRenderer key={index} {...c} />
        ))}
      </Container>
    );
  }

  if (name === "ImageBanner") {
    return (
      <ImageBanner
        {...(componentProps as ImageBannerProps)}
        src={currentShop?.shopPictureUrl ?? "/shopPlaceholder.jpeg"}
      />
    );
  }

  if (name === "ProductsList") {
    return (
      <ProductsList
        {...(componentProps as ProductsListProps)}
        //products={mockProducts}
      />
    );
  }
};
