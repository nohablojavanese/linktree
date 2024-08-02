'use client'
import React from 'react';
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { SocialLinkProps } from './SocialLinks';

type EditableSocialLinkProps = SocialLinkProps & {
  onUpdate: (formData: FormData) => void;
  onDelete: (formData: FormData) => void;
};

export const EditableSocialLink: React.FC<EditableSocialLinkProps> = ({ id, platform, url, onUpdate, onDelete }) => {
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
            label="Platform"
            name="platform"
            defaultValue={platform}
            className="dark:text-white"
          />
          <Input
            label="URL"
            name="url"
            defaultValue={url}
            className="dark:text-white"
          />
          <div className="flex justify-between mt-2">
            <Button type="submit" color="primary" size="sm">Update</Button>
            <Button onClick={handleDelete} color="danger" size="sm">Delete</Button>
          </div>
        </CardBody>
      </form>
    </Card>
  );
};