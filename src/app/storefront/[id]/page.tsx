"use client";

import { EvolveSpinner } from "@/components";
import { ComponentRenderer } from "@/components/shopBuilder/ComponentRenderer";
import { LAYOUT_TEMPLATE } from "@/constant/layout";
import { useShopStore } from "@/state";
import { theme } from "@/style/theme";
import { Component } from "@/types";
import {
  Center,
  ChakraProvider,
  Spinner,
  Stack,
  extendTheme,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Page() {
  const currentShopStyle = useShopStore(
    (state) => state.currentShop?.shopStyle
  );
  const [isLoading, setIsLoading] = useState(true);
  const [shopTheme, setShopTheme] = useState({});
  const [components, setComponents] = useState<Component[]>([]);

  useEffect(() => {
    async function initLiff() {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
        await liff.ready;
      } catch (err) {
        console.log(err);
      }
    }
    initLiff();
  }, []);

  useEffect(() => {
    if (!currentShopStyle) {
      // mock
      setShopTheme({
        primary: "#00C700",
        contrast: "#FFFFFF",
        border: "#000000",
        content: "#000000",
        background: "#D6EDDB",
        secondaryBackground: "#F0F0F0",
      });
      setComponents(LAYOUT_TEMPLATE.CREATIVE);
      setIsLoading(false);
      return;
    }
    setShopTheme({
      primary: currentShopStyle?.colors.primaryColor,
      contrast: currentShopStyle?.colors.contrastColor,
      border: currentShopStyle?.colors.borderColor,
      content: currentShopStyle?.colors.textColor,
      background: currentShopStyle?.colors.backgroundColor,
      secondaryBackground: currentShopStyle?.colors.secondaryBackgroundColor,
    });
    setComponents(currentShopStyle?.components);
    setIsLoading(false);
  }, [currentShopStyle]);

  return (
    <ChakraProvider
      theme={extendTheme({
        ...theme,
        colors: {
          ...theme.colors,
          shop: shopTheme,
        },
      })}
    >
      {isLoading ? (
        <Center w="100%" h="100vh">
          <Spinner size="xl" color="brand.primary" />
        </Center>
      ) : (
        <Stack
          w="100%"
          h="100vh"
          pos="absolute"
          right={0}
          top={0}
          p={8}
          overflow="scroll"
        >
          {components.map((c) => (
            <ComponentRenderer key={c.name} {...c} />
          ))}
        </Stack>
      )}
    </ChakraProvider>
  );
}
