import { ComponentMap, Component } from "@/types";
import { DraggableLocation } from "react-beautiful-dnd";

export function reorder(list: Component[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

export function reorderComponents(
    components: ComponentMap,
    source: DraggableLocation,
    destination: DraggableLocation
) {
    const current: Component[] = [...components[source.droppableId]];
    const next: Component[] = [...components[destination.droppableId]];
    const target: Component = current[source.index];

    if (destination.droppableId === 'BIN' && source.droppableId === 'SCREEN_DROPPABLE') {
        const result = {
            ...components,
            [source.droppableId]: current.splice(source.index, 1)
        };
        return result;
    }

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered: Component[] = reorder(current, source.index, destination.index);
        const result = {
            ...components,
            [source.droppableId]: reordered
        };
        return result;
    }

    // moving to different list
    next.splice(destination.index, 0, target);
    const result: ComponentMap = {
        ...components,
        [destination.droppableId]: next
    }

    return result
}
