import {
  Box,
  FormLabel,
  HStack,
  Image,
  Input,
  RadioProps,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

export type EvolveImageRadioItem = {
  imageSource: string;
  label: string;
} & RadioProps;

export type EvolveImageRadioProps = {
  options: EvolveImageRadioItem[];
  defaultValue?: string;
  onItemChange: (value: string) => void;
  imageHeight?: string;
};

const EvolveImageRadioItem = (props: EvolveImageRadioItem) => {
  const { imageSource, label, height, ...radioProps } = props;
  const { getInputProps, getRadioProps, htmlProps, getLabelProps, state } =
    useRadio(radioProps);

  return (
    <FormLabel {...htmlProps} cursor="pointer" m={0}>
      <Input {...getInputProps()} hidden />
      <Stack
        {...getRadioProps()}
        cursor="pointer"
        borderRadius="md"
        p={2}
        _hover={{ bg: !state.isChecked ? "gray.50" : "brand.primary" }}
        bg={state.isChecked ? "brand.primary" : "white"}
        color={state.isChecked ? "brand.contrast" : "black"}
      >
        <Stack {...getLabelProps()}>
          <Image
            src={imageSource}
            alt={label}
            h={height}
            display="flex"
            objectFit="contain"
          />
          <Text>{label}</Text>
        </Stack>
      </Stack>
    </FormLabel>
  );
};

export const EvolveImageRadio = (props: EvolveImageRadioProps) => {
  const { options, defaultValue, onItemChange, imageHeight } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: defaultValue ?? options[0].value,
    onChange: onItemChange,
  });

  return (
    <HStack {...getRootProps()} justify="center" w="100%" gap={16}>
      {options.map((option) => (
        <EvolveImageRadioItem
          key={option.value}
          height={imageHeight}
          {...option}
          {...getRadioProps({ value: option.value })}
        />
      ))}
    </HStack>
  );
};
