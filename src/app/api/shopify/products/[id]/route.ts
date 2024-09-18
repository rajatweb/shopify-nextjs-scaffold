/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import shopify from '@/lib/shopify/shopify-init';
import { getSessionFromStorage } from '@/utils/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: any) {
    console.log("🚀 ~ GET ~ params:", params)
    const session = await getSessionFromStorage();

    // Rest API - deprecated
    //   const client = new shopify.clients.Rest({ session });
    //   const product = await client.get({
    //     path: `products/${params.id}`,
    //   });

    // Use GrapQl API
    const client = new shopify.clients.Graphql({ session });
    const product = await client.request(
        `query GetProductsById($id: ID!) {
          product (id: ${params.id}) {
            edges {
              node {
                id
                title
                descriptionHtml
              }
            }
          }
        }`
    );

    return NextResponse.json({ product: product });
}

