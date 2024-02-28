import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { ReactNode, isValidElement } from "react";

export type EvolveDashboardHeaderProps = {
  header: string | ReactNode;
  desciption?: string;
};
export const EvolveDashboardHeader = (props: EvolveDashboardHeaderProps) => {
  const { header, desciption } = props;

  return (
    <Stack>
      {isValidElement(header) ? header : <Heading>{header}</Heading>}
      <Text>{desciption}</Text>
    </Stack>
  );
};
