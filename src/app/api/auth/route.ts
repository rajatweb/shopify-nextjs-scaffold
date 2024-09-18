import shopify from "@/lib/shopify/shopify-init";
import { beginAuth } from "./auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop') || '';
    const sanitizedShop = shopify.utils.sanitizeShop(shop, true) as string;

    if (!sanitizedShop) return NextResponse.json({ error: 'Shop is required' }, { status: 400 });



    return beginAuth(sanitizedShop, req, true);
}
