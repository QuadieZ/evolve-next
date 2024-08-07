import { Button, ButtonProps } from "@chakra-ui/react";

export type EvolveButtonProps = ButtonProps;

const filledButtonStyle = {
  background: "shop.primary",
  color: "brand.contrast",
  _hover: {
    background: "brand.hoverPrimary",
  },
};

export const EvolveButton = (props: ButtonProps) => {
  const { variant = "solid", ...rest } = props;

  return (
    <Button
      fontWeight="400"
      flex={1}
      fontSize="sm"
      borderRadius="full"
      variant={variant}
      h="28px"
      w="fit-content"
      {...(variant === "solid" ? filledButtonStyle : {})}
      {...rest}
    />
  );
};
