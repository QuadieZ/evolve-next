"use client";

import { NextLink } from "next/link";
import {
  EvolveDashboardHeader,
  EvolveSpinner,
  ProductData,
} from "@/components";
import { EvolveButton } from "@/components/EvolveButton";
import { mockProducts } from "@/mockData";
import {
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

const columns: TableColumn<ProductData>[] = [
  {
    cell: (row) => (
      <Image
        src={row.image ?? "/shopPlaceholder.jpeg"}
        alt={row.title}
        borderRadius="lg"
        w="auto"
        objectFit={"cover"}
        h="50px"
      />
    ),
    width: "120px",
    style: {
      cursor: "pointer",
    },
  },
  {
    name: "Product",
    selector: (row) => row.title,
    width: "200px",
  },
  {
    name: "Description",
    selector: (row) => row.description,
  },
];

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    async function fetchData() {
      console.log(process.env.NEXT_PUBLIC_LINE_API_KEY);
      const data = await (await fetch("/api/products")).json();

      const products: ProductData[] = data.products.data.map((p) => ({
        id: p.id,
        title: p.name,
        description: p.description,
        image: p.imageUrls[0],
      }));

      setProducts(products);
      setIsLoading(false);
    }

    console.log("fetching data");
    fetchData();
  }, []);

  return (
    <Stack h="100%" w="100%">
      <HStack justify="space-between">
        <EvolveDashboardHeader
          header="Products"
          desciption="Create, Edit, Delete, and Manage your products"
        />
        <Link href={`/dashboard/shop/${id}/products/create`} as={NextLink}>
          <Button>Create Products</Button>
        </Link>
      </HStack>
      <Flex flex={1}>
        <DataTable
          columns={columns}
          data={products}
          progressPending={isLoading}
          progressComponent={<EvolveSpinner />}
          fixedHeader
          fixedHeaderScrollHeight="500px"
          customStyles={{
            cells: {
              style: {
                paddingTop: "4px",
                paddingBottom: "4px",
              },
            },
          }}
        />
      </Flex>
    </Stack>
  );
}
