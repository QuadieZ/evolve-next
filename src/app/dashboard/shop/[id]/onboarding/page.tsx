"use client";

import { EvolveDashboardHeader, ShopName } from "@/components";
import {
  EvolveImageRadio,
  EvolveImageRadioItem,
} from "@/components/EvolveImageRadio";
import { LAYOUT_TEMPLATE } from "@/constant/layout";
import { useShopStore } from "@/state";
import { ShopLayout, ShopProductCardLayout } from "@/types";
import { AttachmentIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ColorPicker as ColorPickerComponent } from "@/components/onboard";
import { EvolveFileUpload } from "@/components/EvolveFileUpload";
import { ColorPicker } from "@/components/ColorPicker";
import { v4 } from "uuid";
import supabase from "@/utils/supabase";

const layoutOptions: EvolveImageRadioItem[] = [
  {
    imageSource: "/layoutPreview/Minimalistic.png",
    label: "Minimal",
    value: "MINIMAL",
  },
  {
    imageSource: "/layoutPreview/Creative.png",
    label: "Creative",
    value: "CREATIVE",
  },
  {
    imageSource: "/layoutPreview/Clear.png",
    label: "Clear",
    value: "CLEAR",
  },
];

const productCardOptions: EvolveImageRadioItem[] = [
  {
    imageSource: "/productCardPreview/full.png",
    label: "Full",
    value: "full",
  },
  {
    imageSource: "/productCardPreview/compact.png",
    label: "Compact",
    value: "compact",
  },
];

const UploadLogo = ({
  logo,
  setLogo,
}: {
  logo: File | null;
  setLogo: (file: File) => void;
}) => {
  function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setLogo(file);
    }
  }

  //TODO: AI generation of logo

  return (
    <Stack
      w="100%"
      align="flex-start"
      gap={4}
      bg="gray.50"
      border="1px solid"
      borderColor="border.item"
      p={8}
      borderRadius="lg"
      flex={1}
    >
      <Stack>
        <Heading as="h2" fontSize="xl">
          Upload your storefront logo
        </Heading>
        <Text color="brand.description">
          We recommend using a square size logo
        </Text>
      </Stack>
      <EvolveFileUpload file={logo} onFileChange={setLogo} id="logo" />
    </Stack>
  );
};

const ChooseLayout = ({
  layoutStyle,
  setLayoutStyle,
}: {
  layoutStyle: ShopLayout;
  setLayoutStyle: (layout: ShopLayout) => void;
}) => {
  function handleLayoutChange(value: string) {
    setLayoutStyle(value as ShopLayout);
  }

  return (
    <Stack
      w="100%"
      align="center"
      gap={8}
      bg="gray.50"
      border="1px solid"
      borderColor="border.item"
      p={8}
      borderRadius="lg"
      flex={1}
    >
      <Heading as="h2" fontSize="xl">
        Choose your storefront layout
      </Heading>
      <Stack w="100%">
        <EvolveImageRadio
          options={layoutOptions}
          imageHeight="55vh"
          defaultValue={layoutStyle}
          onItemChange={handleLayoutChange}
        />
      </Stack>
    </Stack>
  );
};

const ChooseProductCardStyle = ({
  productCardStyle,
  setProductCardStyle,
}: {
  productCardStyle: ShopProductCardLayout;
  setProductCardStyle: (layout: ShopProductCardLayout) => void;
}) => {
  function handleProductCardStyleChange(value: string) {
    setProductCardStyle(value as ShopProductCardLayout);
  }
  return (
    <Stack
      w="100%"
      align="center"
      gap={8}
      bg="gray.50"
      border="1px solid"
      borderColor="border.item"
      p={8}
      borderRadius="lg"
      flex={1}
    >
      <Heading as="h2" fontSize="xl">
        Choose the card style for your product cards
      </Heading>
      <Stack w="100%">
        <EvolveImageRadio
          options={productCardOptions}
          imageHeight="20vh"
          onItemChange={handleProductCardStyleChange}
          defaultValue={productCardStyle}
        />
      </Stack>
    </Stack>
  );
};

