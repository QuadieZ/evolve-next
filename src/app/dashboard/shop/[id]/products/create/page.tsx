"use client";

import { EvolveDashboardHeader, EvolveSpinner } from "@/components";
import { EvolveFileUpload } from "@/components/EvolveFileUpload";
import {
  productMainCategoryOptions,
  productSubCategoryOptions,
} from "@/constant/productCategoryOptions";
import { AddIcon, CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type AddProductPayload = {
  name: string;
  categoryId: number;
  image: string[];
  code: string;
  variant: {
    price: number;
    inventory: number;
    weight: number;
  };
};

const AddProductForm = ({
  setProducts,
  index,
}: {
  setProducts: Dispatch<SetStateAction<AddProductPayload[]>>;
  index: number;
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<number | null>(null);
  const [subCategory, setSubCategory] = useState<number>(0);
  const [code, setCode] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [inventory, setInventory] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  useEffect(() => {
    if (
      !name ||
      !category ||
      !code ||
      !image ||
      price <= 0 ||
      inventory <= 0 ||
      weight <= 0
    )
      return;

    const payload: AddProductPayload = {
      name,
      categoryId: category + subCategory,
      image: [URL.createObjectURL(image)],
      code,
      variant: {
        price,
        inventory,
        weight,
      },
    };

    setProducts((prev) => {
      const newProducts = [...prev];
      newProducts[index] = payload;
      return newProducts;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, category, subCategory, code, image, price, inventory, weight]);

  return (
    <Stack gap={4} bg="gray.50" p={8} borderRadius="md" pos="relative">
      {index !== 0 && (
        <IconButton
          icon={<DeleteIcon />}
          pos="absolute"
          right={0}
          bottom={0}
          m={8}
          bg="red.500"
          _hover={{
            bg: "red.600",
          }}
          zIndex={99}
          aria-label="Delete"
          onClick={() => {
            setProducts((prev) => prev.filter((_, i) => i !== index));
          }}
        />
      )}
      <HStack>
        <FormControl>
          <Text>Name</Text>
          <Input
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Text>Product Code</Text>
          <Input
            placeholder="Product code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </FormControl>
      </HStack>

      <HStack>
        <FormControl>
          <Text>Product Category</Text>
          <Select
            placeholder="Select category"
            value={category ?? 0}
            onChange={(e) => {
              setCategory(parseInt(e.target.value));
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
          <Select
            placeholder="Select category"
            value={subCategory ?? 0}
            onChange={(e) => setSubCategory(parseInt(e.target.value))}
          >
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
      <HStack>
        <FormControl>
          <Text>Product Price</Text>
          <NumberInput value={price} onChange={(e) => setPrice(parseInt(e))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <Text>Product Inventory</Text>
          <NumberInput
            value={inventory}
            onChange={(e) => setInventory(parseInt(e))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <Text>Product Weight</Text>
          <NumberInput value={weight} onChange={(e) => setWeight(parseInt(e))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
      <FormControl>
        <Text>Product Image</Text>
        <EvolveFileUpload
          file={image}
          onFileChange={setImage}
          id={`products_${index}`}
        />
      </FormControl>
    </Stack>
  );
};

const productTemplate = {
  name: "",
  categoryId: 0,
  image: [],
  code: "",
  variant: {
    price: 0,
    inventory: 0,
    weight: 0,
  },
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const toast = useToast();
  const navigation = useRouter();
  const [products, setProducts] = useState<AddProductPayload[]>([
    productTemplate,
  ]);
  const [canSave, setCanSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log(products);
    setCanSave(
      products.every(
        (product) =>
          !!product.name &&
          !!product.categoryId &&
          !!product.code &&
          !!product.image.length &&
          !!product.variant.price &&
          !!product.variant.inventory &&
          !!product.variant.weight
      )
    );
  }, [products]);

  async function handleSubmit() {
    setIsSaving(true);
    const res = await fetch("/api/products/create", {
      method: "POST",
      body: JSON.stringify(products),
    }).then((res) => res.json());

    if (res.error) {
      toast({
        title: "Failed to create products, please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      for (const product of res.response) {
        const updateRes = await fetch("/api/products/display", {
          method: "POST",
          body: JSON.stringify({
            id: product.id,
          }),
        }).then((res) => res.json());
        if (updateRes.error) {
          toast({
            title: "Failed to update product display status, please try again",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }

      setIsSaving(false);
      navigation.push(`/dashboard/shop/${id}/products`);
      toast({
        title: "Products created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  if (isSaving) {
    return (
      <Stack w="100%" h="100%" justify="center" align="center" gap={8}>
        <Spinner size="xl" color="brand.primary" />
        <Text>Creating products...</Text>
      </Stack>
    );
  }
  return (
    <Stack w="100%" h="100%">
      <HStack justify="space-between">
        <EvolveDashboardHeader header="Create products" />
        <Button
          leftIcon={<CheckCircleIcon />}
          isDisabled={!canSave}
          onClick={handleSubmit}
        >
          Confirm Create Products
        </Button>
      </HStack>
      <Stack>
        {products.map((product, index) => (
          <AddProductForm key={index} setProducts={setProducts} index={index} />
        ))}
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setProducts((prev) => [...prev, productTemplate])}
        >
          Add more Products
        </Button>
      </Stack>
    </Stack>
  );
}
