"use client";

import { EvolveSpinner, ProductData } from "@/components";
import { ComponentRenderer } from "@/components/shopBuilder/ComponentRenderer";
import { LAYOUT_TEMPLATE } from "@/constant/layout";
import { useShopStore } from "@/state";
import { theme } from "@/style/theme";
import { Component, ShopDetailData, ShopStyle } from "@/types";
import supabase from "@/utils/supabase";
import {
  Center,
  ChakraProvider,
  Spinner,
  Stack,
  extendTheme,
} from "@chakra-ui/react";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const currentShopStyle = useShopStore(
    (state) => state.currentShop?.shopStyle
  );

  const { id } = params;
  const [shopData, setShopData] = useState<ShopDetailData>();
  const [shopStyle, setShopStyle] = useState();
  const setCurrentShop = useShopStore((state) => state.setCurrentShop);
  //const [products, setProducts] = useState<ProductData[]>([]);

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

    async function getShop() {
      const { error: shopError, data: shopData } = await supabase!
        .from("shop")
        .select("*")
        .eq("shopId", id);
      const { error: shopStyleError, data: shopStyleData } = await supabase!
        .from("shopStyle")
        .select("*")
        .eq("shopStyleId", shopData![0].shopStyleId);
      if (shopError || shopStyleError) {
        console.error("Error fetching data:", shopError?.message);
        return;
      }
      console.log(shopData![0], shopStyleData![0]);
      setShopData(shopData![0]);
      setShopStyle(shopStyleData![0]);
      setCurrentShop(shopData![0]);
    }
    initLiff();
    getShop();
  }, []);

  useEffect(() => {
    if (shopStyle) {
      const style = shopStyle as any;
      setShopTheme({
        primary: style.primaryColor,
        contrast: style.contrastColor,
        border: style.borderColor,
        content: style.textColor,
        background: style.backgroundColor,
        secondaryBackground: style.secondaryBackgroundColor,
      });
      setComponents(style.components?.map((c) => JSON.parse(c)));
      setIsLoading(false);
      return;
    }
  }, [shopStyle]);

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
          w="100vw"
          h="100vh"
          pos="absolute"
          right={0}
          top={0}
          px={8}
          py={12}
          overflowY="scroll"
          suppressHydrationWarning
        >
          {components.map((c) => (
            <ComponentRenderer key={c.name} {...c} />
          ))}
        </Stack>
      )}
    </ChakraProvider>
  );
}