export default function Page() {
  const currentShop = useShopStore((state) => state.currentShop);
  const setDraftStyle = useShopStore((state) => state.setDraftStyle);
  const setShopStyle = useShopStore((state) => state.setShopStyle);
  const router = useRouter();

  useEffect(() => {
    if (currentShop?.hasOnboarded) {
      router.replace(`/dashboard/shop/${currentShop.shopId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const name = currentShop?.shopName;
  const [currentPage, setCurrentPage] = useState(0);

  const [primaryColor, setPrimaryColor] = useState("#00C700");
  const [borderColor, setBorderColor] = useState("#E6E6E6");
  const [contrastColor, setContrastColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [secondaryBackgroundColor, setSecondaryBackgroundColor] =
    useState("#E6E6E6");

  const [logo, setLogo] = useState<File | null>(null);
  const [layoutStyle, setLayoutStyle] = useState<ShopLayout>("MINIMAL");
  const [productCardStyle, setProductCardStyle] =
    useState<ShopProductCardLayout>("full");

  const componentsPageMap: Record<number, React.ReactNode> = {
    0: (
      <ColorPicker
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        contrastColor={contrastColor}
        setContrastColor={setContrastColor}
        textColor={textColor}
        setTextColor={setTextColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        secondaryBackgroundColor={secondaryBackgroundColor}
        setSecondaryBackgroundColor={setSecondaryBackgroundColor}
      />
    ),
    1: <UploadLogo logo={logo} setLogo={setLogo} />,
    2: (
      <ChooseLayout layoutStyle={layoutStyle} setLayoutStyle={setLayoutStyle} />
    ),
    3: (
      <ChooseProductCardStyle
        productCardStyle={productCardStyle}
        setProductCardStyle={setProductCardStyle}
      />
    ),
  };

  const firstPage = 0;
  const lastPage = Object.keys(componentsPageMap).length - 1;

  function handlePreviousPageClick() {
    setCurrentPage((prev) => prev - 1);
  }

  function handleNextPageClick() {
    setCurrentPage((prev) => prev + 1);
  }

  async function handleConfirmClick() {
    const layoutFromTemplate = LAYOUT_TEMPLATE[layoutStyle];
    const shopTitleIndex = layoutFromTemplate.findIndex(
      (c) => c.name === "ShopTitle"
    );
    const productCardIndex = layoutFromTemplate.findIndex(
      (c) => c.name === "ProductsList" && !c.props.isFeatured
    );
    const productCategoryIndex = layoutFromTemplate.findIndex(
      (c) => c.name === "ProductCategories"
    );
    (layoutFromTemplate[shopTitleIndex] as any).props = {
      ...(layoutFromTemplate[shopTitleIndex] as any).props,
      name,
      logo: logo ? URL.createObjectURL(logo) : null,
    };
    (layoutFromTemplate[productCardIndex] as any).props = {
      ...(layoutFromTemplate[productCardIndex] as any).props,
      variant: productCardStyle,
      productCardVariant: layoutStyle === "CLEAR" ? "clear" : "modern",
    };
    (layoutFromTemplate[productCategoryIndex] as any).props = {
      ...(layoutFromTemplate[productCategoryIndex] as any).props,
      variant: layoutStyle === "CLEAR" ? "clear" : "fill",
    };

    const shopStyle = {
      colors: {
        primaryColor,
        borderColor,
        contrastColor,
        textColor,
        backgroundColor,
        secondaryBackgroundColor,
      },
      logo,
      shopLayout: layoutStyle,
      shopProductCardLayout: productCardStyle,
      components: LAYOUT_TEMPLATE[layoutStyle],
    };
    console.log(shopStyle);

    const styleId = v4();
    const { error } = await supabase!
      .from("shopStyle")
      .insert({
        shopStyleId: styleId,
        primaryColor,
        borderColor,
        contrastColor,
        textColor,
        backgroundColor,
        secondaryBackgroundColor,
        logo: logo?.name,
        shopLayout: layoutStyle,
        shopProductCardLayout: productCardStyle,
        components: LAYOUT_TEMPLATE[layoutStyle]?.map((c) => JSON.stringify(c)),
      })
      .single();
    const { error: shopError } = await supabase!
      .from("shop")
      .update({
        hasOnboarded: true,
        shopStyleId: styleId,
      })
      .eq("shopId", currentShop?.shopId);

    if (error || shopError) {
      console.error("Error saving shop style:", error?.message);
      return;
    }

    setShopStyle(shopStyle);
    router.replace(
      `/dashboard/shop/${currentShop?.shopId}/editor?isDraft=true`
    );
  }

  return (
    <Stack w="100%" suppressHydrationWarning gap={4} h="100%">
      <EvolveDashboardHeader
        header={`Welcome to ${name}`}
        desciption="Let's start customizing your storefront! All settings can be changed later"
      />
      {componentsPageMap[currentPage]}
      <HStack w="100%" justify="flex-end">
        {currentPage > firstPage && (
          <Button onClick={handlePreviousPageClick} variant="outline">
            Go back
          </Button>
        )}
        {currentPage < lastPage && (
          <Button
            onClick={handleNextPageClick}
            bgColor="brand.primary"
            color="white"
            _hover={{ bgColor: "brand.hoverPrimary" }}
          >
            Continue
          </Button>
        )}
        {currentPage === lastPage && (
          <Button
            onClick={handleConfirmClick}
            bgColor="brand.primary"
            color="white"
            _hover={{ bgColor: "brand.hoverPrimary" }}
          >
            Confirm
          </Button>
        )}
      </HStack>
    </Stack>
  );
}
