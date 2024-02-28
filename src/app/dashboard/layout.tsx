"use client";

import { EvolveContainer, EvolveNavBar } from "@/components";
import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex flexDir="column" h="100vh">
      <EvolveNavBar />
      <EvolveContainer>{children}</EvolveContainer>
    </Flex>
  );
}
