import Link from 'next/link';

export default function SubscriptionRequired() {
  return (
    <div className="bg-yellow-100 dark:bg-yellow-800 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-semibold mb-4">Subscription Required</h2>
      <p className="mb-4">This content is only available to our premium subscribers.</p>
      <Link href="/edit/premium" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Upgrade Your Plan
      </Link>
    </div>
  );
}