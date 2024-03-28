import { AttachmentIcon } from "@chakra-ui/icons";
import { HStack, Image, Input, Stack, Text } from "@chakra-ui/react";

export type EvolveFileUploadProps = {
  file: File | null | string;
  onFileChange: (file: File) => void;
  width?: string;
  height?: string;
  id: string;
};

export const EvolveFileUpload = (props: EvolveFileUploadProps) => {
  const { file, onFileChange, width, height, id } = props;

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const inputFile = event.target.files?.[0];

    if (inputFile) {
      onFileChange(inputFile);
    }
  }
  return (
    <Stack>
      <HStack
        as="label"
        htmlFor={!file ? id : ""}
        align="center"
        justify="center"
        border="1px dashed"
        p={8}
        borderColor="#B3B3B3"
        borderRadius="md"
        cursor={!file ? "pointer" : ""}
        h={height ?? "250px"}
        w={width ?? "250px"}
      >
        {!file ? (
          <Stack gap={0}>
            <HStack justify="center">
              <AttachmentIcon />
              <Text>Click to upload</Text>
            </HStack>
            <Text color="brand.description" fontSize="sm">
              .png or .jpg is accepted
            </Text>
          </Stack>
        ) : (
          <Image
            src={typeof file === "string" ? file : URL.createObjectURL(file)}
            alt="shopLogo"
            h="100%"
            w="100%"
            objectFit="cover"
          />
        )}
      </HStack>
      {file && (
        <Text as="label" htmlFor={id} color="brand.primary" cursor="pointer">
          Not happy? Upload again
        </Text>
      )}
      <Input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        id={id}
        hidden
        onChange={handleFileChange}
      />
    </Stack>
  );
};
