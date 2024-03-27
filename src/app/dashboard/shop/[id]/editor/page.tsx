"use client";

import { ScreenContainer } from "@/components";
import { BuilderComponentProvider } from "@/components/shopBuilder/BuilderComponentProvider";
import { LAYOUT_TEMPLATE } from "@/constant/layout";
import { allComponents } from "@/mockData";
import { useShopStore } from "@/state";
import { theme } from "@/style/theme";
import { Component, ComponentMap } from "@/types";
import { reorderComponents } from "@/utils";
import {
  Box,
  ChakraProvider,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Slide,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

function reorder(list: Component[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function Page() {
  //const searchParams = useSearchParams();
  //const isDraft = searchParams.get("isDraft") === "true";
  const draftStyle = useShopStore((state) => state.draftStyle);
  const setDraftStyle = useShopStore((state) => state.setDraftStyle);
  const currentShopStyle = useShopStore(
    (state) => state.currentShop?.shopStyle
  );
  const [shopTheme, setShopTheme] = useState({});

  console.log(currentShopStyle);

  const [componentMap, setComponentMap] = useState<ComponentMap>({
    ALL_COMPONENTS: allComponents,
  });

  // init style
  useEffect(() => {
    if (!currentShopStyle) return;
    setComponentMap((prev) => ({
      ALL_COMPONENTS: allComponents,
      SCREEN_DROPPABLE: currentShopStyle?.components ?? [],
    }));
    console.log("init style", currentShopStyle);
    setShopTheme({
      primary: currentShopStyle?.colors.primaryColor,
      contrast: currentShopStyle?.colors.contrastColor,
      border: currentShopStyle?.colors.borderColor,
      content: currentShopStyle?.colors.textColor,
      background: currentShopStyle?.colors.backgroundColor,
      secondaryBackground: currentShopStyle?.colors.secondaryBackgroundColor,
    });
  }, [currentShopStyle]);

  useEffect(() => {
    setDraftStyle({
      ...draftStyle,
      components: componentMap.SCREEN_DROPPABLE,
    } as any);
  }, [componentMap.SCREEN_DROPPABLE]);

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const { source, destination } = result;
    setComponentMap(reorderComponents(componentMap, source, destination));
  }

  function onDuplicateComponent(index: number) {
    const newComponentMap = { ...componentMap };
    const component = newComponentMap["SCREEN_DROPPABLE"][index];
    newComponentMap["SCREEN_DROPPABLE"].splice(index, 0, component);
    setComponentMap(newComponentMap);
  }

  function onDeleteComponent(index: number) {
    const newComponentMap = { ...componentMap };
    newComponentMap["SCREEN_DROPPABLE"].splice(index, 1);
    setComponentMap(newComponentMap);
  }

  return (
    <ChakraProvider
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          shop: shopTheme,
        },
      }}
    >
      <DragDropContext
        onDragEnd={onDragEnd}
        //onDragStart={(res) => console.log("start", res)}
      >
        <Stack
          w="100%"
          h="100%"
          pos="absolute"
          top={0}
          left={0}
          justify="center"
          flexDir="row"
        >
          <Stack
            w="70%"
            h="100%"
            overflowY="scroll"
            align="center"
            pos="relative"
          >
            <Droppable droppableId="SCREEN_DROPPABLE" type="SCREEN">
              {(provided, snapshot) => (
                <ScreenContainer
                  {...provided.droppableProps}
                  containerRef={provided.innerRef}
                  bg="shop.background"
                >
                  {componentMap["SCREEN_DROPPABLE"]?.map((component, index) => (
                    <BuilderComponentProvider
                      key={`screen_${index}`}
                      draggableId={`screen_${index}`}
                      index={index}
                      onDuplicate={onDuplicateComponent}
                      onDelete={onDeleteComponent}
                      {...component}
                    />
                  ))}
                </ScreenContainer>
              )}
            </Droppable>
          </Stack>
          <Droppable droppableId="ALL_COMPONENTS" type="SCREEN" isDropDisabled>
            {(provided) => (
              <Stack
                w="30%"
                h="100%"
                overflowY="scroll"
                borderLeft="1px"
                borderColor="border.item"
                ref={provided.innerRef}
                divider={<StackDivider borderColor="border.item" />}
                gap={4}
                p={8}
                {...provided.droppableProps}
              >
                {componentMap["ALL_COMPONENTS"].map((component, index) => (
                  <BuilderComponentProvider
                    {...component}
                    key={`allcomp_${index}`}
                    index={index}
                    draggableId={`allcomp_${index}`}
                    renderClone
                  />
                ))}
              </Stack>
            )}
          </Droppable>
        </Stack>
      </DragDropContext>
    </ChakraProvider>
  );
}
