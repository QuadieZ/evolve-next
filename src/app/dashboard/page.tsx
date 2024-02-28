"use client";

import NextLink from "next/link";
import { EvolveDashboardHeader } from "@/components";
import { useShopStore, useUserStore } from "@/state";
import { ShopPreviewData } from "@/types";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const mockShops: ShopPreviewData[] = [
  {
    shopId: "1",
    shopName: "Shop 1",
    shopPictureUrl: "https://via.placeholder.com/150",
    shopDescription: "This is a shop description",
    ownerId: "1",
  },
  {
    shopId: "2",
    shopName: "Shop 2",
    ownerId: "1",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

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
      <Heading as="h2" fontSize="lg">
        Which shop do you want to manage?
      </Heading>
      <Flex gap={4} flexWrap="wrap">
        {mockShops.map((shop) => (
          <Link
            key={shop.shopId}
            href={`/dashboard/shop/${shop.shopId}`}
            as={NextLink}
            cursor="pointer"
          >
            <Card w="27vw" h="40vh">
              <CardBody>
                <Image
                  src={shop.shopPictureUrl ?? "/shopPlaceholder.jpeg"}
                  alt={shop.shopName}
                  borderRadius="lg"
                  w="100%"
                  objectFit={"cover"}
                  h="150px"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{shop.shopName}</Heading>
                  {shop.shopDescription && <Text>{shop.shopDescription}</Text>}
                </Stack>
              </CardBody>
            </Card>
          </Link>
        ))}
      </Flex>
    </Stack>
  );
}
