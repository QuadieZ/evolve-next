import { EvolveNavBar } from "@/components";
import { Flex } from "@chakra-ui/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex flexDir="column">
      <EvolveNavBar />
      {children}
    </Flex>
  );
}
