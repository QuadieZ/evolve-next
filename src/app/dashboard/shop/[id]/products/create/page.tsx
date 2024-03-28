"use client";

import { EvolveDashboardHeader } from "@/components";
import { EvolveFileUpload } from "@/components/EvolveFileUpload";
import {
  productMainCategoryOptions,
  productSubCategoryOptions,
} from "@/constant/productCategoryOptions";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  HStack,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);

  return (
    <Stack w="100%" h="100%">
      <EvolveDashboardHeader header="Create products" />
      <Stack>
        <Stack gap={4} bg="gray.50" p={8} borderRadius="md">
          <HStack>
            <FormControl>
              <Text>Name</Text>
              <Input placeholder="Product name" />
            </FormControl>
            <FormControl>
              <Text>Product Code</Text>
              <Input placeholder="Product code" />
            </FormControl>
          </HStack>

          <HStack>
            <FormControl>
              <Text>Product Category</Text>
              <Select
                placeholder="Select category"
                value={category}
                onChange={(e) => {
                  console.log(e.target.value);
                  setCategory(e.target.value);
                }}
              >
                {productMainCategoryOptions.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Text>Product Sub Category</Text>
              <Select placeholder="Select category">
                {category &&
                  (productSubCategoryOptions[category] as any)?.map(
                    (category: any) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    )
                  )}
              </Select>
            </FormControl>
          </HStack>
          <FormControl>
            <Text>Product Image</Text>
            <EvolveFileUpload
              file={image}
              onFileChange={setImage}
              id="product"
            />
          </FormControl>
        </Stack>
        <Button leftIcon={<AddIcon />}>Add more Products</Button>
      </Stack>
    </Stack>
  );
}
