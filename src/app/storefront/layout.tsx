"use client";

import { EvolveSpinner } from "@/components";
import { Center } from "@chakra-ui/react";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <Center h="100vh" w="100%">
          <EvolveSpinner />
        </Center>
      }
    >
      {children}
    </Suspense>
  );
}
