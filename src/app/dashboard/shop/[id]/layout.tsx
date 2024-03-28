"use client";

import { EvolveSpinner } from "@/components";
import { LAYOUT_TEMPLATE } from "@/constant/layout";
import { useShopStore } from "@/state";
import { ShopDetailData } from "@/types";
import { Flex } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
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
    async function getShopData(shopId:string) {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_API_KEY!);

      console.log(supabase, 'supabase')
      const { data, error } = await supabase
          .from('shop')
          .select('*')
          .eq('shopId', shopId);
    
      if (error) {
          console.error('Error fetching data:', error.message);
          return;
      }
    
      console.log('Shop data:', data);
    }
    

    console.log('currentshop',currentShop)
      if (!currentShop||(currentShop as ShopDetailData)?.shopId !== shopId) {
        console.log("getting");
        console.log("getting");
        getShopData(shopId);
      } else {
        setIsLoading(false);
      }
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShop]);

  if (isLoading) {
    return <EvolveSpinner />;
  }

  return (
    <Flex h="100%" w="100%">
      {children}
    </Flex>
  );
}
