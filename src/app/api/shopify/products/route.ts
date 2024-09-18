/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import shopify from '@/lib/shopify/shopify-init';
import { Session } from "@shopify/shopify-api";

function getSessionFromStorage() {
    const session = localStorage.getItem("session")!
    const sessionObj = JSON.parse(session) as Session;
    return sessionObj;
}

export async function GET() {

    const session = await getSessionFromStorage();
    console.log("🚀 ~ GET ~ session:", session)


    const client = new shopify.clients.Rest({ session });
    const products = await client.get({
        path: 'products',
    });

    return NextResponse.json({ products: products.body.products });
}

