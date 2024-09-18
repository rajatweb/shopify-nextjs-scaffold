'use client'

import { useSearchParams, redirect } from 'next/navigation';


const Page = () => {
  const searchParams = useSearchParams();
  const shop = searchParams.get('shop');
  const host = searchParams.get('host');

  if(!shop && !host) {
    redirect('/login');
  }

  if(shop && host) {
    redirect('/dashboard');
  }
  return (
    <div>page</div>
  )
}

export default Page;
