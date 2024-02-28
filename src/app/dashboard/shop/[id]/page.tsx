"use client";

import { EvolveSpinner } from "@/components";
import { useShopStore } from "@/state";
import { ShopDetailData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mockShopDetailData: ShopDetailData[] = [
  {
    shopId: "1",
    shopName: "Shop 1",
    shopDescription: "This is a shop description",
    shopPictureUrl: "https://via.placeholder.com/150",
    shopRating: 3.5,
    hasOnboarded: false,
    ownerId: "1",
  },
  {
    shopId: "2",
    shopName: "Shop 2",
    shopDescription: "This is a shop description",
    shopPictureUrl: "https://via.placeholder.com/150",
    shopRating: 3.5,
    hasOnboarded: true,
    ownerId: "1",
  },
];

export default function Page({ params }: { params: { id: string } }) {
  console.log(params);
  const shopId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useRouter();
  const currentShop = useShopStore((state) => state.currentShop);
  const setCurrentShop = useShopStore((state) => state.setCurrentShop);

  useEffect(() => {
    async function getShopData(shopId: string) {
      // const response = await fetch(`/api/shop/${shopId}`);
      // const data = await response.json();
      // setShopData(data);
      const response = mockShopDetailData.find(
        (shop) => shop.shopId === shopId
      ) as ShopDetailData;

      setCurrentShop(response);

      if (!response.hasOnboarded) {
        navigation.replace(`/dashboard/shop/${shopId}/onboarding`);
      }
      setIsLoading(false);
    }

    if (!currentShop || (currentShop as ShopDetailData).shopId !== shopId) {
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
    <div>
      <h1>Shop</h1>
    </div>
  );
}
