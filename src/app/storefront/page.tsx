"use client";

import { EvolveSpinner } from "@/components";
import { Center } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Page() {
  const navigation = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const shopIdFromLiff = searchParams.get("liff.state");
    if (shopIdFromLiff) {
      const timeout = setTimeout(() => {
        navigation.push(`/storefront${shopIdFromLiff}`);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <Center h="100vh" w="100%">
      <EvolveSpinner />
    </Center>
  );
}
