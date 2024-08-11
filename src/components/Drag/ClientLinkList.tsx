"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { EditableLinkItem } from "../Update/EditableLinkItems";
import { LinkType } from "@/lib/types/type";
import { GripVertical } from "lucide-react";
import { DropResult } from "@hello-pangea/dnd";
interface ClientDraggableLinkListProps {
  links: LinkType[];
  updateLinkOrder: (newOrder: { id: string; order: number }[]) => Promise<void>;
  updateLink: (formData: FormData) => Promise<void>;
  deleteLink: (formData: FormData) => Promise<void>;
  updateLinkVisibility: (id: string, isVisible: boolean) => Promise<void>;
}

export const ClientDraggableLinkList: React.FC<
  ClientDraggableLinkListProps
> = ({
  links: initialLinks,
  updateLinkOrder,
  updateLink,
  deleteLink,
  updateLinkVisibility,
}) => {
  const [links, setLinks] = useState(initialLinks);

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLinks(items);

    const updatedOrder = items.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    await updateLinkOrder(updatedOrder);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {links.map((link, index) => (
              <Draggable key={link.id} draggableId={link.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all ${
                      snapshot.isDragging ? "shadow-lg scale-105" : ""
                    }`}
                  >
                    <div className="flex items-center p-4">
                      <div
                        {...provided.dragHandleProps}
                        className="mr-4 cursor-move text-gray-800 dark:text-white"
                      >
                        <GripVertical size={24} />
                      </div>
                      <div className="flex-grow">
                        <EditableLinkItem
                          {...link}
                          onUpdate={updateLink}
                          onDelete={deleteLink}
                          onVisible={updateLinkVisibility}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
