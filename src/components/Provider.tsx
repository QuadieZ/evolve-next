"use client";

import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { theme } from "../style/theme";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
