"use client";

import { EvolveDashboardHeader, EvolveSpinner } from "@/components";
import { EvolveButton } from "@/components/EvolveButton";
import { mockProducts } from "@/mockData";
import { ProductData } from "@/types";
import { Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

const columns: TableColumn<ProductData>[] = [
  {
    name: "Product",
    selector: (row) => row.name,
  },
  {
    name: "Description",
    selector: (row) => row.description,
  },
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        process.env.NEXT_PUBLIC_LINE_API_ENDPOINT + "/myshop/v1/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            mode: "no-cors",
            "X-API-KEY": process.env.NEXT_PUBLIC_LINE_API_KEY!,
            "Access-Control-Allow-Origin": "*",
          },
        }
      ).catch((err) => console.log(err));

      console.log(data);
    }
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    fetchData();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Stack h="100%">
      <HStack justify="space-between">
        <EvolveDashboardHeader
          header="Products"
          desciption="Create, Edit, Delete, and Manage your products"
        />
        <EvolveButton
          flex="none"
          h="40px"
          px={8}
          borderRadius="lg"
          fontSize="md"
        >
          Add Products
        </EvolveButton>
      </HStack>
      <Flex flex={1}>
        <DataTable
          columns={columns}
          data={mockProducts}
          progressPending={isLoading}
          progressComponent={<EvolveSpinner />}
          fixedHeader
          fixedHeaderScrollHeight="500px"
          customStyles={{
            tableWrapper: {
              style: {
                backgroundColor: "red",
              },
            },
          }}
        />
      </Flex>
    </Stack>
  );
}
