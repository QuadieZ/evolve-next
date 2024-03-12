import { Image } from "@chakra-ui/react";

export type ImageBannerProps = {
  src: string;
  type?: "squared" | "rounded";
};
export const ImageBanner = (props: ImageBannerProps) => {
  const { src, type = "squared" } = props;

  return (
    <Image
      src={src}
      alt="banner"
      w="100%"
      h="20%"
      objectFit="cover"
      borderRadius={type === "squared" ? "0" : "20px"}
    />
  );
};
