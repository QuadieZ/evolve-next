"use client";

import NextLink from "next/link";
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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductData[]>([]);

  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      console.log(process.env.NEXT_PUBLIC_LINE_API_KEY);
      const data = await (await fetch("/api/products")).json();
      console.log(data);
      const products: ProductData[] = data.products.data.map((p) => ({
        id: p.id,
        title: p.name,
        description: p.description,
        image: p.imageUrls[0],
        price: p.variants[0].price,
      }));

      setProducts(products);
      setIsLoading(false);
    }

    console.log("fetching data");
    fetchData();
  }, []);

  function deleteProduct(id: string) {
    setSelectedProduct(id);
    onOpen();
  }

  async function confirmDelete() {
    console.log("deleting product", selectedProduct);
    const res = await fetch("/api/products/delete", {
      method: "DELETE",
      body: JSON.stringify({ id: selectedProduct }),
    }).then((res) => res.json());
    if (res.error) {
      toast({
        title: "Failed to delete product",
        description: res.errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Product deleted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setProducts(products.filter((p) => p.id !== selectedProduct));
      onClose();
    }
  }

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
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => (row.description === "" ? "-" : row.description),
    },
    {
      name: "Price",
      selector: (row) => row.price ?? 0,
      sortable: true,
    },
    {
      cell: (row) => (
        <HStack>
          <Link href={`/dashboard/shop/${row.id}/products/edit`} as={NextLink}>
            <EditIcon boxSize="18px" />
          </Link>
          <DeleteIcon
            boxSize="18px"
            color="red"
            cursor="pointer"
            onClick={() => deleteProduct(row.id)}
          />
        </HStack>
      ),
      width: "200px",
    },
  ];

  return (
    <Stack h="100%" w="100%">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Are you sure you want to delete this product?</Text>
          </ModalHeader>
          <ModalFooter gap={4}>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              bg="red"
              _hover={{ bg: "red" }}
              _active={{ bg: "red" }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
