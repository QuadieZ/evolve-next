"use client";

import { EvolveSpinner } from "@/components";
import { LAYOUT_TEMPLATE } from "@/constant/layout";
import { useShopStore } from "@/state";
import { ShopDetailData } from "@/types";
import supabase from "@/utils/supabase";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const shopId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useRouter();
  const currentShop = useShopStore((state) => state.currentShop);
  const setCurrentShop = useShopStore((state) => state.setCurrentShop);

  useEffect(() => {
    async function getShopData(shopId: string) {
      const { data, error } = await supabase!
        .from("shop")
        .select("*")
        .eq("shopId", shopId);

      const { data: shopStyleData, error: shopStyleError } = await supabase!
        .from("shopStyle")
        .select("*")
        .eq("shopStyleId", data![0].shopStyleId);

      if (error || shopStyleError) {
        console.error("Error fetching data:", error?.message);
        return;
      }
      setCurrentShop({
        ...data![0],
        shopStyle: {
          colors: {
            primaryColor: shopStyleData![0].primaryColor,
            borderColor: shopStyleData![0].borderColor,
            contrastColor: shopStyleData![0].contrastColor,
            textColor: shopStyleData![0].textColor,
            backgroundColor: shopStyleData![0].backgroundColor,
            secondaryBackgroundColor:
              shopStyleData![0].secondaryBackgroundColor,
          },
          logo: shopStyleData![0].logo,
          shopLayout: shopStyleData![0].shopLayout,
          shopProductCardLayout: shopStyleData![0].shopProductCardLayout,
          components: shopStyleData![0]?.components?.map((c) => JSON.parse(c)),
        },
      });

      if (!data![0].hasOnboarded) {
        navigation.push(`/dashboard/shop/${shopId}/onboarding`);
        setIsLoading(false);
      }
      setIsLoading(false);
    }

    if (!currentShop || (currentShop as ShopDetailData)?.shopId !== shopId) {
      getShopData(shopId);
    } else {
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <EvolveSpinner />;
  }

  return (
    <Flex h="100%" w="100%">
      {children}
    </Flex>
  );
}
