"use client";

import NextLink from "next/link";
import { useShopStore, useUserStore } from "@/state";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  DragHandleIcon,
  EditIcon,
  HamburgerIcon,
  LinkIcon,
  SettingsIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  Heading,
  Image,
  Img,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EvolveButton } from "./EvolveButton";
import supabase from "@/utils/supabase";

export const EvolveNavBar = () => {
  const router = useRouter();
  const shopId = useShopStore((state) => state.currentShop?.shopId);
  const pathname = usePathname().split("/");
  const userProfile = useUserStore((state) => state.userProfile);
  console.log(userProfile?.pictureUrl);
  const draftStyle = useShopStore((state) => state.draftStyle);
  const currentShop = useShopStore((state) => state.currentShop);
  const shopStyle = useShopStore((state) => state.currentShop?.shopStyle);
  const setShopStyle = useShopStore((state) => state.setShopStyle);

  const { onCopy } = useClipboard();
  const showDashboardMenu =
    pathname.includes("shop") && !pathname.includes("onboarding");
  const isEditor = pathname.includes("editor");
  const [username, setUsername] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");

  const toast = useToast();
  useEffect(() => {
    userProfile?.pictureUrl && setImageSrc(userProfile?.pictureUrl);
    userProfile?.display_name && setUsername(userProfile?.display_name);
  }, [userProfile?.pictureUrl, userProfile?.display_name]);

  async function handlePublish() {
    // save to db
    setShopStyle({
      ...shopStyle!,
      components: draftStyle!.components,
    });
    const { error } = await supabase
      ?.from("shopStyle")
      .update({
        components: draftStyle!.components.map((c) => JSON.stringify(c)),
      })
      .eq("shopStyleId", currentShop?.shopStyleId);

    if (error) {
      console.error("Error saving shop style:", error.message);
      return;
    }
    toast({
      title: "Published!",
      description: "Your changes have been published",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Flex
      w="100%"
      h="10vh"
      align="center"
      justify="space-between"
      px={8}
      borderBottom="1px"
      borderColor="border.item"
      position="sticky"
      zIndex={100}
      bg="white"
    >
      <Flex
        gap={2}
        onClick={() =>
          router.replace(
            //showDashboardMenu ? `/dashboard/shop/${shopId}` : "/dashboard"
            "/dashboard"
          )
        }
        cursor="pointer"
      >
        <Heading color="brand.primary" as="h4" size="md">
          EVOLVE
        </Heading>
        <Heading as="h4" size="md">
          by DevA
        </Heading>
      </Flex>
      <Flex w="fit-content" gap={4} h="100%" align="center" pos="relative">
        {isEditor && (
          <Button
            bg="brand.primary"
            color="white"
            _hover={{
              bg: "brand.hoverPrimary",
            }}
            onClick={handlePublish}
          >
            Publish
          </Button>
        )}
        {showDashboardMenu && (
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<HamburgerIcon />}
              variant="outline"
            >
              Manage Your Shop
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<LinkIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://evolve-next.vercel.app/storefront/${currentShop?.shopId}`
                  );
                  toast({
                    title: "Link copied",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                }}
              >
                Share this store
              </MenuItem>
              <MenuItem
                icon={<EditIcon />}
                as={NextLink}
                href={`/dashboard/shop/${shopId}/editor`}
              >
                Edit Storefront
              </MenuItem>
              <MenuItem
                icon={<DragHandleIcon />}
                as={NextLink}
                href={`/dashboard/shop/${shopId}/products`}
              >
                Manage Products
              </MenuItem>
              <MenuItem
                icon={<StarIcon />}
                as={NextLink}
                href={`/dashboard/shop/${shopId}/promotions`}
              >
                Manage Promotions
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<SettingsIcon />}
                as={NextLink}
                href={`/dashboard/shop/${shopId}/settings`}
              >
                General Setting
              </MenuItem>
              <MenuItem
                icon={<ArrowLeftIcon />}
                as={NextLink}
                href={`/dashboard`}
              >
                Back to shops
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        <Avatar
          src={imageSrc}
          name={username}
          pos="relative"
          h="50%"
          w="auto"
        />
      </Flex>
    </Flex>
  );
};
