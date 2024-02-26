"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../style/theme";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
