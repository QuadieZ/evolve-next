// droppable and other logics for all components
"use client";

import { Component, ContainerDataProps } from "@/types";
import { Box, Text } from "@chakra-ui/react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ComponentRenderer } from "./ComponentRenderer";
import { Container } from ".";
import { Fragment, useState } from "react";
import { Item, Menu, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export type BuilderComponentProviderProps = Component & {
  index: number;
  draggableId: string;
  renderClone?: boolean;
  onDuplicate?: (index: number) => void;
  onDelete?: (index: number) => void;
};

export const BuilderComponentProvider = (
  props: BuilderComponentProviderProps
) => {
  const {
    index,
    draggableId,
    renderClone,
    onDuplicate,
    onDelete,
    ...component
  } = props;
  const menuId = `item_setting_${draggableId}`;
  const { show } = useContextMenu({
    id: menuId,
  });
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  //const id = randomstring(1);

  if (component.name === "Container") {
    const { children, ...rest } = component.props as ContainerDataProps;
    return (
      <Draggable key={draggableId} draggableId={draggableId} index={index}>
        {(provided, snapshot) => (
          <Container
            containerRef={provided.innerRef}
            {...rest}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            p={8}
            style={provided.draggableProps.style}
            zIndex={index}
            bg="red"
          >
            <Droppable
              droppableId="container_droppable"
              type={`CONTAINER_${index}`}
            >
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {children.map((c, i) => (
                    <BuilderComponentProvider
                      key={`screen_container_${index}_component_${i}`}
                      draggableId={`screen_container_${index}_component_${i}`}
                      {...c}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }

  function handleContextMenu(e: React.MouseEvent) {
    if (draggableId.includes("screen")) {
      show({
        event: e,
        props: {
          key: index,
        },
      });
    }
  }

  function onItemClick({ id, props }: { id?: string; props?: any }) {
    if (id === "Duplicate") {
      onDuplicate && onDuplicate(props.key);
    }
    if (id === "Delete") {
      onDelete && onDelete(props.key);
    }
  }

  return (
    <Draggable key={draggableId} draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <Fragment>
          <Box
            onContextMenu={handleContextMenu}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            bg={isSettingOpen ? "#D6EDDB" : "none"}
          >
            <ComponentRenderer {...component} />
          </Box>
          {draggableId.includes("screen") && (
            <Menu
              id={menuId}
              onVisibilityChange={(isVisible) => setIsSettingOpen(isVisible)}
            >
              <Item id="Duplicate" onClick={onItemClick}>
                Duplicate
              </Item>
              <Item id="Delete" onClick={onItemClick}>
                Delete
              </Item>
            </Menu>
          )}
          {snapshot.isDragging && renderClone && (
            <Box>
              <ComponentRenderer {...component} />
            </Box>
          )}
        </Fragment>
      )}
    </Draggable>
  );
};
