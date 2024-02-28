"use client";

import {
  EvolveImageRadio,
  EvolveImageRadioItem,
} from "@/components/EvolveImageRadio";
import { useShopStore } from "@/state";
import { ShopLayout, ShopProductCardLayout } from "@/types";
import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    value: "FULL",
  },
  {
    imageSource: "/productCardPreview/compact.png",
    label: "Compact",
    value: "COMPACT",
  },
];

const ColorPicker = ({
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
}: {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
}) => {
  function handlePrimaryColorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    setPrimaryColor(event.target.value);
  }

  function handleSecondaryColorChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    setSecondaryColor(event.target.value);
  }

  return (
    <Stack w="100%" align="center" gap={8}>
      <Heading as="h2" fontSize="xl">
        Select storefront colors
      </Heading>
      <Stack flexDir="row" w="60%" gap={20}>
        <Stack flex={1}>
          <Text as="label">Primary color</Text>
          <Input
            type="color"
            value={primaryColor}
            onChange={handlePrimaryColorChange}
          />
        </Stack>
        <Stack flex={1}>
          <Text as="label">Secondary color</Text>
          <Input
            type="color"
            value={secondaryColor}
            onChange={handleSecondaryColorChange}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

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

  //TODO: Preview Image
  //TODO: AI generation of logo

  return (
    <Stack w="100%" align="center" gap={8}>
      <Heading as="h2" fontSize="xl">
        Upload your storefront logo
      </Heading>
      <Stack>
        <HStack
          as="label"
          htmlFor="logo"
          align="center"
          border="1px dashed"
          p={8}
          borderColor="#B3B3B3"
          borderRadius="md"
          cursor="pointer"
        >
          {!logo ? (
            <>
              <AttachmentIcon />
              <Text>Click to upload</Text>
            </>
          ) : (
            <Text>{logo.name}</Text>
          )}
        </HStack>
        <Input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="logo"
          hidden
          onChange={handleLogoUpload}
        />
      </Stack>
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
    <Stack w="100%" align="center" gap={8}>
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
    <Stack w="100%" align="center" gap={8}>
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
  const router = useRouter();

  useEffect(() => {
    if (currentShop?.hasOnboarded) {
      router.replace(`/dashboard/shop/${currentShop.shopId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const name = currentShop?.shopName;
  const [currentPage, setCurrentPage] = useState(0);
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [logo, setLogo] = useState<File | null>(null);
  const [layoutStyle, setLayoutStyle] = useState<ShopLayout>("MINIMAL");
  const [productCardStyle, setProductCardStyle] =
    useState<ShopProductCardLayout>("FULL");

  const componentsPageMap: Record<number, React.ReactNode> = {
    0: (
      <ColorPicker
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        secondaryColor={secondaryColor}
        setSecondaryColor={setSecondaryColor}
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

  function handleConfirmClick() {
    setDraftStyle({
      colors: {
        primaryColor,
        secondaryColor,
      },
      logo,
      shopLayout: layoutStyle,
      shopProductCardLayout: productCardStyle,
    });
    router.replace(
      `/dashboard/shop/${currentShop?.shopId}/editor?isDraft=true`
    );
  }

  return (
    <Stack align="center" w="100%" suppressHydrationWarning gap={12}>
      <Center flexDir="column">
        <Heading suppressHydrationWarning>Welcome to {name}</Heading>
        <Text>{`Let's start customizing your storefront! All settings can be changed later`}</Text>
      </Center>
      {componentsPageMap[currentPage]}
      <HStack>
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
