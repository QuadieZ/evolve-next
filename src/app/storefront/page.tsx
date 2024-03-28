"use client";

import { EvolveSpinner } from "@/components";
import { Center } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const navigation = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const shopIdFromLiff = searchParams.get("liff.state");
    console.log(shopIdFromLiff);
    if (shopIdFromLiff) {
      const id = shopIdFromLiff.split("F")[1];
      console.log(id);
      navigation.push(`/storefront/${id}`);
    }
  }, []);

  return (
    <Center h="100vh" w="100%">
      <EvolveSpinner />
    </Center>
  );
}
