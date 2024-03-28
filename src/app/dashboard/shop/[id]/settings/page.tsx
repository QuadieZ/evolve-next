"use client";

import { EvolveDashboardHeader, EvolveSpinner } from "@/components";
import { EvolveFileUpload } from "@/components/EvolveFileUpload";
import { useShopStore } from "@/state";
import {
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ColorPicker } from "../onboarding/page";
import { EvolveButton } from "@/components/EvolveButton";

export default function Page() {
  const currentShop = useShopStore((state) => state.currentShop);
  const setCurrentShop = useShopStore((state) => state.setCurrentShop);

  const [shopName, setShopName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [shopBanner, setShopBanner] = useState<string | null | File>(null);
  const [logo, setLogo] = useState<File | null>(null);

  const [primaryColor, setPrimaryColor] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [contrastColor, setContrastColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [secondaryBackgroundColor, setSecondaryBackgroundColor] = useState("");

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (!currentShop || secondaryBackgroundColor === "") return;
    if (
      shopName !== currentShop?.shopName ||
      description !== currentShop?.shopDescription ||
      shopBanner !== currentShop?.shopPictureUrl ||
      logo !== currentShop?.shopStyle?.logo ||
      primaryColor !== currentShop?.shopStyle?.colors.primaryColor ||
      borderColor !== currentShop?.shopStyle?.colors.borderColor ||
      contrastColor !== currentShop?.shopStyle?.colors.contrastColor ||
      textColor !== currentShop?.shopStyle?.colors.textColor ||
      backgroundColor !== currentShop?.shopStyle?.colors.backgroundColor ||
      secondaryBackgroundColor !==
        currentShop?.shopStyle?.colors.secondaryBackgroundColor
    ) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shopName,
    description,
    shopBanner,
    logo,
    primaryColor,
    borderColor,
    contrastColor,
    textColor,
    backgroundColor,
    secondaryBackgroundColor,
  ]);

  useEffect(() => {
    if (currentShop) {
      setShopName(currentShop.shopName);
      setDescription(currentShop.shopDescription ?? "");
      setShopBanner(currentShop.shopPictureUrl ?? null);
      setLogo(currentShop.shopStyle?.logo ?? null);
      setPrimaryColor(currentShop.shopStyle?.colors.primaryColor!);
      setBorderColor(currentShop.shopStyle?.colors.borderColor!);
      setContrastColor(currentShop.shopStyle?.colors.contrastColor!);
      setTextColor(currentShop.shopStyle?.colors.textColor!);
      setBackgroundColor(currentShop.shopStyle?.colors.backgroundColor!);
      setSecondaryBackgroundColor(
        currentShop.shopStyle?.colors.secondaryBackgroundColor!
      );
    }
  }, [currentShop]);

  function handleSaveChange() {
    setCurrentShop({
      ...currentShop!,
      shopName: shopName ?? currentShop?.shopName!,
      shopDescription: description ?? currentShop?.shopDescription,
      shopPictureUrl:
        (typeof shopBanner === "string"
          ? shopBanner
          : URL.createObjectURL(shopBanner!)) ?? currentShop?.shopPictureUrl,
      shopStyle: {
        ...currentShop?.shopStyle!,
        logo: logo ?? currentShop?.shopStyle?.logo ?? null,
        colors: {
          primaryColor: primaryColor,
          borderColor: borderColor,
          contrastColor: contrastColor,
          textColor: textColor,
          backgroundColor: backgroundColor,
          secondaryBackgroundColor: secondaryBackgroundColor,
        },
      },
    });
    setHasUnsavedChanges(false);
  }

  if (!currentShop) {
    return (
      <Center h="100%" w="100%">
        <EvolveSpinner />
      </Center>
    );
  }

  return (
    <Stack h="100%" w="100%">
      <HStack justify="space-between">
        <EvolveDashboardHeader header="Setting" />
        <Button
          bgColor="brand.primary"
          _hover={{ bgColor: "brand.hoverPrimary" }}
          color="brand.contrast"
          isDisabled={!hasUnsavedChanges}
          onClick={handleSaveChange}
        >
          Save
        </Button>
      </HStack>
      <Tabs
        variant="enclosed-colored"
        colorScheme="green"
        h="100%"
        display="flex"
        flexDirection="column"
      >
        <TabList>
          <Tab>General Setting</Tab>
          <Tab>Theming Setting</Tab>
        </TabList>
        <TabPanels
          border="1px solid"
          borderColor="border.item"
          h="100%"
          overflowY="scroll"
        >
          <TabPanel p={12}>
            <Flex w="100%" h="100%" gap={8} flexDir="column">
              <FormControl gap={2} display="flex" flexDir="column" w="40%">
                <Text>Shop Name</Text>
                <Input
                  value={shopName!}
                  onChange={(e) => setShopName(e.target.value)}
                  _active={{ borderColor: "brand.primary" }}
                  _focus={{ borderColor: "brand.primary", boxShadow: "none" }}
                />
              </FormControl>
              <FormControl gap={2} display="flex" flexDir="column" w="60%">
                <Text>Shop Description</Text>
                <Textarea
                  value={description ?? ""}
                  onChange={(e) => setDescription(e.target.value)}
                  _active={{ borderColor: "brand.primary" }}
                  _focus={{ borderColor: "brand.primary", boxShadow: "none" }}
                />
              </FormControl>
              <HStack justify="flex-start" align="flex-start" w="80%">
                <FormControl gap={2} display="flex" flexDir="column" w="40%">
                  <Text>Shop Logo</Text>
                  <EvolveFileUpload
                    file={logo}
                    onFileChange={setLogo}
                    id="logo"
                  />
                </FormControl>
                <FormControl gap={2} display="flex" flexDir="column" w="40%">
                  <Text>Shop Banner</Text>
                  <EvolveFileUpload
                    id="shopBanner"
                    file={shopBanner}
                    onFileChange={setShopBanner}
                    width="500px"
                  />
                </FormControl>
              </HStack>
            </Flex>
          </TabPanel>
          <TabPanel>
            <ColorPicker
              noBackground
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
