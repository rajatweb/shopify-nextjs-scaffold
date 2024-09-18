
// import { shopify } from '@/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const accessToken = searchParams.get('access_token');

        if(accessToken) 
        // await shopify.webhooks.register({
        //     session: accessToken
        // });
        // await shopify.webhooks.register({
        //   shop: process.env.SHOPIFY_SHOP || '',
        //   accessToken: process.env.SHOPIFY_ACCESS_TOKEN || '',
        //   webhook: {
        //     topic: 'orders/create',
        //     address: `${process.env.HOST_NAME}/api/webhooks/order-created`,
        //     format: 'json',
        //   },
        // });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error });
    }
}
