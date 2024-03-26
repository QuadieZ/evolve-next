"use client";

import { DragItemTypes } from "@/types";
import { Box } from "@chakra-ui/react";
import { useDrag } from "react-dnd";

export const BuilderComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragItemTypes.SHOP_TITLE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box ref={drag} pos="relative" opacity={isDragging ? 0 : 1}>
      {children}
    </Box>
  );
};
