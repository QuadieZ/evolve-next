import { Image } from "@chakra-ui/react";

export type ImageBannerProps = {
  src: string;
  type?: "squared" | "rounded";
  position?: "absolute" | "relative";
};
export const ImageBanner = (props: ImageBannerProps) => {
  const { src, type = "squared", position = "relative" } = props;

  return (
    <Image
      src={src}
      alt="banner"
      w="100%"
      h="20vh"
      objectFit="cover"
      borderRadius={type === "squared" ? "0" : "20px"}
      position={position}
      top={0}
      right={0}
      zIndex={-1}
    />
  );
};
