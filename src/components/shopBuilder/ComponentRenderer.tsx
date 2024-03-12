import { ComponentProps, ComponentType } from "@/types";
import {
  CategorySelector,
  CategorySelectorProps,
  Divider,
  ShopName,
  ShopNameProps,
} from ".";

export type ComponentRendererProps = {
  name: ComponentType;
  props?: ComponentProps;
};

export const ComponentRenderer = (props: ComponentRendererProps) => {
  const { name, props: componentProps } = props;

  if (name === "ShopTitle") {
    return <ShopName {...(componentProps as ShopNameProps)} />;
  }

  if (name === "Divider") {
    return <Divider />;
  }

  if (name === "ProductCategories") {
    return <CategorySelector {...(componentProps as CategorySelectorProps)} />;
  }
};
