"use client";

import { EvolveContainer, EvolveNavBar } from "@/components";
import { Flex, useColorMode } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setColorMode, colorMode } = useColorMode();

  useEffect(() => {
    console.log(colorMode);
    if (colorMode === "dark") {
      setColorMode("light");
    }
  }, []);
  return (
    <Flex flexDir="column" h="100vh">
      <EvolveNavBar />
      <EvolveContainer>{children}</EvolveContainer>
    </Flex>
  );
}
