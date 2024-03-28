"use client";

import { EvolveSpinner } from "@/components";
import { LAYOUT_TEMPLATE } from "@/constant/layout";
import { useShopStore } from "@/state";
import { ShopDetailData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  console.log(params);

  return (
    <div>
      <h1>Shop</h1>
    </div>
  );
}
