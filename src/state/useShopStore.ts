import { ShopDetailData, ShopStyle } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShopState {
    currentShop: ShopDetailData | null;
    setCurrentShop: (shop: ShopDetailData) => void;
    clearCurrentShop: () => void;
    setShopStyle: (style: ShopStyle) => void;
}

export const useShopStore = create(persist<ShopState>((set, get) => ({
    currentShop: null,
    setCurrentShop: (shop: ShopDetailData) => set({ currentShop: shop }),
    clearCurrentShop: () => set({ currentShop: null }),
    setShopStyle: (style: ShopStyle) => set({ currentShop: { ...(get().currentShop!), shopStyle: style } }),
}), {
    name: "shop-storage",
    onRehydrateStorage: (state) => {
        console.log(state)
    }
}))