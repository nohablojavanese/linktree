'use client'
import React from 'react';
import { Card, CardBody, CardFooter, Input, Textarea, Button } from "@nextui-org/react";
import { LinkItemProps } from './LinkItems';

type EditableLinkItemProps = LinkItemProps & {
  onUpdate: (formData: FormData) => void;
  onDelete: (formData: FormData) => void;
};

export const EditableLinkItem: React.FC<EditableLinkItemProps> = ({ id, title, url, description, onUpdate, onDelete }) => {
  const handleDelete = () => {
    const formData = new FormData();
    formData.append('id', id);
    onDelete(formData);
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
      <form action={onUpdate}>
        <input type="hidden" name="id" value={id} />
        <CardBody className="gap-4">
          <Input
            label="Title"
            name="title"
            defaultValue={title}
            className="dark:text-white"
          />
          <Input
            label="URL"
            name="url"
            defaultValue={url}
            className="dark:text-white"
          />
          <Textarea
            label="Description"
            name="description"
            defaultValue={description}
            className="dark:text-white"
          />
        </CardBody>
        <CardFooter className="justify-between pt-0">
          <Button type="submit" color="primary" size="sm">Update</Button>
          <Button onClick={handleDelete} color="danger" size="sm">Delete</Button>
        </CardFooter>
      </form>
    </Card>
  );
};