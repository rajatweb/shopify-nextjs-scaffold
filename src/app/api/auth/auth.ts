import shopify from "@/lib/shopify/shopify-init";
import { NextResponse } from "next/server";

export function beginAuth(shop: string, req: Request, isOnline: boolean) {
    return shopify.auth.begin({
        shop,
        callbackPath: "/api/auth/callback",
        isOnline,
        rawRequest: req,
        rawResponse: new NextResponse()
    });
}