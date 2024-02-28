"use client";

import { useShopStore } from "@/state";
import { Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const isDraft = searchParams.get("isDraft") === "true";
  const draftStyle = useShopStore((state) => state.draftStyle);
  const currentShopStyle = useShopStore(
    (state) => state.currentShop?.shopStyle
  );

  const [shopStyle, setShopStyle] = useState(
    isDraft ? draftStyle : currentShopStyle
  );

  return <Text>Editor</Text>;
}
