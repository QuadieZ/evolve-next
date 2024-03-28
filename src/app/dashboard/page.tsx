"use client";
import { ShopDetailData } from "@/types";
import { createClient } from "@supabase/supabase-js";
import NextLink from "next/link";
import { EvolveDashboardHeader, EvolveSpinner } from "@/components";
import { useShopStore, useUserStore } from "@/state";
import { ShopPreviewData } from "@/types";
import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DragHandleIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import supabase from "@/utils/supabase";

const columns: TableColumn<ShopPreviewData>[] = [
  {
    cell: (row) => (
      <Image
        src="/shopPlaceholder.jpeg"
        alt={row.shopName}
        borderRadius="lg"
        w="auto"
        objectFit={"cover"}
        h="50px"
      />
    ),
    width: "120px",
    style: {
      cursor: "pointer",
    },
  },
  {
    name: "Shop",
    selector: (row) => row.shopName,
    width: "200px",
  },
  {
    name: "Description",
    selector: (row) => row.shopDescription ?? "No description",
  },
  {
    name: "Actions",
    cell: (row) => (
      <HStack spacing={4}>
        <Tooltip label="Edit storefront">
          <Link as={NextLink} href={`/dashboard/shop/${row.shopId}/editor`}>
            <EditIcon />
          </Link>
        </Tooltip>
        <Tooltip label="Manage Product">
          <Link as={NextLink} href={`/dashboard/shop/${row.shopId}/products`}>
            <DragHandleIcon />
          </Link>
        </Tooltip>
        <Tooltip label="Settings">
          <Link href={`/dashboard/shop/${row.shopId}/settings`} as={NextLink}>
            <SettingsIcon />
          </Link>
        </Tooltip>
      </HStack>
    ),
  },
];

const mockShops: ShopPreviewData[] = [
  {
    shopId: "1",
    shopName: "Shop 1",
    shopDescription: "This is a shop description",
    ownerId: "1",
    hasOnboarded: true,
  },
  {
    shopId: "2",
    shopName: "Shop 2",
    ownerId: "1",
    hasOnboarded: true,
  },
];

export default function Dashboard({ params }: { params: { code: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const code = params.code;
  const sessionToken = useUserStore((state: any) => state.sessionToken);
  const setSessionToken = useUserStore((state: any) => state.setSessionToken);
  const setRequestedTime = useUserStore(
    (state: any) => state.setSessionTokenRequestedTime
  );
  const userProfile = useUserStore((state: any) => state.userProfile);
  const setUserProfile = useUserStore((state: any) => state.setUserProfile);
  const clearCurrentShop = useShopStore((state: any) => state.clearCurrentShop);

  const [shopData, setShopData] = useState<ShopPreviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    clearCurrentShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getSessionToken(code: string) {
      const sessionToken = await fetch(
        "https://api.line.me/oauth2/v2.1/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:3000/dashboard",
            client_id: process.env.NEXT_PUBLIC_LINE_LOGIN_CLIENT_ID!,
            client_secret: process.env.NEXT_PUBLIC_LINE_LOGIN_SECRET!,
          }),
        }
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setSessionToken(sessionToken.access_token);
      setRequestedTime(new Date());
    }

    if (code && !sessionToken) {
      getSessionToken(code as string);
    }
    router.replace(pathname.split("?")[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    async function getUserProfile(sessionToken: string) {
      const userProfile = await fetch("https://api.line.me/v2/profile", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setUserProfile(userProfile);
    }

    if (sessionToken && !userProfile) {
      getUserProfile(sessionToken);
    }

    async function getAllShops() {
      const { data, error } = await supabase!.from("shop").select("*");
      if (error) {
        console.error("Error fetching data:", error.message);
        return;
      }

      setShopData(
        data.map((shop) => ({
          shopId: shop.shopId,
          shopName: shop.shopName,
          shopDescription: shop.shopDescription,
          ownerId: shop.ownerId,
          hasOnboarded: shop.hasOnboarded,
        }))
      );
      setIsLoading(false);
    }

    getAllShops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

  console.log(shopData);
  return (
    <Stack gap={8}>
      <EvolveDashboardHeader
        header={
          <Heading>
            Welcome to{" "}
            <Box as="span" color="brand.primary">
              Evolve
            </Box>
          </Heading>
        }
        desciption="Evolve your LINE Shopping storefronts"
      />
      <DataTable
        columns={columns}
        data={shopData}
        onRowClicked={(row, event) => console.log(row, event)}
        progressPending={isLoading}
        progressComponent={<EvolveSpinner />}
      />
    </Stack>
  );
}
