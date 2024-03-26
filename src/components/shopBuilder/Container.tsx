"use client";

import { Component } from "@/types";
import { BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import { ComponentRenderer } from "./ComponentRenderer";
import { Droppable } from "react-beautiful-dnd";
import { BuilderComponentProvider } from "./BuilderComponentProvider";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export type ContainerProps = {
  children: ReactNode;
  index?: number;
  position?: "relative" | "absolute";
  height?: string;
  width?: string;
  containerRef?: any;
} & BoxProps;

export const Container = (props: ContainerProps) => {
  const {
    children,
    position = "relative",
    width = "100%",
    containerRef,
    //index,
    ...rest
  } = props;

  return (
    <Flex
      w={width}
      h="fit-content"
      position={position}
      flexDir="column"
      ref={containerRef}
      {...rest}
    >
      {children}
      {/* {children.map((c, index) => {
        if (isEditor) {
          return <BuilderComponentProvider key={index} index={index} {...c} />;
        }
        return <ComponentRenderer key={index} {...c} />;
      })} */}
    </Flex>
    // <Droppable droppableId="container_droppable" type={`CONTAINER_${index}`}>
    //   {(provided) => (
    //     <Flex
    //       w={width}
    //       h={height}
    //       position={position}
    //       {...provided.droppableProps}
    //       ref={provided.innerRef}
    //     >
    //       {children.map((c, index) => (
    //         <BuilderComponentProvider key={index} index={index} {...c} />
    //       ))}
    //     </Flex>
    //   )}
    // </Droppable>
  );
};
