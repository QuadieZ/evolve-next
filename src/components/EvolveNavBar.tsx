"use client";

import NextLink from "next/link";
import { useShopStore, useUserStore } from "@/state";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  DragHandleIcon,
  EditIcon,
  HamburgerIcon,
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
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EvolveButton } from "./EvolveButton";

export const EvolveNavBar = () => {
  const router = useRouter();
  const shopId = useShopStore((state) => state.currentShop?.shopId);
  const pathname = usePathname().split("/");
  const userProfile = useUserStore((state) => state.userProfile);
  console.log(userProfile?.pictureUrl);
  const draftStyle = useShopStore((state) => state.draftStyle);
  const setShopStyle = useShopStore((state) => state.setShopStyle);

  const showDashboardMenu =
    pathname.includes("shop") && !pathname.includes("onboarding");
  const isEditor = pathname.includes("editor");
  const [username, setUsername] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    userProfile?.pictureUrl && setImageSrc(userProfile?.pictureUrl);
    userProfile?.display_name && setUsername(userProfile?.display_name);
  }, [userProfile?.pictureUrl, userProfile?.display_name]);

  function handlePublish() {
    // save to db
    setShopStyle(draftStyle!);
    router.push(`/dashboard/shop/${shopId}`);
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
            showDashboardMenu ? `/dashboard/shop/${shopId}` : "/dashboard"
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
