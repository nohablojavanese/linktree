'use client';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Link from 'next/link';

interface UserNotFoundProps {
  username: string;
}

export const UserNotFound: React.FC<UserNotFoundProps> = ({ username }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 dark:from-gray-800 dark:to-gray-900">
    <Card className="w-[400px] max-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <CardBody className="text-center p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          @{username} is not used by anyone
        </h1>
        <p className="text-xl mb-4 text-gray-700 dark:text-gray-300">
          Claim this <span className='font-medium text-blue-400'> bioku.id/{username} </span>
        </p>
      </CardBody>
      <CardFooter className="flex justify-center p-6">
        <Link href="/login" passHref>
          <Button
            color="primary"
            className="rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors text-black dark:text-gray-400"
          >
            Claim
          </Button>
        </Link>
      </CardFooter>
    </Card>
  </div>
  );
};

