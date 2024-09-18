/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import shopify from '@/lib/shopify/shopify-init';
import { getSessionFromStorage } from '@/utils/shopify';

export async function GET() {
    const session = await getSessionFromStorage();

    // Rest API - deprecated
    // const client = new shopify.clients.Rest({ session });
    // const products = await client.get({
    //     path: 'products',
    // });

    // Use GrapQl API
    const client = new shopify.clients.Graphql({ session });
    const products = await client.request(
        `{
          products (first: 10) {
            edges {
              node {
                id
                title
                descriptionHtml
              }
            }
          }
        }`,
    );


    return NextResponse.json({ products: products.data.products });
}

