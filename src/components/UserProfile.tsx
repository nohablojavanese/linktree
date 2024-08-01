import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export type UserProfileProps = {
  username: string;
  randomId: string;
  createdAt: string;
};

export const UserProfile: React.FC<UserProfileProps> = ({ username, randomId, createdAt }) => {
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <h2 className="text-xl font-bold">User Profile</h2>
      </CardHeader>
      <CardBody>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Random ID:</strong> {randomId}</p>
        <p><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
      </CardBody>
    </Card>
  );
};