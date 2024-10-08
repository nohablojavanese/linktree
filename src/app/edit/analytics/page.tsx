import React from 'react';
import ComingSoon from '@/components/ComingSoon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon | Your App Name',
  description: 'We\'re working on something amazing. Stay tuned!',
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}