'use client';

import { useRouter } from 'next/navigation';

interface DeepLinkRedirectProps {
  url: string;
}

const DeepLinkRedirect: React.FC<DeepLinkRedirectProps> = ({ url }) => {
  const router = useRouter();

  let redirectUrl = url;
  if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
    redirectUrl = 'https://' + redirectUrl;
  }

  // Perform the redirect immediately
  if (typeof window !== 'undefined') {
    window.location.href = redirectUrl;
  } else {
    router.push(redirectUrl);
  }

  return <div>Redirecting...</div>;
};

export default DeepLinkRedirect;