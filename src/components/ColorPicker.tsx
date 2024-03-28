import { HStack, Heading, Stack } from "@chakra-ui/react";
import { ColorPicker as ColorPickerComponent } from "@/components/onboard";
import { ShopName } from ".";

export const ColorPicker = ({
  primaryColor,
  setPrimaryColor,
  borderColor,
  setBorderColor,
  contrastColor,
  setContrastColor,
  textColor,
  setTextColor,
  backgroundColor,
  setBackgroundColor,
  secondaryBackgroundColor,
  setSecondaryBackgroundColor,
  noBackground,
}: {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  borderColor: string;
  setBorderColor: (color: string) => void;
  contrastColor: string;
  setContrastColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  secondaryBackgroundColor: string;
  setSecondaryBackgroundColor: (color: string) => void;
  noBackground?: boolean;
}) => {
  return (
    <Stack
      w="100%"
      align="flex-start"
      gap={8}
      bg={noBackground ? "none" : "gray.50"}
      border={noBackground ? "none" : "1px solid"}
      borderColor="border.item"
      p={8}
      borderRadius="lg"
      flex={1}
    >
      <Heading as="h2" fontSize="xl">
        Storefront Theme
      </Heading>
      <HStack w="100%" gap={12}>
        <Stack w="60%" gap={4}>
          <HStack>
            <ColorPickerComponent
              label="Primary Color"
              tooltipText="Main color of your brand; used in buttons, active items, highlights"
              value={primaryColor}
              onChange={setPrimaryColor}
            />
            <ColorPickerComponent
              label="Border Color"
              tooltipText="Will also be used as description text"
              value={borderColor}
              onChange={setBorderColor}
            />
          </HStack>
          <HStack>
            <ColorPickerComponent
              label="Contrast Color"
              //tooltipText="Main color of your brand; used in buttons, active items, highlights"
              value={contrastColor}
              onChange={setContrastColor}
            />
            <ColorPickerComponent
              label="Text Color"
              //tooltipText="Main color of your brand; used in buttons, active items, highlights"
              value={textColor}
              onChange={setTextColor}
            />
          </HStack>
          <HStack>
            <ColorPickerComponent
              label="Background Color"
              tooltipText="Color of the background of your storefront"
              value={backgroundColor}
              onChange={setBackgroundColor}
            />
            <ColorPickerComponent
              label="Secondary Background Color"
              tooltipText="Used in as background for inactive items"
              value={secondaryBackgroundColor}
              onChange={setSecondaryBackgroundColor}
            />
          </HStack>
        </Stack>
        <Stack
          bg={backgroundColor}
          flex={1}
          p={8}
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
        >
          <ShopName
            name="Shop Name"
            description="Be the real you"
            headerColor={textColor}
            primaryButtonBgColor={primaryColor}
            primaryButtonColor={contrastColor}
            secondaryButtonColor={textColor}
            secondaryButtonOutlineColor={borderColor}
          />
        </Stack>
      </HStack>
    </Stack>
  );
};
