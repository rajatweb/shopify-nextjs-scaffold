'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [shop, setShop] = useState('');
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!shop) {
            alert('Please enter a Shopify store URL');
            return;
        }

        // Redirect to the Shopify OAuth flow
        // const shopUrl = `https://${shop.replace(/https?:\/\//, '')}`;
        router.push(`/api/auth?shop=${encodeURIComponent(shop)}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Login with your Shopify Store</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
                <input
                    type="text"
                    value={shop}
                    onChange={(e) => setShop(e.target.value)}
                    placeholder="Enter your Shopify store URL"
                    className='p-2'
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>
                    Login with Shopify
                </button>
            </form>
        </div>
    );
};

export default Page;
