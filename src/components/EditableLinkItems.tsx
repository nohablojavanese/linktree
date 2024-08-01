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
    <Card className="w-full">
      <form action={onUpdate}>
        <input type="hidden" name="id" value={id} />
        <CardBody className="gap-4">
          <Input label="Title" name="title" defaultValue={title} />
          <Input label="URL" name="url" defaultValue={url} />
          <Textarea label="Description" name="description" defaultValue={description} />
        </CardBody>
        <CardFooter className="justify-between">
          <Button type="submit" color="primary">Update</Button>
          <Button onClick={handleDelete} color="danger">Delete</Button>
        </CardFooter>
      </form>
    </Card>
  );
};