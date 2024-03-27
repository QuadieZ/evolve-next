import { InfoIcon } from "@chakra-ui/icons";
import { HStack, Input, Text, Tooltip } from "@chakra-ui/react";

type ColorPickerProps = {
  label: string;
  tooltipText?: string;
  value: string;
  onChange: (color: string) => void;
};
export const ColorPicker = (props: ColorPickerProps) => {
  const { label, tooltipText, value, onChange } = props;
  return (
    <HStack
      border="1px solid"
      borderColor="gray.300"
      p={0}
      pl={4}
      pr={-2}
      h="45px"
      justify="space-between"
      w="100%"
      borderRadius="md"
      overflow="hidden"
    >
      <HStack flex={1}>
        <Text as="label">{label}</Text>
        {tooltipText && (
          <Tooltip placement="top" label={tooltipText}>
            <InfoIcon color="gray.500" />
          </Tooltip>
        )}
      </HStack>
      <Input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        border="none"
        w="50px"
        h="50px"
        p={0}
        mr={-1}
      />
    </HStack>
  );
};
